import { useState, useEffect, useRef, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import CharReveal from '../ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  {
    titre: 'Transfert Aéroport',
    desc: 'Prise en charge personnalisée dès votre atterrissage à Marseille-Provence ou Nice Côte d\'Azur. Suivi de vol en temps réel, panneau nominatif à l\'arrivée, assistance bagages. Tarif fixe garanti, pas de supplément en cas de retard de vol.',
    tags: ['Suivi de vol', 'Tarif fixe', 'Panneau nominatif'],
    image: '/images/classe-s-parking.jpg',
  },
  {
    titre: 'Déplacement Affaires',
    desc: 'Ponctualité absolue et discrétion garantie pour vos rendez-vous professionnels. Mise à disposition à la demi-journée ou journée complète. Wi-Fi à bord, chargeurs, eau minérale. Votre bureau mobile en Mercedes Classe S.',
    tags: ['Wi-Fi', 'Discrétion', 'Mise à disposition'],
    image: '/images/classe-s-interieur.jpg',
  },
  {
    titre: 'Événements & Soirées',
    desc: 'Mariages, galas, concerts, soirées privées. Aller-retour avec chauffeur dédié qui reste à votre disposition toute la soirée. Attente incluse, itinéraire flexible. Profitez de votre événement, on s\'occupe du reste.',
    tags: ['Aller-retour', 'Attente incluse'],
    image: '/images/flotte-chateau.jpeg',
  },
  {
    titre: 'Longue Distance',
    desc: 'Nice, Lyon, Monaco, Cannes et au-delà. Voyagez en tout confort sans les contraintes du train ou de l\'avion. Véhicule privé, arrêts à la demande, tarif négocié pour les longs trajets.',
    tags: ['France entière', 'Tarif négocié'],
    image: '/images/classe-s-bastide.jpg',
  },
  {
    titre: 'Visite Touristique',
    desc: 'Gordes, Roussillon, les Calanques, le Luberon, les champs de lavande. Itinéraires sur mesure à la demi-journée ou journée complète. Votre chauffeur connaît chaque route, chaque point de vue, chaque adresse secrète de Provence.',
    tags: ['Sur mesure', 'Demi-journée'],
    image: '/images/lavande-provence.jpg',
  },
]

const CYCLE_DURATION = 5 // seconds per strip

