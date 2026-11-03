'use client'
import { useEffect, ReactNode } from 'react'
import Lenis from 'lenis'

let lenis: Lenis | null = null
let locks = 0

function applyLock() {
  const locked = locks > 0
  document.documentElement.style.overflow = locked ? 'hidden' : ''
  if (lenis) locked ? lenis.stop() : lenis.start()
}

// Native scrollIntoView fights with Lenis, so all in-page navigation goes through here.
export function scrollToTarget(target: string | number) {
  if (lenis) {
    lenis.scrollTo(target, { force: true })
    return
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' })
  } else {
    document.querySelector(target)?.scrollIntoView({ behavior: 'smooth' })
  }
}

// Freezes page scroll (modals, intro, mobile menu). Nested locks are counted.
export function useScrollLock(active: boolean) {
  useEffect(() => {
    if (!active) return
    locks++
    applyLock()
    return () => {
      locks--
      applyLock()
    }
  }, [active])
}

export default function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      autoRaf: true,
    })
    applyLock()

    return () => {
      lenis?.destroy()
      lenis = null
    }
  }, [])

  return <>{children}</>
}
