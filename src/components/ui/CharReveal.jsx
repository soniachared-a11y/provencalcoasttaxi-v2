import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function CharReveal({
  text,
  as: Tag = 'h2',
  stagger = 0.02,
  duration = 0.8,
  delay = 0,
  scrub = false,
  style = {},
  className = '',
}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const chars = el.querySelectorAll('.cr-char')

    const ctx = gsap.context(() => {
      if (scrub) {
        gsap.from(chars, {
          yPercent: 110,
          opacity: 0,
          stagger,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            end: 'top 55%',
            scrub: 0.6,
          },
        })
      } else {
        gsap.from(chars, {
          yPercent: 110,
          opacity: 0,
          duration,
          stagger,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            once: true,
          },
        })
      }
    }, el)

    return () => ctx.revert()
  }, [stagger, duration, delay, scrub])

  // Split text into words then chars, preserving spaces
  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} style={{ ...style, overflow: 'hidden' }}>
      {words.map((word, wi) => (
        <span key={wi} style={{ display: 'inline-block', whiteSpace: 'nowrap' }}>
          {word.split('').map((char, ci) => (
            <span
              key={ci}
              style={{ display: 'inline-block', overflow: 'hidden' }}
            >
              <span className="cr-char" style={{ display: 'inline-block' }}>
                {char}
              </span>
            </span>
          ))}
          {wi < words.length - 1 && '\u00A0'}
        </span>
      ))}
    </Tag>
  )
}
