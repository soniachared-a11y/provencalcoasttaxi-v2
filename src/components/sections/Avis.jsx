import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ShieldCheck, Star } from '@phosphor-icons/react'
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
    >
      {/* Olive header block */}
      <div style={{ background: 'var(--olive)', padding: '80px 24px 56px' }}>
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.6)',
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
                color: '#FFFFFF',
                lineHeight: 1.2,
                margin: 0,
              }}
            />
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 14,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.8,
              maxWidth: 560,
              margin: '20px auto 0',
              textAlign: 'center',
            }}>
              {SECTION_INTROS.avis}
            </p>
          </div>

          {/* Google rating widget */}
          <a
            href="https://www.google.com/maps?q=Taxis+Provencale+Aix#lrd=0x12c98d006ea539cd:0x67c84de7447f12d5,1"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 48,
                color: '#FFFFFF',
                lineHeight: 1,
              }}>
                4.9
              </div>
              <div style={{ fontSize: 16, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, marginTop: 4 }}>
                {STARS}
              </div>
            </div>
            <div style={{
              width: 1,
              height: 48,
              background: 'rgba(255,255,255,0.25)',
            }} />
            <div>
              <div style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 13,
                fontWeight: 600,
                color: '#FFFFFF',
              }}>
                200+ avis vérifiés
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                color: 'rgba(255,255,255,0.6)',
                marginTop: 4,
              }}>
                <ShieldCheck size={12} weight="duotone" style={{ color: 'rgba(255,255,255,0.8)' }} />
                Voir les avis Google →
              </div>
            </div>
          </a>

          {/* ── Incitation : laisser un avis Google ── */}
          <div className="avis-cta" style={{
            marginTop: 48,
            padding: '32px 28px',
            border: '1px solid rgba(255,255,255,0.18)',
            borderRadius: 4,
            background: 'rgba(255,255,255,0.04)',
            maxWidth: 640,
            marginLeft: 'auto',
            marginRight: 'auto',
            textAlign: 'center',
            backdropFilter: 'blur(4px)',
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 4,
              marginBottom: 14,
            }}>
              {[0, 1, 2, 3, 4].map(i => (
                <Star key={i} size={16} weight="fill" style={{ color: '#FBBC04' }} />
              ))}
            </div>
            <h3 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 24,
              fontWeight: 400,
              color: '#FFFFFF',
              lineHeight: 1.3,
              margin: '0 0 10px',
            }}>
              Vous avez voyagé avec nous&nbsp;?
            </h3>
            <p style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 13,
              color: 'rgba(255,255,255,0.65)',
              lineHeight: 1.7,
              margin: '0 0 22px',
              maxWidth: 480,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}>
              Votre retour aide d'autres voyageurs à nous faire confiance.
              Laissez un avis en moins d'une minute.
            </p>
            <a
              href="https://search.google.com/local/writereview?placeid=ChIJzTmlbgCNyRIR1RJ_ROdNyGc"
              target="_blank"
              rel="noopener noreferrer"
              data-cta
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: '#FFFFFF',
                color: 'var(--olive)',
                padding: '14px 28px',
                borderRadius: 2,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 2px 12px rgba(0,0,0,0.15)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.25)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = '0 2px 12px rgba(0,0,0,0.15)'
              }}
            >
              <Star size={14} weight="fill" style={{ color: '#FBBC04' }} />
              Laisser un avis Google
            </a>
          </div>
        </div>
      </div>

      {/* Cream content block */}
      <div style={{ background: 'var(--cream)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
        {/* BLOC 1 — Featured review */}
        <div
          className="avis-featured"
          style={{
            position: 'relative',
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
              color: 'var(--olive)',
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
      </div>{/* end cream content block */}

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
