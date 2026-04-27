'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

interface Props {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
  const [progress, setProgress] = useState(0)
  const [phase, setPhase] = useState<'boot' | 'zoom' | 'fade'>('boot')

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setPhase('zoom'), 400)
          setTimeout(() => setPhase('fade'), 1800)
          setTimeout(() => onComplete(), 2600)
          return 100
        }
        return prev + 1
      })
    }, 22)

    return () => clearInterval(interval)
  }, [onComplete])

  const tunnelLines = Array.from({ length: 14 })

  return (
    <motion.div
      className="fixed inset-0 z-[999] overflow-hidden bg-black"
      animate={phase === 'fade' ? { opacity: 0 } : { opacity: 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.08),transparent_60%)]" />

      <div className="absolute inset-0 flex items-center justify-center perspective-[2000px]">
        <motion.div
          className="relative w-full h-full flex items-center justify-center"
          animate={
            phase === 'zoom'
              ? { scale: 4.8, opacity: 0.15 }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 1.8, ease: [0.76, 0, 0.24, 1] }}
        >
          {tunnelLines.map((_, i) => (
            <motion.div
              key={i}
              className="absolute border border-cyan-400/20 rounded-[40px]"
              style={{
                width: `${220 + i * 140}px`,
                height: `${120 + i * 80}px`,
              }}
              animate={{
                scale: [1, 1.08, 1],
                opacity: [0.15, 0.4, 0.15],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.08,
                ease: 'easeInOut',
              }}
            />
          ))}

          <motion.div
            className="absolute w-[180px] h-[180px] rounded-full bg-cyan-400/10 blur-3xl"
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.3, 0.8, 0.3],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
        </motion.div>
      </div>

      <div className="absolute top-10 left-10 font-mono text-[11px] tracking-[0.3em] text-cyan-300/60 uppercase space-y-2">
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
          ENTERING SHOWI DIGITAL SYSTEM
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
          INITIALIZING SECURE ARCHIVE
        </motion.p>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
          ACCESS GRANTED [{String(progress).padStart(3, '0')}]
        </motion.p>
      </div>

      <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
        <motion.h1
          className="text-cyan-100 text-5xl md:text-7xl font-semibold tracking-[0.4em]"
          animate={phase === 'zoom' ? { opacity: 0.3, scale: 1.3 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 1.4 }}
        >
          SHOWI
        </motion.h1>

        <div className="w-56 h-[1px] bg-cyan-400/20 overflow-hidden">
          <motion.div
            className="h-full bg-cyan-300"
            style={{ width: `${progress}%` }}
          />
        </div>

        <motion.p
          className="font-mono text-[10px] tracking-[0.35em] text-cyan-300/50 uppercase"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        >
          DIGITAL TUNNEL PORTAL ACTIVE
        </motion.p>
      </div>

      <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_bottom,transparent,rgba(0,0,0,0.4),transparent)] opacity-40" />
    </motion.div>
  )
}
