import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhoneCall, EnvelopeSimple, ArrowRight,
  NavigationArrow, CheckCircle, ChatCircleText,
  CalendarBlank, Clock, SealCheck, MapPin,
  WifiHigh, Drop, Baby, Snowflake, Lightning, Users, Briefcase,
} from '@phosphor-icons/react'
import emailjs from '@emailjs/browser'
import { CONTACT } from '../data/content'
import { supabase } from '../lib/supabase'
import AddressAutocomplete from '../components/ui/AddressAutocomplete'
import SEOHead from '../seo/SEOHead'
import { TIERS, pricesAll, priceFor, isNightHour } from '../lib/pricing'

gsap.registerPlugin(ScrollTrigger)

const TRIP_TYPES = ['Aller simple', 'Aller-retour', 'À l\'heure']

// Catalogue véhicules basé sur les 3 paliers tarifaires
const VEHICLES = [
  {
    id: 'eco',
    label: 'Éco',
    vehicule: 'Tesla',
    tag: 'Écologique',
    pax: TIERS.eco.pax,
    bagages: TIERS.eco.bagages,
    img: '/images/tesla-eco.png',
    imgStyle: { objectFit: 'contain', objectPosition: 'center center' },
    iconAccent: Lightning,
    amenities: [
      { icon: WifiHigh, label: 'Wi-Fi' },
      { icon: Drop, label: 'Eau' },
      { icon: Snowflake, label: 'Clim' },
      { icon: Lightning, label: 'Électrique' },
    ],
  },
  {
    id: 'berline',
    label: 'Berline',
    vehicule: 'Mercedes Classe E',
    tag: 'Confort premium',
    pax: TIERS.berline.pax,
    bagages: TIERS.berline.bagages,
    img: '/images/classe-e-provence.jpg',
    imgStyle: { objectFit: 'cover', objectPosition: 'center 60%' },
    recommended: true,
    amenities: [
      { icon: WifiHigh, label: 'Wi-Fi' },
      { icon: Drop, label: 'Eau' },
      { icon: Baby, label: 'Siège bébé' },
      { icon: Snowflake, label: 'Clim' },
      { icon: Lightning, label: 'USB' },
    ],
  },
  {
    id: 'van',
    label: 'Van',
    vehicule: 'Mercedes Classe V',
    tag: 'Grand format',
    pax: TIERS.van.pax,
    bagages: TIERS.van.bagages,
    img: '/images/classe-v-detour.png',
    imgStyle: { objectFit: 'contain', objectPosition: 'center bottom' },
    amenities: [
      { icon: WifiHigh, label: 'Wi-Fi' },
      { icon: Drop, label: 'Eau' },
      { icon: Baby, label: 'Siège bébé' },
      { icon: Snowflake, label: 'Clim' },
      { icon: Lightning, label: 'USB' },
    ],
  },
]

// ── Field styles
const fs = {
  width: '100%', height: 36,
  background: '#F6F3EE',
  border: '1px solid transparent',
  padding: '0 10px',
  fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)',
  outline: 'none', transition: 'border-color 0.2s',
  boxSizing: 'border-box',
}
const Lbl = ({ children }) => (
  <span style={{
    display: 'block', marginBottom: 5,
    fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.2em',
    color: 'var(--texte-light)',
  }}>
    {children}
  </span>
)
const focus = e => (e.target.style.borderColor = 'var(--olive)')
const blur  = e => (e.target.style.borderColor = 'transparent')

