'use client'
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useScrollLock } from './SmoothScroll'

interface Props {
  onReveal: () => void
  onComplete: () => void
}

const SEEN_KEY = 'intro-seen'

export default function IntroAnimation({ onReveal, onComplete }: Props) {
  const [phase, setPhase] = useState<'loading' | 'exit'>('loading')
  const [counter, setCounter] = useState(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete
  const onRevealRef = useRef(onReveal)
  onRevealRef.current = onReveal

  // Only play once per browser session; reloads go straight to the page.
  // The inline script in layout.tsx hides the overlay before paint in that case.
  const [skip] = useState(() => {
    try {
      return typeof window !== 'undefined' && sessionStorage.getItem(SEEN_KEY) === '1'
    } catch {
      return false
    }
  })

  useScrollLock(!skip)

  useEffect(() => {
    if (skip) {
      onRevealRef.current()
      onCompleteRef.current()
      return
    }
    window.scrollTo(0, 0)
    const interval = setInterval(() => {
      setCounter(prev => Math.min(prev + 2, 100))
    }, 25)
    return () => clearInterval(interval)
  }, [skip])

  useEffect(() => {
    if (counter < 100) return
    const exit = setTimeout(() => {
      setPhase('exit')
      onRevealRef.current()
    }, 700)
    const done = setTimeout(() => {
      try {
        sessionStorage.setItem(SEEN_KEY, '1')
      } catch {}
      onCompleteRef.current()
    }, 1500)
    return () => {
      clearTimeout(exit)
      clearTimeout(done)
    }
  }, [counter])

  return (
    <motion.div
      className="intro-overlay fixed inset-0 z-50 flex items-center justify-center overflow-hidden"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top panel */}
      <motion.div
        className="absolute inset-x-0 top-0 bg-accent z-10"
        initial={{ height: '50%' }}
        animate={phase === 'exit' ? { height: 0 } : { height: '50%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />
      {/* Bottom panel */}
      <motion.div
        className="absolute inset-x-0 bottom-0 bg-accent z-10"
        initial={{ height: '50%' }}
        animate={phase === 'exit' ? { height: 0 } : { height: '50%' }}
        transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      />

      {/* Center content */}
      <div className="relative z-20 flex flex-col items-center gap-6">
        {/* Counter */}
        <motion.div
          className="font-mono text-7xl font-bold text-bg"
          animate={phase === 'exit' ? { opacity: 0, scale: 0.8 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          {String(counter).padStart(3, '0')}
        </motion.div>

        {/* Progress bar */}
        <motion.div
          className="w-48 h-0.5 bg-bg/30 overflow-hidden"
          animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
        >
          <div className="h-full bg-bg" style={{ width: `${counter}%` }} />
        </motion.div>

        <motion.p
          className="font-mono text-xs tracking-[0.3em] text-bg/60 uppercase"
          animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
        >
          Loading Portfolio
        </motion.p>
      </div>
    </motion.div>
  )
}
