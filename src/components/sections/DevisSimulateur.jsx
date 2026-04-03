import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Phone, CheckCircle } from '@phosphor-icons/react'
import AddressAutocomplete from '../ui/AddressAutocomplete'
import { CONTACT } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const TARIF_JOUR  = 2.22
const TARIF_NUIT  = 2.78
const PRISE       = 4.00
const MINIMUM     = 12

const TRUST = ['Tarif fixe garanti', 'Sans engagement', 'Réponse en 15 min']

export default function DevisSimulateur() {
  const sectionRef  = useRef(null)
  const [dest, setDest]     = useState(null)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState(null)

  function calc() {
    if (!dest?.km) return
    const h = new Date().getHours()
    const tarif = h >= 7 && h < 19 ? TARIF_JOUR : TARIF_NUIT
    const prix = Math.max(MINIMUM, +(PRISE + dest.km * tarif).toFixed(2))
    setResult({ prix, km: dest.km, isNuit: tarif === TARIF_NUIT })
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.dvs-left', {
        x: -40, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
      })
      gsap.from('.dvs-calc', {
        y: 20, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
      })
      gsap.from('.dvs-trust', {
        y: 12, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out', delay: 0.3,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="devis"
      style={{
        background: '#070707',
        position: 'relative',
        overflow: 'hidden',
        borderTop: '1px solid rgba(255,255,255,0.04)',
        borderBottom: '1px solid rgba(255,255,255,0.04)',
      }}
    >
      <style>{`
        @keyframes dvs-border-flow {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes dvs-glow-pulse {
          0%, 100% { opacity: 0.55; }
          50%       { opacity: 1; }
        }
        @keyframes dvs-scan {
          0%   { transform: translateX(-100%); }
          100% { transform: translateX(100vw); }
        }
        .dvs-calc-btn {
          transition: background 0.25s, box-shadow 0.25s;
        }
        .dvs-calc-btn:not(:disabled):hover {
          box-shadow: 0 0 14px 2px rgba(107,125,74,0.6), 0 0 28px 6px rgba(107,125,74,0.25) !important;
        }
        .dvs-reserve-btn {
          transition: background 0.3s, box-shadow 0.3s, transform 0.2s;
        }
        .dvs-reserve-btn:hover {
          background: rgba(107,125,74,0.22) !important;
          box-shadow: 0 0 12px 2px rgba(107,125,74,0.5), 0 0 28px 6px rgba(107,125,74,0.2) !important;
          transform: translateY(-1px);
        }
      `}</style>

      {/* Animated neon border top */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, var(--olive) 25%, var(--lavande) 50%, var(--olive) 75%, transparent 100%)',
        backgroundSize: '300% 100%',
        animation: 'dvs-border-flow 4s ease infinite',
        opacity: 0.9,
      }} />

      {/* Animated neon border bottom */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, var(--lavande) 25%, var(--olive) 50%, var(--lavande) 75%, transparent 100%)',
        backgroundSize: '300% 100%',
        animation: 'dvs-border-flow 4s ease infinite reverse',
        opacity: 0.6,
      }} />

      {/* Scan line */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, bottom: 0, width: '120px',
        background: 'linear-gradient(90deg, transparent, rgba(107,125,74,0.06), transparent)',
        animation: 'dvs-scan 5s linear infinite',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* Ambient glows */}
      <div aria-hidden="true" style={{
        position: 'absolute', left: '8%', top: '50%', transform: 'translateY(-50%)',
        width: 200, height: 200,
        background: 'radial-gradient(circle, rgba(107,125,74,0.12) 0%, transparent 70%)',
        animation: 'dvs-glow-pulse 3s ease-in-out infinite',
        pointerEvents: 'none', filter: 'blur(20px)',
      }} />
      <div aria-hidden="true" style={{
        position: 'absolute', right: '8%', top: '50%', transform: 'translateY(-50%)',
        width: 180, height: 180,
        background: 'radial-gradient(circle, rgba(122,96,145,0.12) 0%, transparent 70%)',
        animation: 'dvs-glow-pulse 3s ease-in-out infinite 1.5s',
        pointerEvents: 'none', filter: 'blur(20px)',
      }} />

      {/* Main content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1.6fr',
        gap: 'clamp(24px,4vw,64px)',
        alignItems: 'center',
        padding: 'clamp(32px,4.5vw,52px) clamp(24px,5vw,72px)',
        position: 'relative', zIndex: 1,
      }}>

        {/* Left — Title + trust */}
        <div className="dvs-left">
          <span style={{
            fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--olive)', display: 'block', marginBottom: 8,
            textShadow: '0 0 10px rgba(107,125,74,0.8), 0 0 20px rgba(107,125,74,0.4)',
          }}>Devis en ligne</span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(22px,3.2vw,42px)',
            fontWeight: 400, color: '#fff',
            margin: '0 0 20px', lineHeight: 1.1,
            letterSpacing: '-0.02em',
            textShadow: '0 0 30px rgba(255,255,255,0.08)',
          }}>
            Estimez votre trajet
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {TRUST.map((item, i) => (
              <div key={i} className="dvs-trust" style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
                <CheckCircle
                  size={12} weight="duotone"
                  style={{ color: 'var(--olive)', filter: 'drop-shadow(0 0 4px rgba(107,125,74,0.9))', flexShrink: 0 }}
                />
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 10,
                  color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em',
                }}>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Estimator */}
        <div className="dvs-calc">
          {/* Input row */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 12, alignItems: 'center' }}>
            <div style={{ flex: 1 }}>
              <AddressAutocomplete
                value={dest}
                onChange={d => { setDest(d); setResult(null) }}
                placeholder="Votre destination (ville, adresse…)"
                dark={true}
                onLoadingChange={setLoading}
                inputStyle={{
                  height: 46, fontSize: 12,
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 0,
                }}
              />
            </div>
            <button
              onClick={calc}
              disabled={!dest?.km || loading}
              className="dvs-calc-btn"
              style={{
                height: 46, padding: '0 20px', flexShrink: 0,
                background: (dest?.km && !loading) ? 'var(--olive)' : 'rgba(255,255,255,0.05)',
                color: (dest?.km && !loading) ? '#fff' : 'rgba(255,255,255,0.2)',
                border: 'none', fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                cursor: (dest?.km && !loading) ? 'pointer' : 'not-allowed',
                boxShadow: (dest?.km && !loading) ? '0 0 8px 1px rgba(107,125,74,0.4)' : 'none',
                whiteSpace: 'nowrap',
              }}
            >
              {loading ? '…' : 'Calculer'}
            </button>
          </div>

          {/* Distance hint */}
          {dest?.km && !result && (
            <p style={{
              fontFamily: 'Sora', fontSize: 9, color: 'rgba(255,255,255,0.28)',
              margin: '0 0 10px', letterSpacing: '0.04em',
            }}>{dest.km} km depuis Aix-en-Provence</p>
          )}

          {/* Result + CTAs */}
          {result ? (
            <div style={{
              display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(107,125,74,0.25)',
              padding: '14px 20px',
            }}>
              <div style={{ flex: 1, minWidth: 120 }}>
                <div style={{ fontFamily: 'Sora', fontSize: 8, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: 4 }}>
                  {result.km} km · tarif {result.isNuit ? 'nuit' : 'jour'}
                </div>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(28px,4vw,40px)',
                  color: 'var(--olive)',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(107,125,74,0.6)',
                }}>~{result.prix}€</span>
              </div>

              {/* CTAs */}
              <div style={{ display: 'flex', gap: 10, alignItems: 'center', flexWrap: 'wrap' }}>
                <Link
                  to="/contact"
                  className="dvs-reserve-btn"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                    letterSpacing: '0.14em', textTransform: 'uppercase',
                    color: '#fff', textDecoration: 'none',
                    padding: '11px 22px',
                    border: '1px solid rgba(107,125,74,0.5)',
                    background: 'rgba(107,125,74,0.1)',
                    boxShadow: '0 0 8px 1px rgba(107,125,74,0.2)',
                    whiteSpace: 'nowrap',
                  }}
                >
                  Réserver <ArrowRight size={11} weight="bold" />
                </Link>
                <a
                  href={CONTACT.telHref}
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    fontFamily: 'Sora', fontSize: 10, fontWeight: 500,
                    color: 'rgba(255,255,255,0.45)', textDecoration: 'none',
                    whiteSpace: 'nowrap', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.45)')}
                >
                  <Phone size={13} weight="light" /> Appeler
                </a>
              </div>
            </div>
          ) : (
            /* Default state — two CTA buttons */
            <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Link
                to="/contact"
                className="dvs-reserve-btn"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                  letterSpacing: '0.14em', textTransform: 'uppercase',
                  color: '#fff', textDecoration: 'none',
                  padding: '12px 24px',
                  border: '1px solid rgba(107,125,74,0.5)',
                  background: 'rgba(107,125,74,0.08)',
                  boxShadow: '0 0 8px 1px rgba(107,125,74,0.25)',
                  whiteSpace: 'nowrap',
                }}
              >
                Réserver <ArrowRight size={11} weight="bold" />
              </Link>
              <a
                href={CONTACT.telHref}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 6,
                  fontFamily: 'Sora', fontSize: 10, fontWeight: 500,
                  color: 'rgba(255,255,255,0.4)', textDecoration: 'none',
                  whiteSpace: 'nowrap', transition: 'color 0.2s',
                  letterSpacing: '0.06em',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.85)')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}
              >
                <Phone size={14} weight="light" /> {CONTACT.tel}
              </a>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #devis > div:last-of-type {
            grid-template-columns: 1fr !important;
            padding: 32px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
