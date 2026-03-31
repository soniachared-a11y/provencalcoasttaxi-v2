import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const labelRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    const label = labelRef.current
    if (!dot || !ring || !label) return

    // Skip on touch devices
    if ('ontouchstart' in window || window.matchMedia('(pointer: coarse)').matches) {
      return
    }

    dot.style.display = 'block'
    ring.style.display = 'block'

    const pos = { x: -100, y: -100 }
    const smooth = { x: -100, y: -100 }
    let raf

    const onMouseMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const setCursorState = (state) => {
      switch (state) {
        case 'button':
          gsap.to(ring, { scale: 2.2, opacity: 0.5, duration: 0.3, ease: 'power2.out' })
          gsap.to(dot, { scale: 0, duration: 0.2 })
          label.textContent = ''
          break
        case 'image':
          gsap.to(ring, { scale: 3, opacity: 0.6, duration: 0.3, ease: 'power2.out' })
          gsap.to(dot, { scale: 0, duration: 0.2 })
          label.textContent = 'VIEW'
          label.style.opacity = '1'
          break
        case 'link':
          gsap.to(ring, { scale: 1.8, opacity: 0.4, duration: 0.3, ease: 'power2.out' })
          gsap.to(dot, { scale: 0.5, duration: 0.2 })
          label.textContent = ''
          break
        default:
          gsap.to(ring, { scale: 1, opacity: 0.2, duration: 0.4, ease: 'power2.out' })
          gsap.to(dot, { scale: 1, duration: 0.3 })
          label.textContent = ''
          label.style.opacity = '0'
      }
    }

    const onOver = (e) => {
      const target = e.target.closest('button, [type="submit"]')
      if (target) return setCursorState('button')

      const img = e.target.closest('.flotte-image, .sa-panel, .service-strip, #hero-alt img, #about img:not([aria-hidden])')
      if (img) return setCursorState('image')

      const link = e.target.closest('a, [role="button"], .interactive')
      if (link) return setCursorState('link')
    }

    const onOut = (e) => {
      const relatedTarget = e.relatedTarget
      if (relatedTarget && e.currentTarget.contains(relatedTarget)) return
      setCursorState('default')
    }

    const loop = () => {
      smooth.x += (pos.x - smooth.x) * 0.15
      smooth.y += (pos.y - smooth.y) * 0.15

      gsap.set(dot, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 })
      gsap.set(ring, { x: smooth.x, y: smooth.y, xPercent: -50, yPercent: -50 })
      gsap.set(label, { x: smooth.x, y: smooth.y, xPercent: -50, yPercent: -50 })

      raf = requestAnimationFrame(loop)
    }

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)
    raf = requestAnimationFrame(loop)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(raf)
    }
  }, [])

  const base = {
    position: 'fixed',
    top: 0,
    left: 0,
    pointerEvents: 'none',
    zIndex: 99999,
    display: 'none',
    willChange: 'transform',
  }

  return (
    <>
      <style>{`
        @media (pointer: fine) {
          html, html * { cursor: none !important; }
        }
      `}</style>
      {/* Dot */}
      <div
        ref={dotRef}
        style={{
          ...base,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--olive)',
          mixBlendMode: 'difference',
        }}
      />
      {/* Ring follower */}
      <div
        ref={ringRef}
        style={{
          ...base,
          width: 40,
          height: 40,
          borderRadius: '50%',
          border: '1.5px solid var(--olive)',
          opacity: 0.2,
          zIndex: 99998,
          mixBlendMode: 'difference',
        }}
      />
      {/* Label */}
      <div
        ref={labelRef}
        style={{
          ...base,
          zIndex: 99997,
          fontFamily: 'Sora, sans-serif',
          fontSize: 9,
          fontWeight: 600,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: '#fff',
          mixBlendMode: 'difference',
          opacity: 0,
          transition: 'opacity 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
        }}
      />
    </>
  )
}
