import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['Fiabilité', 'Discrétion', 'Ponctualité', 'Élégance', 'Excellence']

export default function BandeauCTA() {
  const sectionRef = useRef(null)
  const videoRef   = useRef(null)
  const wordRef    = useRef(null)
  const labelRef   = useRef(null)
  const lineRef    = useRef(null)
  const tlRef      = useRef(null)
  const [idx, setIdx]       = useState(0)
  const [active, setActive] = useState(false)

  // ── Scroll effects (parallax + clip-path + pin)
  useEffect(() => {
    const section = sectionRef.current
    const video   = videoRef.current
    if (!section || !video) return

    const ctx = gsap.context(() => {

      // 1. Clip-path letterbox reveal — cinematic bars open from centre
      gsap.fromTo(section,
        { clipPath: 'inset(22% 0 22% 0)', scale: 0.9, opacity: 0.6 },
        {
          clipPath: 'inset(0% 0 0% 0)', scale: 1, opacity: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 90%',
            end: 'top 15%',
            scrub: 1.4,
          },
        }
      )

      // 2. Video parallax — moves at 40% of scroll speed
      gsap.fromTo(video,
        { yPercent: -15 },
        {
          yPercent: 15,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        }
      )

      // 3. Pin (sticky) — section stays visible while you scroll 420px
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=420',
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      })

      // 4. Label + line counter-parallax — floats up slowly during pin
      gsap.to([labelRef.current, lineRef.current], {
        yPercent: -28,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: '+=420',
          scrub: 2.5,
        },
      })

      // 5. Overlay darkens on exit to create "burial" feel
      gsap.fromTo('.bcta-overlay',
        { opacity: 0 },
        {
          opacity: 0.55,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top top',
            end: '+=420',
            scrub: 1,
          },
        }
      )
    }, section)

    return () => ctx.revert()
  }, [])

  // ── Word animation — triggers once section enters view
  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top 85%',
      once: true,
      onEnter: () => setActive(true),
    })
    return () => trigger.kill()
  }, [])

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

      // Slide in fast — car arriving
      tl.to(el, { x: 0, opacity: 1, skewX: 0, duration: 0.55, ease: 'power4.out' })
      // Hold
      tl.to(el, { duration: 1.6 })
      // Slide out left
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
        width: '100%',
        height: 'clamp(260px, 50vh, 480px)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* ── Video background */}
      <video
        ref={videoRef}
        autoPlay muted loop playsInline
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '130%',       /* taller to allow parallax travel */
          top: '-15%',
          objectFit: 'cover',
          objectPosition: 'center 40%',
          willChange: 'transform',
        }}
      >
        <source src="/video-voiture.mp4" type="video/mp4" />
      </video>

      {/* ── Base dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to right, rgba(0,0,0,0.68) 0%, rgba(0,0,0,0.38) 50%, rgba(0,0,0,0.68) 100%)',
        zIndex: 1,
      }} />

      {/* ── Scroll-driven dark overlay (burial effect) */}
      <div className="bcta-overlay" style={{
        position: 'absolute', inset: 0,
        background: '#000',
        opacity: 0,
        zIndex: 2,
        pointerEvents: 'none',
      }} />

      {/* ── Olive speed lines */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.7, zIndex: 3,
      }} />
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0, width: 3,
        background: 'linear-gradient(to bottom, transparent, var(--olive), transparent)',
        opacity: 0.7, zIndex: 3,
      }} />

      {/* ── Content */}
      <div style={{
        position: 'relative',
        zIndex: 4,
        width: '100%',
        padding: '0 clamp(24px,6vw,80px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
      }}>

        {/* Small label — counter-parallax */}
        <p
          ref={labelRef}
          style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 'clamp(7px,0.9vw,10px)',
            fontWeight: 700,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'var(--olive)',
            marginBottom: 'clamp(8px,1.5vw,16px)',
            willChange: 'transform',
          }}
        >
          Chauffeur Privé · Aix-en-Provence
        </p>

        {/* Animated keyword */}
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

        {/* Accent line — counter-parallax */}
        <div
          ref={lineRef}
          style={{
            marginTop: 'clamp(8px,1.5vw,18px)',
            width: 'clamp(32px,5vw,56px)',
            height: 1,
            background: 'linear-gradient(90deg, transparent, var(--lavande), transparent)',
            willChange: 'transform',
          }}
        />
      </div>
    </section>
  )
}
