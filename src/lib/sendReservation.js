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

    // Le template EmailJS est partagé entre Provençal et Malacrida avec un
    // subject hardcodé. Pour garantir l'identification claire de la marque
    // côté chauffeur, on injecte le branding en tête du message et on tente
    // de pousser un subject dynamique (override si le template a {{subject}}).
    const brandLabel = data.marque === 'malacrida' ? 'MALACRIDA TAXI' : 'TAXIS PROVENÇALE AIX'
    const brandHeader = `🏷️ ${brandLabel} — RÉSERVATION`
    const enrichedMessage = `${brandHeader}\n\n${data.message || '(aucun message client)'}`
    const dynamicSubject = `[${brandLabel}] Nouvelle réservation — ${data.nom}`

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
        message: enrichedMessage,
        marque: data.marque,
        subject: dynamicSubject,
        title: dynamicSubject,
        to_email: data.driverEmail,
      },
      publicKey
    )
    return { ok: true }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : 'erreur inconnue' }
  }
}

// ── Canal 3 : WhatsApp via fonction serverless /api/notify-whatsapp ─────────
// La clé CallMeBot reste côté serveur (env vars sans préfixe VITE_), jamais
// exposée dans le bundle public. Le navigateur appelle simplement notre API.
async function sendToWhatsapp(data) {
  try {
    const lines = [
      `🚗 NOUVELLE RÉSA ${String(data.marque).toUpperCase()}`,
      ``,
      `👤 ${data.nom}`,
      `📞 ${data.telephone}`,
    ]
    if (data.email) lines.push(`📧 ${data.email}`)
    lines.push(
      ``,
      `📍 De : ${data.depart}`,
      `📍 À : ${data.arrivee}`,
      `🕐 ${data.dateHeureLisible}`,
    )
    if (data.prix) lines.push(`💰 ${data.prix} €`)
    if (data.distanceKm) lines.push(`📏 ${data.distanceKm} km`)
    if (data.message) lines.push(``, `💬 ${data.message}`)

    const r = await fetch('/api/notify-whatsapp', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: lines.join('\n') }),
    })
    if (!r.ok) {
      const errBody = await r.json().catch(() => ({}))
      return { ok: false, error: errBody.error || `HTTP ${r.status}` }
    }
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
