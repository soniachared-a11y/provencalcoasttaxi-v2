import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PARTNERS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

export default function PartnersBar() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from('.partner-item', {
            y: 20,
            opacity: 0,
            duration: 0.7,
            stagger: 0.08,
            ease: 'power3.out',
          })
          gsap.from('.partner-sep', {
            scaleY: 0,
            opacity: 0,
            duration: 0.5,
            stagger: 0.08,
            delay: 0.2,
            ease: 'power2.out',
            transformOrigin: 'center',
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="partners"
      style={{
        background: 'var(--texte)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '40px 24px',
      }}>
        {/* Label */}
        <p style={{
          fontFamily: "'Sora', sans-serif",
          fontSize: '10px',
          fontWeight: 600,
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          color: 'rgba(255, 255, 255, 0.35)',
          textAlign: 'center',
          marginBottom: '32px',
        }}>
          Ils nous font confiance
        </p>

        {/* Partners row */}
        <div className="partners-row" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '48px',
        }}>
          {PARTNERS.map((partner, i) => (
            <div key={i} style={{ display: 'contents' }}>
              <div
                className="partner-item"
                style={{
                  textAlign: 'center',
                  opacity: 0.5,
                  transition: 'opacity 0.4s ease',
                  cursor: 'default',
                  flex: '1 1 0',
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '0.8' }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '0.5' }}
              >
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '13px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  color: '#FFFFFF',
                  letterSpacing: '0.05em',
                }}>
                  {partner.name}
                </div>
                <div style={{
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '9px',
                  textTransform: 'uppercase',
                  letterSpacing: '0.12em',
                  color: 'rgba(255, 255, 255, 0.35)',
                  marginTop: '4px',
                }}>
                  {partner.subtitle}
                </div>
              </div>

              {/* Separator (not after last item) */}
              {i < PARTNERS.length - 1 && (
                <div
                  className="partner-sep"
                  style={{
                    width: '1px',
                    height: '40px',
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    flexShrink: 0,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #partners .partners-row {
            display: grid !important;
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 24px !important;
            justify-items: center;
          }
          #partners .partner-sep {
            display: none !important;
          }
        }
      `}</style>
    </section>
  )
}
