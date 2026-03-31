import { useState, useEffect, useRef, useCallback } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ChevronRight } from 'lucide-react'
import { FAQS } from '../../data/content'

gsap.registerPlugin(ScrollTrigger)

function FAQItem({ faq, index, isOpen, onToggle }) {
  const contentRef = useRef(null)
  const chevronRef = useRef(null)
  const id = `faq-${index}`

  useEffect(() => {
    const el = contentRef.current
    if (!el) return

    if (isOpen) {
      gsap.set(el, { height: 'auto', display: 'block' })
      const h = el.offsetHeight
      gsap.fromTo(el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.4, ease: 'power2.out' }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.3,
        ease: 'power2.in',
        onComplete: () => gsap.set(el, { display: 'none' }),
      })
    }
  }, [isOpen])

  useEffect(() => {
    if (chevronRef.current) {
      gsap.to(chevronRef.current, {
        rotate: isOpen ? 90 : 0,
        duration: 0.3,
        ease: 'power2.out',
      })
    }
  }, [isOpen])

  return (
    <div style={{ borderBottom: '1px solid var(--border)' }}>
      {/* Question */}
      <button
        onClick={() => onToggle(index)}
        aria-expanded={isOpen}
        aria-controls={id}
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '24px 0',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontFamily: 'Sora, sans-serif',
          fontSize: 15,
          fontWeight: 600,
          color: 'var(--texte)',
          textAlign: 'left',
          gap: 16,
        }}
        onMouseEnter={() => {
          if (chevronRef.current && !isOpen) {
            gsap.to(chevronRef.current, { x: 4, duration: 0.2, ease: 'power2.out' })
          }
        }}
        onMouseLeave={() => {
          if (chevronRef.current && !isOpen) {
            gsap.to(chevronRef.current, { x: 0, duration: 0.2, ease: 'power2.out' })
          }
        }}
      >
        <span>{faq.q}</span>
        <span
          ref={chevronRef}
          style={{ flexShrink: 0, color: 'var(--texte-light)' }}
        >
          <ChevronRight size={18} />
        </span>
      </button>

      {/* Answer */}
      <div
        ref={contentRef}
        id={id}
        role="region"
        style={{
          overflow: 'hidden',
          height: 0,
          opacity: 0,
          display: 'none',
        }}
      >
        <p style={{
          fontFamily: 'Sora, sans-serif',
          fontSize: 14,
          fontWeight: 300,
          color: 'var(--texte-light)',
          lineHeight: 1.7,
          margin: 0,
          paddingBottom: 24,
        }}>
          {faq.r}
        </p>
      </div>
    </div>
  )
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1)
  const sectionRef = useRef(null)

  const handleToggle = useCallback((index) => {
    setOpenIndex(prev => prev === index ? -1 : index)
  }, [])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-list', {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          once: true,
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      style={{ background: 'var(--surface)' }}
    >
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span style={{
            fontFamily: 'Sora, sans-serif',
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: 'var(--lavande)',
            display: 'inline-block',
            marginBottom: 16,
          }}>
            Questions fréquentes
          </span>
          <h2 style={{
            fontFamily: "'Instrument Serif', serif",
            fontSize: 36,
            fontWeight: 400,
            color: 'var(--texte)',
            lineHeight: 1.2,
            margin: 0,
          }}>
            Questions fréquentes
          </h2>
        </div>

        {/* FAQ list */}
        <div className="faq-list">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={handleToggle}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
