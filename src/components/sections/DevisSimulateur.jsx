import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin, Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const TRUST_ITEMS = [
  'Tarif fixe garanti',
  'Sans engagement',
  'Réponse en 15min',
]

export default function DevisSimulateur() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Card reveal
      gsap.from('.devis-card', {
        y: 60,
        opacity: 0,
        scale: 0.97,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.devis-card',
          start: 'top 85%',
          once: true,
        },
      })

      // Trust line stagger
      gsap.from('.devis-trust-item', {
        y: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.12,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.devis-trust',
          start: 'top 90%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  const inputStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(255,255,255,0.15)',
    color: '#fff',
    fontFamily: 'Sora, sans-serif',
    fontSize: 14,
    padding: '14px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-color 0.3s ease',
  }

  const labelStyle = {
    fontFamily: 'Sora, sans-serif',
    fontSize: 9,
    fontWeight: 600,
    textTransform: 'uppercase',
    letterSpacing: '0.2em',
    color: 'rgba(255,255,255,0.4)',
    display: 'block',
    marginBottom: 4,
  }

  return (
    <section
      ref={sectionRef}
      id="devis"
      style={{
        background: 'var(--texte)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/images/vignes-provence.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          opacity: 0.1,
          pointerEvents: 'none',
        }}
      />

      {/* Container */}
      <div
        className="devis-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '100px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Centered content */}
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          {/* Header */}
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 10,
            fontWeight: 600,
            textTransform: 'uppercase',
            letterSpacing: '0.25em',
            color: 'var(--olive)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Devis en ligne
          </span>

          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 3.5vw, 42px)',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.2,
            margin: '0 0 16px 0',
          }}>
            Estimez votre trajet
          </h2>

          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'rgba(255,255,255,0.5)',
            lineHeight: 1.7,
            maxWidth: 460,
            margin: '0 auto 48px',
          }}>
            Renseignez les d&eacute;tails de votre course et recevez
            une estimation imm&eacute;diate &agrave; tarif fixe garanti.
          </p>

          {/* Glass card */}
          <div
            className="devis-card"
            style={{
              background: 'rgba(255,255,255,0.05)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '48px 40px',
            }}
          >
            <form onSubmit={handleSubmit}>
              {/* Row 1: Départ / Arrivée */}
              <div
                className="devis-field-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                  marginBottom: 32,
                }}
              >
                <div style={{ textAlign: 'left', position: 'relative' }}>
                  <label style={labelStyle}>D&eacute;part</label>
                  <input
                    type="text"
                    placeholder="Adresse de d&eacute;part"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                  <MapPin
                    size={16}
                    strokeWidth={1.5}
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 14,
                      color: 'var(--olive)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
                <div style={{ textAlign: 'left', position: 'relative' }}>
                  <label style={labelStyle}>Arriv&eacute;e</label>
                  <input
                    type="text"
                    placeholder="Adresse d'arriv&eacute;e"
                    style={inputStyle}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                  <MapPin
                    size={16}
                    strokeWidth={1.5}
                    style={{
                      position: 'absolute',
                      right: 0,
                      bottom: 14,
                      color: 'var(--olive)',
                      pointerEvents: 'none',
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Date / Véhicule */}
              <div
                className="devis-field-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 32,
                  marginBottom: 40,
                }}
              >
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>Date</label>
                  <input
                    type="date"
                    style={{
                      ...inputStyle,
                      colorScheme: 'dark',
                    }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  />
                </div>
                <div style={{ textAlign: 'left' }}>
                  <label style={labelStyle}>V&eacute;hicule</label>
                  <select
                    style={{
                      ...inputStyle,
                      appearance: 'none',
                      cursor: 'pointer',
                    }}
                    onFocus={e => (e.target.style.borderBottomColor = 'var(--olive)')}
                    onBlur={e => (e.target.style.borderBottomColor = 'rgba(255,255,255,0.15)')}
                  >
                    <option value="classe-e" style={{ background: '#2A2A2A' }}>Classe E</option>
                    <option value="classe-s" style={{ background: '#2A2A2A' }}>Classe S</option>
                    <option value="classe-v" style={{ background: '#2A2A2A' }}>Classe V</option>
                  </select>
                </div>
              </div>

              {/* CTA */}
              <MagneticButton
                as="button"
                type="submit"
                style={{
                  width: '100%',
                  background: 'var(--olive)',
                  color: '#fff',
                  border: 'none',
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  padding: '18px 32px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 10,
                  transition: 'background 0.3s ease, transform 0.3s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = '#5A6B3A'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'var(--olive)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                CALCULER MON DEVIS
                <ArrowRight size={14} strokeWidth={2} />
              </MagneticButton>
            </form>
          </div>

          {/* Trust line */}
          <div
            className="devis-trust"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 32,
              marginTop: 24,
              flexWrap: 'wrap',
            }}
          >
            {TRUST_ITEMS.map((item, i) => (
              <div
                key={i}
                className="devis-trust-item"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 10,
                  color: 'rgba(255,255,255,0.35)',
                }}
              >
                <Check size={12} strokeWidth={2} style={{ color: 'var(--olive)' }} />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .devis-container {
            padding: 80px 24px !important;
          }
          .devis-card {
            padding: 32px 24px !important;
          }
          .devis-field-row {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
