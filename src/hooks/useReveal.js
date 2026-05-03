import { useEffect, useRef } from 'react'

export function useReveal() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = el.querySelectorAll('.reveal, .reveal-left')
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add('visible'), i * 120)
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.1 }
    )
    targets.forEach(t => observer.observe(t))
    return () => observer.disconnect()
  }, [])

  return ref
}
