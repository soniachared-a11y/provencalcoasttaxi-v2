// FlotteCards.jsx — Section flotte style PACA-CAB
// Layout minimal, 3 véhicules détourés sur fond clair, typo cohérente avec le site
// Desktop : grille 3 colonnes / Mobile : carrousel auto-défilement toutes les 2s

import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  TbUsers, TbBriefcase2, TbWifi, TbDeviceTv, TbMusic,
  TbDroplet, TbPlane, TbArmchair2, TbBolt, TbSnowflake,
  TbShieldCheck,
} from 'react-icons/tb'

gsap.registerPlugin(ScrollTrigger)

const VEHICLES = [
  {
    name: 'Berline',
    sub: 'Classe S, jusqu\'à 3 passagers',
    img: '/images/classe-s-detour.png',
    pax: 3,
    bags: 3,
    amenities: [TbWifi, TbDeviceTv, TbMusic, TbDroplet, TbSnowflake, TbArmchair2],
  },
  {
    name: 'Van',
    sub: 'Classe V, jusqu\'à 7 passagers',
    img: '/images/classe-v-detour.png',
    pax: 7,
    bags: 10,
    amenities: [TbWifi, TbDeviceTv, TbMusic, TbDroplet, TbPlane, TbBolt, TbShieldCheck, TbSnowflake],
  },
  {
    name: 'Berline Prestige',
    sub: 'Classe S, jusqu\'à 3 passagers',
    img: '/images/classe-s-detour.png',
    pax: 3,
    bags: 3,
    amenities: [TbWifi, TbDeviceTv, TbMusic, TbDroplet, TbSnowflake, TbArmchair2, TbBolt, TbShieldCheck],
  },
]

