import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

export default function CursorFollower() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Hide on touch devices
    if ('ontouchstart' in window) {
      dot.style.display = 'none'
      ring.style.display = 'none'
      return
    }

    dot.style.display = 'block'
    ring.style.display = 'block'

    const pos = { x: 0, y: 0 }
    const smooth = { x: 0, y: 0 }
    let raf

    const onMouseMove = (e) => {
      pos.x = e.clientX
      pos.y = e.clientY
    }

    const onEnterInteractive = () => {
      gsap.to(ring, { scale: 2, opacity: 0.4, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 0.5, duration: 0.3, ease: 'power2.out' })
    }

    const onLeaveInteractive = () => {
      gsap.to(ring, { scale: 1, opacity: 0.15, duration: 0.3, ease: 'power2.out' })
      gsap.to(dot, { scale: 1, duration: 0.3, ease: 'power2.out' })
    }

    const loop = () => {
      smooth.x += (pos.x - smooth.x) * 0.12
      smooth.y += (pos.y - smooth.y) * 0.12

      gsap.set(dot, { x: pos.x, y: pos.y, xPercent: -50, yPercent: -50 })
      gsap.set(ring, { x: smooth.x, y: smooth.y, xPercent: -50, yPercent: -50 })

      raf = requestAnimationFrame(loop)
    }

    // Event delegation for interactive elements
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        onEnterInteractive()
      }
    }
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], input, select, textarea, .interactive')) {
        onLeaveInteractive()
      }
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

  const baseStyle = {
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
      <div
        ref={dotRef}
        style={{
          ...baseStyle,
          width: 6,
          height: 6,
          borderRadius: '50%',
          background: 'var(--olive)',
          mixBlendMode: 'difference',
        }}
      />
      <div
        ref={ringRef}
        style={{
          ...baseStyle,
          width: 32,
          height: 32,
          borderRadius: '50%',
          border: '1.5px solid var(--olive)',
          opacity: 0.15,
          zIndex: 99998,
        }}
      />
    </>
  )
}
