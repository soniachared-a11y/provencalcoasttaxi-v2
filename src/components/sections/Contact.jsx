import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, ShieldCheck, Star, Clock } from '@phosphor-icons/react'
import { SECTION_INTROS, IMAGES } from '../../data/content'
import { supabase } from '../../lib/supabase'

gsap.registerPlugin(ScrollTrigger)

const INFO_BLOCKS = [
  { label: 'Téléphone', value: '06 15 96 32 75', href: 'tel:+33615963275' },
  { label: 'Email', value: 'provencalcoastdriver@gmail.com', href: 'mailto:provencalcoastdriver@gmail.com' },
  { label: 'Zone', value: 'Aix-en-Provence & Provence' },
]

const TRUST_ITEMS = [
  { Icon: ShieldCheck, text: 'Licence VTC officielle' },
  { Icon: Star, text: '4.9/5 — 200+ avis Google' },
  { Icon: Clock, text: 'Disponible 24h/24' },
]

const SERVICES_OPTIONS = [
  'Transfert Aéroport',
  'Déplacement Affaires',
  'Événements & Soirées',
  'Longue Distance',
  'Visite Touristique',
]

const labelStyle = {
  fontFamily: 'Sora, sans-serif',
  fontSize: 9,
  fontWeight: 500,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  color: 'var(--texte-light)',
  display: 'block',
  marginBottom: 8,
}

const inputStyle = {
  width: '100%',
  fontFamily: 'Sora, sans-serif',
  fontSize: 14,
  color: 'var(--texte)',
  background: 'transparent',
  border: 'none',
  borderBottom: '1px solid var(--border)',
  padding: '12px 0',
  outline: 'none',
  transition: 'border-color 0.3s ease',
}

