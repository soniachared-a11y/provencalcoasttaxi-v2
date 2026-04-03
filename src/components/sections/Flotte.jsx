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
  const sectionRef      = useRef(null)
  const imgRef          = useRef(null)
  const contentRef      = useRef(null)
  const timerBarRef     = useRef(null)
  const timerTweenRef   = useRef(null)
  const hovering        = useRef(false)
  const hasEnteredRef   = useRef(false)

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

          gsap.from('.flt-tabs', {
            y: 16, opacity: 0, duration: 0.8, ease: 'power3.out',
          })
          gsap.from('.flt-feature', {
            y: 36, duration: 1, ease: 'power3.out', delay: 0.2,
          })
          gsap.from('.flt-bottom-strip', {
            y: 10, opacity: 0, duration: 0.6, ease: 'power2.out', delay: 0.35,
          })

          // Start timer after entrance animations settle
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
        .flt-chip {
          transition: transform 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
          cursor: default;
        }
        .flt-chip:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .flt-cta-glass {
          transition: box-shadow 0.3s ease, background 0.3s ease, transform 0.2s ease;
        }
        .flt-cta-glass:hover {
          transform: translateY(-1px);
        }
        .flt-tab-btn:hover .flt-tab-label { color: var(--texte) !important; }
      `}</style>

      {/* Ambient glow — top-right olive */}
      <div aria-hidden="true" style={{
        position: 'absolute', top: 0, right: 0,
        width: 'clamp(200px,26vw,360px)', height: 'clamp(200px,26vw,360px)',
        background: 'radial-gradient(circle at top right, rgba(107,125,74,0.13) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }} />
      {/* Ambient glow — bottom-left lavande */}
      <div aria-hidden="true" style={{
        position: 'absolute', bottom: 0, left: 0,
        width: 'clamp(160px,20vw,280px)', height: 'clamp(160px,20vw,280px)',
        background: 'radial-gradient(circle at bottom left, rgba(122,96,145,0.1) 0%, transparent 68%)',
        pointerEvents: 'none', zIndex: 0,
      }} />

      {/* ── Tab navigation */}
      <div className="flt-tabs" style={{
        display: 'flex', alignItems: 'center',
        padding: '0 clamp(28px,5vw,72px)',
        borderBottom: '1px solid rgba(0,0,0,0.08)',
        background: 'rgba(255,255,255,0.45)',
        position: 'relative', zIndex: 2,
      }}>
        {VEHICLES.map((veh, i) => {
          const isActive = active === i
          return (
            <button
              key={i}
              type="button"
              className="flt-tab-btn"
              onClick={() => handleTab(i)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: 'clamp(12px,1.8vw,20px) clamp(16px,2.5vw,32px)',
                display: 'flex', alignItems: 'center', gap: 10,
                borderBottom: isActive ? `2px solid ${veh.accent}` : '2px solid transparent',
                marginBottom: -1, position: 'relative',
              }}
            >
              <span style={{
                fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
                color: isActive ? veh.accent : 'rgba(0,0,0,0.2)',
                letterSpacing: '0.15em', transition: 'color 0.3s',
              }}>{veh.num}</span>
              <span className="flt-tab-label" style={{
                fontFamily: 'Sora', fontSize: 10, fontWeight: isActive ? 700 : 400,
                letterSpacing: '0.08em', textTransform: 'uppercase',
                color: isActive ? 'var(--texte)' : 'rgba(0,0,0,0.32)',
                transition: 'color 0.3s',
              }}>{veh.modele}</span>
              <span style={{
                fontFamily: 'Sora', fontSize: 8,
                color: isActive ? 'rgba(0,0,0,0.35)' : 'rgba(0,0,0,0.16)',
                letterSpacing: '0.06em', transition: 'color 0.3s',
              }}>· {veh.classe}</span>
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

      {/* ── Feature card */}
      <div className="flt-feature" style={{
        display: 'flex', position: 'relative', zIndex: 2,
        height: 'clamp(380px,52vh,580px)',
        borderBottom: '1px solid rgba(0,0,0,0.07)',
      }}>

        {/* LEFT — Image with Ken Burns */}
        <div style={{
          flex: '0 0 46%', position: 'relative', overflow: 'hidden',
          borderRight: '1px solid rgba(0,0,0,0.07)',
        }}>
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
          {/* Edge fade to right */}
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to right, transparent 50%, #F4F3EF 100%)',
            pointerEvents: 'none',
          }} />
          {/* Bottom gradient for badge */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0, height: 80,
            background: 'linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 100%)',
            pointerEvents: 'none',
          }} />
          {/* Badge bottom-left */}
          <div style={{
            position: 'absolute', bottom: 20, left: 24,
            display: 'flex', alignItems: 'center', gap: 8,
          }}>
            <div style={{ width: 16, height: 1, background: v.accent }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 8, letterSpacing: '0.18em',
              color: 'rgba(255,255,255,0.65)', textTransform: 'uppercase',
            }}>{v.classe}</span>
          </div>
          {/* Num badge top-left */}
          <div style={{
            position: 'absolute', top: 20, left: 24,
            fontFamily: "'Instrument Serif', serif",
            fontSize: 13, fontStyle: 'italic',
            color: 'rgba(255,255,255,0.5)',
            letterSpacing: '0.1em',
          }}>{v.num} / 03</div>
        </div>

        {/* RIGHT — Info panel */}
        <div
          ref={contentRef}
          style={{
            flex: 1,
            padding: 'clamp(28px,3.5vw,52px)',
            display: 'flex', flexDirection: 'column', justifyContent: 'center',
            position: 'relative',
            background: 'rgba(255,255,255,0.5)',
          }}
        >
          {/* Ghost number */}
          <span style={{
            position: 'absolute', top: 'clamp(16px,2.5vw,32px)', right: 'clamp(16px,3.5vw,48px)',
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(72px,11vw,140px)',
            color: 'rgba(0,0,0,0.04)',
            lineHeight: 1, fontStyle: 'italic',
            userSelect: 'none', pointerEvents: 'none',
          }}>{v.num}</span>

          {/* Class badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
            <div style={{ width: 18, height: 1, background: v.accentVar }} />
            <span style={{
              fontFamily: 'Sora', fontSize: 8, fontWeight: 700,
              letterSpacing: '0.28em', textTransform: 'uppercase',
              color: v.accentVar,
            }}>{v.classe}</span>
            <span style={{
              fontFamily: 'Sora', fontSize: 8,
              letterSpacing: '0.12em', textTransform: 'uppercase',
              color: 'rgba(0,0,0,0.22)',
            }}>· {v.sub}</span>
          </div>

          {/* Title */}
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(34px,4.5vw,62px)',
            fontWeight: 400, color: 'var(--texte)',
            margin: '0 0 14px', lineHeight: 0.94,
            letterSpacing: '-0.025em',
          }}>
            Mercedes<br />
            <em style={{ color: v.accent, fontStyle: 'italic' }}>{v.modele}</em>
          </h2>

          {/* Description */}
          <p style={{
            fontFamily: 'Sora', fontSize: 12,
            color: 'rgba(0,0,0,0.42)', lineHeight: 1.78,
            margin: '0 0 20px', maxWidth: 380,
          }}>{v.desc}</p>

          {/* Specs row — with icons */}
          <div style={{
            display: 'flex', gap: 0,
            borderTop: '1px solid rgba(0,0,0,0.08)',
            borderBottom: '1px solid rgba(0,0,0,0.08)',
            marginBottom: 18,
          }}>
            {[
              { Icon: Users,    label: 'Passagers', val: v.pax },
              { Icon: Suitcase, label: 'Bagages',   val: v.bags },
            ].map((s, si) => (
              <div key={si} style={{
                display: 'flex', alignItems: 'center', gap: 10,
                padding: '10px 20px 10px 0',
                marginRight: si < 1 ? 20 : 0,
                borderRight: si < 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
                paddingRight: si < 1 ? 20 : 0,
              }}>
                <s.Icon size={14} color={v.accent} weight="duotone" style={{ flexShrink: 0 }} />
                <div>
                  <div style={{
                    fontFamily: 'Sora', fontSize: 7.5, letterSpacing: '0.16em',
                    textTransform: 'uppercase', color: 'rgba(0,0,0,0.26)', marginBottom: 2,
                  }}>{s.label}</div>
                  <div style={{
                    fontFamily: "'Instrument Serif', serif",
                    fontSize: 26, color: 'var(--texte)', lineHeight: 1,
                  }}>{s.val}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Amenity icon grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${v.amenities.length <= 4 ? 2 : 3}, 1fr)`,
            gap: '10px 8px',
            marginBottom: 24,
          }}>
            {v.amenities.map(({ Icon, label }, ai) => (
              <div key={ai} className="flt-chip" style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
                padding: '10px 8px',
                border: `1px solid ${v.accent}28`,
                background: `${v.accent}09`,
                textAlign: 'center',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: `${v.accent}14`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  border: `1px solid ${v.accent}22`,
                }}>
                  <Icon size={18} weight="duotone" color={v.accent} />
                </div>
                <span style={{
                  fontFamily: 'Sora', fontSize: 8, fontWeight: 500,
                  color: 'rgba(0,0,0,0.5)', letterSpacing: '0.04em',
                  lineHeight: 1.3,
                }}>{label}</span>
              </div>
            ))}
          </div>

          {/* CTAs — glass morphism */}
          <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
            {/* Primary — glass filled */}
            <Link
              to="/contact"
              className="flt-cta-glass"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                background: `${v.accent}1a`,
                backdropFilter: 'blur(14px)',
                WebkitBackdropFilter: 'blur(14px)',
                color: v.accent,
                border: `1px solid ${v.accent}50`,
                fontFamily: 'Sora', fontSize: 10, fontWeight: 700,
                letterSpacing: '0.14em', textTransform: 'uppercase',
                padding: '11px 22px', textDecoration: 'none',
                boxShadow: `0 4px 18px ${v.accent}1a, inset 0 0 0 1px ${v.accent}10`,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = `${v.accent}2e`
                e.currentTarget.style.boxShadow = `0 6px 26px ${v.accent}30, inset 0 0 0 1px ${v.accent}20`
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = `${v.accent}1a`
                e.currentTarget.style.boxShadow = `0 4px 18px ${v.accent}1a, inset 0 0 0 1px ${v.accent}10`
              }}
            >
              Réserver <ArrowRight size={11} weight="bold" />
            </Link>

            {/* Secondary — ghost */}
            <Link
              to="/flotte"
              className="flt-cta-glass"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 6,
                fontFamily: 'Sora', fontSize: 10, color: 'rgba(0,0,0,0.35)',
                textDecoration: 'none', letterSpacing: '0.08em',
                background: 'rgba(255,255,255,0.5)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
                border: '1px solid rgba(0,0,0,0.1)',
                padding: '11px 18px',
                boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.color = 'var(--texte)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.85)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.color = 'rgba(0,0,0,0.35)'
                e.currentTarget.style.background = 'rgba(255,255,255,0.5)'
              }}
            >
              Voir la flotte <ArrowUpRight size={11} weight="bold" />
            </Link>
          </div>
        </div>
      </div>

      {/* ── Bottom strip */}
      <div className="flt-bottom-strip" style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: 'clamp(12px,1.5vw,18px) clamp(28px,5vw,72px)',
        position: 'relative', zIndex: 2,
      }}>
        {/* Dot indicators */}
        <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
          {VEHICLES.map((veh, i) => (
            <button
              key={i} type="button"
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

      {/* ── Mobile */}
      <style>{`
        @media (max-width: 768px) {
          .flt-feature { flex-direction: column !important; height: auto !important; }
          .flt-feature > div:first-child { flex: 0 0 220px !important; border-right: none !important; border-bottom: 1px solid rgba(0,0,0,0.07) !important; }
          .flt-feature > div:last-child { padding: 28px 20px !important; }
          .flt-tabs button { padding: 12px 14px !important; }
        }
      `}</style>
    </section>
  )
}
