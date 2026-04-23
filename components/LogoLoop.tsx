'use client'

import { useEffect, useRef, useState } from 'react'

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
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    let animationFrame: number
    let x = 0 // ✅ start dari kiri (normal)

    const animate = () => {
      if (!trackRef.current) return

      if (!isPaused) {
        const move = speed * 0.01
        x += direction === 'left' ? -move : move

        const width = trackRef.current.scrollWidth / 2

        // loop kiri
        if (direction === 'left' && x <= -width) {
          x = 0
        }

        // loop kanan
        if (direction === 'right' && x >= 0) {
          x = -width
        }

        trackRef.current.style.transform = `translateX(${x}px)`
      }

      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [speed, direction, isPaused])

  return (
    <div
      className="overflow-hidden w-full"
      onMouseEnter={() => pauseOnHover && setIsPaused(true)}
      onMouseLeave={() => pauseOnHover && setIsPaused(false)}
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