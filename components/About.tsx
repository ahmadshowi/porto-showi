'use client'
import Image from "next/image"
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealUp } from './RevealUp'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} id="about" className="relative py-32 px-6 overflow-hidden">
      {/* Parallax BG text */}
      <motion.div
        className="absolute inset-0 flex items-center pointer-events-none select-none overflow-hidden"
        style={{ x }}
      >
        <span className="font-display text-[18vw] font-bold text-white/[0.015] whitespace-nowrap">
          ABOUT ME
        </span>
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">01 — About</p>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text */}
          <div>
            <RevealUp delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold text-text leading-tight mb-8">
                Crafting code<br />with{' '}
                <span className="text-accent">purpose</span>
              </h2>
            </RevealUp>

            <RevealUp delay={0.2}>
              <p className="font-mono text-sm text-text-dim leading-relaxed mb-6">
                I'm a full-stack developer passionate about building products that live at the
                intersection of great design and solid engineering. With 3+ years of experience,
                I specialize in React, Next.js, and Node.js ecosystems.
              </p>
            </RevealUp>

            <RevealUp delay={0.3}>
              <p className="font-mono text-sm text-text-dim leading-relaxed mb-8">
                When I'm not coding, you'll find me exploring new design patterns, contributing
                to open source, or hunting for the perfect cup of kopi.
              </p>
            </RevealUp>

            <RevealUp delay={0.4}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects', value: '20+' },
                  { label: 'Experience', value: '3 yrs' },
                  { label: 'Certifications', value: '8+' },
                  { label: 'Coffee/day', value: '∞' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-border p-4 hover:border-accent/50 transition-colors duration-300">
                    <div className="font-display text-3xl font-bold text-accent">{value}</div>
                    <div className="font-mono text-xs text-text-dim uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </RevealUp>
          </div>

          {/* Right: Photo placeholder + decorative */}
          <RevealUp delay={0.2} direction="right">
            <div className="relative">
              {/* Photo frame */}
              <motion.div
  className="relative aspect-[3/4] max-w-sm mx-auto bg-surface border border-border overflow-hidden"
  whileHover={{ scale: 1.01 }}
  transition={{ duration: 0.3 }}
>
  <Image
    src="/images/showi.webp"
    alt="Profile"
    fill
    className="object-cover"
  />
</motion.div>

              {/* Floating badge */}
              <motion.div
                className="absolute -bottom-4 -right-4 bg-accent text-bg px-4 py-2 font-mono text-xs font-bold"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              >
                Open to Work ✦
              </motion.div>

              {/* Decorative dot grid */}
              <div
                className="absolute -top-6 -left-6 w-24 h-24 opacity-20"
                style={{
                  backgroundImage: 'radial-gradient(circle, #e8ff47 1px, transparent 1px)',
                  backgroundSize: '8px 8px',
                }}
              />
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  )
}
