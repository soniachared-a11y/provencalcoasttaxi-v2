// Fonction serverless Vercel — envoi notification WhatsApp via CallMeBot.
//
// Pourquoi : la clé CallMeBot ne doit JAMAIS être exposée dans le bundle
// JavaScript public (sinon n'importe qui peut spammer le téléphone du
// chauffeur en visitant le site).
//
// Cette fonction tourne côté serveur Vercel — la clé reste invisible côté
// client. Le navigateur appelle juste `/api/notify-whatsapp` avec le contenu
// de la réservation, et c'est ce serveur qui appelle CallMeBot avec la clé
// secrète (env vars sans préfixe VITE_).
//
// Variables d'environnement requises sur Vercel (scope Production) :
//   CALLMEBOT_PHONE   — numéro WhatsApp chauffeur au format international (33...)
//   CALLMEBOT_APIKEY  — clé API CallMeBot reçue lors de l'activation

export default async function handler(req, res) {
  // Limites CORS — uniquement notre propre site peut appeler cette fonction
  const allowedOrigins = [
    'https://www.taxisprovencaleaix.fr',
    'https://taxisprovencaleaix.fr',
    'https://provencalcoasttaxi-v2.vercel.app',
  ]
  const origin = req.headers.origin || ''
  if (allowedOrigins.includes(origin) || origin.endsWith('.vercel.app')) {
    res.setHeader('Access-Control-Allow-Origin', origin)
  }
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type')

  if (req.method === 'OPTIONS') return res.status(204).end()
  if (req.method !== 'POST') return res.status(405).json({ error: 'method_not_allowed' })

  const { message } = req.body || {}
  if (!message || typeof message !== 'string') {
    return res.status(400).json({ error: 'message_required' })
  }
  if (message.length > 1500) {
    return res.status(400).json({ error: 'message_too_long' })
  }

  const phone = process.env.CALLMEBOT_PHONE
  const apikey = process.env.CALLMEBOT_APIKEY
  if (!phone || !apikey) {
    console.error('[notify-whatsapp] env vars manquantes')
    return res.status(500).json({ error: 'not_configured' })
  }

  const safe = message.slice(0, 550) // CallMeBot tronque au-delà
  const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${encodeURIComponent(safe)}&apikey=${encodeURIComponent(apikey)}`

  try {
    const r = await fetch(url, { method: 'GET' })
    const text = await r.text()
    if (!r.ok) {
      console.error('[notify-whatsapp] CallMeBot HTTP', r.status, text.slice(0, 200))
      return res.status(502).json({ error: 'callmebot_rejected', status: r.status })
    }
    return res.status(200).json({ ok: true })
  } catch (err) {
    console.error('[notify-whatsapp] fetch error:', err)
    return res.status(500).json({ error: 'fetch_failed' })
  }
}
