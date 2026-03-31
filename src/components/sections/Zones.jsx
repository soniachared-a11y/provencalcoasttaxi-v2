import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight } from 'lucide-react'
import { ZONES, SECTION_INTROS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function Zones() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.zones-layout', {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.zones-item', {
        x: 20,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.zones-list',
          start: 'top 82%',
          once: true,
        },
      })

      // Parallax on zones map image
      gsap.to('.zones-bg-image', {
        yPercent: -12,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  const z = ZONES[active]

  return (
    <section
      ref={sectionRef}
      id="zones"
      style={{ background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--lavande)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Nos zones
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            fontWeight: 400,
            color: 'var(--texte)',
            lineHeight: 1.2,
            margin: '0 0 20px 0',
          }}>
            Destinations desservies
          </h2>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 560,
            margin: '0 auto',
            textAlign: 'center',
          }}>
            {SECTION_INTROS.zones}
          </p>
        </div>

        {/* Grid layout */}
        <div
          className="zones-layout"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.2fr 0.8fr',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {/* Left — Carte enrichie */}
          <div style={{
            position: 'relative',
            overflow: 'hidden',
            background: 'var(--surface-alt)',
            minHeight: 400,
          }}>
            <img
              src="/images/vignes-provence.jpg"
              alt="Vignobles de Provence"
              loading="lazy"
              className="zones-bg-image"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '120%',
                objectFit: 'cover',
                opacity: 0.25,
              }}
            />
            {/* Active destination overlay with blur */}
            <div style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 40,
            }}>
              <div style={{
                background: 'rgba(255,255,255,0.75)',
                backdropFilter: 'blur(12px)',
                padding: '40px 48px',
                textAlign: 'center',
                maxWidth: 400,
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 10,
                  fontWeight: 500,
                  textTransform: 'uppercase',
                  letterSpacing: '0.15em',
                  color: 'var(--lavande)',
                  display: 'block',
                  marginBottom: 16,
                }}>
                  Depuis Aix-en-Provence
                </span>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 40,
                  color: 'var(--texte)',
                  display: 'block',
                  lineHeight: 1.1,
                  marginBottom: 16,
                }}>
                  {z?.destination}
                </span>
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 24,
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 13,
                  color: 'var(--texte-light)',
                  marginBottom: 24,
                }}>
                  <span>{z?.distance}</span>
                  <span>{z?.duree}</span>
                  <span style={{ color: 'var(--olive)', fontWeight: 600 }}>{z?.prix}</span>
                </div>
                <a
                  href="#contact"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 11,
                    fontWeight: 600,
                    textTransform: 'uppercase',
                    letterSpacing: '0.1em',
                    color: 'var(--lavande)',
                    textDecoration: 'none',
                  }}
                >
                  Réserver ce trajet
                  <ArrowRight size={14} strokeWidth={2} />
                </a>
              </div>
            </div>
          </div>

          {/* Right — Liste */}
          <div className="zones-list" style={{ borderLeft: '1px solid var(--border)' }}>
            {ZONES.map((zone, i) => {
              const isActive = active === i
              return (
                <div
                  key={i}
                  className="zones-item"
                  onClick={() => setActive(i)}
                  style={{
                    position: 'relative',
                    padding: '28px 32px',
                    borderBottom: i < ZONES.length - 1 ? '1px solid var(--border)' : 'none',
                    cursor: 'pointer',
                    background: isActive ? 'var(--surface-alt)' : 'transparent',
                    transition: 'background 0.3s ease',
                    willChange: 'transform',
                  }}
                  onMouseEnter={e => {
                    if (!isActive) e.currentTarget.style.background = 'var(--surface-alt)'
                  }}
                  onMouseLeave={e => {
                    if (!isActive) e.currentTarget.style.background = 'transparent'
                  }}
                >
                  {/* Accent bar */}
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width: 2,
                    background: isActive ? 'var(--lavande)' : 'transparent',
                    transition: 'background 0.3s ease',
                  }} />

                  {/* Destination */}
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 18,
                    color: 'var(--texte)',
                    marginBottom: 6,
                  }}>
                    {zone.destination}
                  </div>

                  {/* Meta */}
                  <div style={{
                    display: 'flex',
                    gap: 16,
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    alignItems: 'center',
                    marginBottom: zone.detail ? 6 : 0,
                  }}>
                    <span style={{ color: 'var(--texte-light)' }}>{zone.distance}</span>
                    <span style={{ color: 'var(--texte-light)' }}>{zone.duree}</span>
                    <span style={{ color: 'var(--olive)', fontWeight: 600 }}>{zone.prix}</span>
                  </div>

                  {/* Detail text */}
                  {zone.detail && (
                    <div style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 11,
                      color: 'var(--texte-light)',
                      lineHeight: 1.5,
                    }}>
                      {zone.detail}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .zones-layout {
            grid-template-columns: 1fr !important;
          }
          .zones-list {
            border-left: none !important;
            border-top: 1px solid var(--border);
          }
        }
      `}</style>
    </section>
  )
}
