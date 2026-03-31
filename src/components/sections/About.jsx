import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from 'lucide-react'
import { ABOUT } from '../../data/content'
import CharReveal from '../ui/CharReveal'

gsap.registerPlugin(ScrollTrigger)

export default function About() {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text stagger
      gsap.from('.about-text > *', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })

      // Image clip-path reveal + blur-in
      if (imageRef.current) {
        gsap.from(imageRef.current, {
          clipPath: 'inset(100% 0% 0% 0%)',
          filter: 'blur(20px)',
          scale: 1.15,
          duration: 1.4,
          ease: 'power3.inOut',
          scrollTrigger: {
            trigger: imageRef.current,
            start: 'top 85%',
            once: true,
          },
        })

        // Deep parallax with scale
        gsap.to(imageRef.current, {
          yPercent: -15,
          scale: 1.05,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        })
      }
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      style={{ background: 'var(--surface)' }}
    >
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '80px 24px' }}>
        <div
          className="about-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '0.55fr 0.45fr',
            border: '1px solid var(--border)',
            overflow: 'hidden',
          }}
        >
          {/* Left — Text */}
          <div className="about-text" style={{ padding: 56, background: 'var(--surface)' }}>
            <span style={{
              fontFamily: 'Sora, sans-serif',
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--olive)',
              display: 'inline-block',
              marginBottom: 16,
            }}>
              À propos
            </span>
            <CharReveal
              text="Votre chauffeur privé en Provence"
              as="h2"
              style={{
                fontFamily: "'Instrument Serif', serif",
                fontSize: 36,
                fontWeight: 400,
                color: 'var(--texte)',
                lineHeight: 1.2,
                margin: '0 0 32px 0',
              }}
            />

            {ABOUT.paragraphs.map((p, i) => (
              <p key={i} style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 14,
                color: 'var(--texte-light)',
                lineHeight: 1.8,
                margin: '0 0 20px 0',
              }}>
                {p}
              </p>
            ))}

            {/* Zones desservies */}
            <div style={{ marginTop: 32, marginBottom: 32 }}>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 10,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.15em',
                color: 'var(--texte)',
                display: 'block',
                marginBottom: 16,
              }}>
                Zones desservies
              </span>
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '8px 24px',
              }}>
                {ABOUT.zones.map((zone, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    fontFamily: 'Sora, sans-serif',
                    fontSize: 12,
                    color: 'var(--texte-light)',
                  }}>
                    <MapPin size={10} strokeWidth={2} style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                    {zone}
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <a
              href="#services"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontFamily: 'Sora, sans-serif',
                fontSize: 11,
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: 'var(--lavande)',
                textDecoration: 'none',
                transition: 'gap 0.3s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.gap = '12px')}
              onMouseLeave={e => (e.currentTarget.style.gap = '8px')}
            >
              Découvrir nos services
              <ArrowRight size={14} strokeWidth={2} />
            </a>
          </div>

          {/* Right — Image */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img
              ref={imageRef}
              src="/images/flotte-hotel-luxe.jpg"
              alt="Mercedes Classe S devant un hôtel de luxe"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                minHeight: 500,
              }}
            />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:last-child {
            order: -1;
          }
          .about-grid > div:last-child img {
            min-height: 280px !important;
          }
          .about-text {
            padding: 32px 24px !important;
          }
        }
      `}</style>
    </section>
  )
}
