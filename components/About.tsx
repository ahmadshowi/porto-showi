'use client'
import { motion } from 'framer-motion'
import { useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { RevealUp } from './RevealUp'
import Avatar3D from '@/components/Avatar3D'

export default function About() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  // Subtle scroll-linked parallax + rotation for the 3D avatar container
  const avatarY = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const avatarRotate = useTransform(scrollYProgress, [0, 1], [-3, 3])

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
                ].map(({ label, value }, i) => (
                  <motion.div
                    key={label}
                    className="border border-border p-4 hover:border-accent/50 transition-all duration-300"
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i, duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                  >
                    <div className="font-display text-3xl font-bold text-accent">{value}</div>
                    <div className="font-mono text-xs text-text-dim uppercase tracking-widest mt-1">{label}</div>
                  </motion.div>
                ))}
              </div>
            </RevealUp>
          </div>

          <RevealUp delay={0.2} direction="right">
            <motion.div
              className="relative h-[500px]"
              style={{ y: avatarY, rotate: avatarRotate }}
            >
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="w-[380px] h-[380px] rounded-full bg-accent/20 blur-[120px]"
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.7, 1, 0.7],
                    x: [0, 15, 0],
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}
                />
              </div>
              <motion.div
                className="relative h-full"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.25, 0.46, 0.45, 0.94] }}
              >
                <Avatar3D />
              </motion.div>
            </motion.div>
          </RevealUp>
        </div>
      </div>
    </section>
  )
}