import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  PhoneCall, EnvelopeSimple, MapPin, ArrowRight,
  NavigationArrow, CheckCircle, WhatsappLogo,
  CalendarBlank, Clock, SealCheck,
} from '@phosphor-icons/react'
import { CONTACT } from '../data/content'
import { supabase } from '../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const TARIF_JOUR = 2.22
const TARIF_NUIT = 2.88
const PRISE_EN_CHARGE = 4.00
const MINIMUM = 12

const DESTINATIONS = [
  { label: 'Aéroport Marseille-Provence (MRS)', km: 42 },
  { label: 'Gare TGV Aix-en-Provence', km: 12 },
  { label: 'Marseille Centre', km: 35 },
  { label: "Aéroport Nice Côte d'Azur (NCE)", km: 180 },
  { label: 'Cassis / Calanques', km: 50 },
  { label: 'Gordes / Luberon', km: 65 },
  { label: 'Avignon Centre', km: 85 },
  { label: 'Monaco', km: 210 },
  { label: 'Cannes', km: 155 },
  { label: 'Arles', km: 80 },
  { label: 'Saint-Rémy-de-Provence', km: 30 },
  { label: 'Les Baux-de-Provence', km: 35 },
  { label: 'Salon-de-Provence', km: 35 },
  { label: 'Aubagne', km: 55 },
  { label: 'La Ciotat', km: 65 },
  { label: 'Manosque', km: 60 },
  { label: 'Pertuis', km: 25 },
  { label: 'Autre destination (préciser dans le message)', km: null },
]

const VEHICLES = [
  { id: 'Classe E', pax: '3 pax', color: 'var(--bleu)' },
  { id: 'Classe S', pax: '3 pax', color: 'var(--lavande)', recommended: true },
  { id: 'Classe V', pax: '7 pax', color: 'var(--olive)' },
]

