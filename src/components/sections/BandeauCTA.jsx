import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Fiabilité', 'Discrétion', 'Ponctualité', 'Élégance', 'Excellence']

export default function BandeauCTA() {
  const sectionRef = useRef(null)
  const wordRef    = useRef(null)
  const tlRef      = useRef(null)
  const [idx, setIdx] = useState(0)
  const [active, setActive] = useState(false)

  // Cinematic word animation — triggered once section enters view
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => setActive(true),
    })
    return () => trigger.kill()
  }, [])

  // Run word cycle once active
  useEffect(() => {
    if (!active || !wordRef.current) return
    let current = 0

    function animateWord() {
      const el = wordRef.current
      if (!el) return

      // Reset to right (off screen)
      gsap.set(el, { x: '80vw', opacity: 0, skewX: -8 })

      const tl = gsap.timeline({
        onComplete: () => {
          current = (current + 1) % WORDS.length
          setIdx(current)
          // Brief pause before next word
          setTimeout(animateWord, 200)
        },
      })

      // Slide in fast from right — like a car arriving
      tl.to(el, { x: 0, opacity: 1, skewX: 0, duration: 0.55, ease: 'power4.out' })
      // Hold
      tl.to(el, { duration: 1.6 })
      // Exit to left fast — like a car disappearing
      tl.to(el, { x: '-80vw', opacity: 0, skewX: 8, duration: 0.45, ease: 'power3.in' })

      tlRef.current = tl
    }

    // Entrance delay
    const timer = setTimeout(animateWord, 400)
    return () => {
      clearTimeout(timer)
      tlRef.current?.kill()
    }
  }, [active])

  return (
    <section
      ref={sectionRef}
      style={{
        position: 'relative',
        width: '100%',
        height: 'clamp(200px, 26vw, 320px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // Cinematic letterbox bars
        borderTop: '6px solid #000',
        borderBottom: '6px solid #000',
      }}
    >
      {/* ── Video background */}
      <video
        autoPlay muted loop playsInline
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
        }}
      >
        <source src="/video-voiture.mp4" type="video/mp4" />
      </video>

      {/* ── Dark overlay — keeps text readable */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.45) 50%, rgba(0,0,0,0.72) 100%)',
      }} />

      {/* ── Thin speed lines left + right */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.6,
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 4,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.6,
      }} />

      {/* ── Content */}
      <div style={{
        position: 'relative', zIndex: 2,
        width: '100%', padding: '0 clamp(24px,6vw,80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflow: 'hidden',
      }}>

        {/* Small fixed label */}
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 'clamp(7px,0.9vw,10px)',
          fontWeight: 700,
          letterSpacing: '0.35em',
          textTransform: 'uppercase',
          color: 'var(--olive)',
          marginBottom: 'clamp(8px,1.5vw,16px)',
        }}>
          Chauffeur Privé · Aix-en-Provence
        </p>

        {/* Animated keyword */}
        <div style={{ overflow: 'hidden', width: '100%', textAlign: 'center' }}>
          <h2
            ref={wordRef}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(44px, 9vw, 112px)',
              fontWeight: 400,
              color: '#fff',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              willChange: 'transform, opacity',
              display: 'inline-block',
              // Subtle text shadow for depth
              textShadow: '0 2px 40px rgba(0,0,0,0.5)',
            }}
          >
            {WORDS[idx]}
          </h2>
        </div>

        {/* Thin horizontal line accent */}
        <div style={{
          marginTop: 'clamp(8px,1.5vw,18px)',
          width: 'clamp(32px,5vw,56px)', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--lavande), transparent)',
        }} />
      </div>

      <style>{`
        @media (max-width: 480px) {
          #bandeau-cta-word { font-size: 11vw !important; }
        }
      `}</style>
    </section>
  )
}
