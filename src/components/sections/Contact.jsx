import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Shield, Star, Clock } from 'lucide-react'
import { SECTION_INTROS, IMAGES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const INFO_BLOCKS = [
  { label: 'Téléphone', value: '06 15 96 32 75', href: 'tel:+33615963275' },
  { label: 'Email', value: 'provencalcoastdriver@gmail.com', href: 'mailto:provencalcoastdriver@gmail.com' },
  { label: 'Zone', value: 'Aix-en-Provence & Provence' },
]

const TRUST_ITEMS = [
  { Icon: Shield, text: 'Licence VTC officielle' },
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
                    <Icon size={14} strokeWidth={1.5} style={{ color: 'rgba(255,255,255,0.45)' }} />
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
            <form onSubmit={e => e.preventDefault()}>
              {/* Row: Nom + Téléphone */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 32,
                marginBottom: 32,
              }}>
                <div>
                  <label htmlFor="contact-nom" style={labelStyle}>Nom</label>
                  <input
                    id="contact-nom"
                    type="text"
                    placeholder="Votre nom"
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
                  style={{
                    ...inputStyle,
                    appearance: 'none',
                    cursor: 'pointer',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                  defaultValue=""
                >
                  <option value="" disabled>Choisir un service</option>
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
                  style={inputStyle}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* Message */}
              <div style={{ marginBottom: 40 }}>
                <label htmlFor="contact-message" style={labelStyle}>Message</label>
                <textarea
                  id="contact-message"
                  rows={4}
                  placeholder="Détails de votre trajet..."
                  style={{
                    ...inputStyle,
                    resize: 'vertical',
                  }}
                  onFocus={handleFocus}
                  onBlur={handleBlur}
                />
              </div>

              {/* CTA */}
              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  backgroundColor: 'var(--bleu)',
                  color: '#fff',
                  padding: '16px 32px',
                  border: 'none',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = '#345070'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'var(--bleu)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                Envoyer la demande
                <ArrowRight size={14} strokeWidth={2} />
              </button>
            </form>
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
