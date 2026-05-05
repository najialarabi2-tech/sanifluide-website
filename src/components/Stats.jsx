import { useEffect, useRef, useState } from 'react'

const STATS = [
  { target: 200, suffix: '+',  label: 'Projets réalisés' },
  { target: 30,  suffix: '',  label: "Années d'expérience" },
  { target: 100, suffix: '%', label: 'Clients satisfaits' },
  { target: 24,  suffix: 'h', label: 'Service d\'urgence' },
]

function StatItem({ target, suffix, label, started }) {
  const numRef = useRef(null)

  useEffect(() => {
    if (!started || !numRef.current) return
    let current = 0
    const step = target / (1800 / 16)
    const interval = setInterval(() => {
      current += step
      if (current >= target) { current = target; clearInterval(interval) }
      if (numRef.current) numRef.current.textContent = Math.floor(current)
    }, 16)
    return () => clearInterval(interval)
  }, [started, target])

  return (
    <div className="stat-item">
      <span className="stat-item__num" ref={numRef}>0</span>
      {suffix && <span className="stat-item__num stat-item__suffix">{suffix}</span>}
      <span className="stat-item__label">{label}</span>
    </div>
  )
}

export default function Stats() {
  const sectionRef = useRef(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div className="stats" ref={sectionRef}>
      <div className="container stats__inner">
        {STATS.map(s => <StatItem key={s.label} {...s} started={started} />)}
      </div>
    </div>
  )
}
