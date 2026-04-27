'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
  const [phase, setPhase] = useState<'loading' | 'reveal' | 'exit'>('loading')
  const [counter, setCounter] = useState(0)

  useEffect(() => {
    // Count up to 100
    const interval = setInterval(() => {
      setCounter(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('reveal'), 300)
          setTimeout(() => setPhase('exit'), 1000)
          setTimeout(() => onComplete(), 1800)
          return 100
        }
        return prev + 2
      })
    }, 25)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-bg overflow-hidden"
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
        <div className="w-48 h-0.5 bg-bg/30 overflow-hidden">
          <motion.div
            className="h-full bg-bg"
            style={{ width: `${counter}%` }}
          />
        </div>

        <motion.p
          className="font-mono text-xs tracking-[0.3em] text-bg/60 uppercase"
          animate={phase === 'exit' ? { opacity: 0 } : { opacity: 1 }}
        >
          Loading Portfolio
        </motion.p>
      </div>

      {/* Background text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        <motion.span
          className="font-display text-[20vw] font-bold text-accent/10 select-none whitespace-nowrap"
          animate={phase === 'exit' ? { scale: 20, opacity: 0 } : { scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          PORTFOLIO
        </motion.span>
      </div>
    </motion.div>
  )
}
