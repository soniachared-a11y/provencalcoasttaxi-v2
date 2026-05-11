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
import { CONTACT } from '../data/content'
import { sendReservation } from '../lib/sendReservation'
import AddressAutocomplete from '../components/ui/AddressAutocomplete'
import SEOHead from '../seo/SEOHead'

gsap.registerPlugin(ScrollTrigger)

const TARIF_JOUR = 2.22
const TARIF_NUIT = 2.88
const PRISE_EN_CHARGE = 4.00
const MINIMUM = 12

const TRIP_TYPES = ['Aller simple', 'Aller-retour', 'À l\'heure']

const VEHICLES = [
  {
    id: 'Classe E',
    tag: 'Business',
    pax: 4,
    bagages: 3,
    img: '/images/classe-e-provence.jpg',
    imgStyle: { objectFit: 'cover', objectPosition: 'center 60%' },
    amenities: [
      { icon: WifiHigh, label: 'Wi-Fi' },
      { icon: Drop, label: 'Eau' },
      { icon: Snowflake, label: 'Clim' },
    ],
  },
  {
    id: 'Classe S',
    tag: 'Prestige',
    pax: 4,
    bagages: 4,
    img: '/images/classe-s-detour.png',
    imgStyle: { objectFit: 'contain', objectPosition: 'center bottom' },
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
    id: 'Classe V',
    tag: 'Grand format',
    pax: 7,
    bagages: 7,
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
    vehicule: 'Classe S',
    passagers: 1,
    message: '',
    tripType: 0, // 0=aller simple, 1=aller-retour, 2=à l'heure
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [errors, setErrors] = useState({})
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  const prix = (() => {
    if (!form.destination?.km) return null
    const h = form.heure ? parseInt(form.heure.split(':')[0], 10) : 12
    const tarif = h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
    const base = Math.max(MINIMUM, +(PRISE_EN_CHARGE + form.destination.km * tarif).toFixed(2))
    const total = form.tripType === 1 ? +(base * 1.95).toFixed(2) : base
    return { montant: total, isNuit: tarif === TARIF_NUIT, km: form.destination.km }
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
      gsap.from('.cp-vehicle-card', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.08, ease: 'power2.out',
        scrollTrigger: { trigger: '.cp-vehicles', start: 'top 90%', once: true },
      })
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

    // Construction message complet (préserve le détail métier)
    const messageMeta = [
      `Trajet: ${TRIP_TYPES[form.tripType]}`,
      form.vehicule && `Véhicule: ${form.vehicule}`,
      form.passagers && `Passagers: ${form.passagers}`,
      prix ? `Prix estimé: ${prix.montant} € ${prix.isNuit ? '(tarif nuit)' : ''}` : null,
    ].filter(Boolean).join(' | ')
    const messageComplet = [form.message, messageMeta].filter(Boolean).join(' — ')

    const dateIso = form.date && form.heure ? `${form.date}T${form.heure}` : ''
    const dateLisible = form.date && form.heure
      ? `${form.date} à ${form.heure}`
      : (form.date || '—')

    // Triple sécu : Supabase + EmailJS + WhatsApp en parallèle
    const result = await sendReservation({
      nom: `${form.prenom} ${form.nom}`.trim(),
      telephone: form.tel,
      email: form.email || '',
      depart: form.depart,
      arrivee: form.destination?.label || '',
      dateHeure: dateIso,
      dateHeureLisible: dateLisible,
      prix: prix?.montant,
      distanceKm: form.destination?.km,
      message: messageComplet,
      marque: 'provencal',
      driverEmail: 'provencalcoastdriver@gmail.com',
      source: 'site-contact-page',
    })

    setLoading(false)

    if (result.ok) {
      setSuccess(true)
    } else {
      setErrors({ submit: 'Connexion impossible. Merci de nous appeler au 06 15 96 32 75.' })
    }
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

                  {/* Header */}
                  <div style={{
                    padding: '20px 28px 16px',
                    borderBottom: '1px solid var(--border)',
                    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  }}>
                    <div>
                      <span style={{ fontFamily: 'Sora', fontSize: 8, fontWeight: 700, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'var(--olive)', display: 'block', marginBottom: 3 }}>Réservation</span>
                      <h2 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 19, fontWeight: 400, color: 'var(--texte)', margin: 0 }}>
                        Votre trajet sur mesure
                      </h2>
                    </div>
                    {/* Accent line */}
                    <div style={{ width: 28, height: 2, background: 'linear-gradient(90deg, var(--olive), var(--lavande))' }} />
                  </div>

                  {/* Trip type tabs */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderBottom: '1px solid var(--border)' }}>
                    {TRIP_TYPES.map((t, i) => (
                      <button
                        key={t} type="button"
                        onClick={() => set('tripType')(i)}
                        style={{
                          padding: '10px 4px',
                          background: form.tripType === i ? 'var(--texte)' : 'transparent',
                          border: 'none',
                          borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                          cursor: 'pointer',
                          fontFamily: 'Sora', fontSize: 10, fontWeight: form.tripType === i ? 700 : 400,
                          color: form.tripType === i ? '#fff' : 'var(--texte-light)',
                          letterSpacing: '0.05em',
                          transition: 'all 0.2s',
                        }}
                      >{t}</button>
                    ))}
                  </div>

                  <div style={{ padding: '16px 28px 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>

                    {/* Départ + Destination */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div>
                        <Lbl>Départ</Lbl>
                        <div style={{ position: 'relative' }}>
                          <NavigationArrow size={12} weight="duotone" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--olive)', pointerEvents: 'none', zIndex: 1 }} />
                          <input type="text" value={form.depart} onChange={e => set('depart')(e.target.value)}
                            style={{ ...fs, paddingLeft: 28 }} onFocus={focus} onBlur={blur} />
                        </div>
                      </div>
                      <div>
                        <Lbl>{form.tripType === 2 ? 'Durée souhaitée' : 'Destination *'}</Lbl>
                        {form.tripType === 2 ? (
                          <input type="text" placeholder="2h, 4h, journée…" value={form.destination?.label || ''} onChange={e => set('destination')({ label: e.target.value })}
                            style={fs} onFocus={focus} onBlur={blur} />
                        ) : (
                          <AddressAutocomplete value={form.destination} onChange={set('destination')}
                            placeholder="Aéroport, ville…" dark={false}
                            inputStyle={{ background: '#F6F3EE', border: '1px solid transparent', borderRadius: 0, height: 36, fontSize: 12 }} />
                        )}
                      </div>
                    </div>

                    {/* Date + Heure */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                      <div>
                        <Lbl>Date *</Lbl>
                        <div style={{ position: 'relative' }}>
                          <CalendarBlank size={12} weight="duotone" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--texte-light)', pointerEvents: 'none', zIndex: 1 }} />
                          <input type="date" value={form.date} onChange={e => set('date')(e.target.value)} required
                            style={{ ...fs, paddingLeft: 28 }} onFocus={focus} onBlur={blur} />
                        </div>
                      </div>
                      <div>
                        <Lbl>Heure *</Lbl>
                        <div style={{ position: 'relative' }}>
                          <Clock size={12} weight="duotone" style={{ position: 'absolute', left: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--texte-light)', pointerEvents: 'none', zIndex: 1 }} />
                          <input type="time" value={form.heure} onChange={e => set('heure')(e.target.value)} required
                            style={{ ...fs, paddingLeft: 28 }} onFocus={focus} onBlur={blur} />
                        </div>
                      </div>
                    </div>

                    {/* Véhicule */}
                    <div className="cp-vehicles">
                      <Lbl>Votre véhicule</Lbl>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 8 }}>
                        {VEHICLES.map(v => {
                          const sel = form.vehicule === v.id
                          return (
                            <button
                              key={v.id} type="button"
                              className="cp-vehicle-card"
                              onClick={() => set('vehicule')(v.id)}
                              style={{
                                position: 'relative', padding: 0, cursor: 'pointer',
                                background: '#fff', border: 'none',
                                outline: sel ? '2px solid var(--olive)' : '1px solid var(--border)',
                                outlineOffset: sel ? 2 : 0,
                                transition: 'outline 0.2s, box-shadow 0.2s',
                                boxShadow: sel ? '0 4px 16px rgba(107,125,74,0.18)' : 'none',
                              }}
                            >
                              {/* Recommended badge */}
                              {v.recommended && (
                                <div style={{
                                  position: 'absolute', top: 5, left: 5, zIndex: 2,
                                  background: 'var(--lavande)', color: '#fff',
                                  fontFamily: 'Sora', fontSize: 6.5, fontWeight: 700,
                                  letterSpacing: '0.1em', textTransform: 'uppercase',
                                  padding: '2px 5px',
                                }}>Prestige</div>
                              )}
                              {/* Car image */}
                              <div style={{ height: 72, background: '#F6F3EE', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <img src={v.img} alt={v.id}
                                  width={1200} height={800} loading="lazy"
                                  style={{
                                    width: '100%', height: '100%',
                                    transition: 'transform 0.4s ease',
                                    transform: sel ? 'scale(1.05)' : 'scale(1)',
                                    ...v.imgStyle,
                                  }} />
                              </div>
                              {/* Selected tint */}
                              {sel && <div style={{ position: 'absolute', inset: 0, background: 'rgba(107,125,74,0.06)', pointerEvents: 'none' }} />}
                              {/* Info */}
                              <div style={{ padding: '6px 7px 7px', background: sel ? 'var(--olive)' : '#fff', transition: 'background 0.2s' }}>
                                <p style={{ fontFamily: 'Sora', fontSize: 9.5, fontWeight: 700, color: sel ? '#fff' : 'var(--texte)', margin: '0 0 3px' }}>{v.id}</p>
                                {/* Pax + baggage */}
                                <div style={{ display: 'flex', gap: 7, marginBottom: 5 }}>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'Sora', fontSize: 8, color: sel ? 'rgba(255,255,255,0.7)' : 'var(--texte-light)' }}>
                                    <Users size={8} />{v.pax}
                                  </span>
                                  <span style={{ display: 'flex', alignItems: 'center', gap: 2, fontFamily: 'Sora', fontSize: 8, color: sel ? 'rgba(255,255,255,0.7)' : 'var(--texte-light)' }}>
                                    <Briefcase size={8} />{v.bagages}
                                  </span>
                                </div>
                                {/* Amenity icons */}
                                <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap' }}>
                                  {v.amenities.map((a, ai) => (
                                    <span key={ai} title={a.label}>
                                      <a.icon size={10} weight="duotone" style={{ color: sel ? 'rgba(255,255,255,0.65)' : 'var(--lavande)', display: 'block' }} />
                                    </span>
                                  ))}
                                </div>
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Prénom / Nom / Téléphone */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10 }}>
                      <div>
                        <Lbl>Prénom *</Lbl>
                        <input type="text" placeholder="Jean" value={form.prenom} onChange={e => set('prenom')(e.target.value)} required style={fs} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <Lbl>Nom *</Lbl>
                        <input type="text" placeholder="Dupont" value={form.nom} onChange={e => set('nom')(e.target.value)} required style={fs} onFocus={focus} onBlur={blur} />
                      </div>
                      <div>
                        <Lbl>Téléphone *</Lbl>
                        <input type="tel" placeholder="06 00 00 00" value={form.tel} onChange={e => set('tel')(e.target.value)} required style={fs} onFocus={focus} onBlur={blur} />
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <Lbl>Message (optionnel)</Lbl>
                      <textarea value={form.message} onChange={e => set('message')(e.target.value)}
                        placeholder="Numéro de vol, adresse précise, demande particulière…"
                        rows={2}
                        style={{
                          width: '100%', background: '#F6F3EE', border: '1px solid transparent',
                          padding: '8px 10px', fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)',
                          outline: 'none', resize: 'none', lineHeight: 1.6, transition: 'border-color 0.2s',
                          boxSizing: 'border-box',
                        }}
                        onFocus={focus} onBlur={blur} />
                    </div>

                    {/* Submit row — price + button */}
                    <div style={{ display: 'flex', gap: 0, alignItems: 'stretch', marginTop: 4 }}>
                      {prix && (
                        <div style={{
                          background: 'var(--texte)', padding: '0 16px',
                          display: 'flex', flexDirection: 'column', justifyContent: 'center',
                          flexShrink: 0,
                        }}>
                          <span style={{ fontFamily: 'Sora', fontSize: 7, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 2 }}>
                            {prix.isNuit ? 'Nuit' : 'Jour'} · {prix.km} km
                          </span>
                          <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 20, color: '#fff', lineHeight: 1 }}>
                            ~{prix.montant}€
                          </span>
                        </div>
                      )}
                      <button type="submit" disabled={loading} style={{
                        flex: 1, height: 46,
                        background: loading ? 'rgba(107,125,74,0.5)' : 'var(--olive)',
                        color: '#fff', border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                        transition: 'background 0.3s',
                      }}
                        onMouseEnter={e => { if (!loading) e.currentTarget.style.background = '#5A6B3A' }}
                        onMouseLeave={e => { e.currentTarget.style.background = 'var(--olive)' }}>
                        {loading ? 'Envoi…' : <><span>Envoyer ma demande</span><ArrowRight size={12} weight="bold" /></>}
                      </button>
                    </div>

                  </div>
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
