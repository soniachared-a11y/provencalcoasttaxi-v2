import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { CHIFFRES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function countUp(el, target, duration = 2.4) {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'elastic.out(1, 0.75)',
    onUpdate() {
      el.textContent = Math.round(obj.val)
    },
  })
}

export default function ChiffresImpact() {
  const sectionRef = useRef(null)
  const chiffreRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          // Cell reveal
          gsap.from('.chiffre-cell', {
            y: 50,
            opacity: 0,
            duration: 0.9,
            stagger: 0.15,
            ease: 'power3.out',
          })

          // Decorative lines
          gsap.from('.chiffre-deco-line', {
            scaleX: 0,
            duration: 0.6,
            stagger: 0.15,
            delay: 0.3,
            ease: 'power2.out',
            transformOrigin: 'center',
          })

          // CountUp with stagger delay
          CHIFFRES.forEach((item, i) => {
            const el = chiffreRefs.current[i]
            if (!el) return
            setTimeout(() => {
              countUp(el, item.value)
            }, i * 200)
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="chiffres"
      style={{
        background: 'var(--texte)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{
        maxWidth: 1200,
        margin: '0 auto',
        padding: '100px 24px',
      }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <span style={{
            fontFamily: "'Sora', sans-serif",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: 'var(--lavande)',
            display: 'inline-block',
            marginBottom: '16px',
          }}>
            En chiffres
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: '36px',
            fontWeight: 400,
            color: '#FFFFFF',
            lineHeight: 1.2,
            margin: 0,
          }}>
            Proven&ccedil;al Coast en chiffres
          </h2>
        </div>

        {/* Grid */}
        <div className="chiffres-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}>
          {CHIFFRES.map((item, i) => (
            <div
              key={i}
              className="chiffre-cell"
              style={{
                padding: '56px 32px',
                textAlign: 'center',
                borderRight: i < CHIFFRES.length - 1 ? '1px solid rgba(255, 255, 255, 0.08)' : 'none',
                transition: 'background 0.3s ease',
                cursor: 'default',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent' }}
            >
              {/* Number */}
              <div style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 'clamp(48px, 5vw, 72px)',
                color: '#FFFFFF',
                lineHeight: 1,
              }}>
                <span ref={el => (chiffreRefs.current[i] = el)}>0</span>
                <span style={{
                  color: 'var(--olive)',
                  fontSize: 'clamp(24px, 3vw, 36px)',
                }}>
                  {item.suffix}
                </span>
              </div>

              {/* Label */}
              <div style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '13px',
                fontWeight: 600,
                color: 'rgba(255, 255, 255, 0.8)',
                marginTop: '16px',
              }}>
                {item.label}
              </div>

              {/* Description */}
              <div style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                color: 'rgba(255, 255, 255, 0.35)',
                marginTop: '6px',
                lineHeight: 1.5,
              }}>
                {item.desc}
              </div>

              {/* Decorative line */}
              <div
                className="chiffre-deco-line"
                style={{
                  width: '32px',
                  height: '2px',
                  backgroundColor: 'var(--olive)',
                  margin: '16px auto 0',
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #chiffres .chiffres-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #chiffres .chiffre-cell:nth-child(2) {
            border-right: none !important;
          }
          #chiffres .chiffre-cell:nth-child(1),
          #chiffres .chiffre-cell:nth-child(2) {
            border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          }
          #chiffres .chiffre-cell:nth-child(3) {
            border-right: 1px solid rgba(255, 255, 255, 0.08) !important;
          }
        }
      `}</style>
    </section>
  )
}
