import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhoneCall, EnvelopeSimple, ArrowRight,
  NavigationArrow, CheckCircle, WhatsappLogo,
  CalendarBlank, Clock, SealCheck, MapPin,
  WifiHigh, Drop, Baby, Snowflake, Lightning, Users, Briefcase,
} from '@phosphor-icons/react'
import { CONTACT } from '../data/content'
import { supabase } from '../lib/supabase'
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
    setLoading(true)
    try {
      await supabase.from('reservations').insert([{
        nom_client: `${form.prenom} ${form.nom}`.trim(),
        tel_client: form.tel,
        depart: form.depart,
        destination: form.destination?.label || '',
        date_heure: form.date && form.heure ? `${form.date}T${form.heure}` : null,
        marque: form.vehicule,
        passagers: form.passagers,
        aller_retour: form.tripType === 1,
        prix_estime: prix?.montant || null,
        message: form.message || null,
        source: 'site-contact', statut: 'nouvelle',
      }])
      setSuccess(true)
    } catch (err) { console.error(err) }
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
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.7)',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '12px 20px', textDecoration: 'none', transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}>
                <WhatsappLogo size={13} weight="duotone" />WhatsApp
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
                <form onSubmit={handleSubmit}>

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

      {/* CONTACT CHANNELS */}
      <section className="channels-section" style={{
        position: 'relative',
        padding: 'clamp(72px,9vw,100px) clamp(24px,4vw,60px)',
        overflow: 'hidden',
      }}>
        {/* Background image */}
        <img
          src="/images/flotte-hotel-luxe.jpg"
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
          }}
        />
        {/* Dark overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(135deg, rgba(7,9,13,0.93) 0%, rgba(7,9,13,0.82) 60%, rgba(7,9,13,0.88) 100%)',
        }} />

        {/* Decorative accent lines */}
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(107,125,74,0.5), transparent)' }} />
        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 1, background: 'linear-gradient(90deg, transparent, rgba(122,96,145,0.4), transparent)' }} />

        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 'clamp(40px,6vw,64px)' }}>
            <span style={{
              fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.35em', textTransform: 'uppercase',
              color: 'var(--olive)', display: 'block', marginBottom: 14,
            }}>Nous contacter</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(26px,3.2vw,40px)',
              fontWeight: 400, color: '#fff',
              margin: 0, letterSpacing: '-0.01em',
            }}>
              Choisissez votre canal
            </h2>
            <div style={{ width: 40, height: 1, background: 'linear-gradient(90deg, transparent, var(--lavande), transparent)', margin: '20px auto 0' }} />
          </div>

          <div className="channels-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
            {[
              {
                icon: PhoneCall,
                accentColor: 'var(--olive)',
                accentRgb: '107,125,74',
                titre: 'Téléphone',
                valeur: CONTACT.tel,
                detail: 'Disponible 24h/24 · 7j/7',
                sub: 'Réponse immédiate',
                href: CONTACT.telHref,
                cta: 'Appeler maintenant',
                badge: '24/7',
              },
              {
                icon: WhatsappLogo,
                accentColor: '#22c55e',
                accentRgb: '34,197,94',
                titre: 'WhatsApp',
                valeur: CONTACT.tel,
                detail: 'Message lu sous 5 min',
                sub: 'Réponse rapide garantie',
                href: CONTACT.whatsappHref,
                cta: 'Envoyer un message',
                badge: '< 5 min',
                target: '_blank',
              },
              {
                icon: EnvelopeSimple,
                accentColor: 'var(--lavande)',
                accentRgb: '122,96,145',
                titre: 'Email',
                valeur: CONTACT.email,
                detail: 'Réponse en moins de 2h',
                sub: 'Pour les demandes détaillées',
                href: `mailto:${CONTACT.email}`,
                cta: 'Écrire un email',
                badge: '< 2h',
              },
            ].map((ch, i) => {
              const Icon = ch.icon
              return (
                <div
                  key={i}
                  className="channel-card"
                  style={{
                    position: 'relative',
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    backdropFilter: 'blur(12px)',
                    display: 'flex', flexDirection: 'column',
                    overflow: 'hidden',
                    transition: 'background 0.3s, border-color 0.3s, transform 0.3s',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = `rgba(${ch.accentRgb},0.08)`
                    e.currentTarget.style.borderColor = `rgba(${ch.accentRgb},0.35)`
                    e.currentTarget.style.transform = 'translateY(-4px)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }}
                >
                  {/* Top accent bar */}
                  <div style={{
                    position: 'absolute', top: 0, left: 0, right: 0, height: 2,
                    background: `linear-gradient(90deg, transparent, ${ch.accentColor}, transparent)`,
                    opacity: 0.8,
                  }} />

                  <div style={{ padding: 'clamp(28px,3vw,40px)' }}>
                    {/* Icon + badge row */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 28 }}>
                      <div style={{
                        width: 56, height: 56,
                        background: `rgba(${ch.accentRgb},0.12)`,
                        border: `1px solid rgba(${ch.accentRgb},0.25)`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                      }}>
                        <Icon size={26} weight="duotone" style={{ color: ch.accentColor }} />
                      </div>
                      <span style={{
                        fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                        letterSpacing: '0.12em', textTransform: 'uppercase',
                        color: ch.accentColor,
                        border: `1px solid rgba(${ch.accentRgb},0.35)`,
                        padding: '4px 8px',
                        background: `rgba(${ch.accentRgb},0.08)`,
                      }}>{ch.badge}</span>
                    </div>

                    {/* Label */}
                    <div style={{
                      fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.28em',
                      color: 'rgba(255,255,255,0.35)', marginBottom: 10,
                    }}>{ch.titre}</div>

                    {/* Value */}
                    <div style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 'clamp(16px,1.6vw,22px)',
                      color: '#fff', lineHeight: 1.2, marginBottom: 14,
                      wordBreak: 'break-all',
                    }}>{ch.valeur}</div>

                    {/* Detail */}
                    <div style={{
                      fontFamily: 'Sora', fontSize: 12,
                      color: 'rgba(255,255,255,0.55)', marginBottom: 4, lineHeight: 1.5,
                    }}>{ch.detail}</div>
                    <div style={{
                      fontFamily: 'Sora', fontSize: 11,
                      color: 'rgba(255,255,255,0.28)',
                      marginBottom: 32,
                    }}>{ch.sub}</div>

                    {/* CTA */}
                    <a
                      href={ch.href}
                      target={ch.target}
                      rel={ch.target ? 'noreferrer' : undefined}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 10,
                        fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                        textTransform: 'uppercase', letterSpacing: '0.15em',
                        color: '#fff', textDecoration: 'none',
                        background: `rgba(${ch.accentRgb},0.15)`,
                        border: `1px solid rgba(${ch.accentRgb},0.4)`,
                        padding: '12px 20px',
                        transition: 'background 0.25s, gap 0.25s',
                        width: '100%', justifyContent: 'center',
                        boxSizing: 'border-box',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = `rgba(${ch.accentRgb},0.3)`
                        e.currentTarget.style.gap = '14px'
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.background = `rgba(${ch.accentRgb},0.15)`
                        e.currentTarget.style.gap = '10px'
                      }}
                    >
                      {ch.cta} <ArrowRight size={12} weight="bold" />
                    </a>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <style>{`
          @media (max-width: 768px) {
            .channels-grid { grid-template-columns: 1fr !important; gap: 14px !important; }
          }
        `}</style>
      </section>

      {/* MAP + FAQ */}
      <section className="map-section" style={{ background: 'var(--cream)', padding: 'clamp(64px,8vw,88px) clamp(24px,4vw,60px)' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 56, alignItems: 'start' }} className="map-grid">
          <div>
            <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: 16 }}>Notre adresse</div>
            <h3 style={{ fontFamily: "'Instrument Serif', serif", fontSize: 28, fontWeight: 400, color: 'var(--texte)', margin: '0 0 24px' }}>Aix-en-Provence</h3>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
              <iframe
                title="Localisation Taxis Provençale Aix"
                src="https://maps.google.com/maps?q=82+avenue+Henri+Mauriat+13100+Aix-en-Provence+France&output=embed&z=15"
                width="100%" height="320"
                style={{ display: 'block', border: 'none' }}
                loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <MapPin size={15} weight="duotone" style={{ color: 'var(--lavande)', marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 13, color: 'var(--texte-light)', lineHeight: 1.6 }}>
                {CONTACT.adresse}
              </span>
            </div>
          </div>

          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: 16 }}>Disponibilité</div>
              {[
                { label: 'Lundi — Dimanche', value: '24h / 24' },
                { label: 'Aéroport & Gare', value: 'Tous les vols / TGV' },
                { label: 'Confirmations', value: '< 15 minutes' },
              ].map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid var(--border)' }}>
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)', fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{ fontFamily: 'Sora', fontSize: 9, fontWeight: 700, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--olive)', marginBottom: 16 }}>Questions fréquentes</div>
              {[
                { q: 'Le tarif est-il définitif ?', a: 'Oui. Le prix communiqué lors de votre réservation est ferme et définitif — pas de supplément.' },
                { q: 'Comment payer ?', a: 'Paiement à bord : espèces, carte bancaire (Visa, Mastercard, Amex).' },
                { q: 'Délai de réservation ?', a: "De quelques heures à plusieurs semaines à l'avance. Réponse garantie sous 15 min." },
              ].map((faq, i) => (
                <div key={i} style={{ marginBottom: 18, paddingBottom: 18, borderBottom: i < 2 ? '1px solid var(--border)' : 'none' }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: 'var(--texte)', marginBottom: 6 }}>{faq.q}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', lineHeight: 1.65 }}>{faq.a}</div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 32, paddingTop: 24, borderTop: '1px solid var(--border)' }}>
              <Link to="/flotte" style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                textTransform: 'uppercase', letterSpacing: '0.15em',
                color: 'var(--lavande)', textDecoration: 'none',
                borderBottom: '1px solid var(--lavande)',
                paddingBottom: 2, transition: 'gap 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
                onMouseLeave={e => (e.currentTarget.style.gap = '8px')}>
                Découvrir la flotte <ArrowRight size={12} weight="bold" />
              </Link>
            </div>
          </div>
        </div>
        <style>{`@media (max-width: 768px) { .map-grid { grid-template-columns: 1fr !important; } }`}</style>
      </section>
    </>
  )
}
