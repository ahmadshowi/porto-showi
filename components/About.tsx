'use client'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealUp } from './RevealUp'
import MaskedProfile from '@/components/MaskedProfile'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])

  return (
    <section ref={ref} id="about" className="relative py-32 px-6 overflow-hidden">
      <motion.div
        style={{ x }}
        className="absolute top-20 left-0 text-[10rem] md:text-[14rem] font-bold opacity-[0.02] select-none pointer-events-none"
      >
        ABOUT
      </motion.div>

      <div className="relative z-10 max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">01 — About</p>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <RevealUp>
              <h2 className="display-font text-5xl md:text-6xl font-bold text-text leading-tight mb-8">
                Crafting code<br />with <span className="text-accent">purpose</span>
              </h2>
            </RevealUp>

            <RevealUp delay={0.2}>
              <p className="font-mono text-sm text-text-dim leading-relaxed mb-6">
                Experienced in Business Analysis, System Analysis, and Full-Stack Development—translating business requirements into clear system workflows and transforming them into scalable digital solutions.
              </p>
            </RevealUp>

            <RevealUp delay={0.3}>
              <p className="font-mono text-sm text-text-dim leading-relaxed mb-8">
                Bridging logic, design, and development into meaningful systems that solve real operational problems.
              </p>
            </RevealUp>

            <RevealUp delay={0.4}>
              <div className="grid grid-cols-2 gap-6">
                {[
                  { label: 'Projects', value: '6+' },
                  { label: 'Experience', value: '1 YR' },
                  { label: 'Certifications', value: '2+' },
                  { label: 'Coffee/day', value: '∞' },
                ].map(({ label, value }) => (
                  <div key={label} className="border border-border p-4 hover:border-accent/50 transition-all duration-300">
                    <div className="font-display text-3xl font-bold text-accent">{value}</div>
                    <div className="font-mono text-xs text-text-dim uppercase tracking-widest mt-1">{label}</div>
                  </div>
                ))}
              </div>
            </RevealUp>
          </div>

          <RevealUp delay={0.2} direction="right">
            <MaskedProfile />
          </RevealUp>
        </div>
      </div>
    </section>
  )
}