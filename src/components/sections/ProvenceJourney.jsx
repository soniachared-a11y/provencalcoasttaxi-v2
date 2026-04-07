// ProvenceJourney.jsx — Section animée Allocab-style
// Scène 1 : fond sombre, voiture traverse le titre
// Scène 2 : paysage provençal, voiture arrive sur la route

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ProvenceJourney() {
  const sectionRef = useRef(null)
  const decorRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    const decor = decorRef.current

    if (!section || !decor) return

    const ctx = gsap.context(() => {

      // Parallaxe 4 couches d'arbres
      const treeAnimations = [
        { sel: '.pj-trees-1', yPercent: 3 },
        { sel: '.pj-trees-2', yPercent: -6 },
        { sel: '.pj-trees-3', yPercent: 9 },
        { sel: '.pj-trees-4', yPercent: -12 },
      ]
      treeAnimations.forEach(({ sel, yPercent }) => {
        const el = section.querySelector(sel)
        if (!el) return
        gsap.fromTo(el,
          { yPercent: -yPercent },
          {
            yPercent,
            ease: 'none',
            scrollTrigger: {
              trigger: decor,
              start: 'top bottom',
              end: 'bottom top',
              scrub: true,
              invalidateOnRefresh: true,
            },
          }
        )
      })

    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Paysage provençal — route + arbres ── */}
      <div
        ref={decorRef}
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: '960 / 400',
          overflow: 'hidden',
          background: 'linear-gradient(180deg, #0C1A0A 0%, #1A2E10 50%, #0E1A0C 100%)',
        }}
      >
        {/* Route SVG */}
        <img
          src="/images/route-provence.svg"
          alt=""
          aria-hidden="true"
          width={400}
          height={300}
          loading="lazy"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-50%',
            width: '200%',
            transformOrigin: 'top',
            zIndex: 2,
            pointerEvents: 'none',
          }}
        />

        {/* Couches d'arbres — parallaxe 4 layers */}
        <img
          src="/images/rse-trees-4.webp"
          alt=""
          aria-hidden="true"
          className="pj-trees-4"
          width={200}
          height={300}
          loading="lazy"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-50%',
            width: '200%',
            transformOrigin: 'top',
            zIndex: 3,
            pointerEvents: 'none',
          }}
        />
        <img
          src="/images/rse-trees-3.webp"
          alt=""
          aria-hidden="true"
          className="pj-trees-3"
          width={200}
          height={300}
          loading="lazy"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-50%',
            width: '200%',
            transformOrigin: 'top',
            zIndex: 4,
            pointerEvents: 'none',
          }}
        />
        <img
          src="/images/rse-trees-2.webp"
          alt=""
          aria-hidden="true"
          className="pj-trees-2"
          width={200}
          height={300}
          loading="lazy"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-50%',
            width: '200%',
            transformOrigin: 'top',
            zIndex: 5,
            pointerEvents: 'none',
          }}
        />
        <img
          src="/images/rse-trees-1.webp"
          alt=""
          aria-hidden="true"
          className="pj-trees-1"
          width={200}
          height={300}
          loading="lazy"
          style={{
            position: 'absolute',
            bottom: 0,
            left: '-50%',
            width: '200%',
            transformOrigin: 'top',
            zIndex: 6,
            pointerEvents: 'none',
          }}
        />

      </div>

      <style>{`
        @media (max-width: 768px) {
          .pj-trees-1, .pj-trees-2, .pj-trees-3, .pj-trees-4 {
            left: -25% !important;
            width: 150% !important;
          }
        }
      `}</style>
    </section>
  )
}
