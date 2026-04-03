import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowRight, MapPin } from '@phosphor-icons/react'
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

      // Zones — animation "voiture à pleine vitesse" : slide depuis gauche ultra rapide
      const zonesSt = { trigger: '.zones-bottom', start: 'top 85%', once: true }
      gsap.from('.zone-item-top, .zone-item-bottom', {
        x: -90,
        opacity: 0,
        duration: 0.35,
        stagger: 0.055,
        ease: 'power4.out',
        scrollTrigger: zonesSt,
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


            {/* Zones desservies — desktop uniquement, sous le CTA */}
            <div className="about-zones-desktop" style={{ marginTop: 32, marginBottom: 32 }}>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--texte)',
                display: 'block',
                marginBottom: 12,
              }}>Zones desservies</span>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '7px 16px' }}>
                {ABOUT.zones.map((zone, i) => (
                  <div key={i} className="zone-item-desktop" style={{
                    display: 'flex', alignItems: 'flex-start', gap: 7,
                    fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 400,
                    color: 'var(--texte-light)', lineHeight: 1.4,
                  }}>
                    <MapPin size={9} weight="bold" style={{ color: 'var(--lavande)', flexShrink: 0, marginTop: 2 }} />
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
              <ArrowRight size={14} weight="bold" />
            </a>
          </div>

          {/* Right — Image avec overlay zones */}
          <div style={{ overflow: 'hidden', position: 'relative' }}>
            <img
              ref={imageRef}
              src="/images/flotte-intercontinental.jpeg"
              alt="Mercedes Classe S devant un hôtel de luxe"
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                minHeight: 400,
              }}
            />

            {/* Overlay TOP — 4 premières zones (mobile uniquement) */}
            <div className="zones-top" style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to bottom, rgba(10,10,10,0.88) 0%, rgba(10,10,10,0.3) 80%, transparent 100%)',
              padding: '20px 20px 32px',
              display: 'none',
            }}>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 9,
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.2em',
                color: 'var(--lavande)',
                display: 'block',
                marginBottom: 10,
              }}>Zones desservies</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 7 }}>
                {ABOUT.zones.slice(0, 4).map((zone, i) => (
                  <div key={i} className="zone-item-top" style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 500,
                    color: '#F6F3EE',
                  }}>
                    <MapPin size={10} weight="bold" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                    {zone}
                  </div>
                ))}
              </div>
            </div>

            {/* Overlay BOTTOM — zones (all zones on mobile, last 4 on desktop) */}
            <div className="zones-bottom" style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              background: 'linear-gradient(to top, rgba(10,10,10,0.92) 0%, rgba(10,10,10,0.6) 80%, transparent 100%)',
              padding: '28px 16px 14px',
            }}>
              <div className="zones-grid-bottom">
                {ABOUT.zones.map((zone, i) => (
                  <div key={i} className="zone-item-bottom" style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    fontFamily: 'Sora, sans-serif', fontSize: 12, fontWeight: 500,
                    color: '#F6F3EE',
                  }}>
                    <MapPin size={10} weight="bold" style={{ color: 'var(--lavande)', flexShrink: 0 }} />
                    {zone}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        /* Desktop : overlays image cachés, zones dans le texte */
        .zones-top { display: none !important; }
        .zones-bottom { display: none !important; }
        .zones-grid-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 7px 16px; }
        .about-zones-desktop { display: block; }
        @media (max-width: 768px) {
          .about-zones-desktop { display: none !important; }
          .zones-top { display: none !important; }
          .zones-bottom { display: block !important; }
          .zones-grid-bottom {
            grid-template-columns: 1fr 1fr !important;
            gap: 5px 12px !important;
          }
          .zones-grid-bottom .zone-item-bottom {
            font-size: 10px !important;
          }
          .about-grid {
            grid-template-columns: 1fr !important;
          }
          .about-grid > div:last-child {
            order: 2;
          }
          .about-grid > div:first-child {
            order: 1;
          }
          .about-grid > div:last-child img {
            min-height: 240px !important;
            max-height: 300px !important;
          }
          .about-text {
            padding: 28px 20px !important;
          }
        }
      `}</style>
    </section>
  )
}
