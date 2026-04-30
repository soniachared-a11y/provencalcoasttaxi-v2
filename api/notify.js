// Vercel serverless function — envoi notif WhatsApp via CallMeBot
// Configuré via variables d'env Vercel : CALLMEBOT_PHONE & CALLMEBOT_APIKEY
// (sans préfixe VITE_ pour rester côté serveur uniquement)

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { message } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message requis' })
  }

  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) {
    return res.status(500).json({ error: 'CallMeBot non configuré' })
  }

  // Limite contenu (CallMeBot tronque > ~600 chars en URL)
  const safe = message.slice(0, 550)
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(safe)}&apikey=${encodeURIComponent(apikey)}`

  try {
    const r = await fetch(url, { method: 'GET' })
    const text = await r.text()
    if (!r.ok) {
      console.error('CallMeBot HTTP', r.status, text)
      return res.status(502).json({ error: 'CallMeBot a refusé', status: r.status })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('CallMeBot fetch error:', err)
    return res.status(500).json({ error: 'Échec envoi WhatsApp' })
  }
}
