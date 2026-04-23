'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'React Developer', 'Problem Solver']

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section ref={ref} id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)',
            y,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(62,255,238,0.04) 0%, transparent 70%)',
          }}
          animate={{ scale: [1.1, 1, 1.1] }}
          transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        />
      </div>

      {/* Horizontal lines decoration */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 flex flex-col gap-3 pl-6 opacity-20">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="h-px bg-accent"
            initial={{ width: 0 }}
            animate={{ width: 20 + i * 8 }}
            transition={{ delay: i * 0.1 + 0.5, duration: 0.5 }}
          />
        ))}
      </div>

      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        {/* Label */}
        <motion.p
          className="section-label mb-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          Available for work
        </motion.p>

        {/* Main heading */}
        <div className="overflow-hidden mb-4">
          <motion.h1
            className="display-font text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-text"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
          >
            Hi, I'm{' '}
            <span className="text-accent glitch" data-text="Showi">Showi</span>
          </motion.h1>
        </div>

        {/* Typewriter role */}
        <motion.div
          className="font-mono text-xl md:text-2xl text-text-dim mb-8 h-8 flex items-center justify-center gap-1"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <span className="text-accent">{'>'}</span>
          <span className="ml-2">{displayed}</span>
          <span className="cursor-blink text-accent">|</span>
        </motion.div>

        {/* Description */}
        <motion.p
          className="font-mono text-sm md:text-base text-text-dim max-w-xl mx-auto mb-12 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          Building digital experiences that are fast, accessible, and beautifully crafted.
          Based in Jakarta, Indonesia.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1 }}
        >
          <motion.button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative px-8 py-4 bg-accent text-bg font-mono text-sm font-bold tracking-widest uppercase overflow-hidden"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Projects</span>
            <motion.div
              className="absolute inset-0 bg-text"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
            />
          </motion.button>

          <motion.button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-accent text-accent font-mono text-sm font-bold tracking-widest uppercase hover:bg-accent/10 transition-colors duration-200"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Contact Me
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
        >
          <span className="section-label text-[0.6rem]">Scroll</span>
          <motion.div
            className="w-px h-16 bg-gradient-to-b from-accent to-transparent"
            animate={{ scaleY: [0, 1, 0], originY: 0 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          />
        </motion.div>
      </motion.div>

      {/* Marquee */}
      <div className="absolute bottom-0 left-0 right-0 overflow-hidden border-t border-border py-3 bg-surface/50">
        <div className="marquee-track flex gap-16 whitespace-nowrap w-max">
          {[...Array(2)].map((_, i) => (
            <span key={i} className="flex gap-16 items-center">
              {['React', 'Next.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'Figma', 'TailwindCSS', 'Docker'].map(t => (
                <span key={t} className="font-mono text-xs text-text-dim tracking-widest uppercase">
                  {t} <span className="text-accent mx-4">✦</span>
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