export default function Contact() {
  const sectionRef = useRef(null)
  const [form, setForm] = useState({ nom: '', tel: '', service: '', date_heure: '', message: '' })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  function update(field, value) {
    setForm(f => ({ ...f, [field]: value }))
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    if (!form.nom.trim()) return setError('Votre nom est obligatoire.')
    setLoading(true)
    const { error: insertError } = await supabase.from('reservations').insert({
      nom_client: form.nom.trim(),
      tel_client: form.tel.trim() || null,
      depart: form.message.trim() || null,
      destination: form.service || null,
      date_heure: form.date_heure ? new Date(form.date_heure).toISOString() : new Date().toISOString(),
      marque: 'provencal',
      source: 'site',
      statut: 'nouvelle',
      user_id: null,
    })
    setLoading(false)
    if (insertError) {
      setError('Une erreur est survenue. Appelez-nous directement.')
      return
    }
    setSuccess(true)
    setForm({ nom: '', tel: '', service: '', date_heure: '', message: '' })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-info', {
        x: -40,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.contact-form', {
        x: 40,
        opacity: 0,
        duration: 0.9,
        delay: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleFocus = (e) => {
    e.target.style.borderBottomColor = 'var(--lavande)'
  }
  const handleBlur = (e) => {
    e.target.style.borderBottomColor = 'var(--border)'
  }

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="contact-section"
      style={{ background: 'var(--cream)' }}
    >
      {/* CTA Bandeau */}
      <div style={{
        background: 'var(--olive)',
        padding: '20px 24px',
        textAlign: 'center',
      }}>
        <a
          href="tel:+33615963275"
          style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 20,
            color: '#fff',
            textDecoration: 'none',
          }}
        >
          Appelez-nous au 06 15 96 32 75 — Disponible 24h/24
        </a>
      </div>

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        {/* Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '0.5fr 1fr',
          border: '1px solid var(--border)',
          overflow: 'hidden',
        }}>
          {/* Left — Info panel */}
          <div
            className="contact-info"
            style={{
              background: 'var(--texte)',
              padding: 48,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              willChange: 'transform',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background image */}
            <img
              src={IMAGES.contactFond}
              alt=""
              aria-hidden="true"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                opacity: 0.08,
              }}
            />

            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 28,
                fontWeight: 400,
                color: '#fff',
                margin: '0 0 16px 0',
                lineHeight: 1.3,
              }}>
                Réservez votre chauffeur
              </h2>

              {/* Reassurance paragraph */}
              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 13,
                color: 'rgba(255,255,255,0.55)',
                lineHeight: 1.7,
                marginBottom: 32,
              }}>
                {SECTION_INTROS.contact}
              </p>

              {INFO_BLOCKS.map((block, i) => (
                <div key={i} style={{ marginBottom: 28 }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 9,
                    fontWeight: 500,
                    textTransform: 'uppercase',
                    letterSpacing: '0.2em',
                    color: 'rgba(255,255,255,0.5)',
                    display: 'block',
                    marginBottom: 6,
                  }}>
                    {block.label}
                  </span>
                  {block.href ? (
                    <a
                      href={block.href}
                      style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.8)',
                        textDecoration: 'none',
                      }}
                    >
                      {block.value}
                    </a>
                  ) : (
                    <span style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 14,
                      color: 'rgba(255,255,255,0.8)',
                    }}>
                      {block.value}
                    </span>
                  )}
                </div>
              ))}

              {/* Trust indicators */}
              <div style={{ marginTop: 8, marginBottom: 24 }}>
                {TRUST_ITEMS.map(({ Icon, text }, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    marginBottom: 10,
                  }}>
                    <Icon size={14} weight="duotone" style={{ color: 'rgba(255,255,255,0.45)' }} />
                    <span style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 11,
                      color: 'rgba(255,255,255,0.45)',
                    }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 10,
              color: 'rgba(255,255,255,0.25)',
              margin: 0,
              lineHeight: 1.5,
              position: 'relative',
              zIndex: 1,
            }}>
              Licence VTC — SIRET N°013230073
              <br />
              82 avenue Henri Mauriat, 13100 Aix-en-Provence
            </p>
          </div>

          {/* Right — Form */}
          <div
            className="contact-form"
            style={{
              background: 'var(--surface)',
              padding: 48,
              willChange: 'transform',
            }}
          >
            {success ? (
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 300,
                gap: 16,
                textAlign: 'center',
              }}>
                <div style={{ fontSize: 40 }}>✅</div>
                <p style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: 'var(--texte)', margin: 0 }}>
                  Demande envoyée
                </p>
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 13, color: 'var(--texte-light)', margin: 0, lineHeight: 1.6 }}>
                  Yassine vous contactera dans les plus brefs délais.<br />
                  Pour un besoin urgent : <a href="tel:+33615963275" style={{ color: 'var(--olive)' }}>06 15 96 32 75</a>
                </p>
                <button
                  onClick={() => setSuccess(false)}
                  style={{ fontFamily: 'Sora, sans-serif', fontSize: 11, color: 'var(--texte-light)', background: 'none', border: 'none', cursor: 'pointer', marginTop: 8, textDecoration: 'underline' }}
                >
                  Nouvelle demande
                </button>
              </div>
            ) : (
            <form onSubmit={handleSubmit}>
              {/* Row: Nom + Téléphone */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
                marginBottom: 32,
              }}>
                <div>
                  <label htmlFor="contact-nom" style={labelStyle}>Nom *</label>
                  <input
                    id="contact-nom"
                    type="text"
                    placeholder="Votre nom"
                    value={form.nom}
                    onChange={e => update('nom', e.target.value)}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label htmlFor="contact-tel" style={labelStyle}>Téléphone</label>
                  <input
                    id="contact-tel"
                    type="tel"
                    placeholder="06 00 00 00 00"
                    value={form.tel}
                    onChange={e => update('tel', e.target.value)}
                    style={inputStyle}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                  />
                </div>
              </div>

              {/* Service */}
              <div style={{ marginBottom: 32 }}>
                <label htmlFor="contact-service" style={labelStyle}>Service</label>
                <select
                  id="contact-service"
                  value={form.service}
                  onChange={e => update('service', e.target.value)}
                  style={{ ...inputStyle, appearance: 'none', cursor: 'pointer' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                >
                  <option value="">Choisir un service</option>
                  {SERVICES_OPTIONS.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>

              {/* Date */}
              <div style={{ marginBottom: 32 }}>
                <label htmlFor="contact-date" style={labelStyle}>Date & heure</label>
                <input
                  id="contact-date"
                  type="datetime-local"
                  value={form.date_heure}
                  onChange={e => update('date_heure', e.target.value)}
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: 40 }}>
                <label htmlFor="contact-message" style={labelStyle}>Message / Trajet</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Départ, destination, détails..."
                  value={form.message}
                  onChange={e => update('message', e.target.value)}
                  style={{ ...inputStyle, resize: 'vertical' }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {error && (
                <p style={{ fontFamily: 'Sora, sans-serif', fontSize: 12, color: '#e53e3e', marginBottom: 16 }}>
                  {error}
                </p>
              )}

              {/* CTA */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: loading ? '#999' : 'var(--olive)',
                  color: '#fff',
                  padding: '16px 32px',
                  border: 'none',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: loading ? 'not-allowed' : 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => { if (!loading) { e.currentTarget.style.backgroundColor = '#6A5280'; e.currentTarget.style.transform = 'translateY(-1px)' } }}
                onMouseLeave={e => { if (!loading) { e.currentTarget.style.backgroundColor = 'var(--olive)'; e.currentTarget.style.transform = 'translateY(0)' } }}
              >
                {loading ? 'Envoi...' : 'Envoyer la demande'}
                {!loading && <ArrowRight size={14} weight="bold" />}
              </button>
            </form>
            )}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          #contact > div > div {
            grid-template-columns: 1fr !important;
          }
          .contact-form form > div:first-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
