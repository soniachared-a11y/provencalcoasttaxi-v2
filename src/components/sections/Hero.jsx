import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, CheckCircle } from '@phosphor-icons/react'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const METRICS = [
  { value: '4.9', label: 'Note Google' },
  { value: '24/7', label: 'Disponibilité' },
  { value: '15min', label: 'Temps de réponse' },
]

function WordReveal({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} className="overflow-hidden inline-block">
          <span className="hero-word inline-block">{word}</span>
          {i < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

const REASSURANCE = [
  'Confirmation immédiate',
  'Annulation gratuite',
  'Suivi de vol en temps réel',
]

export default function Hero() {
  const sectionRef = useRef(null)
  const videoRef = useRef(null)
  const [videoFailed, setVideoFailed] = useState(false)

  // Force video play after mount + fallback
  useEffect(() => {
    const v = videoRef.current
    if (v) {
      v.play().catch(() => {})
      // Fallback: if video not playing after 3s, show poster
      const timer = setTimeout(() => {
        if (v.readyState === 0 || v.paused) setVideoFailed(true)
      }, 3000)
      return () => clearTimeout(timer)
    }
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Label
      tl.from('.hero-tag', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      })

      // H1 ligne 1 — mots
      tl.from('.hero-line1 .hero-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.3')

      // H1 ligne 2 — mots
      tl.from('.hero-line2 .hero-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.4')

      // Ligne décorative
      tl.from('.hero-deco-line', {
        scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left',
      }, '-=0.3')

      // Sous-titre
      tl.from('.hero-subtitle', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.2')

      // CTAs
      tl.from('.hero-actions > *', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      }, '-=0.2')

      // Reassurance
      tl.from('.hero-reassurance > span', {
        y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
      }, '-=0.1')

      // Métriques
      tl.from('.hero-metric', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.15, ease: 'power2.out',
      }, '-=0.6')

      // Deep parallax vidéo + scale
      gsap.to(videoRef.current, {
        yPercent: -20,
        scale: 1.1,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Fade out hero content on scroll
      gsap.to('.hero-content-wrapper', {
        opacity: 0,
        y: -60,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: true,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative overflow-hidden"
      style={{ minHeight: '100vh' }}
    >
      {/* Video background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster="/images/mercedes-motion.jpeg"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ willChange: 'transform', display: videoFailed ? 'none' : 'block' }}
      >
        <source src="/hero-video.mp4" type="video/mp4" />
        <track kind="captions" />
      </video>

      {/* Fallback image if video fails */}
      {videoFailed && (
        <img
          src="/images/mercedes-motion.jpeg"
          alt="Mercedes en mouvement"
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Overlay gradient */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to bottom, rgba(42,42,42,0.2) 0%, rgba(42,42,42,0.7) 100%)',
        }}
      />

      {/* Contenu bas-gauche */}
      <div
        className="hero-content-wrapper relative z-10 mx-auto max-w-[1200px] px-6 md:px-8 flex flex-col justify-end"
        style={{ minHeight: '100vh', paddingBottom: '60px', paddingTop: '120px' }}
      >
        <div className="max-w-[640px]">
          {/* Label */}
          <p
            className="hero-tag"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.5)',
              marginBottom: '24px',
            }}
          >
            Chauffeur privé — Aix-en-Provence
          </p>

          {/* H1 */}
          <h1
            className="font-serif"
            style={{
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '24px',
            }}
          >
            <span
              className="hero-line1 block"
              style={{ fontSize: 'clamp(40px, 6vw, 72px)', color: '#FFFFFF' }}
            >
              <WordReveal text="L'élégance provençale" />
            </span>
            <em
              className="hero-line2 block not-italic"
              style={{
                fontSize: 'clamp(40px, 6vw, 72px)',
                fontStyle: 'italic',
                color: 'rgba(255,255,255,0.6)',
              }}
            >
              <WordReveal text="à votre service" />
            </em>
          </h1>

          {/* Ligne décorative */}
          <div
            className="hero-deco-line"
            style={{
              width: '48px',
              height: '1px',
              backgroundColor: 'var(--lavande)',
              marginBottom: '24px',
            }}
          />

          {/* Sous-titre */}
          <p
            className="hero-subtitle"
            style={{
              fontFamily: "'Sora', sans-serif",
              fontSize: '14px',
              fontWeight: 300,
              lineHeight: 1.7,
              color: 'rgba(255,255,255,0.6)',
              maxWidth: '400px',
              marginBottom: '32px',
            }}
          >
            Votre chauffeur privé à Aix-en-Provence. Mercedes dernière génération, tarifs fixes sans surprise, disponible 24h/24 pour vos transferts aéroport, déplacements d'affaires et escapades en Provence.
          </p>

          {/* CTAs */}
          <div className="hero-actions flex flex-wrap items-center gap-4">
            <MagneticButton
              as={Link}
              to="/contact"
              className="flex items-center gap-2"
              style={{
                backgroundColor: 'var(--olive)',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '0px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'background-color 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = '#5A6B3A'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'var(--olive)'
              }}
            >
              Réserver
              <ArrowRight size={14} weight="bold" />
            </MagneticButton>
            <a
              href="#devis"
              style={{
                backgroundColor: 'transparent',
                border: '1.5px solid rgba(255,255,255,0.3)',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '0px',
                fontFamily: "'Sora', sans-serif",
                fontSize: '11px',
                fontWeight: 600,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)'
                e.currentTarget.style.transform = 'translateY(-1px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.backgroundColor = 'transparent'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Voir les tarifs
            </a>
          </div>

          {/* Reassurance bar */}
          <div
            className="hero-reassurance"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '16px',
              marginTop: '24px',
            }}
          >
            {REASSURANCE.map((text, i) => (
              <span
                key={i}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '11px',
                  fontWeight: 400,
                  color: 'rgba(255,255,255,0.45)',
                }}
              >
                <CheckCircle size={12} weight="duotone" style={{ color: 'var(--olive)' }} />
                {text}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Métriques haut-droit */}
      <div
        className="absolute z-10 hidden md:flex flex-col items-end gap-8"
        style={{ top: '120px', right: 'max(32px, calc((100vw - 1200px) / 2 + 32px))' }}
      >
        {METRICS.map(({ value, label }) => (
          <div key={value} className="hero-metric text-right">
            <div
              className="font-serif"
              style={{ fontSize: '36px', color: '#FFFFFF', lineHeight: 1 }}
            >
              {value}
            </div>
            <div
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.35)',
                marginTop: '6px',
              }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
