'use client'
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useRef } from 'react'

const projects = [
  {
    number: '01',
    title: 'E-Commerce Platform',
    desc: 'Full-featured online store with real-time inventory, payment gateway, and admin dashboard.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL', 'Redis'],
    link: '#',
    featured: true,
    color: '#e8ff47',
    image: '/images/project1.jpg',
  },
  {
    number: '02',
    title: 'Task Management SaaS',
    desc: 'Collaborative project management tool with real-time updates and analytics.',
    tags: ['React', 'Node.js', 'Socket.io', 'MongoDB'],
    link: '#',
    featured: true,
    color: '#3effee',
    image: '/images/project2.jpg',
  },
  {
    number: '03',
    title: 'AI Content Generator',
    desc: 'Web app integrating GPT API for automated content creation.',
    tags: ['Next.js', 'OpenAI API', 'Prisma', 'TailwindCSS'],
    link: '#',
    featured: false,
    color: '#ff6b6b',
    image: '/images/project3.jpg',
  },
  {
    number: '04',
    title: 'Analytics Dashboard',
    desc: 'Real-time data visualization platform with customizable widgets.',
    tags: ['React', 'Recharts', 'FastAPI', 'PostgreSQL'],
    link: '#',
    featured: false,
    color: '#b39ddb',
    image: '/images/project4.jpg',
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null)

  // mouse tilt
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
      transition={{ duration: 0.6, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000, rotateX: springX, rotateY: springY }}
      onMouseMove={handleMouse}
      onMouseLeave={resetMouse}
    >
      <a href={project.link} target="_blank">
        <div className="relative h-full overflow-hidden border border-border bg-surface">

          {/* IMAGE (hidden → reveal on hover) */}
          <motion.div
            className="absolute inset-0 z-0"
            initial={{ scale: 1.2, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/60" />
          </motion.div>

          {/* NUMBER */}
          <div
            className="absolute top-4 right-4 text-6xl font-bold opacity-10 z-10"
            style={{ color: project.color }}
          >
            {project.number}
          </div>

          {/* CONTENT */}
          <div className="relative z-10 p-6 h-full flex flex-col justify-end">

            <motion.div
              initial={{ y: 30, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all"
            >
              <h3 className="text-xl font-bold text-white mb-2">
                {project.title}
              </h3>

              <p className="text-xs text-white/70 mb-4">
                {project.desc}
              </p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] text-white/60 border border-white/20 px-2 py-0.5"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <span className="text-sm text-white">
                View Project →
              </span>
            </motion.div>
          </div>

          {/* TOP BORDER ACCENT */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{ background: project.color, scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.3 }}
          />

        </div>
      </a>
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
              View all on GitHub →
            </motion.a>
          </div>
        </RevealUp>
      </div>
    </section>
  )
}