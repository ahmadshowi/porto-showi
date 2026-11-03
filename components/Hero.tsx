'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import LogoLoop from '@/components/LogoLoop'
import { Download } from 'lucide-react'
import { scrollToTarget } from './SmoothScroll'
import MaskReveal from './MaskReveal'
import ProcessLoop from './ProcessLoop'

import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiFirebase,
  SiDjango,
  SiNodedotjs,
  SiExpress,
  SiOpenjdk,
  SiPython,
  SiDocker,
  SiGit,
  SiGithub,
  SiFigma,
  SiVercel
} from 'react-icons/si'

const roles = [
  'System Analyst',
  'Business Analyst',
  'Full Stack Developer',
]

const techLogos = [
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
  { node: <SiPhp />, title: 'PHP', href: 'https://www.php.net' },
  { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
  { node: <SiDjango />, title: 'Django', href: 'https://www.djangoproject.com' },
  { node: <SiOpenjdk />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiFirebase />, title: 'Firebase', href: 'https://firebase.google.com' },
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
  { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
]

export default function Hero({ revealed }: { revealed: boolean }) {
  const ref = useRef<HTMLElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const [roleIndex, setRoleIndex] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const current = roles[roleIndex]
    let timeout: ReturnType<typeof setTimeout>

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 90)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 1800)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 45)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((prev) => (prev + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col overflow-hidden pt-16"
    >
      {/* Background Accent Glow */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)',
            y,
          }}
          animate={{ scale: [1, 1.12, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="relative flex-1 flex items-center justify-center">
        <ProcessLoop play={revealed} opacity={opacity} />

        {/* Hero Content */}
        <motion.div
          className="relative z-10 max-w-5xl mx-auto px-6 py-10 text-center"
          style={{ opacity }}
        >
          <MaskReveal
            as="h1"
            play={revealed}
            delay={0.15}
            className="display-font text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-text mb-4"
            lines={[
              'Hi, I’m',
              <span key="name" className="text-accent glitch" data-text="Showi">Showi</span>,
            ]}
          />

          <motion.div
            className="font-mono text-xl text-text-dim mb-8 h-8"
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <span className="text-accent">{'>'}</span>
            <span className="ml-2">{displayed}</span>
            <span className="cursor-blink text-accent">|</span>
          </motion.div>

          <motion.p
            className="font-mono text-sm md:text-base text-text-dim max-w-3xl mx-auto mb-12 leading-relaxed"
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            I turn business requirements into system specs, process flows, and
            working software.
          </motion.p>

          <motion.div
            className="flex justify-center flex-wrap gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={revealed ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.6, delay: 0.75 }}
          >
            <button
              onClick={() => scrollToTarget('#projects')}
              className="px-8 py-4 bg-accent text-bg font-mono text-sm font-bold transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(232,255,71,0.35)]"
            >
              View Projects
            </button>

            <a
              href="/images/CV-ahmadshowi.pdf"
              download
              className="px-8 py-4 border border-accent text-accent font-mono text-sm font-bold transition-all duration-300 hover:bg-accent hover:text-bg hover:scale-105 inline-flex items-center gap-2"
            >
              <Download size={16} />
              Download Resume
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Tech Stack Loop */}
      <div className="relative z-10 w-full border-t border-border/50 py-8 px-6 bg-surface/40 backdrop-blur-md overflow-hidden">
        <p className="text-xs font-mono text-text-dim text-center mb-4 tracking-widest">
          TECH STACK
        </p>

        <LogoLoop logos={techLogos} speed={36} gap={50} />
      </div>
    </section>
  )
}