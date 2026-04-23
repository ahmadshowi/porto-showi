'use client'

import { useEffect, useRef } from 'react'

export default function LogoLoop({
  logos,
  speed = 60,
  gap = 40,
}: {
  logos: { node: React.ReactNode; title?: string; href?: string }[]
  speed?: number
  gap?: number
}) {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let animationFrame: number
    let x = 0

    const animate = () => {
      if (!trackRef.current) return

      x -= speed * 0.01
      if (Math.abs(x) >= trackRef.current.scrollWidth / 2) {
        x = 0
      }

      trackRef.current.style.transform = `translateX(${x}px)`
      animationFrame = requestAnimationFrame(animate)
    }

    animate()
    return () => cancelAnimationFrame(animationFrame)
  }, [speed])

  return (
    <div className="overflow-hidden w-full">
      <div
        ref={trackRef}
        className="flex items-center w-max"
        style={{ gap: `${gap}px` }}
      >
        {[...logos, ...logos].map((logo, i) => (
          <div key={i} className="flex items-center justify-center text-3xl">
            {logo.href ? (
              <a href={logo.href} target="_blank" rel="noopener noreferrer">
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