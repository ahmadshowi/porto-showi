'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import LogoLoop from '@/components/LogoLoop'

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
  'Full Stack Developer',
  'UI/UX Enthusiast',
  'React Developer',
  'Problem Solver'
]

const techLogos = [
  // Frontend
  { node: <SiReact />, title: 'React', href: 'https://react.dev' },
  { node: <SiNextdotjs />, title: 'Next.js', href: 'https://nextjs.org' },
  { node: <SiTypescript />, title: 'TypeScript', href: 'https://www.typescriptlang.org' },
  { node: <SiJavascript />, title: 'JavaScript', href: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' },
  { node: <SiTailwindcss />, title: 'Tailwind CSS', href: 'https://tailwindcss.com' },
  { node: <SiHtml5 />, title: 'HTML5', href: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
  
  // Backend
  { node: <SiNodedotjs />, title: 'Node.js', href: 'https://nodejs.org' },
  { node: <SiExpress />, title: 'Express.js', href: 'https://expressjs.com' },
  { node: <SiPhp />, title: 'PHP', href: 'https://www.php.net' },
  { node: <SiLaravel />, title: 'Laravel', href: 'https://laravel.com' },
  { node: <SiOpenjdk />, title: 'Java', href: 'https://www.java.com' },
  { node: <SiPython />, title: 'Python', href: 'https://www.python.org' },

  // Database
  { node: <SiMysql />, title: 'MySQL', href: 'https://www.mysql.com' },
  { node: <SiPostgresql />, title: 'PostgreSQL', href: 'https://www.postgresql.org' },
  { node: <SiMongodb />, title: 'MongoDB', href: 'https://www.mongodb.com' },
  { node: <SiFirebase />, title: 'Firebase', href: 'https://firebase.google.com' },

  // Tools
  { node: <SiGit />, title: 'Git', href: 'https://git-scm.com' },
  { node: <SiGithub />, title: 'GitHub', href: 'https://github.com' },
  { node: <SiDocker />, title: 'Docker', href: 'https://www.docker.com' },
  { node: <SiFigma />, title: 'Figma', href: 'https://figma.com' },
  { node: <SiVercel />, title: 'Vercel', href: 'https://vercel.com' },
]

export default function Hero() {
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
    let timeout: NodeJS.Timeout

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => {
        setDisplayed(current.slice(0, displayed.length + 1))
      }, 80)
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000)
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => {
        setDisplayed(displayed.slice(0, -1))
      }, 40)
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false)
      setRoleIndex((roleIndex + 1) % roles.length)
    }

    return () => clearTimeout(timeout)
  }, [displayed, isDeleting, roleIndex])

  return (
    <section
      ref={ref}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
    >
      {/* Background */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full"
          style={{
            background:
              'radial-gradient(circle, rgba(232,255,71,0.06) 0%, transparent 70%)',
            y,
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <p className="section-label mb-6">Available for work</p>

        <h1 className="display-font text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-text mb-4">
          Hi, I'm{' '}
          <span className="text-accent glitch" data-text="Showi">
            Showi
          </span>
        </h1>

        <div className="font-mono text-xl text-text-dim mb-6 h-8">
          <span className="text-accent">{'>'}</span>
          <span className="ml-2">{displayed}</span>
          <span className="cursor-blink text-accent">|</span>
        </div>

        <p className="font-mono text-sm text-text-dim max-w-xl mx-auto mb-10">
          Building digital experiences that are fast, accessible, and beautifully crafted.
        </p>

        <div className="flex justify-center gap-4 mb-12">
          <button
            onClick={() =>
              document
                .querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-4 bg-accent text-bg font-mono text-sm font-bold"
          >
            View Projects
          </button>

          <button
            onClick={() =>
              document
                .querySelector('#contact')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
            className="px-8 py-4 border border-accent text-accent font-mono text-sm font-bold"
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* Logo Loop */}
      <div className="relative z-10 w-full border-t border-border/50 py-8 px-6 bg-surface/40 backdrop-blur-md overflow-hidden">
        <p className="text-xs font-mono text-text-dim text-center mb-4 tracking-widest">
          TECH STACK
        </p>

        <LogoLoop logos={techLogos} speed={60} gap={50} />
      </div>
    </section>
  )
}