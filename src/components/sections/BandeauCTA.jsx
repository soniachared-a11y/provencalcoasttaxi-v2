import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Fiabilité', 'Discrétion', 'Ponctualité', 'Élégance', 'Excellence']

export default function BandeauCTA() {
  const sectionRef = useRef(null)
  const wordRef    = useRef(null)
  const tlRef      = useRef(null)
  const [idx, setIdx]       = useState(0)
  const [active, setActive] = useState(false)

  // Trigger word animation when section enters view
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => setActive(true),
    })
    return () => trigger.kill()
  }, [])

  // Word cycle
  useEffect(() => {
    if (!active || !wordRef.current) return
    let current = 0

    function animateWord() {
      const el = wordRef.current
      if (!el) return

      gsap.set(el, { x: '80vw', opacity: 0, skewX: -8 })

      const tl = gsap.timeline({
        onComplete: () => {
          current = (current + 1) % WORDS.length
          setIdx(current)
          setTimeout(animateWord, 200)
        },
      })

      tl.to(el, { x: 0, opacity: 1, skewX: 0, duration: 0.55, ease: 'power4.out' })
      tl.to(el, { duration: 1.6 })
      tl.to(el, { x: '-80vw', opacity: 0, skewX: 8, duration: 0.45, ease: 'power3.in' })

      tlRef.current = tl
    }

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
        zIndex: 1,
        width: '100%',
        height: 'clamp(260px, 42vh, 420px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Video background */}
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

      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.42) 50%, rgba(0,0,0,0.72) 100%)',
        zIndex: 1,
      }} />

      {/* Olive speed lines */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.7, zIndex: 2,
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.7, zIndex: 2,
      }} />

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 3,
        width: '100%',
        padding: '0 clamp(24px,6vw,80px)',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        overflow: 'hidden',
      }}>

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

        <div style={{ overflow: 'hidden', width: '100%', textAlign: 'center' }}>
          <h2
            ref={wordRef}
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(48px, 10vw, 120px)',
              fontWeight: 400,
              color: '#fff',
              margin: 0,
              lineHeight: 1,
              letterSpacing: '-0.02em',
              willChange: 'transform, opacity',
              display: 'inline-block',
              textShadow: '0 2px 60px rgba(0,0,0,0.4)',
            }}
          >
            {WORDS[idx]}
          </h2>
        </div>

        <div style={{
          marginTop: 'clamp(8px,1.5vw,18px)',
          width: 'clamp(32px,5vw,56px)', height: 1,
          background: 'linear-gradient(90deg, transparent, var(--lavande), transparent)',
        }} />
      </div>
    </section>
  )
}
