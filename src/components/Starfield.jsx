import { useMemo } from 'react'
import './Starfield.css'

const STAR_COUNT = 90

// Generador pseudoaleatorio con semilla: las estrellas quedan siempre en el mismo lugar
function createRandom(seed) {
  let state = seed
  return () => {
    state = (state + 0x6d2b79f5) | 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

export default function Starfield() {
  const stars = useMemo(() => {
    const random = createRandom(2025)
    return Array.from({ length: STAR_COUNT }, (_, id) => ({
      id,
      left: random() * 100,
      top: random() * 100,
      size: 1 + random() * 2.2,
      maxOpacity: 0.35 + random() * 0.65,
      delay: random() * 6,
      duration: 3 + random() * 4,
    }))
  }, [])

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="starfield__star"
          style={{
            left: `${star.left}%`,
            top: `${star.top}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            '--max-opacity': star.maxOpacity,
            animationDelay: `-${star.delay}s`,
            animationDuration: `${star.duration}s`,
          }}
        />
      ))}
    </div>
  )
}