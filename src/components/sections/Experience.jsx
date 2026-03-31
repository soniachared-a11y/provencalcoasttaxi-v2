import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Shield, Clock, Crown } from 'lucide-react'
import { EXPERIENCE_FEATURES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const ICON_MAP = { Shield, Clock, Crown }

export default function Experience() {
  const sectionRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax
      if (bgRef.current) {
        gsap.to(bgRef.current, {
          yPercent: -20,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        })
      }

      // Heading reveal
      gsap.from('.exp-heading', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Cards stagger
      gsap.from('.exp-card', {
        y: 60,
        opacity: 0,
        duration: 0.9,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.exp-cards',
          start: 'top 85%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="experience"
      style={{
        background: 'var(--texte)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/images/lavande-provence.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '120%',
          objectFit: 'cover',
          opacity: 0.15,
          pointerEvents: 'none',
        }}
      />

      {/* Container */}
      <div
        className="exp-container"
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '120px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="exp-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 80,
            alignItems: 'start',
          }}
        >
          {/* LEFT — Text */}
          <div className="exp-heading">
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
              L'excellence
            </span>

            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(32px, 4vw, 48px)',
              fontWeight: 400,
              color: '#fff',
              lineHeight: 1.15,
              margin: '0 0 24px 0',
            }}>
              L'exp&eacute;rience Proven&ccedil;al Coast
            </h2>

            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.55)',
              lineHeight: 1.8,
              maxWidth: 440,
              margin: '0 0 0 0',
            }}>
              Chaque trajet est une invitation au calme et au raffinement.
              Nos chauffeurs, nos v&eacute;hicules et notre attention au d&eacute;tail
              font de chaque d&eacute;placement un moment privil&eacute;gi&eacute;.
            </p>

            {/* Decorative line */}
            <div style={{
              width: 56,
              height: 2,
              background: 'var(--olive)',
              margin: '32px 0',
            }} />

            {/* CTA link */}
            <a
              href="#services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: '#fff',
                textDecoration: 'none',
                position: 'relative',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.gap = '14px'
                const line = e.currentTarget.querySelector('.cta-line')
                if (line) line.style.width = '100%'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.gap = '10px'
                const line = e.currentTarget.querySelector('.cta-line')
                if (line) line.style.width = '24px'
              }}
            >
              D&eacute;couvrir
              <ArrowRight size={14} strokeWidth={2} />
              <span
                className="cta-line"
                style={{
                  position: 'absolute',
                  bottom: -4,
                  left: 0,
                  width: 24,
                  height: 1,
                  background: 'var(--olive)',
                  transition: 'width 0.4s ease',
                }}
              />
            </a>
          </div>

          {/* RIGHT — Feature cards */}
          <div className="exp-cards">
            {EXPERIENCE_FEATURES.map((feat, i) => {
              const Icon = ICON_MAP[feat.icon]
              return (
                <div
                  key={i}
                  className="exp-card"
                  style={{
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    padding: 32,
                    marginTop: i === 0 ? 0 : i === 1 ? 32 : 64,
                    transition: 'background 0.4s ease, border-color 0.4s ease',
                    cursor: 'default',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)'
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.04)'
                    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'
                  }}
                >
                  {Icon && (
                    <Icon
                      size={24}
                      strokeWidth={1.5}
                      style={{ color: 'var(--olive)' }}
                    />
                  )}
                  <div style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 14,
                    fontWeight: 600,
                    color: '#fff',
                    margin: '16px 0 8px',
                  }}>
                    {feat.title}
                  </div>
                  <div style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.5)',
                    lineHeight: 1.6,
                  }}>
                    {feat.desc}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .exp-grid {
            grid-template-columns: 1fr !important;
            gap: 40px !important;
          }
          .exp-container {
            padding: 80px 24px !important;
          }
          .exp-card {
            margin-top: 16px !important;
          }
          .exp-card:first-child {
            margin-top: 0 !important;
          }
        }
      `}</style>
    </section>
  )
}
