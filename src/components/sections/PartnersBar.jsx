import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Row 1 — large serif names, scroll LEFT
const ROW1 = [
  { name: 'SNCF',          type: 'serif' },
  { name: 'Aéroport MRS',  type: 'serif' },
  { name: 'Hôtels 5★',     type: 'accent' },
  { name: 'Pays d\'Aix',   type: 'serif' },
  { name: 'Cliniques',     type: 'serif' },
  { name: 'Entreprises',   type: 'accent' },
  { name: 'Mariages',      type: 'serif' },
  { name: 'Festivals',     type: 'serif' },
]

// Row 2 — small uppercase descriptors, scroll RIGHT
const ROW2 = [
  'Gare TGV · Aix-en-Provence',
  'Marseille Provence',
  'Partenaire Officiel',
  'Communauté du Pays d\'Aix',
  'Transport Médical Conventionné',
  'Déplacements d\'Affaires',
  'Événements Prestige',
  'Soirées & Culture',
]

const SEP = (
  <span aria-hidden="true" style={{
    display: 'inline-block',
    width: 5, height: 5,
    borderRadius: '50%',
    background: 'var(--olive)',
    margin: '0 clamp(24px,3vw,48px)',
    verticalAlign: 'middle',
    flexShrink: 0,
    opacity: 0.65,
  }} />
)

function buildItems(arr, repeat = 3) {
  const out = []
  for (let r = 0; r < repeat; r++) {
    arr.forEach((item, i) => { out.push({ ...item, key: `${r}-${i}` }) })
  }
  return out
}

function buildRow2(arr, repeat = 4) {
  const out = []
  for (let r = 0; r < repeat; r++) {
    arr.forEach((s, i) => out.push({ s, key: `${r}-${i}` }))
  }
  return out
}

export default function PartnersBar() {
  const sectionRef = useRef(null)
  const track1Ref  = useRef(null)
  const track2Ref  = useRef(null)
  const tl1Ref     = useRef(null)
  const tl2Ref     = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 90%',
        once: true,
        onEnter: () => {
          gsap.from('.pb-label', { y: 12, opacity: 0, duration: 0.6, ease: 'power3.out' })

          // Row 1 → LEFT
          if (track1Ref.current) {
            const w1 = track1Ref.current.scrollWidth / 3
            tl1Ref.current = gsap.to(track1Ref.current, {
              x: -w1, duration: 38, ease: 'none', repeat: -1,
              modifiers: { x: gsap.utils.unitize(x => parseFloat(x) % w1) },
            })
          }

          // Row 2 → RIGHT
          if (track2Ref.current) {
            const w2 = track2Ref.current.scrollWidth / 4
            gsap.set(track2Ref.current, { x: -w2 })
            tl2Ref.current = gsap.to(track2Ref.current, {
              x: 0, duration: 28, ease: 'none', repeat: -1,
              modifiers: { x: gsap.utils.unitize(x => (parseFloat(x) % w2 + w2) % w2 - w2) },
            })
          }
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const pause  = (ref) => ref.current?.pause()
  const resume = (ref) => ref.current?.play()

  return (
    <section
      ref={sectionRef}
      id="partners"
      style={{
        background: 'linear-gradient(180deg, #151515 0%, #1e1e1e 60%, #151515 100%)',
        position: 'relative',
        overflow: 'hidden',
        padding: '44px 0 48px',
      }}
    >
      {/* Subtle noise/grain overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.035\'/%3E%3C/svg%3E")',
        opacity: 0.5,
      }} />

      {/* Top accent line */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, var(--olive) 30%, var(--lavande) 70%, transparent 100%)',
        opacity: 0.4,
      }} />

      {/* Label */}
      <div className="pb-label" style={{ textAlign: 'center', marginBottom: 32, position: 'relative', zIndex: 1 }}>
        <span style={{
          fontFamily: 'Sora, sans-serif', fontSize: 8, fontWeight: 700,
          letterSpacing: '0.38em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.22)',
        }}>
          Ils nous font confiance
        </span>
      </div>

      {/* ── ROW 1 — large serif, LEFT */}
      <div style={{ position: 'relative', overflow: 'hidden', marginBottom: 20 }}
        onMouseEnter={() => pause(tl1Ref)} onMouseLeave={() => resume(tl1Ref)}>

        {/* Fade masks */}
        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to right, #151515, transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to left, #151515, transparent)', pointerEvents:'none' }} />

        <div ref={track1Ref} style={{ display:'flex', alignItems:'center', width:'max-content', willChange:'transform' }}>
          {buildItems(ROW1).map(({ name, type, key }) => (
            <span key={key} style={{ display:'inline-flex', alignItems:'center', flexShrink:0 }}>
              <span style={{
                fontFamily: type === 'accent' ? 'Sora, sans-serif' : "'Instrument Serif', serif",
                fontSize: type === 'accent' ? 'clamp(13px,1.4vw,18px)' : 'clamp(28px,4vw,52px)',
                fontWeight: type === 'accent' ? 700 : 400,
                fontStyle: type === 'serif' ? 'italic' : 'normal',
                letterSpacing: type === 'accent' ? '0.2em' : '-0.01em',
                textTransform: type === 'accent' ? 'uppercase' : 'none',
                color: type === 'accent' ? 'var(--olive)' : 'rgba(255,255,255,0.88)',
                whiteSpace: 'nowrap',
                padding: '0 clamp(12px,2vw,28px)',
                lineHeight: 1,
                cursor: 'default',
              }}>{name}</span>
              {SEP}
            </span>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div style={{
        height: 1, margin: '0 clamp(24px,6vw,80px) 20px',
        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.06) 20%, rgba(255,255,255,0.06) 80%, transparent)',
      }} />

      {/* ── ROW 2 — small uppercase, RIGHT */}
      <div style={{ position:'relative', overflow:'hidden' }}
        onMouseEnter={() => pause(tl2Ref)} onMouseLeave={() => resume(tl2Ref)}>

        <div style={{ position:'absolute', left:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to right, #151515, transparent)', pointerEvents:'none' }} />
        <div style={{ position:'absolute', right:0, top:0, bottom:0, width:120, zIndex:2, background:'linear-gradient(to left, #151515, transparent)', pointerEvents:'none' }} />

        <div ref={track2Ref} style={{ display:'flex', alignItems:'center', width:'max-content', willChange:'transform' }}>
          {buildRow2(ROW2).map(({ s, key }) => (
            <span key={key} style={{ display:'inline-flex', alignItems:'center', flexShrink:0 }}>
              <span style={{
                fontFamily: 'Sora, sans-serif',
                fontSize: 'clamp(8px,0.9vw,11px)',
                fontWeight: 500,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.28)',
                whiteSpace: 'nowrap',
                padding: '0 clamp(14px,2vw,28px)',
                cursor: 'default',
              }}>{s}</span>
              <span style={{
                display: 'inline-block', width: 3, height: 3,
                borderRadius: '50%', background: 'rgba(255,255,255,0.15)',
                flexShrink: 0,
              }} />
            </span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 1,
        background: 'linear-gradient(90deg, transparent 0%, var(--lavande) 30%, var(--olive) 70%, transparent 100%)',
        opacity: 0.25,
      }} />
    </section>
  )
}
