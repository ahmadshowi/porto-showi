'use client'
import { motion } from 'framer-motion'
import { scrollToTarget } from './SmoothScroll'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="font-display text-2xl font-bold text-accent">
          Showi<span className="text-text">.</span>
        </div>

        <p className="font-mono text-xs text-text-dim text-center">
          © {year} Ahmad Showi · Built with Next.js, Tailwind &amp; Three.js
        </p>

        <motion.button
          onClick={() => scrollToTarget(0)}
          className="flex items-center gap-2 font-mono text-xs text-text-dim hover:text-accent transition-colors uppercase tracking-widest"
          whileHover={{ y: -2 }}
        >
          Back to top <span aria-hidden>↑</span>
        </motion.button>
      </div>
    </footer>
  )
}
