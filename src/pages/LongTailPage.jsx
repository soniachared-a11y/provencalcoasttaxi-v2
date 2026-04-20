// Page longue-traîne générique — rend le contenu depuis src/data/longtail.js
// selon le slug récupéré par useParams(). Respecte le design system du site
// (fond sombre 0D1117, Instrument Serif pour les titres, Sora pour le corps).
import { useEffect, useRef } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Phone, ArrowRight, CheckCircle } from '@phosphor-icons/react'
import SEOHead from '../seo/SEOHead'
import CharReveal from '../components/ui/CharReveal'
import { LONGTAIL } from '../data/longtail'
import { CONTACT } from '../data/content'

gsap.registerPlugin(ScrollTrigger)

const DOMAIN = 'https://www.taxisprovencaleaix.fr'

export default function LongTailPage({ slug }) {
  const data = LONGTAIL[slug]
  const pageRef = useRef(null)

  useEffect(() => {
    if (!data) return
    const ctx = gsap.context(() => {
      gsap.from('.lt-hero-text > *', {
        y: 40, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', delay: 0.15,
      })
      gsap.from('.lt-section', {
        y: 60, opacity: 0, duration: 0.9, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.lt-sections', start: 'top 80%', once: true },
      })
    }, pageRef)
    return () => ctx.revert()
  }, [slug, data])

  // Slug inconnu → redirection vers /services (sûr, jamais 404 dur)
  if (!data) return <Navigate to="/services" replace />

  const canonicalPath = `/${data.slug}`

  // Schema.org Service spécifique à cette page (injecté en JSON-LD via SEOHead)
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${DOMAIN}${canonicalPath}#service`,
    name: data.schemaName,
    description: data.schemaDescription,
    provider: { '@id': `${DOMAIN}/#organization` },
    areaServed: [
      { '@type': 'City', name: 'Aix-en-Provence' },
      { '@type': 'AdministrativeArea', name: 'Provence-Alpes-Côte d\'Azur' },
    ],
    serviceType: 'TaxiService',
    offers: {
      '@type': 'Offer',
      price: data.schemaPrice,
      priceCurrency: 'EUR',
      availability: 'https://schema.org/InStock',
      priceSpecification: {
        '@type': 'PriceSpecification',
        price: data.schemaPrice,
        priceCurrency: 'EUR',
      },
    },
  }

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${DOMAIN}${canonicalPath}#faq`,
    mainEntity: data.faqs.map((f, i) => ({
      '@type': 'Question',
      '@id': `${DOMAIN}${canonicalPath}#faq-${i + 1}`,
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.r },
    })),
  }

  return (
    <main ref={pageRef} style={{ background: '#0D1117', minHeight: '100vh', paddingTop: 72, color: '#fff' }}>
      <SEOHead path={canonicalPath} title={data.title} description={data.description} />

      {/* Schema.org JSON-LD dédié à cette page */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* ───────── HERO ───────── */}
      <section style={{ position: 'relative', overflow: 'hidden' }}>
        <img
          src={data.heroImage}
          alt={data.heroImageAlt}
          width={1600}
          height={900}
          loading="eager"
          fetchpriority="high"
          style={{
            position: 'absolute', inset: 0, width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center',
          }}
        />
        <div
          aria-hidden="true"
          style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(180deg, rgba(13,17,23,0.55) 0%, rgba(13,17,23,0.85) 70%, rgba(13,17,23,1) 100%)',
          }}
        />

        <div className="lt-hero-text" style={{
          position: 'relative', maxWidth: 1200, margin: '0 auto',
          padding: 'clamp(90px, 14vw, 160px) clamp(20px, 5vw, 40px) clamp(60px, 10vw, 110px)',
        }}>
          <Link to="/" style={{
            fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--lavande)', textDecoration: 'none',
            display: 'inline-block', marginBottom: 18,
          }}>
            ← Taxis Provençale Aix
          </Link>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--lavande)', marginBottom: 16,
          }}>
            {data.label}
          </p>
          <CharReveal
            text={data.h1}
            as="h1"
            style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(34px, 5.5vw, 68px)',
              fontWeight: 400, lineHeight: 1.05, margin: '0 0 22px', color: '#fff',
            }}
          />
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 17, lineHeight: 1.6,
            maxWidth: 640, color: 'rgba(255,255,255,0.72)', margin: '0 0 34px',
          }}>
            {data.heroBaseline}
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a
              href={`tel:${CONTACT.tel}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 22px', borderRadius: 999,
                background: 'var(--olive)', color: '#fff',
                fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600,
                letterSpacing: '0.02em', textDecoration: 'none',
              }}
            >
              <Phone size={16} weight="fill" />
              {CONTACT.tel}
            </a>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '13px 22px', borderRadius: 999,
                background: 'rgba(255,255,255,0.08)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#fff',
                fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Réserver en ligne <ArrowRight size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </section>

      {/* ───────── PRICE BOX ───────── */}
      <section style={{
        maxWidth: 1200, margin: '-60px auto 0', padding: '0 clamp(20px, 5vw, 40px)',
        position: 'relative', zIndex: 3,
      }}>
        <div style={{
          background: 'linear-gradient(135deg, #1A1F26 0%, #141820 100%)',
          border: '1px solid rgba(107,125,74,0.35)',
          borderRadius: 18,
          padding: 'clamp(28px, 4vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 30,
          alignItems: 'center',
          boxShadow: '0 30px 60px -20px rgba(0,0,0,0.5)',
        }}>
          <div>
            <p style={{
              fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 600,
              letterSpacing: '0.22em', textTransform: 'uppercase',
              color: 'var(--olive)', margin: '0 0 10px',
            }}>{data.priceBox.label}</p>
            <p style={{
              fontFamily: "'Instrument Serif', serif", fontSize: 'clamp(42px, 5vw, 56px)',
              color: '#fff', lineHeight: 1, margin: 0,
            }}>{data.priceBox.price}</p>
          </div>
          <div style={{
            fontFamily: 'Sora, sans-serif', fontSize: 14, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.7)',
          }}>
            {data.priceBox.details}
          </div>
          <div style={{ display: 'grid', gap: 10 }}>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'rgba(255,255,255,0.72)' }}>
              <CheckCircle size={18} weight="duotone" color="#6B7D4A" />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13 }}>
                Durée : <strong style={{ color: '#fff' }}>{data.priceBox.duration}</strong>
              </span>
            </div>
            <div style={{ display: 'flex', gap: 10, alignItems: 'center', color: 'rgba(255,255,255,0.72)' }}>
              <CheckCircle size={18} weight="duotone" color="#6B7D4A" />
              <span style={{ fontFamily: 'Sora, sans-serif', fontSize: 13 }}>
                Distance : <strong style={{ color: '#fff' }}>{data.priceBox.distance}</strong>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ───────── SECTIONS DE CONTENU ───────── */}
      <div className="lt-sections" style={{
        maxWidth: 980, margin: '0 auto',
        padding: 'clamp(60px, 10vw, 110px) clamp(20px, 5vw, 40px) 60px',
      }}>
        {data.sections.map((sec, i) => (
          <section key={i} className="lt-section" style={{ marginBottom: 70 }}>
            <h2 style={{
              fontFamily: "'Instrument Serif', serif",
              fontSize: 'clamp(26px, 3.4vw, 40px)',
              fontWeight: 400, lineHeight: 1.15,
              color: '#fff', margin: '0 0 24px',
            }}>
              {sec.heading}
            </h2>
            {sec.paragraphs?.map((p, pi) => (
              <p key={pi} style={{
                fontFamily: 'Sora, sans-serif', fontSize: 16, lineHeight: 1.75,
                color: 'rgba(255,255,255,0.75)', margin: '0 0 18px',
              }}>
                {p}
              </p>
            ))}
            {sec.bullets && (
              <div style={{
                display: 'grid', gap: 14, marginTop: 28,
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              }}>
                {sec.bullets.map((b, bi) => (
                  <div key={bi} style={{
                    padding: '20px 22px',
                    background: 'rgba(255,255,255,0.035)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: 12,
                  }}>
                    <p style={{
                      fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600,
                      color: '#fff', margin: '0 0 8px',
                    }}>{b.title}</p>
                    <p style={{
                      fontFamily: 'Sora, sans-serif', fontSize: 13.5, lineHeight: 1.65,
                      color: 'rgba(255,255,255,0.65)', margin: 0,
                    }}>{b.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </section>
        ))}
      </div>

      {/* ───────── FAQ ───────── */}
      <section style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(107,79,130,0.06) 100%)',
        padding: '80px 0',
      }}>
        <div style={{ maxWidth: 860, margin: '0 auto', padding: '0 clamp(20px, 5vw, 40px)' }}>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            color: 'var(--lavande)', margin: '0 0 14px',
          }}>Questions fréquentes</p>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 3.6vw, 42px)',
            fontWeight: 400, color: '#fff', margin: '0 0 44px',
          }}>
            Ce que les clients nous demandent avant de réserver
          </h2>

          <div style={{ display: 'grid', gap: 16 }}>
            {data.faqs.map((faq, i) => (
              <details
                key={i}
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: 12,
                  padding: '18px 22px',
                }}
              >
                <summary style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 15, fontWeight: 600,
                  color: '#fff', cursor: 'pointer', listStyle: 'none',
                }}>
                  {faq.q}
                </summary>
                <p style={{
                  fontFamily: 'Sora, sans-serif', fontSize: 14.5, lineHeight: 1.7,
                  color: 'rgba(255,255,255,0.72)', margin: '14px 0 0',
                }}>
                  {faq.r}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ───────── CTA FINAL ───────── */}
      <section style={{ padding: '80px 0 100px' }}>
        <div style={{
          maxWidth: 900, margin: '0 auto',
          padding: 'clamp(40px, 6vw, 70px) clamp(24px, 5vw, 60px)',
          background: 'linear-gradient(135deg, var(--olive) 0%, #52612F 100%)',
          borderRadius: 20,
          textAlign: 'center',
          boxShadow: '0 40px 80px -20px rgba(107,125,74,0.4)',
        }}>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 'clamp(28px, 3.6vw, 44px)',
            fontWeight: 400, color: '#fff', margin: '0 0 16px',
          }}>
            {data.ctaTitle}
          </h2>
          <p style={{
            fontFamily: 'Sora, sans-serif', fontSize: 15, lineHeight: 1.6,
            color: 'rgba(255,255,255,0.85)', margin: '0 0 32px', maxWidth: 560, marginInline: 'auto',
          }}>
            {data.ctaDesc}
          </p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href={`tel:${CONTACT.tel}`}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 26px', borderRadius: 999,
                background: '#fff', color: 'var(--olive)',
                fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 700,
                textDecoration: 'none',
              }}
            >
              <Phone size={16} weight="fill" />
              {CONTACT.tel}
            </a>
            <Link
              to="/contact"
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 10,
                padding: '15px 26px', borderRadius: 999,
                background: 'rgba(0,0,0,0.25)', color: '#fff',
                border: '1px solid rgba(255,255,255,0.35)',
                fontFamily: 'Sora, sans-serif', fontSize: 14, fontWeight: 600,
                textDecoration: 'none',
              }}
            >
              Formulaire de réservation <ArrowRight size={15} weight="bold" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
