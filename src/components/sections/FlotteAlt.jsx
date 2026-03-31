import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { FLOTTE } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function SpecRow({ label, value, last }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: last ? 'none' : '1px solid var(--border)',
      fontFamily: 'Sora, sans-serif',
      fontSize: 13,
    }}>
      <span style={{ color: 'var(--texte-light)' }}>{label}</span>
      <span style={{ color: 'var(--olive)', fontWeight: 500 }}>{value}</span>
    </div>
  )
}

export default function FlotteAlt() {
  const sectionRef = useRef(null)
  const gridRef = useRef(null)
  const specsRef = useRef(null)
  const imgCurrentRef = useRef(null)
  const imgNextRef = useRef(null)
  const intervalRef = useRef(null)
  const [current, setCurrent] = useState(0)
  const [displayIndex, setDisplayIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768)
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const goTo = useCallback((index) => {
    if (index === current) return
    setCurrent(index)
  }, [current])

  // Handle transitions when current changes
  useEffect(() => {
    if (current === displayIndex) return

    const vehicle = FLOTTE[current]

    // Crossfade images
    if (imgNextRef.current) {
      imgNextRef.current.src = vehicle.image
      gsap.set(imgNextRef.current, { opacity: 0, filter: 'blur(8px)' })
      gsap.to(imgNextRef.current, {
        opacity: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        ease: 'power2.out',
      })
    }
    if (imgCurrentRef.current) {
      gsap.to(imgCurrentRef.current, {
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      })
    }

    // Fade out specs
    if (specsRef.current) {
      gsap.to(specsRef.current, {
        opacity: 0,
        y: -15,
        duration: 0.4,
        ease: 'power2.in',
        onComplete: () => {
          setDisplayIndex(current)
          gsap.fromTo(specsRef.current, {
            opacity: 0,
            y: 15,
          }, {
            opacity: 1,
            y: 0,
            duration: 0.5,
            ease: 'power2.out',
          })
        },
      })
    } else {
      setDisplayIndex(current)
    }
  }, [current, displayIndex])

  // Sync images after displayIndex updates
  useEffect(() => {
    const vehicle = FLOTTE[displayIndex]
    if (imgCurrentRef.current) {
      imgCurrentRef.current.src = vehicle.image
      gsap.set(imgCurrentRef.current, { opacity: 1 })
    }
    if (imgNextRef.current) {
      gsap.set(imgNextRef.current, { opacity: 0 })
    }
  }, [displayIndex])

  // Auto-cycle
  useEffect(() => {
    const startInterval = () => {
      clearInterval(intervalRef.current)
      intervalRef.current = setInterval(() => {
        setCurrent(prev => (prev + 1) % FLOTTE.length)
      }, 5000)
    }
    startInterval()
    return () => clearInterval(intervalRef.current)
  }, [])

  const handleDotClick = (index) => {
    goTo(index)
    // Reset interval
    clearInterval(intervalRef.current)
    intervalRef.current = setInterval(() => {
      setCurrent(prev => (prev + 1) % FLOTTE.length)
    }, 5000)
  }

  // GSAP entry animation
  useEffect(() => {
    if (!sectionRef.current || !gridRef.current) return

    const ctx = gsap.context(() => {
      gsap.from(gridRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      gsap.from('.flotte-alt-img', {
        filter: 'blur(15px) grayscale(100%)',
        duration: 1.4,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridRef.current,
          start: 'top 75%',
          once: true,
        },
      })

      gsap.to('.flotte-alt-img-container', {
        yPercent: -8,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const vehicle = FLOTTE[displayIndex]

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--cream)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 10,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--lavande)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Notre flotte
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            fontWeight: 400,
            color: 'var(--texte)',
            lineHeight: 1.2,
            margin: 0,
          }}>
            L'excellence Mercedes
          </h2>
          <p style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 14,
            color: 'var(--texte-light)',
            lineHeight: 1.8,
            maxWidth: 560,
            margin: '20px auto 0',
            textAlign: 'center',
          }}>
            Des vehicules haut de gamme entretenus quotidiennement pour un confort absolu
            sur chaque trajet.
          </p>
        </div>

        {/* Asymmetric grid */}
        <div
          ref={gridRef}
          style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.4fr 0.6fr',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {/* LEFT — Image area */}
          <div style={{
            height: isMobile ? 300 : 520,
            overflow: 'hidden',
            position: 'relative',
          }}>
            <div
              className="flotte-alt-img-container"
              style={{ position: 'absolute', inset: 0 }}
            >
              <img
                ref={imgCurrentRef}
                src={FLOTTE[0].image}
                alt={FLOTTE[0].modele}
                className="flotte-alt-img"
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
              <img
                ref={imgNextRef}
                src={FLOTTE[0].image}
                alt=""
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                  opacity: 0,
                }}
              />
            </div>

            {/* Badge */}
            <span style={{
              position: 'absolute',
              bottom: 24,
              left: 24,
              fontFamily: 'Sora, sans-serif',
              fontSize: 10,
              fontWeight: 500,
              textTransform: 'uppercase',
              letterSpacing: '0.1em',
              background: 'var(--lavande)',
              color: '#fff',
              padding: '8px 16px',
              zIndex: 2,
            }}>
              {vehicle.classe}
            </span>
          </div>

          {/* RIGHT — Specs panel */}
          <div style={{
            padding: isMobile ? '32px 24px' : '48px 40px',
            background: 'var(--surface)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}>
            <div ref={specsRef}>
              <h3 style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 32,
                fontWeight: 400,
                color: 'var(--texte)',
                margin: '0 0 4px 0',
                lineHeight: 1.2,
              }}>
                {vehicle.modele}
              </h3>

              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 10,
                fontWeight: 500,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--lavande)',
                display: 'inline-block',
                marginBottom: 24,
              }}>
                {vehicle.classe}
              </span>

              <p style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 13,
                color: 'var(--texte-light)',
                lineHeight: 1.7,
                margin: '0 0 32px 0',
              }}>
                {vehicle.desc}
              </p>

              <SpecRow label="Passagers" value={vehicle.pax} />
              <SpecRow label="Bagages" value={vehicle.bags} />
              <SpecRow
                label={vehicle.featureLabel || 'Feature'}
                value={vehicle.feature}
                last
              />
            </div>

            {/* Navigation dots */}
            <div style={{
              display: 'flex',
              gap: 8,
              marginTop: 32,
            }}>
              {FLOTTE.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleDotClick(i)}
                  aria-label={`Voir ${FLOTTE[i].modele}`}
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    border: current === i ? 'none' : '1px solid var(--border)',
                    background: current === i ? 'var(--lavande)' : 'transparent',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'background 0.3s, border 0.3s',
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
