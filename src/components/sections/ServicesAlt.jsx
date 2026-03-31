import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const PANEL_COUNT = SERVICES.length

export default function ServicesAlt() {
  const wrapperRef = useRef(null)
  const trackRef = useRef(null)

  useEffect(() => {
    const wrapper = wrapperRef.current
    const track = trackRef.current
    if (!wrapper || !track) return

    // Mobile: skip horizontal scroll
    if (window.innerWidth <= 1024) {
      const ctx = gsap.context(() => {
        gsap.from('.sa-panel', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: wrapper,
            start: 'top 85%',
            once: true,
          },
        })
      }, wrapper)
      return () => ctx.revert()
    }

    // Desktop: horizontal scroll with pin
    const ctx = gsap.context(() => {
      // Force ScrollTrigger refresh after layout
      ScrollTrigger.refresh()

      const tween = gsap.to(track, {
        xPercent: -100 * (PANEL_COUNT - 1),
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${window.innerWidth * (PANEL_COUNT - 1)}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      })

      // Content reveal per panel using containerAnimation
      track.querySelectorAll('.sa-panel').forEach((panel) => {
        const content = panel.querySelector('.sa-content')
        if (!content) return

        gsap.from(content.children, {
          x: 60,
          opacity: 0,
          stagger: 0.08,
          duration: 0.6,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: 'left 70%',
            toggleActions: 'play none none reverse',
          },
        })

        // Image parallax inside horizontal scroll
        const bg = panel.querySelector('.sa-bg')
        if (bg) {
          gsap.fromTo(bg, { xPercent: -10 }, {
            xPercent: 10,
            ease: 'none',
            scrollTrigger: {
              trigger: panel,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          })
        }
      })

      // Progress bar
      gsap.fromTo('.sa-progress-fill', { scaleX: 0 }, {
        scaleX: 1,
        transformOrigin: 'left',
        ease: 'none',
        scrollTrigger: {
          trigger: wrapper,
          start: 'top top',
          end: () => `+=${window.innerWidth * (PANEL_COUNT - 1)}`,
          scrub: true,
        },
      })
    }, wrapper)

    return () => ctx.revert()
  }, [])

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 1024

  return (
    <section ref={wrapperRef} style={{ background: 'var(--cream)', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', padding: '80px 24px 40px' }}>
        <span style={{
          fontFamily: 'Sora, sans-serif', fontSize: 10, fontWeight: 500,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          color: 'var(--olive)', display: 'inline-block', marginBottom: 16,
        }}>Nos services</span>
        <h2 style={{
          fontFamily: "'Instrument Serif', serif", fontSize: 36, fontWeight: 400,
          color: 'var(--texte)', lineHeight: 1.2, margin: 0,
        }}>Des prestations sur mesure</h2>
        <p style={{
          fontFamily: 'Sora, sans-serif', fontSize: 14, color: 'var(--texte-light)',
          lineHeight: 1.8, maxWidth: 560, margin: '20px auto 0',
        }}>
          Du transfert aéroport au circuit touristique, chaque trajet est pensé pour
          offrir confort, ponctualité et un service irréprochable.
        </p>
      </div>

      {/* Horizontal track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          width: isMobile ? '100%' : `${PANEL_COUNT * 100}vw`,
          ...(isMobile ? { flexDirection: 'column', padding: '0 24px 60px', gap: 16 } : {}),
        }}
      >
        {SERVICES.map((s, i) => {
          const num = String(i + 1).padStart(2, '0')
          return (
            <div
              key={i}
              className="sa-panel"
              style={{
                ...(isMobile
                  ? { height: '50vh', minHeight: 360, position: 'relative', overflow: 'hidden' }
                  : { width: '100vw', height: '100vh', flexShrink: 0, position: 'relative', overflow: 'hidden' }),
              }}
            >
              {/* BG image with parallax */}
              <div className="sa-bg" style={{
                position: 'absolute', inset: '-10%', width: '120%', height: '120%',
                backgroundImage: `url(${s.image})`, backgroundSize: 'cover',
                backgroundPosition: 'center', willChange: 'transform',
              }} />

              {/* Overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: isMobile
                  ? 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.2) 100%)'
                  : 'linear-gradient(105deg, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.05) 100%)',
              }} />

              {/* Content */}
              <div className="sa-content" style={{
                position: 'absolute',
                left: isMobile ? 24 : 'max(60px, calc((100vw - 1100px) / 2))',
                bottom: isMobile ? 24 : '12%', maxWidth: 480, zIndex: 1,
              }}>
                <span style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 13,
                  color: 'var(--olive)', fontWeight: 600,
                  letterSpacing: '0.12em', display: 'block', marginBottom: 20,
                }}>{num}</span>

                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(28px, 4vw, 52px)', fontWeight: 400,
                  color: '#fff', lineHeight: 1.1, margin: '0 0 20px 0',
                }}>{s.titre}</h3>

                <p style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 14,
                  color: 'rgba(255,255,255,0.6)', lineHeight: 1.7,
                  maxWidth: 380, margin: '0 0 28px 0',
                }}>{s.desc}</p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {s.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 500,
                      textTransform: 'uppercase', letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)', padding: '6px 14px',
                    }}>{tag}</span>
                  ))}
                </div>
              </div>

              {/* Large number watermark */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  right: 'max(60px, calc((100vw - 1100px) / 2))',
                  top: '50%', transform: 'translateY(-50%)',
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(120px, 15vw, 240px)',
                  color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none',
                }}>{num}</div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar */}
      {!isMobile && (
        <div style={{
          position: 'fixed', bottom: 40, left: '50%', transform: 'translateX(-50%)',
          zIndex: 100, pointerEvents: 'none',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{
              fontFamily: 'Sora, sans-serif', fontSize: 9, color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>Scroll</span>
            <div style={{
              width: 160, height: 2, background: 'rgba(255,255,255,0.12)',
              position: 'relative', overflow: 'hidden',
            }}>
              <div className="sa-progress-fill" style={{
                height: 2, background: 'var(--olive)', width: '100%',
                transformOrigin: 'left', transform: 'scaleX(0)',
              }} />
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