export default function Services() {
  const [active, setActive] = useState(0)
  const [autoPlay, setAutoPlay] = useState(false)
  const sectionRef = useRef(null)
  const timerRef = useRef(null)
  const progressRef = useRef(null)

  const stopAuto = useCallback(() => {
    setAutoPlay(false)
    if (timerRef.current) clearInterval(timerRef.current)
    if (progressRef.current) gsap.killTweensOf(progressRef.current)
  }, [])

  const handleClick = useCallback((i) => {
    stopAuto()
    setActive(i)
  }, [stopAuto])

  const animateProgress = useCallback(() => {
    if (!progressRef.current) return
    gsap.fromTo(progressRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: CYCLE_DURATION, ease: 'none', transformOrigin: 'left' }
    )
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.strips-container', {
        y: 60, opacity: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: {
          trigger: '.strips-container',
          start: 'top 85%',
          once: true,
          onEnter: () => {
            setTimeout(() => {
              setActive(0)
              setAutoPlay(true)
            }, 900)
          },
        },
      })
      gsap.from('.srv-line-l', {
        scaleX: 0, transformOrigin: 'right', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.srv-discover', start: 'top 95%', once: true },
      })
      gsap.from('.srv-line-r', {
        scaleX: 0, transformOrigin: 'left', duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: '.srv-discover', start: 'top 95%', once: true },
      })
      gsap.from('.srv-discover-txt', {
        opacity: 0, y: 6, duration: 0.8, delay: 0.5,
        scrollTrigger: { trigger: '.srv-discover', start: 'top 95%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!autoPlay) return
    animateProgress()
    timerRef.current = setInterval(() => {
      setActive(prev => {
        const next = (prev + 1) % SERVICES.length
        animateProgress()
        return next
      })
    }, CYCLE_DURATION * 1000)
    return () => clearInterval(timerRef.current)
  }, [autoPlay, animateProgress])

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ background: 'var(--cream)' }}
    >
      <div style={{ padding: '80px 0 0' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56, maxWidth: 1200, margin: '0 auto 56px', padding: '0 24px' }}>
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
            Nos services
          </span>
          <CharReveal
            text="Une offre complète"
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
            Du transfert aéroport au circuit touristique, chaque trajet est pensé pour offrir confort, ponctualité et un service irréprochable.
          </p>
        </div>

        {/* Strips */}
        <div
          className="strips-container"
          style={{
            display: 'flex',
            gap: 3,
            height: 600,
            width: '100%',
            willChange: 'transform',
            overflow: 'hidden',
          }}
        >
          {SERVICES.map((s, i) => {
            const isActive = active === i
            const num = String(i + 1).padStart(2, '0')

            return (
              <div
                key={i}
                className="service-strip"
                data-active={String(isActive)}
                onClick={() => handleClick(i)}
                style={{
                  flex: isActive ? 5 : 1,
                  minWidth: isActive ? 0 : 160,
                  position: 'relative',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'flex 0.7s cubic-bezier(0.76, 0, 0.24, 1), transform 0.3s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) e.currentTarget.style.transform = 'scale(1.02)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'scale(1)'
                }}
              >
                {/* Background image */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isActive ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.7s cubic-bezier(0.76, 0, 0.24, 1)',
                }} />

                {/* Gradient overlay */}
                <div style={{
                  position: 'absolute',
                  inset: 0,
                  background: isActive
                    ? 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.25) 50%, rgba(0,0,0,0.1) 100%)'
                    : 'linear-gradient(to top, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.2) 100%)',
                  transition: 'background 0.5s ease',
                }} />

                {/* Accent bar (active) */}
                <div style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 2,
                  height: isActive ? '100%' : '0%',
                  background: 'var(--olive)',
                  transition: 'height 0.6s cubic-bezier(0.76, 0, 0.24, 1)',
                  transitionDelay: isActive ? '0.2s' : '0s',
                }} />

                {/* Closed state content */}
                <div data-closed="" style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  padding: '24px 0',
                  opacity: isActive ? 0 : 1,
                  transition: 'opacity 0.3s ease',
                  pointerEvents: isActive ? 'none' : 'auto',
                }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 14,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 12,
                  }}>
                    {num}
                  </span>
                  <span style={{
                    writingMode: 'vertical-rl',
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 16,
                    color: '#fff',
                    letterSpacing: '0.02em',
                  }}>
                    {s.titre}
                  </span>
                </div>

                {/* Open state content */}
                <div data-open="" style={{
                  position: 'absolute',
                  inset: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'flex-end',
                  padding: '40px 32px',
                  opacity: isActive ? 1 : 0,
                  transition: `opacity 0.3s ease ${isActive ? '0.2s' : '0s'}`,
                  pointerEvents: isActive ? 'auto' : 'none',
                }}>
                  <span style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.7)',
                    marginBottom: 12,
                  }}>
                    {num} / 05
                  </span>

                  <h3 style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 32,
                    fontWeight: 400,
                    color: '#fff',
                    margin: '0 0 12px 0',
                    lineHeight: 1.2,
                  }}>
                    {s.titre}
                  </h3>

                  <p style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.85)',
                    lineHeight: 1.6,
                    margin: '0 0 20px 0',
                    maxWidth: 360,
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

                  {/* CTA */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 1, background: 'var(--olive)' }} />
                      <span style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 11,
                        fontWeight: 500,
                        textTransform: 'uppercase',
                        letterSpacing: '0.1em',
                        color: '#fff',
                      }}>
                        Réserver
                      </span>
                    </div>
                    {s.prix && (
                      <span style={{
                        fontFamily: 'Sora, sans-serif',
                        fontSize: 12,
                        fontWeight: 600,
                        color: 'var(--lavande)',
                      }}>
                        {s.prix}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress bar */}
        {autoPlay && (
          <div style={{
            width: '100%',
            height: 2,
            background: 'var(--border)',
            overflow: 'hidden',
          }}>
            <div
              ref={progressRef}
              style={{
                height: '100%',
                background: 'var(--olive)',
                transformOrigin: 'left',
                transform: 'scaleX(0)',
              }}
            />
          </div>
        )}
      </div>

      {/* Discover CTA */}
      <div className="srv-discover" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        gap: 20, padding: '16px 0 20px',
      }}>
        <div className="srv-line-l" style={{
          height: 1, width: 'clamp(40px,8vw,100px)',
          background: 'var(--lavande)', opacity: 0.25,
        }} />
        <Link
          to="/services"
          className="srv-discover-txt"
          style={{
            fontFamily: 'Sora, sans-serif', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.28em', textTransform: 'uppercase',
            color: 'var(--lavande)', opacity: 1, textDecoration: 'none',
            display: 'inline-flex', alignItems: 'center', gap: 10,
            transition: 'opacity 0.3s ease, gap 0.3s ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.gap = '16px'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.opacity = '1'
            e.currentTarget.style.gap = '10px'
          }}
        >
          Découvrir tous nos services
          <span style={{ fontSize: 14, lineHeight: 1 }}>→</span>
        </Link>
        <div className="srv-line-r" style={{
          height: 1, width: 'clamp(40px,8vw,100px)',
          background: 'var(--lavande)', opacity: 0.25,
        }} />
      </div>

      {/* Mobile responsive */}
      <style>{`
        #services { overflow: hidden; }
        @media (max-width: 768px) {
          /* Convert strips to stacked accordion cards */
          .strips-container {
            flex-direction: column !important;
            height: auto !important;
            gap: 2px !important;
          }
          .service-strip {
            flex: none !important;
            min-width: 0 !important;
            min-height: 64px !important;
            transition: min-height 0.5s cubic-bezier(0.76,0,0.24,1) !important;
          }
          /* Active strip taller */
          .service-strip[data-active="true"] {
            min-height: 320px !important;
          }
          /* Closed state — horizontal layout on mobile */
          .service-strip [data-closed] {
            flex-direction: row !important;
            justify-content: flex-start !important;
            align-items: center !important;
            padding: 0 20px !important;
            gap: 12px;
          }
          .service-strip [data-closed] span[style*="writing-mode"] {
            writing-mode: horizontal-tb !important;
            font-size: 14px !important;
          }
          /* Open content padding */
          .service-strip [data-open] { padding: 24px 20px !important; }
          .service-strip [data-open] h3 { font-size: 22px !important; }
          #services > div:first-child { padding-top: 44px !important; }
        }
        @media (max-width: 480px) {
          .service-strip[data-active="true"] { min-height: 280px !important; }
        }
      `}</style>
    </section>
  )
}
