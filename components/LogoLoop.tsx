'use client'

import { useEffect, useRef } from 'react'

type Logo = {
  node: React.ReactNode
  title?: string
  href?: string
}

type Props = {
  logos: Logo[]
  speed?: number
  gap?: number
  direction?: 'left' | 'right'
  pauseOnHover?: boolean
}

export default function LogoLoop({
  logos,
  speed = 60,
  gap = 40,
  direction = 'left',
  pauseOnHover = true,
}: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  // Refs (not state) so hovering doesn't restart the effect and snap x back to 0
  const pausedRef = useRef(false)
  const xRef = useRef(0)

  useEffect(() => {
    let animationFrame: number
    let last = performance.now()

    const animate = (now: number) => {
      const track = trackRef.current
      if (!track) return

      // seconds since last frame, so speed is the same on 60Hz and 120Hz screens
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now

      // One copy of the list plus the gap that sits between the two copies
      const width = (track.scrollWidth + gap) / 2

      if (!pausedRef.current && width > 0) {
        const move = speed * dt
        let x = xRef.current + (direction === 'left' ? -move : move)
        if (x <= -width) x += width
        if (x > 0) x -= width
        xRef.current = x
        track.style.transform = `translateX(${x}px)`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [speed, gap, direction])

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => { if (pauseOnHover) pausedRef.current = true }}
      onMouseLeave={() => { pausedRef.current = false }}
    >
      <div
        ref={trackRef}
        className="flex items-center w-max"
        style={{ gap: `${gap}px` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center justify-center text-4xl">
            {logo.href ? (
              <a
                href={logo.href}
                target="_blank"
                rel="noopener noreferrer"
                title={logo.title}
                aria-label={logo.title}
                className="opacity-70 hover:opacity-100 hover:scale-110 transition"
              >
                {logo.node}
              </a>
            ) : (
              logo.node
            )}
          </div>
        ))}
      </div>
    </div>
  )
}