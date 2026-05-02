// Système de triple sécurité pour les réservations
// 3 canaux indépendants envoyés en parallèle : Supabase + EmailJS + WhatsApp (CallMeBot)
// Si un canal échoue, les 2 autres passent. Aucune réservation perdue.
import emailjs from '@emailjs/browser'
import { supabase } from './supabase'

// ── Canal 1 : Supabase (avec retry automatique) ─────────────────────────────
async function sendToSupabase(data) {
  const payload = {
    nom_client: data.nom,
    tel_client: data.telephone,
    depart: data.depart,
    destination: data.arrivee,
    date_heure: data.dateHeure || null,
    message: [
      data.message,
      `Email: ${data.email}`,
      data.distanceKm ? `Distance: ${data.distanceKm} km` : null,
    ].filter(Boolean).join(' | '),
    marque: data.marque,
    source: data.source || 'site',
    statut: 'nouvelle',
    montant: data.prix ?? null,
    user_id: null,
  }

  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      const { error } = await supabase.from('reservations').insert([payload])
      if (!error) return { ok: true }
      if (attempt === 2) return { ok: false, error: error.message }
    } catch (err) {
      if (attempt === 2) {
        return { ok: false, error: err instanceof Error ? err.message : 'erreur inconnue' }
      }
    }
    await new Promise(r => setTimeout(r, 400))
  }
  return { ok: false, error: 'erreur inconnue' }
}

// ── Canal 2 : EmailJS (notification email au chauffeur) ─────────────────────
async function sendToEmail(data) {
  try {
    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

    if (!serviceId || !templateId || !publicKey) {
      return { ok: false, error: 'EmailJS non configuré (variables manquantes)' }
    }

    await emailjs.send(
      serviceId,
      templateId,
      {
        client_nom: data.nom,
        client_tel: data.telephone,
        client_email: data.email,
        depart: data.depart,
        destination: data.arrivee,
        distance: data.distanceKm ? `${data.distanceKm} km` : '—',
        date_heure: data.dateHeureLisible,
        date: data.dateHeureLisible,
        prix_estime: data.prix ? `${data.prix} €` : '—',
        message: data.message || '(aucun message)',
        marque: data.marque,
        to_email: data.driverEmail,
      },
      publicKey
    )
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'erreur inconnue' }
  }
}

// ── Canal 3 : CallMeBot WhatsApp (notification instantanée chauffeur) ───────
async function sendToWhatsapp(data) {
  try {
    const phone = import.meta.env.VITE_CALLMEBOT_PHONE
    const apikey = import.meta.env.VITE_CALLMEBOT_APIKEY

    if (!phone || !apikey) {
      return { ok: false, error: 'WhatsApp non configuré' }
    }

    const lines = [
      `🚗 NOUVELLE RÉSA ${String(data.marque).toUpperCase()}`,
      ``,
      `👤 ${data.nom}`,
      `📞 ${data.telephone}`,
      `📧 ${data.email}`,
      ``,
      `📍 De : ${data.depart}`,
      `📍 À : ${data.arrivee}`,
      `🕐 ${data.dateHeureLisible}`,
    ]
    if (data.prix) lines.push(`💰 ${data.prix} €`)
    if (data.distanceKm) lines.push(`📏 ${data.distanceKm} km`)
    if (data.message) lines.push(``, `💬 ${data.message}`)

    const text = encodeURIComponent(lines.join('\n'))
    const url = `https://api.callmebot.com/whatsapp.php?phone=${encodeURIComponent(phone)}&text=${text}&apikey=${encodeURIComponent(apikey)}`

    // mode: 'no-cors' nécessaire — CallMeBot ne renvoie pas les headers CORS,
    // mais le message est bien envoyé côté serveur.
    await fetch(url, { method: 'GET', mode: 'no-cors' })
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'erreur inconnue' }
  }
}

// ── Orchestrateur : envoie sur les 3 canaux EN PARALLÈLE ────────────────────
export async function sendReservation(data) {
  const [supabaseResult, emailResult, whatsappResult] = await Promise.all([
    sendToSupabase(data),
    sendToEmail(data),
    sendToWhatsapp(data),
  ])

  const result = {
    ok: supabaseResult.ok || emailResult.ok || whatsappResult.ok,
    allOk: supabaseResult.ok && emailResult.ok && whatsappResult.ok,
    channels: {
      supabase: supabaseResult,
      email: emailResult,
      whatsapp: whatsappResult,
    },
  }

  console.log('[sendReservation]', {
    marque: data.marque,
    supabase: supabaseResult.ok ? '✅' : `❌ ${supabaseResult.error}`,
    email: emailResult.ok ? '✅' : `❌ ${emailResult.error}`,
    whatsapp: whatsappResult.ok ? '✅' : `❌ ${whatsappResult.error}`,
  })

  return result
}
