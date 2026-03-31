import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'

export default function MagneticButton({
  children,
  as: Tag = 'a',
  strength = 0.35,
  radius = 80,
  ...props
}) {
  const ref = useRef(null)
  const contentRef = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || 'ontouchstart' in window) return

    const onMove = (e) => {
      const rect = el.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = e.clientX - cx
      const dy = e.clientY - cy
      const dist = Math.sqrt(dx * dx + dy * dy)

      if (dist < radius) {
        const pull = (radius - dist) / radius
        gsap.to(el, {
          x: dx * pull * strength,
          y: dy * pull * strength,
          duration: 0.4,
          ease: 'power2.out',
          overwrite: 'auto',
        })
        // Inner content moves more for depth
        if (contentRef.current) {
          gsap.to(contentRef.current, {
            x: dx * pull * strength * 0.6,
            y: dy * pull * strength * 0.6,
            duration: 0.4,
            ease: 'power2.out',
            overwrite: 'auto',
          })
        }
      }
    }

    const onLeave = () => {
      gsap.to(el, {
        x: 0, y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.2, 0.4)',
        overwrite: 'auto',
      })
      if (contentRef.current) {
        gsap.to(contentRef.current, {
          x: 0, y: 0,
          duration: 0.6,
          ease: 'elastic.out(1.2, 0.4)',
          overwrite: 'auto',
        })
      }
    }

    window.addEventListener('mousemove', onMove)
    el.addEventListener('mouseleave', onLeave)

    return () => {
      window.removeEventListener('mousemove', onMove)
      el.removeEventListener('mouseleave', onLeave)
    }
  }, [strength, radius])

  return (
    <Tag ref={ref} {...props} style={{ ...props.style, willChange: 'transform', display: 'inline-flex' }}>
      <span ref={contentRef} style={{ display: 'inline-flex', alignItems: 'center', gap: 'inherit' }}>
        {children}
      </span>
    </Tag>
  )
}