// ── Autocomplete destination
function DestInput({ value, onChange }) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState(value?.label || '')
  const wrapRef = useRef(null)

  const filtered = query
    ? DESTINATIONS.filter(d => d.label.toLowerCase().includes(query.toLowerCase()))
    : DESTINATIONS

  useEffect(() => { setQuery(value?.label || '') }, [value])

  useEffect(() => {
    const h = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', h)
    return () => document.removeEventListener('mousedown', h)
  }, [])

  return (
    <div ref={wrapRef} style={{ position: 'relative' }}>
      <MapPin size={14} weight="duotone" style={{
        position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
        color: 'var(--lavande)', pointerEvents: 'none', zIndex: 1,
      }} />
      <input
        type="text"
        autoComplete="off"
        placeholder="Aéroport, gare, ville…"
        value={query}
        onChange={e => { setQuery(e.target.value); setOpen(true); if (!e.target.value) onChange(null) }}
        onFocus={e => { setOpen(true); e.target.style.borderColor = 'var(--lavande)' }}
        onBlur={e => { e.target.style.borderColor = 'transparent' }}
        style={fieldStyle(36)}
      />
      {open && filtered.length > 0 && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 2px)',
          left: 0, right: 0, zIndex: 200,
          background: '#fff', boxShadow: '0 12px 48px rgba(0,0,0,0.15)',
          border: '1px solid var(--border)', maxHeight: 220, overflowY: 'auto',
        }}>
          {filtered.map((d, i) => (
            <button
              key={i}
              type="button"
              onMouseDown={() => { onChange(d); setQuery(d.label); setOpen(false) }}
              style={{
                width: '100%', padding: '10px 16px', cursor: 'pointer',
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                background: 'transparent', border: 'none',
                borderBottom: i < filtered.length - 1 ? '1px solid var(--border)' : 'none',
                fontFamily: 'Sora', fontSize: 13, color: 'var(--texte)',
                textAlign: 'left',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = '#F6F3EE')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              <span>{d.label}</span>
              {d.km && (
                <span style={{ fontSize: 11, color: 'var(--olive)', fontWeight: 600, flexShrink: 0, marginLeft: 8 }}>
                  {d.km} km
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

// ── Counter +/−
function Counter({ value, onChange, min = 0, max = 7 }) {
  const btn = {
    width: 36, height: 36, border: 'none',
    background: '#F6F3EE', cursor: 'pointer',
    fontFamily: 'Sora', fontSize: 18, color: 'var(--texte)',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    transition: 'background 0.15s, color 0.15s', flexShrink: 0,
  }
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid var(--border)' }}>
      <button type="button" style={btn}
        onClick={() => onChange(Math.max(min, value - 1))}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--texte)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#F6F3EE'; e.currentTarget.style.color = 'var(--texte)' }}
      >−</button>
      <span style={{
        width: 44, textAlign: 'center',
        fontFamily: "'Instrument Serif', serif", fontSize: 20, color: 'var(--texte)',
        borderLeft: '1px solid var(--border)', borderRight: '1px solid var(--border)',
      }}>{value}</span>
      <button type="button" style={btn}
        onClick={() => onChange(Math.min(max, value + 1))}
        onMouseEnter={e => { e.currentTarget.style.background = 'var(--texte)'; e.currentTarget.style.color = '#fff' }}
        onMouseLeave={e => { e.currentTarget.style.background = '#F6F3EE'; e.currentTarget.style.color = 'var(--texte)' }}
      >+</button>
    </div>
  )
}

// Shared styles
function fieldStyle(h = 44, pl = 12) {
  return {
    width: '100%', height: h,
    background: '#F6F3EE',
    border: '1px solid transparent',
    paddingLeft: pl, paddingRight: 12,
    fontFamily: 'Sora', fontSize: 13, color: 'var(--texte)',
    outline: 'none', transition: 'border-color 0.2s',
    boxSizing: 'border-box',
  }
}

const Lbl = ({ children }) => (
  <span style={{
    display: 'block', marginBottom: 7,
    fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
    textTransform: 'uppercase', letterSpacing: '0.2em',
    color: 'var(--texte-light)',
  }}>
    {children}
  </span>
)

function TextInput({ value, onChange, placeholder, type = 'text', required, iconLeft }) {
  return (
    <div style={{ position: 'relative' }}>
      {iconLeft && (
        <span style={{ position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', zIndex: 1 }}>
          {iconLeft}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={e => onChange(e.target.value)}
        required={required}
        style={fieldStyle(44, iconLeft ? 36 : 12)}
        onFocus={e => (e.target.style.borderColor = 'var(--olive)')}
        onBlur={e => (e.target.style.borderColor = 'transparent')}
      />
    </div>
  )
}

// ── Main component
export default function ContactPage() {
  const heroRef = useRef(null)
  const heroBgRef = useRef(null)
  const formCardRef = useRef(null)

  const [form, setForm] = useState({
    prenom: '', nom: '', tel: '', email: '',
    depart: 'Aix-en-Provence',
    destination: null,
    date: '', heure: '',
    vehicule: 'Classe S',
    passagers: 1, bagages: 0,
    retour: false,
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }))

  // Computed price
  const prix = (() => {
    if (!form.destination?.km || !form.heure) return null
    const h = parseInt(form.heure.split(':')[0], 10)
    const tarif = h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
    const base = Math.max(MINIMUM, +(PRISE_EN_CHARGE + form.destination.km * tarif).toFixed(2))
    const total = form.retour ? +(base * 1.95).toFixed(2) : base
    return { montant: total, isNuit: tarif === TARIF_NUIT, km: form.destination.km }
  })()

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (heroBgRef.current) {
        gsap.to(heroBgRef.current, {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: heroRef.current,
            start: 'top top', end: 'bottom top', scrub: true,
          },
        })
      }

      gsap.from('.hero-contact-text > *', {
        y: 40, opacity: 0, duration: 0.9,
        stagger: 0.1, ease: 'power3.out', delay: 0.2,
      })

      if (formCardRef.current) {
        gsap.from(formCardRef.current, {
          x: 50, opacity: 0, duration: 1,
          ease: 'power3.out', delay: 0.4,
        })
      }

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
        email_client: form.email || null,
        depart: form.depart,
        destination: form.destination?.label || '',
        date_heure: form.date && form.heure ? `${form.date}T${form.heure}` : null,
        marque: form.vehicule,
        passagers: form.passagers,
        bagages: form.bagages,
        aller_retour: form.retour,
        prix_estime: prix?.montant || null,
        message: form.message || null,
        source: 'site-contact',
        statut: 'nouvelle',
      }])
      setSuccess(true)
    } catch (err) {
      console.error(err)
    }
    setLoading(false)
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════════ */}
      {/* HERO + BOOKING FORM                                        */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section
        ref={heroRef}
        className="page-hero"
        style={{
          position: 'relative',
          minHeight: '100vh',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'stretch',
        }}
      >
        <img
          ref={heroBgRef}
          src="/images/flotte-hotel-luxe.jpg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute', inset: '-10% 0',
            width: '100%', height: '120%', objectFit: 'cover',
          }}
        />
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(105deg, rgba(13,17,23,0.95) 0%, rgba(13,17,23,0.82) 50%, rgba(13,17,23,0.55) 100%)',
        }} />

        <div style={{
          position: 'relative', zIndex: 2,
          width: '100%', maxWidth: 1200,
          margin: '0 auto',
          padding: 'clamp(100px, 12vw, 140px) clamp(24px, 4vw, 60px) 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1.1fr',
          gap: 'clamp(36px, 5vw, 72px)',
          alignItems: 'start',
        }}
          className="contact-hero-grid"
        >
          {/* ── Left: headline + trust signals */}
          <div className="hero-contact-text" style={{ paddingTop: 48 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 28 }}>
              <Link to="/" style={{
                fontFamily: 'Sora', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)', textDecoration: 'none',
              }}>Accueil</Link>
              <span style={{ color: 'rgba(255,255,255,0.2)' }}>/</span>
              <span style={{
                fontFamily: 'Sora', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase',
                color: 'var(--lavande)',
              }}>Réservation</span>
            </div>

            <h1 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(38px, 5vw, 64px)',
              fontWeight: 400, color: '#fff',
              lineHeight: 1.08, margin: '0 0 22px',
              letterSpacing: '-0.01em',
            }}>
              Réservez votre<br />
              <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.6)' }}>
                trajet en Provence
              </span>
            </h1>

            <p style={{
              fontFamily: 'Sora', fontSize: 14,
              color: 'rgba(255,255,255,0.45)', lineHeight: 1.8,
              margin: '0 0 36px', maxWidth: 360,
            }}>
              Réponse garantie en 15 minutes. Tarif fixe confirmé avant votre départ, sans surprise.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 13, marginBottom: 40 }}>
              {[
                { icon: CheckCircle, text: 'Tarif 100% fixe — aucune surprise' },
                { icon: Clock, text: 'Confirmation en moins de 15 minutes' },
                { icon: SealCheck, text: "Annulation gratuite jusqu'à 24h avant" },
              ].map(({ icon: Icon, text }, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Icon size={15} weight="duotone" style={{ color: 'var(--olive)', flexShrink: 0 }} />
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'rgba(255,255,255,0.5)' }}>{text}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              <a href={CONTACT.telHref} style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                background: 'var(--olive)', color: '#fff',
                fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '13px 22px', textDecoration: 'none',
                transition: 'background 0.3s',
              }}
                onMouseEnter={e => (e.currentTarget.style.background = '#5A6B3A')}
                onMouseLeave={e => (e.currentTarget.style.background = 'var(--olive)')}
              >
                <PhoneCall size={15} weight="duotone" />
                {CONTACT.tel}
              </a>
              <a href={CONTACT.whatsappHref} target="_blank" rel="noreferrer" style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                border: '1px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.75)',
                fontFamily: 'Sora', fontSize: 11, fontWeight: 600,
                letterSpacing: '0.1em', textTransform: 'uppercase',
                padding: '13px 22px', textDecoration: 'none',
                transition: 'all 0.3s',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)' }}
              >
                <WhatsappLogo size={15} weight="duotone" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* ── Right: Booking form card */}
          <div ref={formCardRef}>
            <div style={{
              background: 'var(--cream)',
              boxShadow: '0 40px 100px rgba(0,0,0,0.4)',
            }}>
              {success ? (
                <div style={{ padding: '56px 40px', textAlign: 'center' }}>
                  <CheckCircle size={52} weight="duotone" style={{ color: 'var(--olive)', marginBottom: 22 }} />
                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 28, fontWeight: 400, color: 'var(--texte)', margin: '0 0 12px',
                  }}>
                    Demande envoyée !
                  </h3>
                  <p style={{
                    fontFamily: 'Sora', fontSize: 13, color: 'var(--texte-light)',
                    lineHeight: 1.7, margin: '0 0 28px',
                  }}>
                    Nous confirmons votre réservation<br />en moins de 15 minutes.
                  </p>
                  <a href={CONTACT.telHref} style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    background: 'var(--olive)', color: '#fff',
                    fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
                    letterSpacing: '0.1em', textTransform: 'uppercase',
                    padding: '14px 28px', textDecoration: 'none',
                  }}>
                    <PhoneCall size={14} weight="duotone" />
                    Appeler maintenant
                  </a>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  {/* Form header */}
                  <div style={{
                    padding: '28px 36px 22px',
                    borderBottom: '1px solid var(--border)',
                  }}>
                    <span style={{
                      fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                      letterSpacing: '0.3em', textTransform: 'uppercase',
                      color: 'var(--olive)', display: 'block', marginBottom: 6,
                    }}>Réservation</span>
                    <h2 style={{
                      fontFamily: "'Instrument Serif', serif",
                      fontSize: 22, fontWeight: 400, color: 'var(--texte)', margin: 0,
                    }}>
                      Votre trajet sur mesure
                    </h2>
                  </div>

                  <div style={{ padding: '24px 36px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {/* Prénom / Nom */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <Lbl>Prénom *</Lbl>
                        <TextInput value={form.prenom} onChange={set('prenom')} placeholder="Jean" required />
                      </div>
                      <div>
                        <Lbl>Nom *</Lbl>
                        <TextInput value={form.nom} onChange={set('nom')} placeholder="Dupont" required />
                      </div>
                    </div>

                    {/* Téléphone / Email */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <Lbl>Téléphone *</Lbl>
                        <TextInput value={form.tel} onChange={set('tel')} placeholder="06 00 00 00 00" type="tel" required />
                      </div>
                      <div>
                        <Lbl>Email</Lbl>
                        <TextInput value={form.email} onChange={set('email')} placeholder="jean@email.fr" type="email" />
                      </div>
                    </div>

                    {/* Adresse de départ */}
                    <div>
                      <Lbl>Adresse de départ</Lbl>
                      <TextInput
                        value={form.depart}
                        onChange={set('depart')}
                        placeholder="Votre adresse"
                        iconLeft={<NavigationArrow size={14} weight="duotone" style={{ color: 'var(--olive)' }} />}
                      />
                    </div>

                    {/* Destination autocomplete */}
                    <div>
                      <Lbl>Destination *</Lbl>
                      <DestInput value={form.destination} onChange={set('destination')} />
                    </div>

                    {/* Date / Heure */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                      <div>
                        <Lbl>Date *</Lbl>
                        <div style={{ position: 'relative' }}>
                          <CalendarBlank size={14} weight="duotone" style={{
                            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                            color: 'var(--texte-light)', pointerEvents: 'none', zIndex: 1,
                          }} />
                          <input
                            type="date"
                            value={form.date}
                            onChange={e => set('date')(e.target.value)}
                            required
                            style={fieldStyle(44, 36)}
                            onFocus={e => (e.target.style.borderColor = 'var(--olive)')}
                            onBlur={e => (e.target.style.borderColor = 'transparent')}
                          />
                        </div>
                      </div>
                      <div>
                        <Lbl>Heure *</Lbl>
                        <div style={{ position: 'relative' }}>
                          <Clock size={14} weight="duotone" style={{
                            position: 'absolute', left: 12, top: '50%', transform: 'translateY(-50%)',
                            color: 'var(--texte-light)', pointerEvents: 'none', zIndex: 1,
                          }} />
                          <input
                            type="time"
                            value={form.heure}
                            onChange={e => set('heure')(e.target.value)}
                            required
                            style={fieldStyle(44, 36)}
                            onFocus={e => (e.target.style.borderColor = 'var(--olive)')}
                            onBlur={e => (e.target.style.borderColor = 'transparent')}
                          />
                        </div>
                      </div>
                    </div>

                    {/* Véhicule */}
                    <div>
                      <Lbl>Votre véhicule</Lbl>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
                        {VEHICLES.map(v => {
                          const sel = form.vehicule === v.id
                          return (
                            <button
                              key={v.id}
                              type="button"
                              onClick={() => set('vehicule')(v.id)}
                              style={{
                                padding: '14px 8px', cursor: 'pointer',
                                background: sel ? v.color : '#F6F3EE',
                                border: `2px solid ${sel ? v.color : 'transparent'}`,
                                transition: 'all 0.2s',
                                textAlign: 'center',
                                position: 'relative',
                              }}
                            >
                              {v.recommended && !sel && (
                                <div style={{
                                  fontFamily: 'Sora', fontSize: 7, color: v.color,
                                  fontWeight: 700, marginBottom: 3,
                                  letterSpacing: '0.1em', textTransform: 'uppercase',
                                }}>
                                  ★ Recommandé
                                </div>
                              )}
                              <div style={{
                                fontFamily: "'Instrument Serif', serif",
                                fontSize: 14, fontWeight: 400,
                                color: sel ? '#fff' : 'var(--texte)',
                              }}>
                                {v.id}
                              </div>
                              <div style={{
                                fontFamily: 'Sora', fontSize: 9,
                                color: sel ? 'rgba(255,255,255,0.65)' : 'var(--texte-light)',
                                marginTop: 3, textTransform: 'uppercase', letterSpacing: '0.1em',
                              }}>
                                {v.pax}
                              </div>
                            </button>
                          )
                        })}
                      </div>
                    </div>

                    {/* Passagers / Bagages */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                      <div>
                        <Lbl>Passagers</Lbl>
                        <Counter value={form.passagers} onChange={set('passagers')} min={1} max={7} />
                      </div>
                      <div>
                        <Lbl>Bagages</Lbl>
                        <Counter value={form.bagages} onChange={set('bagages')} min={0} max={7} />
                      </div>
                    </div>

                    {/* Type de trajet */}
                    <div style={{ display: 'flex', gap: 28 }}>
                      {[
                        { val: false, label: 'Aller simple' },
                        { val: true, label: 'Aller-retour' },
                      ].map(({ val, label }) => (
                        <label key={String(val)} style={{
                          display: 'flex', alignItems: 'center', gap: 8,
                          cursor: 'pointer', fontFamily: 'Sora', fontSize: 12,
                          color: 'var(--texte)',
                        }}>
                          <input
                            type="radio"
                            name="trajetype"
                            checked={form.retour === val}
                            onChange={() => set('retour')(val)}
                            style={{ accentColor: 'var(--olive)', width: 14, height: 14 }}
                          />
                          {label}
                        </label>
                      ))}
                    </div>

                    {/* Message */}
                    <div>
                      <Lbl>Message (optionnel)</Lbl>
                      <textarea
                        value={form.message}
                        onChange={e => set('message')(e.target.value)}
                        placeholder="Numéro de vol, adresse précise, demande particulière…"
                        rows={3}
                        style={{
                          width: '100%', background: '#F6F3EE',
                          border: '1px solid transparent',
                          padding: '10px 12px',
                          fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)',
                          outline: 'none', resize: 'vertical', lineHeight: 1.6,
                          transition: 'border-color 0.2s', boxSizing: 'border-box',
                        }}
                        onFocus={e => (e.target.style.borderColor = 'var(--olive)')}
                        onBlur={e => (e.target.style.borderColor = 'transparent')}
                      />
                    </div>

                    {/* Estimation de prix */}
                    {prix && (
                      <div style={{
                        background: 'var(--texte)',
                        padding: '16px 20px',
                        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        gap: 16,
                      }}>
                        <div>
                          <div style={{
                            fontFamily: 'Sora', fontSize: 9,
                            color: 'rgba(255,255,255,0.4)',
                            textTransform: 'uppercase', letterSpacing: '0.15em',
                            marginBottom: 5,
                          }}>
                            {prix.km} km · {prix.isNuit ? 'Tarif nuit' : 'Tarif jour'}
                            {form.retour ? ' · Aller-retour' : ''}
                          </div>
                          <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                            <span style={{
                              fontFamily: "'Instrument Serif', serif",
                              fontSize: 30, color: '#fff',
                            }}>
                              ~{prix.montant}€
                            </span>
                            <span style={{ fontFamily: 'Sora', fontSize: 10, color: 'rgba(255,255,255,0.35)' }}>
                              tarif fixe
                            </span>
                          </div>
                        </div>
                        <div style={{
                          fontFamily: 'Sora', fontSize: 10,
                          color: prix.isNuit ? '#F6AD55' : 'var(--olive)',
                          textTransform: 'uppercase', letterSpacing: '0.08em',
                          textAlign: 'right',
                        }}>
                          {prix.isNuit ? '🌙 19h–7h' : '☀️ 7h–19h'}
                        </div>
                      </div>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        width: '100%', height: 52,
                        background: loading ? 'rgba(107,125,74,0.5)' : 'var(--olive)',
                        color: '#fff', border: 'none',
                        cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'Sora', fontSize: 11, fontWeight: 700,
                        letterSpacing: '0.15em', textTransform: 'uppercase',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
                        transition: 'background 0.3s, transform 0.15s',
                        marginTop: 4,
                      }}
                      onMouseEnter={e => { if (!loading) { e.currentTarget.style.background = '#5A6B3A'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                      onMouseLeave={e => { e.currentTarget.style.background = 'var(--olive)'; e.currentTarget.style.transform = 'translateY(0)' }}
                    >
                      {loading
                        ? 'Envoi en cours…'
                        : <><span>Envoyer ma demande</span><ArrowRight size={14} weight="bold" /></>}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 900px) {
            .contact-hero-grid {
              grid-template-columns: 1fr !important;
            }
            .hero-contact-text {
              padding-top: 0 !important;
            }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* CONTACT CHANNELS                                           */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="channels-section" style={{
        background: 'var(--surface)',
        padding: 'clamp(64px, 8vw, 88px) clamp(24px, 4vw, 60px)',
      }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 48 }}>
            <span style={{
              fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--lavande)',
            }}>Nous contacter</span>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(24px, 3vw, 32px)',
              fontWeight: 400, color: 'var(--texte)', margin: '12px 0 0',
            }}>
              Choisissez votre canal
            </h2>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            border: '1px solid var(--border)',
          }}
            className="channels-grid"
          >
            {[
              {
                icon: PhoneCall, color: 'var(--olive)',
                titre: 'Téléphone', valeur: CONTACT.tel,
                detail: 'Disponible 24h/24 · 7j/7',
                sub: 'Réponse immédiate',
                href: CONTACT.telHref, cta: 'Appeler',
              },
              {
                icon: WhatsappLogo, color: '#22c55e',
                titre: 'WhatsApp', valeur: CONTACT.tel,
                detail: 'Message lu sous 5 minutes',
                sub: 'Réponse rapide garantie',
                href: CONTACT.whatsappHref, cta: 'Écrire', target: '_blank',
              },
              {
                icon: EnvelopeSimple, color: 'var(--lavande)',
                titre: 'Email', valeur: CONTACT.email,
                detail: 'Réponse en moins de 2h',
                sub: 'Pour les demandes détaillées',
                href: `mailto:${CONTACT.email}`, cta: 'Envoyer',
              },
            ].map((ch, i) => {
              const Icon = ch.icon
              return (
                <div
                  key={i}
                  className="channel-card"
                  style={{
                    padding: '40px 32px',
                    borderRight: i < 2 ? '1px solid var(--border)' : 'none',
                    background: 'var(--surface)',
                    transition: 'background 0.3s',
                    position: 'relative', overflow: 'hidden',
                    display: 'flex', flexDirection: 'column',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-alt)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'var(--surface)')}
                >
                  <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: ch.color }} />
                  <div style={{
                    width: 48, height: 48,
                    background: `${ch.color}14`,
                    border: `1px solid ${ch.color}30`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: 20,
                  }}>
                    <Icon size={22} weight="duotone" style={{ color: ch.color }} />
                  </div>
                  <div style={{
                    fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                    textTransform: 'uppercase', letterSpacing: '0.2em',
                    color: 'var(--texte-light)', marginBottom: 8,
                  }}>{ch.titre}</div>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 18, color: 'var(--texte)', marginBottom: 6, lineHeight: 1.2,
                  }}>{ch.valeur}</div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', marginBottom: 4 }}>
                    {ch.detail}
                  </div>
                  <div style={{ fontFamily: 'Sora', fontSize: 11, color: 'var(--texte-faint)', marginBottom: 28, flexGrow: 1 }}>
                    {ch.sub}
                  </div>
                  <a
                    href={ch.href}
                    target={ch.target}
                    rel={ch.target ? 'noreferrer' : undefined}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: 8,
                      fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                      textTransform: 'uppercase', letterSpacing: '0.15em',
                      color: ch.color, textDecoration: 'none',
                      borderBottom: `1px solid ${ch.color}`,
                      paddingBottom: 2, transition: 'gap 0.3s', width: 'fit-content',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
                    onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
                  >
                    {ch.cta} <ArrowRight size={12} weight="bold" />
                  </a>
                </div>
              )
            })}
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .channels-grid { grid-template-columns: 1fr !important; }
            .channel-card { border-right: none !important; border-bottom: 1px solid var(--border); }
            .channel-card:last-child { border-bottom: none; }
          }
        `}</style>
      </section>

      {/* ══════════════════════════════════════════════════════════ */}
      {/* MAP + FAQ                                                  */}
      {/* ══════════════════════════════════════════════════════════ */}
      <section className="map-section" style={{
        background: 'var(--cream)',
        padding: 'clamp(64px, 8vw, 88px) clamp(24px, 4vw, 60px)',
      }}>
        <div style={{
          maxWidth: 1200, margin: '0 auto',
          display: 'grid', gridTemplateColumns: '1.2fr 1fr',
          gap: 56, alignItems: 'start',
        }}
          className="map-grid"
        >
          {/* Map */}
          <div>
            <div style={{
              fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
              letterSpacing: '0.25em', textTransform: 'uppercase',
              color: 'var(--olive)', marginBottom: 16,
            }}>Notre adresse</div>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 28, fontWeight: 400, color: 'var(--texte)', margin: '0 0 24px',
            }}>Aix-en-Provence</h3>
            <div style={{ border: '1px solid var(--border)', overflow: 'hidden', marginBottom: 16 }}>
              <iframe
                title="Localisation Taxis Provençal Aix"
                src="https://maps.google.com/maps?q=82+avenue+Henri+Mauriat+13100+Aix-en-Provence+France&output=embed&z=15"
                width="100%"
                height="320"
                style={{ display: 'block', border: 'none' }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10 }}>
              <MapPin size={15} weight="duotone" style={{ color: 'var(--lavande)', marginTop: 2, flexShrink: 0 }} />
              <span style={{ fontFamily: 'Sora', fontSize: 13, color: 'var(--texte-light)', lineHeight: 1.6 }}>
                {CONTACT.adresse}
              </span>
            </div>
          </div>

          {/* Info + FAQ */}
          <div>
            <div style={{ marginBottom: 40 }}>
              <div style={{
                fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--olive)', marginBottom: 16,
              }}>Disponibilité</div>
              {[
                { label: 'Lundi — Dimanche', value: '24h / 24' },
                { label: 'Aéroport & Gare', value: 'Tous les vols / TGV' },
                { label: 'Confirmations', value: '< 15 minutes' },
              ].map((r, i) => (
                <div key={i} style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  padding: '12px 0', borderBottom: '1px solid var(--border)',
                }}>
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)' }}>{r.label}</span>
                  <span style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte)', fontWeight: 600 }}>{r.value}</span>
                </div>
              ))}
            </div>

            <div>
              <div style={{
                fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.25em', textTransform: 'uppercase',
                color: 'var(--olive)', marginBottom: 16,
              }}>Questions fréquentes</div>
              {[
                { q: 'Le tarif est-il définitif ?', a: 'Oui. Le prix communiqué lors de votre réservation est ferme et définitif — pas de supplément.' },
                { q: 'Comment payer ?', a: 'Paiement à bord : espèces, carte bancaire (Visa, Mastercard, Amex).' },
                { q: 'Délai de réservation ?', a: "De quelques heures à plusieurs semaines à l'avance. Réponse garantie sous 15 min." },
              ].map((faq, i) => (
                <div key={i} style={{
                  marginBottom: 18, paddingBottom: 18,
                  borderBottom: i < 2 ? '1px solid var(--border)' : 'none',
                }}>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, fontWeight: 600, color: 'var(--texte)', marginBottom: 6 }}>
                    {faq.q}
                  </div>
                  <div style={{ fontFamily: 'Sora', fontSize: 12, color: 'var(--texte-light)', lineHeight: 1.65 }}>
                    {faq.a}
                  </div>
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
                onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
              >
                Découvrir la flotte <ArrowRight size={12} weight="bold" />
              </Link>
            </div>
          </div>
        </div>

        <style>{`
          @media (max-width: 768px) {
            .map-grid { grid-template-columns: 1fr !important; }
          }
        `}</style>
      </section>
    </>
  )
}
