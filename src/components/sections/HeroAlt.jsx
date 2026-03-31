import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, Check } from 'lucide-react'
import MagneticButton from '../ui/MagneticButton'

gsap.registerPlugin(ScrollTrigger)

const REASSURANCE = [
  'Confirmation immédiate',
  'Annulation gratuite',
  'Suivi de vol en temps réel',
]

function WordReveal({ text, className = '' }) {
  return (
    <span className={className}>
      {text.split(' ').map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <span className="heroalt-word" style={{ display: 'inline-block' }}>{word}</span>
          {i < text.split(' ').length - 1 && '\u00A0'}
        </span>
      ))}
    </span>
  )
}

export default function HeroAlt() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Label
      tl.from('.heroalt-tag', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      })

      // H1 line 1 words
      tl.from('.heroalt-line1 .heroalt-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.3')

      // H1 line 2 words
      tl.from('.heroalt-line2 .heroalt-word', {
        y: '100%', opacity: 0, duration: 0.8, stagger: 0.08, ease: 'power3.out',
      }, '-=0.4')

      // Decorative line
      tl.from('.heroalt-deco-line', {
        scaleX: 0, duration: 0.5, ease: 'power2.out', transformOrigin: 'left',
      }, '-=0.3')

      // Subtitle
      tl.from('.heroalt-subtitle', {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.2')

      // CTAs stagger
      tl.from('.heroalt-actions > *', {
        y: 20, opacity: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
      }, '-=0.2')

      // Reassurance items
      tl.from('.heroalt-reassurance > span', {
        y: 10, opacity: 0, duration: 0.4, stagger: 0.08, ease: 'power2.out',
      }, '-=0.1')

      // Image clipPath reveal
      gsap.from('.heroalt-image-wrapper', {
        clipPath: 'polygon(50% 0, 100% 0, 100% 100%, 50% 100%)',
        duration: 1.2,
        ease: 'power3.inOut',
        delay: 0.4,
      })

      // Image parallax on scroll
      gsap.to(imageRef.current, {
        yPercent: -15,
        scale: 1.05,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero-alt"
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      <div className="heroalt-grid" style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        minHeight: '100vh',
      }}>
        {/* LEFT — Content */}
        <div style={{
          background: 'var(--cream)',
          display: 'flex',
          alignItems: 'center',
          padding: '120px 64px 80px 64px',
        }}>
          <div style={{ maxWidth: 520 }}>
            {/* Label */}
            <p
              className="heroalt-tag"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--lavande)',
                marginBottom: '24px',
              }}
            >
              Chauffeur priv&eacute; &mdash; Aix-en-Provence
            </p>

            {/* H1 */}
            <h1 style={{
              fontFamily: "'Instrument Serif', serif",
              fontWeight: 400,
              lineHeight: 1.05,
              marginBottom: '24px',
              margin: '0 0 24px 0',
            }}>
              <span
                className="heroalt-line1"
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  color: 'var(--texte)',
                }}
              >
                <WordReveal text="Votre chauffeur" />
              </span>
              <em
                className="heroalt-line2"
                style={{
                  display: 'block',
                  fontSize: 'clamp(40px, 5.5vw, 68px)',
                  fontStyle: 'italic',
                  color: 'var(--lavande)',
                }}
              >
                <WordReveal text="d'exception" />
              </em>
            </h1>

            {/* Decorative line */}
            <div
              className="heroalt-deco-line"
              style={{
                width: '56px',
                height: '1px',
                backgroundColor: 'var(--olive)',
                marginBottom: '24px',
              }}
            />

            {/* Subtitle */}
            <p
              className="heroalt-subtitle"
              style={{
                fontFamily: "'Sora', sans-serif",
                fontSize: '15px',
                fontWeight: 300,
                lineHeight: 1.7,
                color: 'var(--texte-light)',
                maxWidth: '420px',
                marginBottom: '32px',
              }}
            >
              Mercedes derni&egrave;re g&eacute;n&eacute;ration, tarifs fixes garantis et service personnalis&eacute; 24h/24 pour tous vos d&eacute;placements en Provence.
            </p>

            {/* CTAs */}
            <div className="heroalt-actions" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
              <MagneticButton
                as="a"
                href="#contact"
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
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  transition: 'background-color 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#5A6B3A' }}
                onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'var(--olive)' }}
              >
                R&eacute;server
                <ArrowRight size={14} strokeWidth={2} />
              </MagneticButton>
              <a
                href="#services"
                style={{
                  backgroundColor: 'transparent',
                  border: '1.5px solid var(--lavande)',
                  color: 'var(--lavande)',
                  padding: '16px 32px',
                  borderRadius: '0px',
                  fontFamily: "'Sora', sans-serif",
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.backgroundColor = 'rgba(122, 96, 145, 0.08)'
                  e.currentTarget.style.transform = 'translateY(-1px)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.backgroundColor = 'transparent'
                  e.currentTarget.style.transform = 'translateY(0)'
                }}
              >
                D&eacute;couvrir
              </a>
            </div>

            {/* Reassurance */}
            <div
              className="heroalt-reassurance"
              style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}
            >
              {REASSURANCE.map((text, i) => (
                <span
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontFamily: "'Sora', sans-serif",
                    fontSize: '11px',
                    fontWeight: 400,
                    color: 'var(--texte-light)',
                  }}
                >
                  <Check size={12} strokeWidth={2.5} style={{ color: 'var(--olive)' }} />
                  {text}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Image */}
        <div
          className="heroalt-image-wrapper"
          style={{
            position: 'relative',
            overflow: 'hidden',
            clipPath: 'polygon(12% 0, 100% 0, 100% 100%, 0 100%)',
          }}
        >
          {/* Olive accent line */}
          <div style={{
            position: 'absolute',
            left: '3px',
            top: '15%',
            width: '3px',
            height: '70%',
            backgroundColor: 'var(--olive)',
            zIndex: 2,
          }} />

          <img
            ref={imageRef}
            src="/images/classe-s-provence.jpg"
            alt="Mercedes Classe S en Provence"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              willChange: 'transform',
            }}
          />
        </div>
      </div>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          #hero-alt .heroalt-grid {
            grid-template-columns: 1fr !important;
            min-height: auto !important;
          }
          #hero-alt .heroalt-grid > div:first-child {
            order: 2;
            padding: 48px 24px 60px 24px !important;
          }
          #hero-alt .heroalt-grid > div:last-child {
            order: 1;
            height: 50vh;
            clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%) !important;
          }
        }
      `}</style>
    </section>
  )
}
