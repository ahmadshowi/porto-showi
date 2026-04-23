'use client'
import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <motion.div
            className="font-display text-2xl font-bold text-accent"
            whileHover={{ scale: 1.05 }}
          >
            DEV<span className="text-text">.</span>
          </motion.div>

          {/* Center */}
          <div className="text-center">
            <p className="font-mono text-xs text-text-dim">
              Designed & Built by{' '}
              <span className="text-accent">Showi</span>
            </p>
            <p className="font-mono text-[0.65rem] text-border mt-1">
              © {2026} — All rights reserved by Showi
            </p>
          </div>

          {/* Back to top */}
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="group flex items-center gap-2 font-mono text-xs text-text-dim hover:text-accent transition-colors uppercase tracking-widest"
            whileHover={{ y: -2 }}
          >
            Back to top
            <motion.span
              animate={{ y: [0, -3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↑
            </motion.span>
          </motion.button>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-border/50 flex flex-wrap items-center justify-center gap-6">
          {['React', 'Next.js', 'Framer Motion', 'TailwindCSS'].map((tech, i) => (
            <span key={tech} className="flex items-center gap-2 font-mono text-[0.65rem] text-border">
              {i > 0 && <span className="text-accent/30">✦</span>}
              {tech}
            </span>
          ))}
        </div>
      </div>
    </footer>
  )
}
