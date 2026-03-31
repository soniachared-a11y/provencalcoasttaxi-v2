// Wrapper GSAP ScrollReveal — réutilisable sur n'importe quel élément
import { useEffect, useRef } from 'react'
import { fadeUp } from '../../utils/animations'

export default function ScrollReveal({ children, delay = 0, className = '' }) {
  const ref = useRef(null)

  useEffect(() => {
    if (!ref.current) return
    fadeUp(ref.current, { delay })
  }, [delay])

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  )
}
