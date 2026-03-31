import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SECTION_INTROS, IMAGES } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

const ATOUTS = [
  { chiffre: '4.9', suffix: '', titre: 'Note Google', desc: '+200 avis 5 étoiles vérifiés' },
  { chiffre: '24', suffix: '/7', titre: 'Disponibilité', desc: 'Réservation à toute heure, 365j/an' },
  { chiffre: '15', suffix: 'min', titre: 'Temps de réponse', desc: 'Confirmation de réservation garantie' },
  { chiffre: '0', suffix: '€', titre: 'Frais cachés', desc: 'Tarif fixe annoncé = tarif payé' },
]

function countUp(el, target, decimals = 0, duration = 1.6) {
  const obj = { val: 0 }
  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = decimals > 0 ? obj.val.toFixed(decimals) : Math.round(obj.val)
    },
  })
}

export default function Atouts() {
  const sectionRef = useRef(null)
  const chiffreRefs = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 82%',
        once: true,
        onEnter: () => {
          // 1. Reveal stagger
          gsap.from('.atout-item', {
            y: 30,
            opacity: 0,
            duration: 0.7,
            stagger: 0.1,
            ease: 'power2.out',
          })
          // 2. CountUp with delay to let reveal start
          setTimeout(() => {
            ATOUTS.forEach((item, i) => {
              const el = chiffreRefs.current[i]
              if (!el) return
              const target = parseFloat(item.chiffre)
              const decimals = item.chiffre.includes('.') ? 1 : 0
              countUp(el, target, decimals)
            })
          }, 300)
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="atouts"
      style={{ background: 'var(--cream)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Background image */}
      <img
        src={IMAGES.atoutsFond}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.04,
          zIndex: 0,
        }}
      />

      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px', position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span
            style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--lavande)',
              display: 'inline-block',
              marginBottom: 16,
            }}
          >
            Nos atouts
          </span>
          <h2
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 36,
              fontWeight: 400,
              color: 'var(--texte)',
              lineHeight: 1.2,
              margin: '0 0 20px 0',
            }}
          >
            Pourquoi nous choisir
          </h2>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 640,
            margin: '0 auto',
          }}>
            {SECTION_INTROS.atouts}
          </p>
        </div>

        {/* Grid with outer border */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            border: '1px solid var(--border)',
          }}
        >
          {ATOUTS.map((item, i) => (
            <div
              key={i}
              className="atout-item"
              style={{
                padding: '48px 32px',
                borderRight: i < ATOUTS.length - 1 ? '1px solid var(--border)' : 'none',
                textAlign: 'center',
                transition: 'background 0.3s ease',
                cursor: 'default',
                willChange: 'transform',
              }}
              onMouseEnter={e => (e.currentTarget.style.background = 'var(--surface-alt)')}
              onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
            >
              {/* Chiffre */}
              <div
                style={{
                  fontFamily: "'Instrument Serif', serif",
                  fontSize: 48,
                  color: 'var(--lavande)',
                  lineHeight: 1,
                  marginBottom: 12,
                }}
              >
                <span ref={el => (chiffreRefs.current[i] = el)}>0</span>
                <span>{item.suffix}</span>
              </div>

              {/* Titre */}
              <div
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--texte)',
                  marginBottom: 8,
                }}
              >
                {item.titre}
              </div>

              {/* Description */}
              <div
                style={{
                  fontFamily: 'Sora, sans-serif',
                  fontSize: 12,
                  color: 'var(--texte-light)',
                  lineHeight: 1.5,
                }}
              >
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive: 2 cols on mobile */}
      <style>{`
        @media (max-width: 768px) {
          #atouts > div > div:last-child {
            grid-template-columns: repeat(2, 1fr) !important;
          }
          #atouts .atout-item:nth-child(2) {
            border-right: none !important;
          }
          #atouts .atout-item:nth-child(1),
          #atouts .atout-item:nth-child(2) {
            border-bottom: 1px solid var(--border);
          }
          #atouts .atout-item:nth-child(3) {
            border-right: 1px solid var(--border) !important;
          }
        }
      `}</style>
    </section>
  )
}