export default function ContactPage() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const formCardRef = useRef(null)

  const [form, setForm] = useState({
    prenom: '', nom: '', tel: '',
    depart: 'Aix-en-Provence',
    destination: null,
    date: '', heure: '',
    vehicule: null, // pas de pré-sélection — l'utilisateur choisit explicitement
    passagers: 1,
    message: '',
    tripType: 0, // 0=aller simple, 1=aller-retour, 2=à l'heure
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  // Étape courante : 1=trajet, 2=véhicule, 3=coordonnées
  const [step, setStep] = useState(1)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  // Heure utilisée pour le calcul (par défaut midi = jour)
  const hour = form.heure ? parseInt(form.heure.split(':')[0], 10) : 12

  // Les 3 prix Eco/Berline/Van pour la destination
  const allPrices = form.destination?.km ? pricesAll(form.destination.km, hour) : null

  // Prix retenu pour le véhicule sélectionné (avec multiplicateur aller-retour)
  const prix = (() => {
    if (!allPrices) return null
    const base = allPrices[form.vehicule] ?? allPrices.berline
    const total = form.tripType === 1 ? Math.round(base * 1.95) : base
    return { montant: total, isNuit: isNightHour(hour), km: form.destination.km }
  })()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25, ease: 'none',
          scrollTrigger: { trigger: heroRef.current, start: 'top top', end: 'bottom top', scrub: true },
        })
      }
      const tl = gsap.timeline({ delay: 0.2 })
      tl.from('.hero-contact-text > *', { y: 30, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' })

      if (formCardRef.current) {
        gsap.from(formCardRef.current, { x: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: 0.3 })
      }
      // Note : les véhicules apparaissent maintenant en step 2 avec animation CSS
      gsap.from('.channel-card', {
        y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out',
        scrollTrigger: { trigger: '.channels-section', start: 'top 80%', once: true },
      })
      gsap.from('.map-section', {
        opacity: 0, y: 30, duration: 0.8,
        scrollTrigger: { trigger: '.map-section', start: 'top 85%', once: true },
      })
    }, heroRef)
    return () => ctx.revert()
  }, [])

  // Validation Étape 1 → passage Étape 2 (calcul prix)
  const handleCalcPrix = () => {
    const errs = {}
    if (form.tripType !== 2 && !form.destination?.label) errs.destination = 'Destination requise'
    if (!form.date) errs.date = 'Date requise'
    if (!form.heure) errs.heure = 'Heure requise'
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    setErrors({})
    setStep(s => Math.max(s, 2))
    // Smooth scroll vers section véhicule
    setTimeout(() => document.getElementById('step-vehicule')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  // Sélection d'un véhicule → passage Étape 3
  const handleSelectVehicule = (id) => {
    set('vehicule')(id)
    setStep(s => Math.max(s, 3))
    setTimeout(() => document.getElementById('step-coords')?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 80)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation côté client — UX + sécurité avant envoi réseau
    const errs = {}
    if (!form.prenom?.trim() || form.prenom.trim().length < 2) errs.prenom = 'Prénom requis (2 caractères min)'
    if (!form.nom?.trim() || form.nom.trim().length < 2) errs.nom = 'Nom requis (2 caractères min)'
    const telClean = (form.tel || '').replace(/[\s.\-]/g, '')
    if (!/^(\+33|0)[1-9]\d{8}$/.test(telClean)) errs.tel = 'Téléphone invalide (ex. 06 12 34 56 78)'
    if (form.tripType !== 2 && !form.destination?.label) errs.destination = 'Destination requise'
    if (form.date) {
      const today = new Date(); today.setHours(0, 0, 0, 0)
      const picked = new Date(form.date)
      if (picked < today) errs.date = 'La date ne peut pas être dans le passé'
    }
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      // Remonter en haut du formulaire pour que l'utilisateur voie les erreurs
      document.getElementById('form-errors')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    setErrors({})

    setLoading(true)
    // Libellé véhicule pour les notifs (Berline → "Berline (Mercedes Classe E)")
    const tier = TIERS[form.vehicule]
    const vehiculeLabel = tier ? `${tier.label} (${tier.vehicule})` : form.vehicule
    const fullName = `${form.prenom} ${form.nom}`.trim()
    const dateHeure = form.date && form.heure ? `${form.date} ${form.heure}` : (form.date || '—')

    // Suivi des canaux — au moins un doit réussir pour afficher le succès
    const results = { supabase: false, whatsapp: false, email: false }

    // 1. Supabase — dashboard webapp (indépendant)
    // ⚠️ marque = tag tenant (provencal/malacrida) pour filtrage dashboard, PAS le véhicule
    // Le type de véhicule + détails trajet vont dans `message` puisque pas de colonne dédiée
    const messageParts = [
      `Véhicule : ${vehiculeLabel}`,
      `Trajet : ${TRIP_TYPES[form.tripType]}`,
      form.destination?.km ? `Distance : ${form.destination.km} km` : null,
      prix ? `Prix estimé : ${prix.montant}€${prix.isNuit ? ' (nuit)' : ''}` : null,
      form.message ? `\nMessage client : ${form.message}` : null,
    ].filter(Boolean).join(' · ')

    try {
      const { error } = await supabase.from('reservations').insert([{
        nom_client: fullName,
        tel_client: form.tel,
        depart: form.depart,
        destination: form.destination?.label || (form.tripType === 2 ? 'À l\'heure' : ''),
        date_heure: form.date && form.heure ? `${form.date}T${form.heure}` : null,
        marque: 'provencal',
        montant: prix?.montant || null,
        message: messageParts,
        source: 'site',
        statut: 'nouvelle',
      }])
      if (error) throw error
      results.supabase = true
    } catch (err) {
      console.error('[resa] Supabase échec:', err)
    }

    // 2. WhatsApp via CallMeBot (fire-and-forget, n'attend pas la réponse)
    const waMsg = [
      '🚖 NOUVELLE RÉSERVATION',
      `👤 ${fullName}`,
      `📞 ${form.tel}`,
      `🚗 ${vehiculeLabel}`,
      `📍 ${form.depart} → ${form.destination?.label || (form.tripType === 2 ? 'À l\'heure' : '—')}`,
      form.destination?.km ? `📏 ${form.destination.km} km` : null,
      `🗓 ${dateHeure}`,
      `💶 ${prix ? `${prix.montant}€${prix.isNuit ? ' (nuit)' : ''}` : 'à calculer'}`,
      `🎫 ${TRIP_TYPES[form.tripType]}`,
      form.message ? `💬 ${form.message}` : null,
    ].filter(Boolean).join('\n')

    try {
      const r = await fetch('/api/notify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: waMsg }),
      })
      results.whatsapp = r.ok
      if (!r.ok) console.warn('[resa] WhatsApp HTTP', r.status)
    } catch (err) {
      console.warn('[resa] WhatsApp échec:', err)
    }

    // 3. Email via EmailJS (canal historique — indépendant)
    try {
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      if (!serviceId || !templateId || !publicKey) {
        throw new Error('EmailJS env vars manquantes')
      }
      await emailjs.send(serviceId, templateId, {
        client_nom:     fullName,
        client_tel:     form.tel,
        trajet_type:    TRIP_TYPES[form.tripType],
        depart:         form.depart,
        destination:    form.destination?.label || '—',
        distance:       form.destination?.km ? `${form.destination.km} km` : '—',
        date:           form.date || '—',
        heure:          form.heure || '—',
        vehicule:       vehiculeLabel,
        passagers:      form.passagers,
        prix_estime:    prix ? `${prix.montant} € ${prix.isNuit ? '(tarif nuit)' : ''}` : '—',
        message:        form.message || '(aucun message)',
        to_email:       'provencalcoastdriver@gmail.com',
      }, publicKey)
      results.email = true
    } catch (err) {
      console.error('[resa] EmailJS échec:', err)
    }

    // Au moins un canal a marché → succès. Sinon → erreur globale.
    if (results.supabase || results.whatsapp || results.email) {
      setSuccess(true)
    } else {
      setErrors({ global: 'Envoi impossible. Merci d\'appeler directement le 06 15 96 32 75.' })
      document.getElementById('form-errors')?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
    setLoading(false)
  }

  return (
    <>
      <SEOHead
        path="/contact"
        title="Réserver taxi Aix-en-Provence | Devis gratuit & tarif fixe — Taxis Provençale Aix"
        description="Réservez votre taxi ou VTC à Aix-en-Provence en ligne. Confirmation en 15 min, tarif fixe garanti, annulation gratuite 24h. Transferts aéroport Marseille Marignane, gare TGV, Luberon, événements. ☎ 06 15 96 32 75 — disponible 24h/24."
      />
      {/* HERO + FORM */}
      <section ref={heroRef} className="page-hero" style={{
        position: 'relative', minHeight: '100vh',
        overflow: 'hidden', display: 'flex', alignItems: 'stretch',
      }}>
        <img ref={heroBgRef} src="/images/flotte-hotel-luxe.jpg" alt="" aria-hidden="true"
          width={1200} height={800}
          style={{ position: 'absolute', inset: '-10% 0', width: '100%', height: '120%', objectFit: 'cover' }} />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.82) 50%, rgba(13,17,23,0.45) 100%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(100px,12vw,130px) clamp(24px,4vw,60px) 60px',
          display: 'grid', gridTemplateColumns: '1fr 1.15fr',
          gap: 'clamp(32px,4vw,64px)', alignItems: 'start',
        }} className="contact-hero-grid">

          {/* Left */}
          <div className="hero-contact-text" style={{ paddingTop: 40 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <Link to="/" style={{ fontFamily: 'Sora', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', textDecoration: 'none' }}>Accueil</Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span style={{ fontFamily: 'Sora', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--lavande)' }}>Réservation</span>
            </div>

            <h1 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px,4.5vw,58px)',
              fontWeight: 400, color: '#fff', lineHeight: 1.08, margin: '0 0 20px',
            }}>
              Réservez votre<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.55)' }}>trajet en Provence</span>
            </h1>

            <p style={{ fontFamily: 'Sora', fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8, margin: '0 0 32px', maxWidth: 340 }}>
              Réponse garantie en 15 minutes. Tarif fixe confirmé avant votre départ, sans surprise.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 11, marginBottom: 36 }}>
              {[
                { icon: CheckCircle, t: 'Tarif 100% fixe — aucune surprise' },
                { icon: Clock, t: 'Confirmation en moins de 15 minutes' },
                { icon: SealCheck, t: "Annulation gratuite jusqu'à 24h avant" },
              ].map(({ icon: Icon, t }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <Icon size={14} weight="duotone" style={{ color: 'var(--olive)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'rgba(255,255,255,0.45)' }}>{t}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
              <a href={CONTACT.telHref} style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: 'var(--olive)', color: '#fff',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px 20px', textDecoration: 'none', transition: 'background 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#5A6B3A')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--olive)')}>
                <PhoneCall size={13} weight="duotone" />{CONTACT.tel}
              </a>
              <a href="#form" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px 20px', textDecoration: 'none', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <ChatCircleText size={13} weight="duotone" />Formulaire
              </a>
            </div>
          </div>

          {/* Right — Form */}
          <div ref={formCardRef}>
            <div style={{ background: 'var(--cream)', boxShadow: '0 40px 100px rgba(0,0,0,0.45)' }}>
              {success ? (
                <div style={{ padding: '52px 36px', textAlign: 'center' }}>
                  <CheckCircle size={48} weight="duotone" style={{ color: 'var(--olive)', marginBottom: 18 }} />
                  <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 26, fontWeight: 400, color: 'var(--texte)', margin: '0 0 10px' }}>
                    Demande envoyée !
                  </h3>
                  <p style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', lineHeight: 1.7, margin: '0 0 24px' }}>
                    Nous confirmons votre réservation en moins de 15 minutes.
                  </p>
                  <a href={CONTACT.telHref} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'var(--olive)', color: '#fff',
                    fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '13px 24px', textDecoration: 'none',
                  }}>
                    <PhoneCall size={13} weight="duotone" />Appeler maintenant
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate>

                  {/* Bloc erreurs de validation */}
                  {Object.keys(errors).length > 0 && (
                    <div
                      id="form-errors"
                      role="alert"
                      style={{
                        margin: '0 28px', marginTop: 16,
                        padding: '14px 18px',
                        background: '#FEF2F2',
                        border: '1px solid #FCA5A5',
                        borderRadius: 10,
                        color: '#991B1B',
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 13, lineHeight: 1.5,
                      }}
                    >
                      <strong style={{ display: 'block', marginBottom: 6 }}>Veuillez corriger :</strong>
                      <ul style={{ margin: 0, paddingLeft: 18 }}>
                        {Object.values(errors).map((msg, i) => <li key={i}>{msg}</li>)}
                      </ul>
                    </div>
                  )}

                  {/* Stepped banner — 3 chevrons (Modifier / Choisir / Réserver) */}
                  <div className="cp-steps">
                    {[
                      { n: 1, label: 'Modifier le parcours' },
                      { n: 2, label: 'Choisir un véhicule' },
                      { n: 3, label: 'Réservation en ligne' },
                    ].map((s, i) => (
                      <div key={s.n} className={`cp-step ${step >= s.n ? 'is-active' : ''} ${step === s.n ? 'is-current' : ''}`}>
                        <span className="cp-step-num">{String(s.n).padStart(2, '0')}</span>
                        <span className="cp-step-label">{s.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* ─────── ÉTAPE 1 — TRAJET ─────── */}
                  <section className="cp-section" id="step-trajet">
                    {/* Tabs Aller simple / Aller-retour / À l'heure */}
                    <div className="cp-tabs">
                      {TRIP_TYPES.map((t, i) => (
                        <button
                          key={t} type="button"
                          onClick={() => set('tripType')(i)}
                          className={`cp-tab ${form.tripType === i ? 'is-sel' : ''}`}
                        >{t}</button>
                      ))}
                    </div>

                    {/* Départ */}
                    <div className="cp-field">
                      <MapPin size={16} weight="fill" className="cp-field-icon" style={{ color: 'var(--olive)' }} />
                      <input
                        type="text"
                        value={form.depart}
                        onChange={e => set('depart')(e.target.value)}
                        placeholder="Adresse de départ"
                        className="cp-input-big"
                      />
                    </div>

                    {/* Destination ou Durée si à l'heure */}
                    <div className="cp-field">
                      <MapPin size={16} weight="fill" className="cp-field-icon" style={{ color: 'var(--lavande)' }} />
                      {form.tripType === 2 ? (
                        <input
                          type="text"
                          value={form.destination?.label || ''}
                          onChange={e => set('destination')({ label: e.target.value })}
                          placeholder="Durée souhaitée (2h, 4h, journée…)"
                          className="cp-input-big"
                        />
                      ) : (
                        <AddressAutocomplete
                          value={form.destination}
                          onChange={set('destination')}
                          placeholder="Adresse d'arrivée"
                          dark={false}
                          inputStyle={{
                            background: 'transparent', border: 'none', borderRadius: 0,
                            height: 48, fontSize: 14, paddingLeft: 38, paddingRight: 12,
                            fontFamily: 'Sora', color: 'var(--texte)',
                            width: '100%',
                          }}
                        />
                      )}
                    </div>

                    {/* Date + Heure */}
                    <div className="cp-row-2">
                      <div className="cp-field">
                        <CalendarBlank size={16} weight="duotone" className="cp-field-icon" style={{ color: 'var(--texte-light)' }} />
                        <input
                          type="date"
                          value={form.date}
                          onChange={e => set('date')(e.target.value)}
                          required
                          className="cp-input-big"
                        />
                      </div>
                      <div className="cp-field">
                        <Clock size={16} weight="duotone" className="cp-field-icon" style={{ color: 'var(--texte-light)' }} />
                        <input
                          type="time"
                          value={form.heure}
                          onChange={e => set('heure')(e.target.value)}
                          required
                          className="cp-input-big"
                        />
                      </div>
                    </div>

                    {/* Options discrètes : voyage retour */}
                    <div className="cp-options">
                      <button
                        type="button"
                        onClick={() => set('tripType')(form.tripType === 1 ? 0 : 1)}
                        className={`cp-option-link ${form.tripType === 1 ? 'is-on' : ''}`}
                      >
                        ↕ Un voyage de retour ?
                      </button>
                    </div>

                    {/* CTA Calculer le prix → step 2 */}
                    <button
                      type="button"
                      onClick={handleCalcPrix}
                      className="cp-cta-primary"
                    >
                      Calculer le prix
                      <ArrowRight size={14} weight="bold" />
                    </button>
                  </section>

                  {/* ─────── ÉTAPE 2 — VÉHICULE ─────── */}
                  {step >= 2 && allPrices && (
                    <section className="cp-section cp-section--reveal" id="step-vehicule">
                      <div className="cp-section-head">
                        <span className="cp-section-eyebrow">Étape 2</span>
                        <h3 className="cp-section-title">Choisissez votre véhicule</h3>
                        <p className="cp-section-sub">{allPrices.km} km · tarif {allPrices.isNuit ? 'nuit (19h–6h)' : 'jour (6h–19h)'} · prix fixe garanti</p>
                      </div>

                      <div className="cp-vehicles-grid">
                        {VEHICLES.map(v => {
                          const sel = form.vehicule === v.id
                          const tierPrice = allPrices[v.id]
                          return (
                            <button
                              key={v.id} type="button"
                              onClick={() => handleSelectVehicule(v.id)}
                              className={`cp-vehicle ${sel ? 'is-sel' : ''}`}
                            >
                              {v.recommended && (
                                <div className="cp-vehicle-tag">Recommandé</div>
                              )}
                              <div className="cp-vehicle-img">
                                <img src={v.img} alt={v.label} loading="lazy" style={v.imgStyle} />
                              </div>
                              <div className="cp-vehicle-body">
                                <div className="cp-vehicle-head">
                                  <h4>{v.label}</h4>
                                  <span className="cp-vehicle-price">{tierPrice}€</span>
                                </div>
                                <p className="cp-vehicle-vehicule">{v.vehicule}</p>
                                <div className="cp-vehicle-meta">
                                  <span><Users size={11} weight="duotone" /> {v.pax}</span>
                                  <span><Briefcase size={11} weight="duotone" /> {v.bagages}</span>
                                </div>
                                <div className="cp-vehicle-amenities">
                                  {v.amenities.map((a, ai) => (
                                    <span key={ai} title={a.label}>
                                      <a.icon size={12} weight="duotone" />
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </section>
                  )}

                  {/* ─────── ÉTAPE 3 — COORDONNÉES ─────── */}
                  {step >= 3 && form.vehicule && (
                    <section className="cp-section cp-section--reveal" id="step-coords">
                      <div className="cp-section-head">
                        <span className="cp-section-eyebrow">Étape 3</span>
                        <h3 className="cp-section-title">Vos coordonnées</h3>
                        <p className="cp-section-sub">Confirmation en moins de 15 minutes</p>
                      </div>

                      {/* Récap résumé */}
                      {prix && (
                        <div className="cp-recap">
                          <div className="cp-recap-line">
                            <span className="cp-recap-label">Trajet</span>
                            <span className="cp-recap-value">{form.depart} → {form.destination?.label}</span>
                          </div>
                          <div className="cp-recap-line">
                            <span className="cp-recap-label">Date</span>
                            <span className="cp-recap-value">{form.date} · {form.heure}</span>
                          </div>
                          <div className="cp-recap-line">
                            <span className="cp-recap-label">Véhicule</span>
                            <span className="cp-recap-value">{TIERS[form.vehicule]?.label} — {TIERS[form.vehicule]?.vehicule}</span>
                          </div>
                          <div className="cp-recap-total">
                            <span>Total estimé</span>
                            <span className="cp-recap-price">{prix.montant}€</span>
                          </div>
                        </div>
                      )}

                      {/* Coordonnées */}
                      <div className="cp-row-2">
                        <div className="cp-field">
                          <input
                            type="text"
                            placeholder="Prénom"
                            value={form.prenom}
                            onChange={e => set('prenom')(e.target.value)}
                            required
                            className="cp-input-big cp-input-big--pad-left"
                          />
                        </div>
                        <div className="cp-field">
                          <input
                            type="text"
                            placeholder="Nom"
                            value={form.nom}
                            onChange={e => set('nom')(e.target.value)}
                            required
                            className="cp-input-big cp-input-big--pad-left"
                          />
                        </div>
                      </div>

                      <div className="cp-field">
                        <PhoneCall size={16} weight="duotone" className="cp-field-icon" style={{ color: 'var(--olive)' }} />
                        <input
                          type="tel"
                          placeholder="Téléphone (06 12 34 56 78)"
                          value={form.tel}
                          onChange={e => set('tel')(e.target.value)}
                          required
                          className="cp-input-big"
                        />
                      </div>

                      <div className="cp-field cp-field--ta">
                        <textarea
                          value={form.message}
                          onChange={e => set('message')(e.target.value)}
                          placeholder="Message (optionnel) — n° de vol, demandes particulières…"
                          rows={2}
                          className="cp-textarea"
                        />
                      </div>

                      {/* CTA finale */}
                      <button type="submit" disabled={loading} className="cp-cta-primary cp-cta-primary--final">
                        {loading ? 'Envoi…' : <>Confirmer la réservation <ArrowRight size={14} weight="bold" /></>}
                      </button>

                      <p className="cp-fineprint">
                        <SealCheck size={11} weight="duotone" /> Tarif fixe · annulation gratuite jusqu'à 24h avant · paiement à bord
                      </p>
                    </section>
                  )}
                </form>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-hero-grid { grid-template-columns: 1fr !important; }
            .hero-contact-text { padding-top: 0 !important; }
          }

          /* ─── Stepped banner (chevrons étapes 01/02/03) ─── */
          .cp-steps {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: var(--cream);
            border-bottom: 1px solid var(--border);
          }
          .cp-step {
            position: relative;
            padding: 14px 22px 14px 18px;
            display: flex; align-items: center; gap: 10px;
            background: #EDE7DA;
            color: var(--texte-light);
            font-family: 'Sora', sans-serif;
            transition: all 0.3s ease;
            clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%, 12px 50%);
            margin-right: -8px;
          }
          .cp-step:first-child { clip-path: polygon(0 0, calc(100% - 12px) 0, 100% 50%, calc(100% - 12px) 100%, 0 100%); padding-left: 22px; }
          .cp-step:last-child { clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%, 12px 50%); margin-right: 0; }
          .cp-step.is-active {
            background: var(--olive);
            color: #fff;
          }
          .cp-step.is-current {
            background: linear-gradient(95deg, var(--olive) 0%, #7A8B5A 100%);
            box-shadow: inset 0 -2px 0 rgba(255,255,255,0.2);
          }
          .cp-step-num {
            font-size: 10px;
            font-weight: 700;
            letter-spacing: 0.1em;
            opacity: 0.6;
            font-variant-numeric: tabular-nums;
          }
          .cp-step.is-active .cp-step-num { opacity: 0.85; }
          .cp-step-label {
            font-size: 9.5px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            line-height: 1.2;
          }

          /* ─── Sections ─── */
          .cp-section {
            padding: 22px 28px 24px;
            border-bottom: 1px solid var(--border);
            display: flex; flex-direction: column; gap: 12px;
          }
          .cp-section:last-of-type { border-bottom: none; padding-bottom: 28px; }
          .cp-section--reveal {
            animation: cpReveal 0.5s ease-out both;
          }
          @keyframes cpReveal {
            from { opacity: 0; transform: translateY(14px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .cp-section-head {
            display: flex; flex-direction: column; gap: 2px;
            margin-bottom: 4px;
          }
          .cp-section-eyebrow {
            font-family: 'Sora', sans-serif;
            font-size: 8px; font-weight: 700;
            letter-spacing: 0.3em;
            text-transform: uppercase;
            color: var(--olive);
            margin-bottom: 4px;
          }
          .cp-section-title {
            font-family: 'Instrument Serif', serif;
            font-size: 22px; font-weight: 400;
            color: var(--texte);
            margin: 0;
            letter-spacing: -0.01em;
            line-height: 1.15;
          }
          .cp-section-sub {
            font-family: 'Sora', sans-serif;
            font-size: 11px;
            color: var(--texte-light);
            margin: 0;
            letter-spacing: 0.02em;
          }

          /* ─── Tabs ─── */
          .cp-tabs {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            background: #F6F3EE;
            padding: 4px;
            gap: 2px;
            border-radius: 0;
          }
          .cp-tab {
            padding: 10px 6px;
            background: transparent;
            border: none;
            cursor: pointer;
            font-family: 'Sora', sans-serif;
            font-size: 10px;
            font-weight: 500;
            letter-spacing: 0.06em;
            color: var(--texte-light);
            transition: all 0.25s ease;
          }
          .cp-tab:hover { color: var(--texte); }
          .cp-tab.is-sel {
            background: var(--texte);
            color: #fff;
            font-weight: 700;
          }

          /* ─── Inputs ─── */
          .cp-field {
            position: relative;
            background: #F6F3EE;
            transition: box-shadow 0.2s, background 0.2s;
          }
          .cp-field:focus-within {
            background: #fff;
            box-shadow: inset 0 0 0 1.5px var(--olive);
          }
          .cp-field-icon {
            position: absolute;
            left: 13px; top: 50%;
            transform: translateY(-50%);
            pointer-events: none;
            z-index: 1;
          }
          .cp-input-big {
            width: 100%;
            height: 48px;
            background: transparent;
            border: none;
            padding: 0 14px 0 38px;
            font-family: 'Sora', sans-serif;
            font-size: 14px;
            color: var(--texte);
            outline: none;
            box-sizing: border-box;
            font-weight: 500;
          }
          .cp-input-big::placeholder {
            color: rgba(0,0,0,0.35);
            font-weight: 400;
          }
          .cp-input-big--pad-left { padding-left: 14px; }
          .cp-row-2 {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 8px;
          }
          .cp-field--ta { padding: 0; }
          .cp-textarea {
            width: 100%;
            background: transparent;
            border: none;
            padding: 12px 14px;
            font-family: 'Sora', sans-serif;
            font-size: 13px;
            color: var(--texte);
            outline: none;
            resize: vertical;
            min-height: 60px;
            line-height: 1.5;
            box-sizing: border-box;
          }
          .cp-textarea::placeholder { color: rgba(0,0,0,0.35); }

          /* ─── Options links (voyage retour) ─── */
          .cp-options {
            display: flex; gap: 18px; padding: 4px 2px;
          }
          .cp-option-link {
            background: none;
            border: none;
            padding: 0;
            font-family: 'Sora', sans-serif;
            font-size: 11px;
            color: var(--texte-light);
            cursor: pointer;
            letter-spacing: 0.02em;
            transition: color 0.2s;
          }
          .cp-option-link:hover { color: var(--olive); }
          .cp-option-link.is-on { color: var(--olive); font-weight: 700; }

          /* ─── CTA primary ─── */
          .cp-cta-primary {
            width: 100%;
            height: 54px;
            background: linear-gradient(95deg, var(--olive) 0%, #7A8B5A 100%);
            color: #fff;
            border: none;
            cursor: pointer;
            font-family: 'Sora', sans-serif;
            font-size: 12px;
            font-weight: 700;
            letter-spacing: 0.18em;
            text-transform: uppercase;
            display: flex; align-items: center; justify-content: center; gap: 10px;
            transition: all 0.3s ease;
            margin-top: 6px;
            box-shadow: 0 6px 20px rgba(107,125,74,0.25);
          }
          .cp-cta-primary:hover:not(:disabled) {
            background: linear-gradient(95deg, #5A6B3A 0%, #6B7C4A 100%);
            box-shadow: 0 10px 28px rgba(107,125,74,0.4);
            transform: translateY(-1px);
          }
          .cp-cta-primary:disabled {
            opacity: 0.6; cursor: not-allowed;
          }
          .cp-cta-primary--final {
            background: linear-gradient(95deg, var(--texte) 0%, #1F252E 100%);
            box-shadow: 0 6px 20px rgba(13,17,23,0.3);
          }
          .cp-cta-primary--final:hover:not(:disabled) {
            background: linear-gradient(95deg, #1F252E 0%, var(--texte) 100%);
            box-shadow: 0 10px 28px rgba(13,17,23,0.45);
          }

          /* ─── Vehicle cards (étape 2) ─── */
          .cp-vehicles-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 10px;
          }
          .cp-vehicle {
            position: relative;
            padding: 0;
            background: #fff;
            border: 1px solid var(--border);
            cursor: pointer;
            transition: all 0.25s ease;
            text-align: left;
            overflow: hidden;
          }
          .cp-vehicle:hover {
            border-color: var(--olive);
            transform: translateY(-2px);
            box-shadow: 0 8px 24px rgba(0,0,0,0.08);
          }
          .cp-vehicle.is-sel {
            border-color: var(--olive);
            border-width: 2px;
            box-shadow: 0 8px 24px rgba(107,125,74,0.25), inset 0 0 0 1px var(--olive);
          }
          .cp-vehicle-tag {
            position: absolute;
            top: 8px; left: 8px;
            background: var(--lavande);
            color: #fff;
            font-family: 'Sora', sans-serif;
            font-size: 8px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            padding: 3px 8px;
            z-index: 2;
          }
          .cp-vehicle-img {
            height: 90px;
            background: #F6F3EE;
            overflow: hidden;
            display: flex; align-items: center; justify-content: center;
          }
          .cp-vehicle-img img {
            width: 100%; height: 100%;
            transition: transform 0.4s ease;
          }
          .cp-vehicle:hover .cp-vehicle-img img,
          .cp-vehicle.is-sel .cp-vehicle-img img { transform: scale(1.06); }
          .cp-vehicle-body { padding: 10px 12px 12px; }
          .cp-vehicle-head {
            display: flex; align-items: baseline; justify-content: space-between;
            gap: 6px; margin-bottom: 2px;
          }
          .cp-vehicle-head h4 {
            font-family: 'Instrument Serif', serif;
            font-size: 18px; font-weight: 400;
            color: var(--texte);
            margin: 0;
            letter-spacing: -0.01em;
          }
          .cp-vehicle-price {
            font-family: 'Instrument Serif', serif;
            font-size: 22px;
            color: var(--olive);
            font-weight: 400;
            line-height: 1;
            letter-spacing: -0.02em;
          }
          .cp-vehicle.is-sel .cp-vehicle-price { color: var(--olive); }
          .cp-vehicle-vehicule {
            font-family: 'Sora', sans-serif;
            font-size: 9px;
            color: var(--texte-light);
            margin: 0 0 8px;
            letter-spacing: 0.04em;
            text-transform: uppercase;
          }
          .cp-vehicle-meta {
            display: flex; gap: 10px;
            margin-bottom: 6px;
          }
          .cp-vehicle-meta span {
            display: flex; align-items: center; gap: 3px;
            font-family: 'Sora', sans-serif;
            font-size: 10px;
            color: var(--texte-light);
            font-weight: 500;
          }
          .cp-vehicle-amenities {
            display: flex; gap: 6px;
            color: var(--lavande);
          }

          /* ─── Récap card (étape 3) ─── */
          .cp-recap {
            background: var(--cream);
            border: 1px solid var(--border);
            border-left: 3px solid var(--olive);
            padding: 14px 16px;
            display: flex; flex-direction: column; gap: 6px;
          }
          .cp-recap-line {
            display: flex; align-items: baseline; gap: 10px;
            font-family: 'Sora', sans-serif;
            font-size: 11px;
          }
          .cp-recap-label {
            color: var(--texte-light);
            text-transform: uppercase;
            letter-spacing: 0.12em;
            font-size: 9px;
            font-weight: 700;
            min-width: 64px;
          }
          .cp-recap-value {
            color: var(--texte);
            font-weight: 500;
            flex: 1;
          }
          .cp-recap-total {
            display: flex; align-items: baseline; justify-content: space-between;
            margin-top: 6px;
            padding-top: 10px;
            border-top: 1px dashed var(--border);
            font-family: 'Sora', sans-serif;
            font-size: 11px;
            color: var(--texte-light);
            text-transform: uppercase;
            letter-spacing: 0.1em;
            font-weight: 600;
          }
          .cp-recap-price {
            font-family: 'Instrument Serif', serif;
            font-size: 28px;
            color: var(--olive);
            font-weight: 400;
            letter-spacing: -0.02em;
          }

          .cp-fineprint {
            margin: 12px 0 0;
            font-family: 'Sora', sans-serif;
            font-size: 10px;
            color: var(--texte-light);
            text-align: center;
            display: flex; align-items: center; justify-content: center; gap: 6px;
            letter-spacing: 0.02em;
          }

          /* Responsive */
          @media (max-width: 600px) {
            .cp-step-label { font-size: 8px; }
            .cp-step { padding: 12px 16px 12px 12px; gap: 6px; }
            .cp-vehicles-grid { grid-template-columns: 1fr; }
            .cp-row-2 { grid-template-columns: 1fr; }
          }
        `}</style>
      </section>

      {/* CONTACT CHANNELS — strip compact */}
      <section className="channels-section" style={{
        position: 'relative',
        padding: 'clamp(56px,6vw,80px) clamp(24px,4vw,60px)',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="/images/flotte-hotel-luxe.jpg"
          alt=""
          aria-hidden="true"
          width={1200}
          height={800}
          loading="lazy"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(7,9,13,0.94) 0%, rgba(7,9,13,0.84) 60%, rgba(7,9,13,0.9) 100%)',
        }} />

        {/* Decorative accent lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(107,125,74,0.5), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(122,96,145,0.4), transparent)' }} />

        <div style={{ maxWidth: 1080, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header — compact */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(32px,4vw,44px)' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <span style={{ width: 24, height: 1, background: 'rgba(107,125,74,0.7)' }} />
              <span style={{
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'var(--olive)',
              }}>Nous joindre</span>
              <span style={{ width: 24, height: 1, background: 'rgba(107,125,74,0.7)' }} />
            </div>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(24px,2.8vw,34px)',
              fontWeight: 400, color: '#fff',
              margin: 0, letterSpacing: '-0.01em',
            }}>
              Trois façons, <em style={{ fontStyle: 'italic', color: 'var(--lavande)' }}>une même exigence.</em>
            </h2>
          </div>

          {/* Strip unifiée : 3 canaux en ligne avec séparateurs */}
          <div className="channels-strip" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            background: 'rgba(255,255,255,0.03)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(12px)',
            WebkitBackdropFilter: 'blur(12px)',
          }}>
            {[
              {
                icon: PhoneCall,
                titre: 'Téléphone',
                valeur: CONTACT.tel,
                href: CONTACT.telHref,
                accent: 'var(--olive)',
                accentRgb: '107,125,74',
              },
              {
                icon: ChatCircleText,
                titre: 'Formulaire',
                valeur: 'Demande en ligne',
                href: '#form',
                accent: 'var(--olive)',
                accentRgb: '107,125,74',
              },
              {
                icon: EnvelopeSimple,
                titre: 'Email',
                valeur: CONTACT.email,
                href: `mailto:${CONTACT.email}`,
                accent: 'var(--lavande)',
                accentRgb: '181,166,205',
              },
            ].map((ch, i) => {
              const Icon = ch.icon
              return (
                <a
                  key={i}
                  href={ch.href}
                  className="channel-cell"
                  data-cta
                  style={{
                    position: 'relative',
                    display: 'flex', alignItems: 'center', gap: 16,
                    padding: '22px 24px',
                    textDecoration: 'none',
                    borderLeft: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.08)',
                    transition: 'background 0.3s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(${ch.accentRgb},0.08)`
                    const arr = e.currentTarget.querySelector('.channel-arrow')
                    if (arr) arr.style.transform = 'translateX(4px)'
                    const bar = e.currentTarget.querySelector('.channel-bar')
                    if (bar) bar.style.transform = 'scaleX(1)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'transparent'
                    const arr = e.currentTarget.querySelector('.channel-arrow')
                    if (arr) arr.style.transform = ''
                    const bar = e.currentTarget.querySelector('.channel-bar')
                    if (bar) bar.style.transform = 'scaleX(0)'
                  }}
                >
                  {/* Barre olive qui scale au hover */}
                  <span
                    className="channel-bar"
                    aria-hidden
                    style={{
                      position: 'absolute', bottom: 0, left: 0, right: 0, height: 2,
                      background: ch.accent,
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.45s cubic-bezier(0.65,0,0.35,1)',
                    }}
                  />
                  {/* Icon circle */}
                  <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: `rgba(${ch.accentRgb},0.1)`,
                    border: `1px solid rgba(${ch.accentRgb},0.28)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <Icon size={18} weight="duotone" style={{ color: ch.accent }} />
                  </div>
                  {/* Label + value */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{
                      fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.22em', textTransform: 'uppercase',
                      color: 'rgba(255,255,255,0.38)', marginBottom: 4,
                    }}>{ch.titre}</div>
                    <div style={{
                      fontFamily: 'Sora', fontSize: 13, fontWeight: 500,
                      color: '#fff', lineHeight: 1.3,
                      whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
                    }}>{ch.valeur}</div>
                  </div>
                  {/* Arrow */}
                  <ArrowRight
                    className="channel-arrow"
                    size={14} weight="bold"
                    style={{
                      color: ch.accent, flexShrink: 0,
                      transition: 'transform 0.35s ease',
                    }}
                  />
                </a>
              )
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .channels-strip { grid-template-columns: 1fr !important; }
            .channels-strip .channel-cell {
              border-left: none !important;
              border-top: 1px solid rgba(255,255,255,0.08);
              padding: 18px 20px !important;
            }
            .channels-strip .channel-cell:first-child {
              border-top: none;
            }
          }
        `}</style>
      </section>

      {/* MAP + FAQ */}
      <section className="map-section" style={{ background: 'var(--cream)', padding: 'clamp(72px,9vw,112px) clamp(24px,4vw,60px)', position: 'relative', overflow: 'hidden' }}>
        {/* Halos décoratifs en arrière-plan */}
        <div aria-hidden style={{
          position: 'absolute', top: -160, right: -160, width: 500, height: 500,
          background: 'radial-gradient(circle, rgba(181,166,205,0.22) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
        }} />
        <div aria-hidden style={{
          position: 'absolute', bottom: -200, left: -160, width: 520, height: 520,
          background: 'radial-gradient(circle, rgba(107,125,74,0.12) 0%, transparent 60%)',
          pointerEvents: 'none', zIndex: 0,
        }} />

        <div className="map-grid" style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.15fr 1fr', gap: 64, alignItems: 'start', position: 'relative', zIndex: 1 }}>
          {/* LEFT — Map column */}
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
              <span style={{ width: 28, height: 1, background: 'var(--olive)', opacity: 0.55 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)' }}>Notre adresse</span>
            </div>
            <h3 className="map-heading" style={{ fontFamily: "'Instrument Serif', serif", fontSize: 40, fontWeight: 400, color: 'var(--texte)', margin: '0 0 10px', lineHeight: 1.1, letterSpacing: '-0.01em' }}>
              Aix-<em style={{ fontStyle: 'italic', color: 'var(--olive)' }}>en</em>-Provence
            </h3>
            <p style={{ fontFamily: 'Sora', fontSize: 13, color: 'var(--texte-light)', margin: '0 0 32px', lineHeight: 1.7, maxWidth: 440 }}>
              Notre point d'ancrage au cœur de la Provence — à quelques minutes
              du Cours Mirabeau et de la Gare TGV.
            </p>

            {/* Map framed card */}
            <div className="map-frame" style={{
              position: 'relative',
              background: '#fff',
              padding: 10,
              border: '1px solid var(--border)',
              boxShadow: '0 40px 80px -40px rgba(107,125,74,0.3)',
            }}>
              {/* Corner accents olive */}
              {[
                { top: -7, left: -7, borderTop: '2px solid var(--olive)', borderLeft: '2px solid var(--olive)' },
                { top: -7, right: -7, borderTop: '2px solid var(--olive)', borderRight: '2px solid var(--olive)' },
                { bottom: -7, left: -7, borderBottom: '2px solid var(--olive)', borderLeft: '2px solid var(--olive)' },
                { bottom: -7, right: -7, borderBottom: '2px solid var(--olive)', borderRight: '2px solid var(--olive)' },
              ].map((s, i) => (
                <span key={i} aria-hidden style={{ position: 'absolute', width: 18, height: 18, ...s }} />
              ))}

              <div style={{ overflow: 'hidden', position: 'relative' }}>
                <iframe
                  title="Localisation Taxis Provençale Aix"
                  src="https://maps.google.com/maps?q=82+avenue+Henri+Mauriat+13100+Aix-en-Provence+France&output=embed&z=15"
                  width="100%" height="380"
                  style={{ display: 'block', border: 'none', filter: 'saturate(0.88) contrast(1.03)' }}
                  loading="lazy" referrerPolicy="no-referrer-when-downgrade" />

                {/* Floating address pill */}
                <div className="map-pill" style={{
                  position: 'absolute', left: 16, bottom: 16, right: 16, maxWidth: 340,
                  background: 'rgba(246,243,238,0.96)', backdropFilter: 'blur(10px)',
                  WebkitBackdropFilter: 'blur(10px)',
                  padding: '14px 16px',
                  border: '1px solid rgba(107,125,74,0.22)',
                  display: 'flex', alignItems: 'flex-start', gap: 12,
                  boxShadow: '0 16px 40px -16px rgba(0,0,0,0.25)',
                }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: '50%',
                    background: 'var(--olive)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0, boxShadow: '0 4px 10px rgba(107,125,74,0.4)',
                  }}>
                    <MapPin size={16} weight="fill" style={{ color: '#F6F3EE' }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--olive)', marginBottom: 4 }}>
                      Taxis Provençale Aix
                    </div>
                    <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)', lineHeight: 1.5 }}>
                      {CONTACT.adresse}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Itinéraire CTA */}
            <a
              href="https://www.google.com/maps/dir//82+avenue+Henri+Mauriat+13100+Aix-en-Provence"
              target="_blank" rel="noopener noreferrer"
              data-cta
              style={{
                marginTop: 28, display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--olive)', color: '#F6F3EE',
                padding: '16px 26px', fontFamily: 'Sora', fontSize: 11,
                fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'gap 0.3s ease, background 0.3s ease, transform 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.gap = '14px'
                e.currentTarget.style.background = 'var(--texte)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.gap = '10px'
                e.currentTarget.style.background = 'var(--olive)'
                e.currentTarget.style.transform = ''
              }}
            >
              <NavigationArrow size={14} weight="fill" />
              Obtenir l'itinéraire
            </a>
          </div>

          {/* RIGHT — Dispo + FAQ */}
          <div>
            {/* Disponibilité card */}
            <div className="dispo-card" style={{
              background: 'var(--olive)',
              padding: '36px 32px',
              position: 'relative',
              overflow: 'hidden',
              marginBottom: 40,
              boxShadow: '0 30px 60px -30px rgba(107,125,74,0.5)',
            }}>
              {/* Watermark 24 */}
              <div aria-hidden style={{
                position: 'absolute', top: -30, right: -14,
                fontFamily: "'Instrument Serif', serif", fontSize: 220,
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.06)', lineHeight: 1, pointerEvents: 'none',
                userSelect: 'none',
              }}>24</div>

              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18, position: 'relative' }}>
                <span style={{ width: 24, height: 1, background: 'rgba(255,255,255,0.4)' }} />
                <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.75)' }}>
                  Disponibilité
                </span>
              </div>
              <h4 style={{
                fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400,
                color: '#F6F3EE', margin: '0 0 28px', lineHeight: 1.2, position: 'relative',
              }}>
                Toujours disponibles, <em style={{ fontStyle: 'italic', color: 'var(--lavande)' }}>pour vous.</em>
              </h4>

              <div style={{ display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {[
                  { icon: Clock, label: 'Lundi — Dimanche', value: '24h / 24' },
                  { icon: NavigationArrow, label: 'Aéroport & Gare', value: 'Tous les vols / TGV' },
                  { icon: SealCheck, label: 'Confirmations', value: '< 15 minutes' },
                ].map(({ icon: Icon, label, value }, i) => (
                  <div key={i} style={{
                    display: 'flex', alignItems: 'center', gap: 14,
                    padding: '16px 0',
                    borderTop: i === 0 ? 'none' : '1px solid rgba(255,255,255,0.14)',
                  }}>
                    <div style={{
                      width: 38, height: 38, borderRadius: '50%',
                      background: 'rgba(255,255,255,0.08)',
                      border: '1px solid rgba(255,255,255,0.22)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      flexShrink: 0,
                    }}>
                      <Icon size={15} weight="duotone" style={{ color: 'var(--lavande)' }} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontFamily: 'Sora', fontSize: 10, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)', marginBottom: 3 }}>
                        {label}
                      </div>
                      <div style={{ fontFamily: 'Sora', fontSize: 13, fontWeight: 600, color: '#F6F3EE' }}>
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ header */}
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, marginBottom: 18 }}>
              <span style={{ width: 24, height: 1, background: 'var(--olive)', opacity: 0.55 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 10, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)' }}>
                Questions fréquentes
              </span>
            </div>

            {/* FAQ cards */}
            {[
              { q: 'Le tarif est-il définitif ?', a: 'Oui. Le prix communiqué lors de votre réservation est ferme et définitif — pas de supplément.' },
              { q: 'Comment payer ?', a: 'Paiement à bord : espèces, carte bancaire (Visa, Mastercard, Amex).' },
              { q: 'Délai de réservation ?', a: "De quelques heures à plusieurs semaines à l'avance. Réponse garantie sous 15 min." },
            ].map((faq, i) => (
              <div
                key={i}
                className="faq-card"
                style={{
                  background: '#fff',
                  border: '1px solid var(--border)',
                  borderLeft: '2px solid var(--lavande)',
                  padding: '16px 20px',
                  marginBottom: 10,
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease, border-left-color 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateX(4px)'
                  e.currentTarget.style.boxShadow = '0 14px 36px -20px rgba(107,125,74,0.35)'
                  e.currentTarget.style.borderLeftColor = 'var(--olive)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = ''
                  e.currentTarget.style.boxShadow = ''
                  e.currentTarget.style.borderLeftColor = 'var(--lavande)'
                }}
              >
                <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: 'var(--texte)', marginBottom: 6 }}>{faq.q}</div>
                <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', lineHeight: 1.65 }}>{faq.a}</div>
              </div>
            ))}

            <div style={{ marginTop: 28 }}>
              <Link to="/flotte" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                color: 'var(--olive)', textDecoration: 'none',
                borderBottom: '1px solid var(--olive)',
                paddingBottom: 2, transition: 'gap 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '8px')}>
                Découvrir la flotte <ArrowRight size={12} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .map-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
          }
          @media (max-width: 768px) {
            .map-heading { font-size: 32px !important; }
            .dispo-card { padding: 28px 22px !important; }
            .map-pill { left: 10px !important; right: 10px !important; bottom: 10px !important; padding: 12px 14px !important; }
          }
        `}</style>
      </section>
    </>
  )
}
