'use client'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useRef } from 'react'

const projects = [
  {
    number: '01',
    title: 'E-Commerce Platform',
    desc: 'Full-featured online store with real-time inventory, payment gateway, and admin dashboard. Handles 500+ daily transactions.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    link: '#',
    featured: true,
    color: '#e8ff47',
  },
  {
    number: '02',
    title: 'Task Management SaaS',
    desc: 'Collaborative project management tool with real-time updates via WebSockets, drag-and-drop, and team analytics.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#',
    featured: true,
    color: '#3effee',
  },
  {
    number: '03',
    title: 'AI Content Generator',
    desc: 'Web app integrating GPT API for automated content creation with custom templates, editing tools, and export options.',
    tags: ['Next.js', 'OpenAI API', 'Prisma', 'TailwindCSS'],
    link: '#',
    featured: false,
    color: '#ff6b6b',
  },
  {
    number: '04',
    title: 'Analytics Dashboard',
    desc: 'Real-time data visualization platform with customizable widgets, date filtering, and CSV export capabilities.',
    tags: ['React', 'Recharts', 'FastAPI', 'PostgreSQL'],
    link: '#',
    featured: false,
    color: '#b39ddb',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const rotateX = useTransform(y, [-100, 100], [6, -6])
  const rotateY = useTransform(x, [-100, 100], [-6, 6])
  const springX = useSpring(rotateX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotateY, { stiffness: 200, damping: 20 })

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    x.set(e.clientX - rect.left - rect.width / 2)
    y.set(e.clientY - rect.top - rect.height / 2)
  }

  const resetMouse = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className="relative group cursor-pointer"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
      viewport={{ once: true }}
      style={{ perspective: 1000, rotateX: springX, rotateY: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
    >
      <div className="border border-border bg-surface/50 p-8 h-full hover:border-opacity-50 transition-all duration-300 relative overflow-hidden"
        style={{ ['--accent-color' as string]: project.color }}
      >
        {/* Color accent on hover */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 origin-left"
          style={{ background: project.color, scaleX: 0 }}
          whileHover={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Project number */}
        <div
          className="font-display text-7xl font-bold mb-4 leading-none select-none transition-all duration-300"
          style={{ color: project.color, opacity: 0.15 }}
        >
          {project.number}
        </div>

        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="display-font text-xl font-bold text-text group-hover:text-white transition-colors">
            {project.title}
          </h3>
          {project.featured && (
            <span
              className="font-mono text-[0.6rem] tracking-widest uppercase px-2 py-0.5 shrink-0"
              style={{ color: project.color, border: `1px solid ${project.color}40` }}
            >
              Featured
            </span>
          )}
        </div>

        <p className="font-mono text-xs text-text-dim leading-relaxed mb-6">{project.desc}</p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map(tag => (
            <span key={tag} className="font-mono text-[0.65rem] text-text-dim border border-border px-2 py-0.5">
              {tag}
            </span>
          ))}
        </div>

        <motion.a
          href={project.link}
          className="font-mono text-xs tracking-widest uppercase flex items-center gap-2 transition-colors duration-200"
          style={{ color: project.color }}
          whileHover={{ x: 4 }}
        >
          View Project
          <span>→</span>
        </motion.a>

        {/* Hover glow */}
        <motion.div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
          style={{
            background: `radial-gradient(circle at 50% 50%, ${project.color}08 0%, transparent 70%)`,
          }}
        />
      </div>
    </motion.div>
  )
}

export default function Projects() {
  return (
    <section id="projects" className="py-32 px-6 bg-surface/20">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">04 — Projects</p>
        </RevealUp>
        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Selected <span className="text-accent">Work</span>
          </h2>
        </RevealUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p, i) => (
            <ProjectCard key={p.number} project={p} index={i} />
          ))}
        </div>

        <RevealUp delay={0.3}>
          <div className="text-center mt-12">
            <motion.a
              href="https://github.com"
              target="_blank"
              className="font-mono text-sm text-text-dim border border-border px-8 py-4 inline-flex items-center gap-3 hover:border-accent hover:text-accent transition-all duration-300"
              whileHover={{ scale: 1.02 }}
            >
              View all on GitHub
              <span>→</span>
            </motion.a>
          </div>
        </RevealUp>
      </div>
    </section>
  )
}
