'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import LogoLoop from '@/components/LogoLoop'
import { Download } from 'lucide-react'

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
  'Business Analyst',
  'System Analyst',
  'Full Stack Developer',
  'Solution Builder'
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
      className="relative min-h-screen flex flex-col justify-center overflow-hidden pt-16"
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

      {/* Hero Content */}
      <motion.div
        className="relative z-10 max-w-5xl mx-auto px-6 text-center"
        style={{ opacity }}
      >
        <p className="section-label mb-6">Available for Work</p>

        <h1 className="display-font text-6xl md:text-8xl lg:text-[10rem] font-bold leading-none text-text mb-4">
          Hi, I&apos;m{' '}
          <span className="text-accent glitch" data-text="Showi">
            Showi
          </span>
        </h1>

        <div className="font-mono text-xl text-text-dim mb-8 h-8">
          <span className="text-accent">{'>'}</span>
          <span className="ml-2">{displayed}</span>
          <span className="cursor-blink text-accent">|</span>
        </div>

        <p className="font-mono text-sm md:text-base text-text-dim max-w-3xl mx-auto mb-12 leading-relaxed">
          Experienced in Business Analysis, System Analysis, and Full-Stack Development—
          translating business requirements into clear system workflows and transforming
          them into scalable digital solutions.
        </p>

        <div className="flex justify-center flex-wrap gap-4 mb-14">
          <button
            onClick={() =>
              document
                .querySelector('#projects')
                ?.scrollIntoView({ behavior: 'smooth' })
            }
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
        </div>
      </motion.div>

      {/* Tech Stack Loop */}
      <div className="relative z-10 w-full border-t border-border/50 py-8 px-6 bg-surface/40 backdrop-blur-md overflow-hidden">
        <p className="text-xs font-mono text-text-dim text-center mb-4 tracking-widest">
          TECH STACK
        </p>

        <LogoLoop logos={techLogos} speed={60} gap={50} />
      </div>
    </section>
  )
}