export default function FlotteCards() {
  const sectionRef = useRef(null)
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  // Carousel auto-advance (mobile uniquement — le CSS cache sur desktop)
  useEffect(() => {
    if (paused) return
    const id = setInterval(() => {
      setActive((prev) => (prev + 1) % VEHICLES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [paused])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.fc-tag', {
        y: 14, opacity: 0, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
      })
      gsap.from('.fc-title', {
        y: 26, opacity: 0, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        delay: 0.1,
      })
      gsap.from('.fc-item', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
        delay: 0.2,
      })
      gsap.from('.fc-accent', {
        scaleX: 0, duration: 1.2, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        delay: 0.3,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="flotte"
      style={{
        background: '#FFFFFF',
        padding: 'clamp(72px, 9vw, 140px) clamp(20px, 5vw, 80px)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Halo lavande décoratif en arrière-plan */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          top: '-20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'min(900px, 90%)',
          height: 540,
          background: 'radial-gradient(ellipse at center, rgba(181,166,205,0.22) 0%, rgba(181,166,205,0.08) 35%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      {/* ── Header */}
      <div style={{ textAlign: 'center', marginBottom: 'clamp(56px, 7vw, 96px)', position: 'relative', zIndex: 1 }}>
        <p className="fc-tag" style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 10,
          fontWeight: 600,
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'var(--lavande)',
          margin: '0 0 20px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 14,
        }}>
          <span style={{ width: 24, height: 1, background: 'var(--lavande)', opacity: 0.6 }} />
          Notre flotte Mercedes
          <span style={{ width: 24, height: 1, background: 'var(--lavande)', opacity: 0.6 }} />
        </p>
        <h2 className="fc-title" style={{
          fontFamily: "'Instrument Serif', serif",
          fontSize: 'clamp(32px, 4.6vw, 64px)',
          fontWeight: 400,
          color: 'var(--texte)',
          lineHeight: 1.1,
          letterSpacing: '-0.02em',
          margin: 0,
          maxWidth: 820,
          marginLeft: 'auto',
          marginRight: 'auto',
        }}>
          Voyagez en Provence avec<br />
          un véhicule <em style={{ fontStyle: 'italic', color: 'var(--olive)' }}>haut de gamme.</em>
        </h2>
        {/* Filet accent sous le titre */}
        <div
          className="fc-accent"
          style={{
            width: 80,
            height: 2,
            background: 'var(--olive)',
            margin: '28px auto 0',
            transformOrigin: 'center',
          }}
        />
      </div>

      {/* ── Viewport : grille desktop + carrousel mobile */}
      <div
        className="fc-viewport"
        style={{
          margin: '0 auto',
          position: 'relative',
          zIndex: 1,
        }}
      >
        <div
          className="fc-grid"
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setTimeout(() => setPaused(false), 4000)}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'clamp(24px, 3vw, 48px)',
            alignItems: 'start',
            transition: 'transform 0.8s cubic-bezier(0.65, 0, 0.35, 1)',
          }}
        >
          {VEHICLES.map((v, i) => {
            const isActive = i === active
            return (
              <article
                key={i}
                className="fc-item"
                style={{
                  textAlign: 'center',
                  padding: '0 clamp(8px, 1vw, 16px)',
                }}
              >
                {/* Image détourée */}
                <div style={{
                  height: 'clamp(160px, 18vw, 240px)',
                  display: 'flex',
                  alignItems: 'flex-end',
                  justifyContent: 'center',
                  marginBottom: 24,
                  position: 'relative',
                }}>
                  {/* Halo lavande derrière la voiture active (mobile) */}
                  <div
                    className="fc-halo"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'radial-gradient(ellipse at center 70%, rgba(181,166,205,0.35) 0%, transparent 60%)',
                      opacity: isActive ? 1 : 0,
                      transition: 'opacity 0.6s ease',
                      pointerEvents: 'none',
                    }}
                  />
                  {/* Ombre au sol */}
                  <div style={{
                    position: 'absolute',
                    bottom: 8,
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '76%',
                    height: 14,
                    background: 'radial-gradient(ellipse, rgba(0,0,0,0.18) 0%, transparent 65%)',
                    filter: 'blur(8px)',
                  }} />
                  <img
                    src={v.img}
                    alt={`Mercedes ${v.name}`}
                    width={800}
                    height={500}
                    loading="lazy"
                    style={{
                      maxWidth: '100%',
                      maxHeight: '100%',
                      width: 'auto',
                      height: '100%',
                      objectFit: 'contain',
                      position: 'relative',
                      zIndex: 1,
                    }}
                  />
                </div>

                {/* Nom véhicule */}
                <h3 style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: 'var(--olive)',
                  margin: '0 0 8px',
                }}>
                  {v.name}
                </h3>

                {/* Sous-titre */}
                <p style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 10,
                  fontWeight: 500,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: 'rgba(0,0,0,0.45)',
                  margin: '0 0 20px',
                }}>
                  {v.sub}
                </p>

                {/* Séparateur avec accent lavande central */}
                <div style={{
                  width: '100%',
                  height: 1,
                  background: 'linear-gradient(to right, transparent, rgba(181,166,205,0.45) 50%, transparent)',
                  margin: '0 0 20px',
                }} />

                {/* Specs */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 10,
                  alignItems: 'center',
                  marginBottom: 22,
                }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <TbUsers size={18} style={{ color: 'var(--lavande)', strokeWidth: 1.8 }} />
                    <span style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 13,
                      color: 'var(--texte)',
                    }}>
                      <strong style={{ fontWeight: 700 }}>{v.pax}</strong>
                      <span style={{ color: 'rgba(0,0,0,0.65)', marginLeft: 4 }}>
                        personnes max.
                      </span>
                    </span>
                  </div>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                    <TbBriefcase2 size={18} style={{ color: 'var(--lavande)', strokeWidth: 1.8 }} />
                    <span style={{
                      fontFamily: 'Sora, sans-serif',
                      fontSize: 13,
                      color: 'var(--texte)',
                    }}>
                      <strong style={{ fontWeight: 700 }}>{v.bags}</strong>
                      <span style={{ color: 'rgba(0,0,0,0.65)', marginLeft: 4 }}>
                        bagages max.
                      </span>
                    </span>
                  </div>
                </div>

                {/* Icônes équipements */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'center',
                  flexWrap: 'wrap',
                  gap: 14,
                }}>
                  {v.amenities.map((Icon, ai) => (
                    <Icon
                      key={ai}
                      size={20}
                      style={{ color: 'var(--olive)', strokeWidth: 1.5, opacity: 0.75 }}
                    />
                  ))}
                </div>
              </article>
            )
          })}
        </div>

        {/* Indicateurs carrousel (mobile uniquement) */}
        <div className="fc-dots" style={{
          display: 'none',
          justifyContent: 'center',
          gap: 10,
          marginTop: 36,
        }}>
          {VEHICLES.map((_, i) => (
            <button
              key={i}
              onClick={() => { setActive(i); setPaused(true); setTimeout(() => setPaused(false), 4000) }}
              aria-label={`Voir véhicule ${i + 1}`}
              style={{
                width: i === active ? 32 : 8,
                height: 8,
                borderRadius: 4,
                border: 'none',
                padding: 0,
                background: i === active ? 'var(--olive)' : 'rgba(0,0,0,0.15)',
                cursor: 'pointer',
                transition: 'all 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
              }}
            />
          ))}
        </div>
      </div>

      {/* Responsive — Carrousel mobile */}
      <style>{`
        .fc-viewport {
          max-width: 1320px;
        }
        @media (min-width: 901px) {
          .fc-viewport {
            max-width: 1320px !important;
          }
        }
        @media (max-width: 900px) {
          .fc-viewport {
            overflow: hidden;
            max-width: 100% !important;
          }
          .fc-grid {
            display: flex !important;
            grid-template-columns: none !important;
            gap: 0 !important;
            flex-wrap: nowrap;
            transform: translateX(-${active * 100}%);
          }
          .fc-item {
            flex: 0 0 100%;
            width: 100%;
            max-width: 100%;
            padding: 0 24px !important;
            box-sizing: border-box;
          }
          .fc-dots {
            display: flex !important;
          }
        }
      `}</style>
    </section>
  )
}
