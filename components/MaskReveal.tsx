'use client'
import { motion, type Variants } from 'framer-motion'
import type { ReactNode } from 'react'

const line: Variants = {
  hidden: { y: '110%', rotate: 2 },
  show: (delay: number) => ({
    y: '0%',
    rotate: 0,
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1], delay },
  }),
}

interface Props {
  lines: ReactNode[]
  as?: 'h1' | 'h2'
  className?: string
  delay?: number
  // When given, plays on this flag instead of when scrolled into view
  play?: boolean
}

// Heading whose lines slide up from behind a mask, one after another.
// The observer sits on the heading itself: the lines start clipped out of
// view, so observing them directly would never fire.
export default function MaskReveal({ lines, as = 'h2', className = '', delay = 0, play }: Props) {
  const Tag = as === 'h1' ? motion.h1 : motion.h2
  const trigger =
    play === undefined
      ? { whileInView: 'show', viewport: { once: true, amount: 0.6 } }
      : { animate: play ? 'show' : 'hidden' }

  return (
    <Tag className={className} initial="hidden" {...trigger}>
      {lines.map((content, i) => (
        // padding + negative margin keeps descenders (g, y, p) from being clipped
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span className="block origin-bottom-left" variants={line} custom={delay + i * 0.09}>
            {content}
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
