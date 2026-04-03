import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ArrowRight, ArrowUpRight,
  WifiHigh, Drop, Baby, Snowflake, Lightning, Armchair,
  Users, Suitcase,
} from '@phosphor-icons/react'

gsap.registerPlugin(ScrollTrigger)

const VEHICLES = [
  {
    num: '01',
    classe: 'Business',
    modele: 'Classe E',
    sub: 'Berline confort',
    desc: 'Élégance quotidienne pour vos transferts aéroport et déplacements professionnels en Provence.',
    pax: 3, bags: 3,
    img: '/images/classe-e-provence.jpg',
    accent: '#6B7D4A',
    accentVar: 'var(--olive)',
    amenities: [
      { Icon: WifiHigh, label: 'Wi-Fi' },
      { Icon: Drop, label: 'Eau fraîche' },
      { Icon: Snowflake, label: 'Clim auto' },
      { Icon: Lightning, label: 'USB-C' },
    ],
  },
  {
    num: '02',
    classe: 'Prestige',
    modele: 'Classe S',
    sub: 'Limousine de référence',
    desc: "Sièges massants, suspension pneumatique. L'expérience ultime pour vos clients VIP et déplacements d'exception.",
    pax: 3, bags: 3,
    img: '/images/classe-s-bastide.jpg',
    accent: '#7A6091',
    accentVar: 'var(--lavande)',
    amenities: [
      { Icon: WifiHigh, label: 'Wi-Fi' },
      { Icon: Drop, label: 'Eau Évian' },
      { Icon: Baby, label: 'Siège bébé' },
      { Icon: Snowflake, label: 'Clim auto' },
      { Icon: Lightning, label: 'USB-C' },
      { Icon: Armchair, label: 'Massant' },
    ],
  },
  {
    num: '03',
    classe: 'Grand format',
    modele: 'Classe V',
    sub: 'Van premium',
    desc: "L'espace d'un van, le confort d'une limousine. Idéal pour les groupes, familles et transferts événementiels.",
    pax: 7, bags: 7,
    img: '/images/classe-v-bastide.jpg',
    accent: '#6B7D4A',
    accentVar: 'var(--olive)',
    amenities: [
      { Icon: WifiHigh, label: 'Wi-Fi' },
      { Icon: Drop, label: 'Eau fraîche' },
      { Icon: Baby, label: 'Siège bébé' },
      { Icon: Snowflake, label: 'Clim auto' },
      { Icon: Lightning, label: 'USB-C' },
    ],
  },
]

