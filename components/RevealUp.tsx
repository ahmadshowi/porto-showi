'use client'
import { useInView } from 'react-intersection-observer'
import { motion, Variant } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  direction?: 'up' | 'left' | 'right' | 'none'
}

export function useReveal(threshold = 0.15) {
  const { ref, inView } = useInView({ threshold, triggerOnce: true })
  return { ref, inView }
}

export function RevealUp({ children, delay = 0, className = '', direction = 'up' }: RevealProps) {
  const { ref, inView } = useReveal()

  const initial: Record<string, any> = { opacity: 0 }
  if (direction === 'up') initial.y = 40
  if (direction === 'left') initial.x = -40
  if (direction === 'right') initial.x = 40

  const animate: Record<string, any> = { opacity: inView ? 1 : 0 }
  if (direction === 'up') animate.y = inView ? 0 : 40
  if (direction === 'left') animate.x = inView ? 0 : -40
  if (direction === 'right') animate.x = inView ? 0 : 40

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={initial}
      animate={animate}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {children}
    </motion.div>
  )
}
