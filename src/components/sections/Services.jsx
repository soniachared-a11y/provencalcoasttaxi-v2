import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SECTION_INTROS } from '../../data/content'
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

export default function Services() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)

  // Entry animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.strips-container', {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: '.strips-container',
          start: 'top 85%',
          once: true,
        },
      })

      // Parallax on active strip image
      gsap.utils.toArray('.service-strip').forEach(strip => {
        gsap.to(strip.querySelector('.strip-bg'), {
          yPercent: -15,
          ease: 'none',
          scrollTrigger: {
            trigger: strip,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Cinematic content animation on strip change
  useEffect(() => {
    const activeStrip = document.querySelector(`.service-strip[data-index="${active}"]`)
    if (!activeStrip) return

    const content = activeStrip.querySelector('.strip-content-active')
    if (!content) return

    const tl = gsap.timeline()

    // Content elements slide in with stagger
    const num = content.querySelector('.strip-num')
    const title = content.querySelector('.strip-title')
    const desc = content.querySelector('.strip-desc')
    const tags = content.querySelectorAll('.strip-tag')
    const cta = content.querySelector('.strip-cta')
    const line = content.querySelector('.strip-line')

    const elements = [num, title, desc, ...tags, cta].filter(Boolean)

    gsap.set(elements, { opacity: 0, y: 20 })
    if (line) gsap.set(line, { scaleX: 0, transformOrigin: 'left' })

    tl.to(elements, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power3.out',
      delay: 0.3,
    })

    if (line) {
      tl.to(line, {
        scaleX: 1,
        duration: 0.6,
        ease: 'power3.inOut',
      }, '-=0.3')
    }

    return () => tl.kill()
  }, [active])

  return (
    <section
      ref={sectionRef}
      id="services"
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
            {SECTION_INTROS.services}
          </p>
        </div>

        {/* Strips */}
        <div
          className="strips-container"
          style={{
            display: 'flex',
            gap: 3,
            height: 480,
            willChange: 'transform',
          }}
        >
          {SERVICES.map((s, i) => {
            const isActive = active === i
            const num = String(i + 1).padStart(2, '0')

            return (
              <div
                key={i}
                className="service-strip"
                data-index={i}
                onClick={() => setActive(i)}
                style={{
                  flex: isActive ? 5 : 1,
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
                {/* Background image with parallax */}
                <div className="strip-bg" style={{
                  position: 'absolute',
                  inset: '-15% 0',
                  width: '100%',
                  height: '130%',
                  backgroundImage: `url(${s.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  transform: isActive ? 'scale(1.08)' : 'scale(1)',
                  filter: isActive ? 'none' : 'grayscale(40%)',
                  transition: 'transform 1s cubic-bezier(0.22, 1, 0.36, 1), filter 0.8s ease',
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
                <div style={{
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
                    color: 'rgba(255,255,255,0.4)',
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
                <div className="strip-content-active" style={{
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
                  <span className="strip-num" style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.4)',
                    marginBottom: 12,
                  }}>
                    {num} / 05
                  </span>

                  <h3 className="strip-title" style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 32,
                    fontWeight: 400,
                    color: '#fff',
                    margin: '0 0 12px 0',
                    lineHeight: 1.2,
                  }}>
                    {s.titre}
                  </h3>

                  <p className="strip-desc" style={{
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 13,
                    color: 'rgba(255,255,255,0.65)',
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
      </div>

      {/* Mobile responsive */}
      <style>{`
        @media (max-width: 768px) {
          .strips-container {
            height: 360px !important;
          }
          .service-strip [style*="padding: 40px 32px"] {
            padding: 24px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
