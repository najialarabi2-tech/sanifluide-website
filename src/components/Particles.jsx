import { useEffect, useRef } from 'react'

const COUNT = 35
const ORANGE = '242,101,34'

function rand(min, max) { return Math.random() * (max - min) + min }

function makeParticle(W, H) {
  return {
    x: rand(0, W),
    y: rand(0, H),
    r: rand(1, 3),
    vx: rand(-0.2, 0.2),
    vy: rand(-0.45, -0.15),
    alpha: rand(0.06, 0.35),
    pulse: rand(0, Math.PI * 2),
    pulseSpeed: rand(0.007, 0.018),
  }
}

export default function Particles() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d', { willReadFrequently: false, alpha: true })
    let rafId
    let W, H
    let particles = []
    let resizeTimer

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      particles = Array.from({ length: COUNT }, () => makeParticle(W, H))
    }

    const draw = () => {
      ctx.clearRect(0, 0, W, H)

      for (const p of particles) {
        p.pulse += p.pulseSpeed
        const a = p.alpha * (0.65 + 0.35 * Math.sin(p.pulse))

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${ORANGE},${a.toFixed(3)})`
        ctx.fill()

        p.x += p.vx
        p.y += p.vy

        if (p.y < -10) { p.y = H + 10; p.x = rand(0, W) }
        if (p.x < -10) p.x = W + 10
        if (p.x > W + 10) p.x = -10
      }

      rafId = requestAnimationFrame(draw)
    }

    const onResize = () => {
      clearTimeout(resizeTimer)
      resizeTimer = setTimeout(resize, 150)
    }

    resize()
    draw()

    window.addEventListener('resize', onResize, { passive: true })

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(resizeTimer)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 1,
      }}
      aria-hidden="true"
    />
  )
}
