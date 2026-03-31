import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { AVIS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function Initials({ nom }) {
  const parts = nom.split(' ')
  const initials = parts.map(p => p[0]).join('')
  return (
    <div style={{
      width: 48,
      height: 48,
      borderRadius: '50%',
      background: 'linear-gradient(135deg, var(--lavande), var(--olive))',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: 'Sora, sans-serif',
      fontSize: 14,
      fontWeight: 600,
      color: '#fff',
      flexShrink: 0,
    }}>
      {initials}
    </div>
  )
}

export default function AvisAlt() {
  const [current, setCurrent] = useState(0)
  const sectionRef = useRef(null)
  const bgRef = useRef(null)
  const quoteRef = useRef(null)
  const timerRef = useRef(null)

  // GSAP entry animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background parallax + scale
      if (bgRef.current) {
        gsap.fromTo(bgRef.current, {
          scale: 1.1,
        }, {
          yPercent: -15,
          scale: 1.1,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.5,
          },
        })
      }

      // Quote reveal
      gsap.from('.avisalt-quote', {
        y: 40,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Stars stagger
      gsap.from('.avisalt-star', {
        scale: 0.5,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: 'back.out(1.4)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Dots stagger
      gsap.from('.avisalt-dot', {
        scale: 0,
        opacity: 0,
        duration: 0.5,
        stagger: 0.06,
        ease: 'back.out(2)',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Auto-advance
  useEffect(() => {
    timerRef.current = setInterval(() => {
      if (!quoteRef.current) return
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        onComplete() {
          setCurrent(prev => (prev + 1) % AVIS.length)
          gsap.fromTo(quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
        },
      })
    }, 7000)
    return () => clearInterval(timerRef.current)
  }, [])

  const goTo = (index) => {
    if (index === current || !quoteRef.current) return
    // Reset timer
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      if (!quoteRef.current) return
      gsap.to(quoteRef.current, {
        opacity: 0,
        y: -20,
        duration: 0.4,
        ease: 'power2.in',
        onComplete() {
          setCurrent(prev => (prev + 1) % AVIS.length)
          gsap.fromTo(quoteRef.current,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
          )
        },
      })
    }, 7000)

    gsap.to(quoteRef.current, {
      opacity: 0,
      y: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete() {
        setCurrent(index)
        gsap.fromTo(quoteRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
        )
      },
    })
  }

  const avis = AVIS[current]
  const stars = ['★', '★', '★', '★', '★']

  return (
    <section
      ref={sectionRef}
      id="avis-alt"
      style={{
        position: 'relative',
        overflow: 'hidden',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Background image */}
      <img
        ref={bgRef}
        src="/images/flotte-hotel-luxe.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          pointerEvents: 'none',
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(to bottom, rgba(42,42,42,0.6), rgba(42,42,42,0.8))',
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div
        className="avisalt-content"
        style={{
          maxWidth: 800,
          textAlign: 'center',
          padding: '80px 24px',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Stars */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 4,
          marginBottom: 32,
        }}>
          {stars.map((s, i) => (
            <span
              key={i}
              className="avisalt-star"
              style={{
                fontSize: 18,
                color: 'var(--lavande)',
                letterSpacing: 4,
                display: 'inline-block',
              }}
            >
              {s}
            </span>
          ))}
        </div>

        {/* Quote + Author */}
        <div ref={quoteRef} className="avisalt-quote">
          <p style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(24px, 3.5vw, 40px)',
            fontStyle: 'italic',
            fontWeight: 400,
            color: '#fff',
            lineHeight: 1.4,
            margin: '0 0 40px 0',
          }}>
            &laquo;&nbsp;{avis.texte}&nbsp;&raquo;
          </p>

          {/* Author row */}
          <div
            className="avisalt-author"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 16,
              flexWrap: 'wrap',
            }}
          >
            <Initials nom={avis.nom} />
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 14,
              fontWeight: 600,
              color: '#fff',
            }}>
              {avis.nom}
            </span>
            <span style={{
              width: 1,
              height: 16,
              background: 'rgba(255,255,255,0.2)',
              display: 'inline-block',
            }} />
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 12,
              color: 'rgba(255,255,255,0.5)',
            }}>
              {avis.ville}
            </span>
          </div>
        </div>

        {/* Navigation dots */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 12,
          marginTop: 48,
        }}>
          {AVIS.map((_, i) => (
            <button
              key={i}
              className="avisalt-dot"
              onClick={() => goTo(i)}
              aria-label={`Voir avis ${i + 1}`}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                border: 'none',
                padding: 0,
                background: i === current ? '#fff' : 'rgba(255,255,255,0.25)',
                transform: i === current ? 'scale(1.3)' : 'scale(1)',
                cursor: 'pointer',
                transition: 'all 0.4s ease',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          #avis-alt {
            min-height: 70vh !important;
          }
          .avisalt-author {
            flex-wrap: wrap !important;
            justify-content: center !important;
          }
        }
      `}</style>
    </section>
  )
}
