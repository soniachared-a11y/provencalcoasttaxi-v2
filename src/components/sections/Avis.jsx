import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Shield } from 'lucide-react'
import { AVIS, SECTION_INTROS } from '../../data/content'
import CharReveal from '../ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

const STARS = '★★★★★'

function Initials({ nom }) {
  const parts = nom.split(' ')
  const initials = parts.map(p => p[0]).join('')
  return (
    <div style={{
      width: 44,
      height: 44,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--lavande), var(--olive))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Sora, sans-serif',
      fontSize: 14,
      fontWeight: 600,
      color: '#fff',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export default function Avis() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const textRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.avis-featured', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.avis-quote-mark', {
        scale: 0.5,
        opacity: 0,
        duration: 1.2,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Subtle scale parallax on featured citation
      gsap.fromTo('.avis-featured', {
        scale: 0.98,
      }, {
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: '.avis-featured',
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Auto-rotate every 6s
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!textRef.current) return
      gsap.to(textRef.current, {
        opacity: 0,
        y: -10,
        duration: 0.4,
        ease: 'power2.in',
        onComplete() {
          setCurrent(prev => (prev + 1) % AVIS.length)
          gsap.fromTo(textRef.current,
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
        },
      })
    }, 6000)
    return () => clearInterval(timerRef.current)
  }, [])

  const avis = AVIS[current]

  // Marquee content (duplicated for seamless loop)
  const marqueeItems = [...AVIS, ...AVIS]

  return (
    <section
      ref={sectionRef}
      id="avis"
      style={{ background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px 0' }}>
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
            Avis clients
          </span>
          <CharReveal
            text="Ils nous font confiance"
            as="h2"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 36,
              fontWeight: 400,
              color: 'var(--texte)',
              lineHeight: 1.2,
              margin: 0,
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 560,
            margin: '20px auto 0',
            textAlign: 'center',
          }}>
            {SECTION_INTROS.avis}
          </p>
        </div>

        {/* Google rating widget */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 16,
          marginBottom: 40,
        }}>
          <div style={{ textAlign: 'right' }}>
            <div style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 48,
              color: 'var(--olive)',
              lineHeight: 1,
            }}>
              4.9
            </div>
            <div style={{ fontSize: 16, color: 'var(--lavande)', letterSpacing: 2, marginTop: 4 }}>
              {STARS}
            </div>
          </div>
          <div style={{
            width: 1,
            height: 48,
            background: 'var(--border)',
          }} />
          <div>
            <div style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 13,
              fontWeight: 600,
              color: 'var(--texte)',
            }}>
              200+ avis vérifiés
            </div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              color: 'var(--texte-light)',
              marginTop: 4,
            }}>
              <Shield size={12} strokeWidth={2} style={{ color: 'var(--olive)' }} />
              Avis Google vérifiés
            </div>
          </div>
        </div>

        {/* BLOC 1 — Featured review */}
        <div
          className="avis-featured"
          style={{
            position: 'relative',
            borderTop: '1px solid var(--border)',
            borderBottom: '1px solid var(--border)',
            padding: '64px 0',
            textAlign: 'center',
          }}
        >
          {/* Decorative quote mark */}
          <span
            className="avis-quote-mark"
            style={{
              position: 'absolute',
              top: 24,
              left: 0,
              fontFamily: "'Instrument Serif', serif",
              fontSize: 120,
              color: 'var(--lavande)',
              opacity: 0.12,
              lineHeight: 1,
              userSelect: 'none',
            }}
          >
            &ldquo;
          </span>

          {/* Quote text + author */}
          <div ref={textRef}>
            <p style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 36,
              fontStyle: 'italic',
              fontWeight: 400,
              color: 'var(--texte)',
              lineHeight: 1.35,
              maxWidth: 800,
              margin: '0 auto 40px',
            }}>
              {avis.texte}
            </p>

            {/* Author */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
            }}>
              <Initials nom={avis.nom} />
              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--texte)',
                }}>
                  {avis.nom}
                </div>
                <div style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  color: 'var(--texte-light)',
                }}>
                  {avis.ville}
                </div>
              </div>
              <div style={{
                fontSize: 14,
                color: 'var(--lavande)',
                letterSpacing: 2,
                marginLeft: 8,
              }}>
                {STARS}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* BLOC 2 — Marquee */}
      <div
        style={{
          borderTop: '1px solid var(--border)',
          padding: '20px 0',
          overflow: 'hidden',
        }}
        aria-hidden="true"
      >
        <div
          className="marquee-track"
          style={{
            display: 'flex',
            gap: 48,
            width: 'max-content',
          }}
        >
          {marqueeItems.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 48 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, whiteSpace: 'nowrap' }}>
                <span style={{
                  color: 'var(--lavande)',
                  fontSize: 12,
                  letterSpacing: 2,
                }}>
                  {STARS}
                </span>
                <span style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 15,
                  fontStyle: 'italic',
                  color: 'var(--texte)',
                }}>
                  {a.texte.length > 60 ? a.texte.substring(0, 60) + '…' : a.texte}
                </span>
                <span style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 11,
                  color: 'var(--texte-light)',
                }}>
                  — {a.nom}
                </span>
              </div>
              {/* Separator dot */}
              <div style={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                background: 'var(--border)',
                flexShrink: 0,
              }} />
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .marquee-track {
          animation: marquee 30s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          #avis .avis-featured p {
            font-size: 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
