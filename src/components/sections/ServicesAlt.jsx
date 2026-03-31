import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesAlt() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 1024)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const track = trackRef.current
        const panels = track.querySelectorAll('.sa-panel')
        const totalWidth = track.scrollWidth - window.innerWidth

        // Main horizontal scroll
        const scrollTween = gsap.to(track, {
          x: -totalWidth,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            pinType: 'transform',
          },
        })

        // Each panel: content reveal as it enters viewport
        panels.forEach((panel) => {
          const content = panel.querySelector('.sa-content')
          const img = panel.querySelector('.sa-bg')

          if (content) {
            gsap.from(content.children, {
              x: 80,
              opacity: 0,
              stagger: 0.1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left 80%',
                end: 'left 30%',
                toggleActions: 'play none none reverse',
              },
            })
          }

          // Parallax on background image within horizontal scroll
          if (img) {
            gsap.to(img, {
              xPercent: -15,
              ease: 'none',
              scrollTrigger: {
                trigger: panel,
                containerAnimation: scrollTween,
                start: 'left right',
                end: 'right left',
                scrub: true,
              },
            })
          }
        })

        // Progress fill
        gsap.fromTo('.sa-fill', { scaleX: 0 }, {
          scaleX: 1,
          transformOrigin: 'left',
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: () => `+=${totalWidth}`,
            scrub: true,
          },
        })
      } else {
        // Mobile: stagger cards
        gsap.from('.sa-panel', {
          y: 60,
          opacity: 0,
          duration: 0.9,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: trackRef.current,
            start: 'top 85%',
            once: true,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [isMobile])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--cream)', overflow: 'hidden' }}
    >
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: isMobile ? '60px 24px 32px' : '80px 24px 40px',
      }}>
        <span style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--olive)',
          display: 'inline-block',
          marginBottom: 16,
        }}>
          Nos services
        </span>
        <h2 style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 36,
          fontWeight: 400,
          color: 'var(--texte)',
          lineHeight: 1.2,
          margin: 0,
        }}>
          Des prestations sur mesure
        </h2>
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 14,
          color: 'var(--texte-light)',
          lineHeight: 1.8,
          maxWidth: 560,
          margin: '20px auto 0',
        }}>
          Du transfert aéroport au circuit touristique, chaque trajet est pensé pour
          offrir confort, ponctualité et un service irréprochable.
        </p>
      </div>

      {/* Track */}
      <div
        ref={trackRef}
        style={{
          display: 'flex',
          ...(isMobile
            ? { flexDirection: 'column', padding: '0 24px 60px', gap: 16 }
            : {}),
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
                  : { minWidth: '100vw', height: '100vh', position: 'relative', overflow: 'hidden' }),
              }}
            >
              {/* Background image with parallax */}
              <div
                className="sa-bg"
                style={{
                  position: 'absolute',
                  inset: isMobile ? 0 : '-5% -15% -5% 0',
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  willChange: 'transform',
                }}
              />

              {/* Gradient overlay */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: isMobile
                  ? 'linear-gradient(to top, rgba(42,42,42,0.85) 0%, rgba(42,42,42,0.3) 100%)'
                  : 'linear-gradient(to right, rgba(42,42,42,0.88) 0%, rgba(42,42,42,0.4) 55%, rgba(42,42,42,0.05) 100%)',
              }} />

              {/* Content */}
              <div
                className="sa-content"
                style={{
                  position: 'absolute',
                  left: isMobile ? 24 : 'max(48px, calc((100vw - 1200px) / 2))',
                  bottom: isMobile ? 24 : '15%',
                  maxWidth: 500,
                  zIndex: 1,
                }}
              >
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 12,
                  color: 'rgba(255,255,255,0.3)',
                  letterSpacing: '0.12em',
                  display: 'block',
                  marginBottom: 16,
                }}>
                  {num} / {String(SERVICES.length).padStart(2, '0')}
                </span>

                <h3 style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(28px, 4vw, 56px)',
                  fontWeight: 400,
                  color: '#fff',
                  lineHeight: 1.1,
                  margin: '0 0 16px 0',
                }}>
                  {s.titre}
                </h3>

                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 14,
                  color: 'rgba(255,255,255,0.6)',
                  lineHeight: 1.7,
                  maxWidth: 400,
                  margin: '0 0 24px 0',
                }}>
                  {s.desc}
                </p>

                {/* Tags */}
                <div style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}>
                  {s.tags.map((tag, j) => (
                    <span key={j} style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 9,
                      fontWeight: 500,
                      textTransform: 'uppercase',
                      letterSpacing: '0.08em',
                      color: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(255,255,255,0.15)',
                      backdropFilter: 'blur(8px)',
                      padding: '6px 12px',
                    }}>
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Service number watermark */}
              {!isMobile && (
                <div style={{
                  position: 'absolute',
                  right: 'max(48px, calc((100vw - 1200px) / 2))',
                  bottom: '15%',
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 'clamp(80px, 12vw, 200px)',
                  color: 'rgba(255,255,255,0.04)',
                  lineHeight: 1,
                  userSelect: 'none',
                }}>
                  {num}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Progress bar — desktop only */}
      {!isMobile && (
        <div style={{
          position: 'fixed',
          bottom: 40,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 10,
          pointerEvents: 'none',
        }}>
          <div style={{
            width: 200,
            height: 2,
            background: 'rgba(255,255,255,0.15)',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <div
              className="sa-fill"
              style={{
                height: 2,
                background: 'var(--olive)',
                width: '100%',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
              }}
            />
          </div>
        </div>
      )}
    </section>
  )
}
