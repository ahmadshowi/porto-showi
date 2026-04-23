'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import LogoLoop from '@/components/LogoLoop'
import { SiReact, SiNextdotjs, SiTypescript, SiTailwindcss } from 'react-icons/si'

const roles = ['Full Stack Developer', 'UI/UX Enthusiast', 'React Developer', 'Problem Solver']

const techLogos = [
  { node: <SiReact className="text-cyan-400" />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs className="text-white" />, title: "Next.js", href: "https://nextjs.org" },
  { node: <SiTypescript className="text-blue-500" />, title: "TypeScript", href: "https://www.typescriptlang.org" },
  { node: <SiTailwindcss className="text-sky-400" />, title: "Tailwind CSS", href: "https://tailwindcss.com" },
]

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
    <section ref={ref} id="hero" className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16">

      {/* Background blur circles */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)',
            y,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* MAIN CONTENT */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >

        <p className="section-label mb-6">Available for work</p>

        <h1 className="display-font text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-text mb-4">
          Hi, I'm <span className="text-accent">Showi</span>
        </h1>

        {/* TYPEWRITER */}
        <div className="font-mono text-xl text-text-dim mb-6 h-8">
          <span className="text-accent">{'>'}</span>
          <span className="ml-2">{displayed}</span>
          <span className="cursor-blink text-accent">|</span>
        </div>

        <p className="font-mono text-sm text-text-dim max-w-xl mx-auto mb-10">
          Building digital experiences that are fast, accessible, and beautifully crafted.
        </p>

        {/* BUTTON */}
        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() => document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 bg-accent text-bg font-mono text-sm font-bold"
          >
            View Projects
          </button>

          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-8 py-4 border border-accent text-accent font-mono text-sm font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* TECH STACK LOOP */}
      <div className="relative z-10 w-full border-t border-border/50 py-8 bg-surface/40 backdrop-blur-md">

        <p className="text-xs font-mono text-text-dim text-center mb-4 tracking-widest">
          TECH STACK
        </p>

        <LogoLoop
          logos={techLogos}
          speed={60}
          direction="left"
          logoHeight={40}
          gap={50}
          scaleOnHover
          fadeOut
          fadeOutColor="#0b0b0b"
        />
      </div>
    </section>
  )
}