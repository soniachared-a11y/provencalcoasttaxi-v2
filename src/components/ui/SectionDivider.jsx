import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SectionDivider() {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    const line = ref.current.querySelector('.divider-line')
    gsap.to(line, {
      scaleX: 1,
      duration: 1,
      ease: 'power2.inOut',
      scrollTrigger: {
        trigger: ref.current,
        start: 'top 90%',
        once: true,
      },
    })
  }, [])

  return (
    <div ref={ref} style={{ maxWidth: 1200, margin: '0 auto', padding: '0 24px' }}>
      <div
        className="divider-line"
        style={{
          height: 1,
          background: 'var(--border)',
          transformOrigin: 'left',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  )
}
