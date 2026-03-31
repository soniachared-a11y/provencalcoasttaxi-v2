import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function ServicesAlt() {
  const sectionRef = useRef(null)
  const trackRef = useRef(null)
  const fillRef = useRef(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    if (!sectionRef.current || !trackRef.current) return

    const ctx = gsap.context(() => {
      if (!isMobile) {
        const track = trackRef.current
        const totalWidth = track.scrollWidth - window.innerWidth

        gsap.to(track, {
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
          },
        })

        if (fillRef.current) {
          gsap.fromTo(fillRef.current, { scaleX: 0 }, {
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
        }
      } else {
        gsap.from('.services-alt-card', {
          y: 50,
          opacity: 0,
          duration: 0.8,
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
      style={{ background: 'var(--cream)', overflow: isMobile ? 'visible' : 'hidden' }}
    >
      {/* Header */}
      <div style={{
        textAlign: 'center',
        padding: '80px 24px 40px',
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
          textAlign: 'center',
        }}>
          Du transfert aéroport au circuit touristique, chaque trajet est pensé pour
          offrir confort, ponctualité et un service irréprochable.
        </p>
      </div>

      {/* Horizontal scroll area / Mobile stack */}
      <div style={{ position: 'relative' }}>
        <div
          ref={trackRef}
          style={{
            display: 'flex',
            gap: 0,
            ...(isMobile
              ? { flexDirection: 'column', padding: '0 24px 80px' }
              : {}),
          }}
        >
          {SERVICES.map((s, i) => {
            const num = String(i + 1).padStart(2, '0')

            return (
              <div
                key={i}
                className="services-alt-card"
                style={{
                  ...(isMobile
                    ? { height: '70vh', marginBottom: 16, position: 'relative', borderRadius: 8, overflow: 'hidden' }
                    : { minWidth: '100vw', height: '100vh', position: 'relative' }),
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to right, rgba(42,42,42,0.85) 0%, rgba(42,42,42,0.4) 60%, rgba(42,42,42,0.1) 100%)',
                }} />

                {/* Content */}
                <div style={{
                  position: 'absolute',
                  left: isMobile ? 24 : 'max(24px, calc((100vw - 1200px) / 2))',
                  bottom: '15%',
                  maxWidth: 500,
                  zIndex: 1,
                }}>
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
                    fontSize: 'clamp(32px, 4vw, 56px)',
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
                    marginBottom: 24,
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
              </div>
            )
          })}
        </div>

        {/* Progress bar — desktop only */}
        {!isMobile && (
          <div style={{
            position: 'absolute',
            bottom: 40,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
          }}>
            <div style={{
              width: 200,
              height: 2,
              background: 'rgba(255,255,255,0.15)',
              position: 'relative',
            }}>
              <div
                ref={fillRef}
                style={{
                  height: 2,
                  background: 'var(--olive)',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  transformOrigin: 'left',
                  transform: 'scaleX(0)',
                }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
