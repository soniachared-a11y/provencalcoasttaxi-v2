import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle, NavigationArrow } from '@phosphor-icons/react'
import MagneticButton from '../ui/MagneticButton'
import AddressAutocomplete from '../ui/AddressAutocomplete'

const TARIF = 2.22
const PRISE = 4.00
const MINIMUM = 12
function calcPrix(km) { return Math.max(MINIMUM, +(PRISE + km * TARIF).toFixed(2)) }

gsap.registerPlugin(ScrollTrigger)

const REASSURANCE = [
  'Confirmation immédiate',
  'Annulation gratuite',
  'Suivi de vol en temps réel',
]

function WordReveal({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <span className="heroalt-word" style={{ display: 'inline-block' }}>{word}</span>
          {i < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default function HeroAlt() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const [dest, setDest] = useState(null)
  const [routeLoading, setRouteLoading] = useState(false)
  const [prix, setPrix] = useState(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Label
      tl.from('.heroalt-tag', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      })

      // H1 line 1 words
      tl.from('.heroalt-line1 .heroalt-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.3')

      // H1 line 2 words
      tl.from('.heroalt-line2 .heroalt-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.4')

      // Decorative line
      tl.from('.heroalt-deco-line', {
        scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left',
      }, '-=0.3')

      // Subtitle
      tl.from('.heroalt-subtitle', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.2')

      // CTAs stagger
      tl.from('.heroalt-actions > *', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      }, '-=0.2')

      // Reassurance items
      tl.from('.heroalt-reassurance > span', {
        y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
      }, '-=0.1')

      // Image clipPath reveal
      gsap.from('.heroalt-image-wrapper', {
        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.4,
      })

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: -15,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero-alt"
      style={{ position: 'relative' }}
    >
      <div className="heroalt-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}>
        {/* LEFT — Content */}
        <div style={{
          background: 'var(--cream)',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 64px 80px 64px',
        }}>
          <div style={{ maxWidth: 520 }}>
            {/* Label */}
            <p
              className="heroalt-tag"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--olive)',
                marginBottom: '24px',
              }}
            >
              Chauffeur priv&eacute; &mdash; Aix-en-Provence
            </p>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '24px',
              margin: '0 0 24px 0',
            }}>
              <span
                className="heroalt-line1"
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  color: 'var(--texte)',
                }}
              >
                <WordReveal text="Votre chauffeur" />
              </span>
              <em
                className="heroalt-line2"
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  fontStyle: 'italic',
                  color: 'var(--lavande)',
                }}
              >
                <WordReveal text="d'exception" />
              </em>
            </h1>

            {/* Decorative line */}
            <div
              className="heroalt-deco-line"
              style={{
                width: '56px',
                height: '1px',
                backgroundColor: 'var(--olive)',
                marginBottom: '24px',
              }}
            />

            {/* Présentation chaleureuse — Qui sommes-nous */}
            <p
              className="heroalt-subtitle"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.8,
                color: 'var(--texte-light)',
                maxWidth: '440px',
                marginBottom: '28px',
              }}
            >
              Fondés à Aix-en-Provence, nous accompagnons particuliers et professionnels depuis plus de 10 ans. Une seule conviction : chaque trajet mérite le même soin qu'un séjour dans un grand hôtel.
            </p>

            {/* Valeurs clés */}
            <div
              className="heroalt-reassurance"
              style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}
            >
              {[
                { label: 'Chauffeurs bilingues formés à l\'accueil VIP', icon: '✦' },
                { label: 'Flotte Mercedes entretenue quotidiennement', icon: '✦' },
                { label: 'Disponibles 24h/24, 7j/7, sans supplément de nuit', icon: '✦' },
              ].map((item, i) => (
                <span
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '13px',
                    fontWeight: 300,
                    color: 'var(--texte-light)',
                    lineHeight: 1.5,
                  }}
                >
                  <span style={{ color: 'var(--olive)', fontSize: 10, marginTop: 3, flexShrink: 0 }}>{item.icon}</span>
                  {item.label}
                </span>
              ))}
            </div>

            {/* Mini estimateur */}
            <div className="heroalt-estimator" style={{
              borderTop: '1px solid var(--border)',
              paddingTop: '24px',
            }}>
              <p style={{
                fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 600,
                textTransform: 'uppercase', letterSpacing: '0.2em',
                color: 'var(--texte-light)', marginBottom: 12,
              }}>
                Estimer votre trajet
              </p>
              <div className="heroalt-estimator-inner" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <AddressAutocomplete
                  value={dest}
                  onChange={d => { setDest(d); setPrix(d?.km ? calcPrix(d.km) : null) }}
                  placeholder="Destination…"
                  dark={false}
                  onLoadingChange={setRouteLoading}
                  inputStyle={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 2 }}
                />
                {prix && !routeLoading && (
                  <div style={{
                    fontFamily: 'Sora', fontSize: 10, color: 'var(--olive)',
                    display: 'flex', alignItems: 'center', gap: 8,
                  }}>
                    <span style={{ fontFamily: "'Instrument Serif', serif", fontSize: 22, color: 'var(--texte)' }}>~{prix}€</span>
                    <span style={{ color: 'var(--texte-light)' }}>· {dest.km} km</span>
                  </div>
                )}
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 400,
                  fontStyle: 'italic', color: 'var(--texte-light)', opacity: 0.65,
                  margin: '2px 0 0', lineHeight: 1.5,
                }}>
                  * Estimation calculée au départ d'Aix-en-Provence centre
                </p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    disabled={!dest || routeLoading}
                    onClick={() => dest?.km && setPrix(calcPrix(dest.km))}
                    style={{
                      flex: 1, minWidth: 140,
                      fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: dest ? 'var(--texte)' : 'var(--texte-light)',
                      background: 'var(--surface)', border: '1px solid var(--border)',
                      padding: '10px 16px', cursor: dest ? 'pointer' : 'default',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'border-color 0.2s',
                    }}
                    onMouseEnter={e => { if (dest) e.currentTarget.style.borderColor = 'var(--olive)' }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)' }}
                  >
                    <ArrowRight size={11} weight="bold" />
                    {routeLoading ? 'Calcul…' : 'Calculer mon trajet'}
                  </button>
                  <Link
                    to="/contact"
                    style={{
                      flex: 1, minWidth: 100,
                      fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 600,
                      textTransform: 'uppercase', letterSpacing: '0.1em',
                      color: '#fff', background: 'var(--olive)',
                      padding: '10px 16px', textDecoration: 'none',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                      transition: 'background 0.2s',
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = '#5A6B3A'}
                    onMouseLeave={e => e.currentTarget.style.background = 'var(--olive)'}
                  >
                    Réserver <ArrowRight size={11} weight="bold" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div
          className="heroalt-image-wrapper"
          style={{
            position: 'relative',
            overflow: 'hidden',
            clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          {/* Olive accent line */}
          <div style={{
            position: 'absolute',
            left: '3px',
            top: '15%',
            width: '3px',
            height: '70%',
            backgroundColor: 'var(--olive)',
            zIndex: 2,
          }} />

          <img
            ref={imageRef}
            src="/images/classe-s-provence.jpg"
            alt="Mercedes Classe S en Provence"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        #hero-alt { overflow: hidden; }
        @media (max-width: 1024px) {
          #hero-alt .heroalt-grid > div:first-child {
            padding: 120px 40px 60px 40px !important;
          }
        }
        @media (max-width: 768px) {
          #hero-alt .heroalt-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          #hero-alt .heroalt-grid > div:first-child {
            order: 1;
            padding: 100px 16px 40px 16px !important;
          }
          #hero-alt .heroalt-grid > div:last-child {
            order: 2;
            height: 40vh;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
          }
          .heroalt-actions {
            gap: 10px !important;
          }
          .heroalt-actions a, .heroalt-actions button {
            width: 100%;
            justify-content: center !important;
            box-sizing: border-box;
            min-width: 0 !important;
          }
          .heroalt-estimator-inner {
            flex-direction: column !important;
          }
          .heroalt-estimator-inner > div {
            width: 100% !important;
            min-width: 0 !important;
            flex: none !important;
          }
          .heroalt-estimator-inner a,
          .heroalt-estimator-inner button {
            width: 100% !important;
            justify-content: center !important;
            box-sizing: border-box;
            min-width: 0 !important;
          }
          .heroalt-reassurance {
            gap: 10px !important;
          }
        }
      `}</style>
    </section>
  )
}
