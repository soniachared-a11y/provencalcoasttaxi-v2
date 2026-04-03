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
    ease: 'power3.out',
    onUpdate() { el.textContent = Math.round(obj.val) },
  })
}

export default function ChiffresImpact() {
  const sectionRef = useRef(null)
  const chiffreRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from('.chiffre-cell', {
            opacity: 0,
            y: 20,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power3.out',
          })
          CHIFFRES.forEach((item, i) => {
            const el = chiffreRefs.current[i]
            if (!el) return
            setTimeout(() => countUp(el, item.value), i * 150)
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
      style={{ background: 'transparent', position: 'relative' }}
    >
      {/* Bande horizontale pleine largeur */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: '1px solid rgba(17,17,17,0.1)',
        borderBottom: '1px solid rgba(17,17,17,0.1)',
      }}>
        {CHIFFRES.map((item, i) => (
          <div
            key={i}
            className="chiffre-cell"
            style={{
              padding: '40px 24px',
              textAlign: 'center',
              borderRight: i < CHIFFRES.length - 1 ? '1px solid rgba(17,17,17,0.1)' : 'none',
            }}
          >
            <div style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(36px, 4vw, 56px)',
              color: 'var(--texte)',
              lineHeight: 1,
              letterSpacing: '-0.02em',
            }}>
              <span ref={el => (chiffreRefs.current[i] = el)}>0</span>
              <span style={{ color: 'var(--olive)', fontSize: '0.55em', marginLeft: 2 }}>
                {item.suffix}
              </span>
            </div>
            <div style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--lavande)',
              marginTop: 10,
            }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>

      <style>{`
        @media (max-width: 600px) {
          #chiffres > div {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #chiffres .chiffre-cell:nth-child(2) { border-right: none !important; }
          #chiffres .chiffre-cell:nth-child(1),
          #chiffres .chiffre-cell:nth-child(2) {
            border-bottom: 1px solid rgba(17,17,17,0.1);
          }
          #chiffres .chiffre-cell { padding: 24px 12px !important; }
        }
      `}</style>
    </section>
  )
}