export default function Flotte() {
  const sectionRef    = useRef(null)
  const imgRef        = useRef(null)
  const contentRef    = useRef(null)
  const timerBarRef   = useRef(null)
  const timerTweenRef = useRef(null)
  const hovering      = useRef(false)
  const hasEnteredRef = useRef(false)

  const [active, setActive]               = useState(0)
  const [transitioning, setTransitioning] = useState(false)

  // ── Auto-timer (reset on each active change)
  const startTimer = () => {
    if (timerTweenRef.current) timerTweenRef.current.kill()
    if (!timerBarRef.current) return
    gsap.set(timerBarRef.current, { scaleX: 0, transformOrigin: 'left' })
    timerTweenRef.current = gsap.to(timerBarRef.current, {
      scaleX: 1,
      duration: 4.5,
      ease: 'none',
      onComplete: () => {
        if (!hovering.current) {
          setActive(prev => (prev + 1) % VEHICLES.length)
        }
      },
    })
  }

  // ── Entrance (once)
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          if (hasEnteredRef.current) return
          hasEnteredRef.current = true

          gsap.from('.flt-header', {
            y: 20, opacity: 0, duration: 0.9, ease: 'power3.out',
          })
          gsap.from('.flt-tabs', {
            y: 16, opacity: 0, duration: 0.8, ease: 'power3.out', delay: 0.1,
          })
          gsap.from('.flt-feature', {
            y: 36, duration: 1, ease: 'power3.out', delay: 0.2,
          })
          gsap.from('.flt-bottom-strip', {
            y: 10, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.35,
          })

          setTimeout(startTimer, 900)
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // ── Content reveal on tab switch
  useEffect(() => {
    if (!imgRef.current || !contentRef.current) return
    const t1 = gsap.fromTo(
      [imgRef.current, contentRef.current],
      { opacity: 0 },
      {
        opacity: 1, duration: 0.5, ease: 'power2.out', stagger: 0.05,
        overwrite: true,
        onComplete: () => {
          if (hasEnteredRef.current) startTimer()
        },
      }
    )
    const t2 = contentRef.current.children.length
      ? gsap.fromTo(
          contentRef.current.children,
          { y: 16, opacity: 0 },
          { y: 0, opacity: 1, stagger: 0.065, duration: 0.5, ease: 'power3.out', delay: 0.05, overwrite: true }
        )
      : null
    return () => { t1.kill(); t2?.kill() }
  }, [active])

  // ── Cleanup
  useEffect(() => () => { timerTweenRef.current?.kill() }, [])

  const handleTab = (i) => {
    if (i === active || transitioning) return
    timerTweenRef.current?.kill()
    setTransitioning(true)
    gsap.to([imgRef.current, contentRef.current], {
      opacity: 0, duration: 0.2, ease: 'power2.in',
      onComplete: () => { setActive(i); setTransitioning(false) },
    })
  }

  const pauseTimer  = () => { hovering.current = true;  timerTweenRef.current?.pause() }
  const resumeTimer = () => { hovering.current = false; timerTweenRef.current?.play() }

  const v = VEHICLES[active]

  return (
    <section
      ref={sectionRef}
      id="flotte"
      style={{ background: '#F4F3EF', position: 'relative', overflow: 'hidden' }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <style>{`
        @keyframes flt-kenburns {
          from { transform: scale(1);    }
          to   { transform: scale(1.06); }
        }
        .flt-img-cover {
          animation: flt-kenburns 9s ease-in-out infinite alternate;
        }
        .flt-tab-btn {
          background: none;
          border: none;
          cursor: pointer;
          transition: opacity 0.2s;
        }
        .flt-tab-btn:hover .flt-tab-label {
          color: #fff !important;
        }
        .flt-cta-primary {
          transition: filter 0.25s ease, transform 0.2s ease;
        }
        .flt-cta-primary:hover {
          filter: brightness(1.12);
          transform: translateY(-1px);
        }
        .flt-cta-secondary {
          transition: border-color 0.25s ease, color 0.25s ease, transform 0.2s ease;
        }
        .flt-cta-secondary:hover {
          border-color: rgba(255,255,255,0.35) !important;
          color: rgba(255,255,255,0.85) !important;
          transform: translateY(-1px);
        }
        .flt-amenity-pill {
          transition: background 0.2s ease, border-color 0.2s ease;
        }
        .flt-amenity-pill:hover {
          background: rgba(255,255,255,0.1) !important;
          border-color: rgba(255,255,255,0.2) !important;
        }

        /* ── Responsive */
        @media (max-width: 900px) {
          .flt-feature {
            flex-direction: column !important;
            height: auto !important;
          }
          .flt-feature-img {
            height: 260px !important;
            flex: none !important;
          }
          .flt-feature-panel {
            padding: 28px 24px !important;
          }
          .flt-tab-btn {
            padding: 10px 12px !important;
          }
          .flt-amenity-row {
            flex-wrap: wrap !important;
            gap: 8px !important;
          }
          .flt-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 6px !important;
          }
        }
        @media (max-width: 480px) {
          .flt-feature-img {
            height: 220px !important;
          }
          .flt-feature-panel {
            padding: 20px 16px !important;
          }
        }
      `}</style>

      {/* ── Section header */}
      <div
        className="flt-header"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          padding: 'clamp(32px,4vw,56px) clamp(28px,5vw,72px) 0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <span style={{
            display: 'block',
            fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.3em', textTransform: 'uppercase',
            color: 'var(--olive)',
            marginBottom: 10,
          }}>
            Notre flotte
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px,3.5vw,48px)',
            fontWeight: 400,
            color: 'var(--texte)',
            margin: 0,
            lineHeight: 1.05,
            letterSpacing: '-0.02em',
          }}>
            Nos véhicules
          </h2>
        </div>
        <span style={{
          fontFamily: 'Sora', fontSize: 9,
          color: 'rgba(0,0,0,0.3)',
          fontStyle: 'italic',
          letterSpacing: '0.08em',
          paddingBottom: 4,
        }}>
          03 véhicules premium
        </span>
      </div>

      {/* ── Tab navigation */}
      <div
        className="flt-tabs"
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '0 clamp(28px,5vw,72px)',
          borderBottom: '1px solid rgba(0,0,0,0.08)',
          marginTop: 'clamp(20px,2.5vw,32px)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        {VEHICLES.map((veh, i) => {
          const isActive = active === i
          return (
            <button
              key={i}
              type="button"
              className="flt-tab-btn"
              onClick={() => handleTab(i)}
              style={{
                padding: 'clamp(12px,1.8vw,20px) clamp(16px,2.5vw,32px)',
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                borderBottom: isActive
                  ? `2px solid ${veh.accent}`
                  : '2px solid transparent',
                marginBottom: -1,
                position: 'relative',
              }}
            >
              <span style={{
                fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                color: isActive ? veh.accent : 'rgba(0,0,0,0.2)',
                letterSpacing: '0.15em',
                transition: 'color 0.3s',
              }}>
                {veh.num}
              </span>
              <span
                className="flt-tab-label"
                style={{
                  fontFamily: 'Sora', fontSize: 10,
                  fontWeight: isActive ? 700 : 400,
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  color: isActive ? 'var(--texte)' : 'rgba(0,0,0,0.32)',
                  transition: 'color 0.3s',
                }}
              >
                {veh.modele}
              </span>
              <span style={{
                fontFamily: 'Sora', fontSize: 8,
                color: isActive ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.16)',
                letterSpacing: '0.06em',
                transition: 'color 0.3s',
              }}>
                · {veh.classe}
              </span>
            </button>
          )
        })}

        {/* Auto-timer progress bar */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: 1, background: 'rgba(0,0,0,0.05)', pointerEvents: 'none',
        }}>
          <div
            ref={timerBarRef}
            style={{
              position: 'absolute', top: 0, left: 0,
              height: '100%', width: '100%',
              background: v.accent,
              transformOrigin: 'left', transform: 'scaleX(0)',
              opacity: 0.6,
            }}
          />
        </div>
      </div>

      {/* ── Feature card: LEFT image + RIGHT dark panel */}
      <div
        className="flt-feature"
        style={{
          display: 'flex',
          position: 'relative',
          zIndex: 2,
          height: 'clamp(460px,62vh,680px)',
        }}
      >

        {/* LEFT — Full-bleed image, no right fade */}
        <div
          className="flt-feature-img"
          style={{
            flex: '0 0 46%',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          <img
            ref={imgRef}
            src={v.img}
            alt={v.modele}
            className="flt-img-cover"
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
            }}
          />
          {/* Subtle bottom gradient for badge only */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
            background: 'linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* num badge — top left */}
          <div style={{
            position: 'absolute', top: 24, left: 28,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 13, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.55)',
            letterSpacing: '0.1em',
          }}>
            {v.num} / 03
          </div>
          {/* Class badge — bottom left */}
          <div style={{
            position: 'absolute', bottom: 24, left: 28,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 16, height: 1, background: v.accent }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 8, letterSpacing: '0.2em',
              color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase',
            }}>
              {v.classe}
            </span>
          </div>
        </div>

        {/* RIGHT — Dark editorial panel */}
        <div
          ref={contentRef}
          className="flt-feature-panel"
          style={{
            flex: 1,
            background: '#0F0F0D',
            padding: 'clamp(32px,4vw,56px)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Ghost number — top right, absolute */}
          <span
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-0.1em', right: 'clamp(16px,3vw,40px)',
              fontFamily: "'Instrument Serif', serif",
              fontSize: 140,
              color: 'rgba(255,255,255,0.025)',
              lineHeight: 1,
              fontStyle: 'italic',
              userSelect: 'none',
              pointerEvents: 'none',
              letterSpacing: '-0.04em',
            }}
          >
            {v.num}
          </span>

          {/* Category badge row */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 10,
            marginBottom: 20,
          }}>
            <div style={{ width: 20, height: 1, background: v.accent, flexShrink: 0 }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.3em', textTransform: 'uppercase',
              color: v.accent,
            }}>
              {v.classe}
            </span>
            <span style={{
              fontFamily: 'Sora', fontSize: 8,
              color: 'rgba(255,255,255,0.18)',
            }}>
              ·
            </span>
            <span style={{
              fontFamily: 'Sora', fontSize: 8,
              color: 'rgba(255,255,255,0.3)',
              letterSpacing: '0.1em',
            }}>
              {v.sub}
            </span>
          </div>

          {/* Vehicle name */}
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(36px,5vw,68px)',
            fontWeight: 400,
            color: '#F6F3EE',
            margin: '0 0 18px',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
          }}>
            Mercedes<br />
            <em style={{ color: v.accent, fontStyle: 'italic' }}>{v.modele}</em>
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: 'Sora', fontSize: 13,
            color: 'rgba(255,255,255,0.45)',
            lineHeight: 1.8,
            margin: '0 0 22px',
            maxWidth: 400,
          }}>
            {v.desc}
          </p>

          {/* Specs row */}
          <div style={{
            display: 'flex',
            gap: 0,
            borderTop: '1px solid rgba(255,255,255,0.07)',
            borderBottom: '1px solid rgba(255,255,255,0.07)',
            marginBottom: 22,
          }}>
            {[
              { Icon: Users,    label: 'Passagers', val: v.pax },
              { Icon: Suitcase, label: 'Bagages',   val: v.bags },
            ].map((s, si) => (
              <div
                key={si}
                style={{
                  display: 'flex', alignItems: 'center', gap: 12,
                  padding: '14px 0',
                  paddingRight: si === 0 ? 28 : 0,
                  marginRight: si === 0 ? 28 : 0,
                  borderRight: si === 0 ? '1px solid rgba(255,255,255,0.07)' : 'none',
                }}
              >
                <s.Icon size={16} color={v.accent} weight="duotone" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{
                    fontFamily: 'Sora', fontSize: 7, letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: 3,
                  }}>
                    {s.label}
                  </div>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 32,
                    color: '#fff',
                    lineHeight: 1,
                  }}>
                    {s.val}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Amenity strip — horizontal pills */}
          <div
            className="flt-amenity-row"
            style={{
              display: 'flex',
              flexWrap: 'nowrap',
              gap: 8,
              marginBottom: 28,
              overflow: 'visible',
            }}
          >
            {v.amenities.map(({ Icon, label }, ai) => (
              <div
                key={ai}
                className="flt-amenity-pill"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 7,
                  padding: '6px 12px',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  flexShrink: 0,
                }}
              >
                <Icon size={16} weight="duotone" color={v.accent} />
                <span style={{
                  fontFamily: 'Sora', fontSize: 9,
                  color: 'rgba(255,255,255,0.5)',
                  letterSpacing: '0.06em',
                  whiteSpace: 'nowrap',
                }}>
                  {label}
                </span>
              </div>
            ))}
          </div>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            {/* Primary */}
            <Link
              to="/contact"
              className="flt-cta-primary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: v.accent,
                color: '#fff',
                padding: '12px 28px',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Réserver <ArrowRight size={11} weight="bold" />
            </Link>

            {/* Secondary */}
            <Link
              to="/flotte"
              className="flt-cta-secondary"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 9,
                background: 'transparent',
                color: 'rgba(255,255,255,0.5)',
                border: '1px solid rgba(255,255,255,0.15)',
                padding: '12px 28px',
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.12em', textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              Voir la flotte <ArrowUpRight size={11} weight="bold" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom strip */}
      <div
        className="flt-bottom-strip"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: 'clamp(12px,1.5vw,18px) clamp(28px,5vw,72px)',
          position: 'relative', zIndex: 2,
        }}
      >
        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {VEHICLES.map((veh, i) => (
            <button
              key={i}
              type="button"
              onClick={() => handleTab(i)}
              style={{
                width: active === i ? 28 : 7, height: 2,
                background: active === i ? veh.accent : 'rgba(0,0,0,0.15)',
                border: 'none', padding: 0, cursor: 'pointer',
                transition: 'width 0.4s ease, background 0.3s',
              }}
              aria-label={veh.modele}
            />
          ))}
        </div>

        {/* Flotte link */}
        <Link
          to="/flotte"
          style={{
            fontFamily: 'Sora', fontSize: 9, fontWeight: 700,
            letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'rgba(0,0,0,0.28)', textDecoration: 'none',
            display: 'flex', alignItems: 'center', gap: 8,
            transition: 'color 0.3s',
          }}
          onMouseEnter={e => (e.currentTarget.style.color = 'var(--texte)')}
          onMouseLeave={e => (e.currentTarget.style.color = 'rgba(0,0,0,0.28)')}
        >
          Voir toute la flotte <ArrowRight size={10} weight="bold" />
        </Link>
      </div>
    </section>
  )
}
