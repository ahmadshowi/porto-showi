'use client'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useInView } from 'react-intersection-observer'

const experiences = [
  {
    company: 'Tech Startup Co.',
    role: 'Senior Frontend Developer',
    period: '2023 — Present',
    desc: 'Led frontend architecture for SaaS platform serving 10k+ users. Built component library with React + TypeScript, improving dev velocity by 40%.',
    tags: ['Next.js', 'TypeScript', 'React Query', 'Figma'],
  },
  {
    company: 'Digital Agency XYZ',
    role: 'Frontend Developer',
    period: '2022 — 2023',
    desc: 'Delivered 15+ client projects including e-commerce platforms, dashboards, and marketing sites. Focused on performance optimization and animations.',
    tags: ['React', 'TailwindCSS', 'Framer Motion', 'Strapi'],
  },
  {
    company: 'Freelance',
    role: 'Web Developer',
    period: '2021 — 2022',
    desc: 'Designed and developed websites for SMBs. Handled full project lifecycle from wireframe to deployment, serving clients across Southeast Asia.',
    tags: ['HTML/CSS', 'JavaScript', 'WordPress', 'PHP'],
  },
]

function ExperienceCard({ exp, index }: { exp: typeof experiences[0]; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      className="relative pl-8 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Timeline line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-border" />

      {/* Timeline dot */}
      <motion.div
        className="absolute left-[-4px] top-0 w-2 h-2 rounded-full border-2 border-accent bg-bg"
        animate={inView ? { scale: [0, 1.3, 1] } : {}}
        transition={{ delay: index * 0.15 + 0.3, duration: 0.4 }}
      />

      {/* Card */}
      <motion.div
        className="group border border-border bg-surface/50 p-6 hover:border-accent/40 transition-all duration-300 ml-4"
        whileHover={{ x: 4 }}
      >
        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
          <div>
            <h3 className="display-font text-xl font-bold text-text group-hover:text-accent transition-colors">
              {exp.role}
            </h3>
            <p className="font-mono text-sm text-accent mt-1">{exp.company}</p>
          </div>
          <span className="font-mono text-xs text-text-dim bg-border px-3 py-1 shrink-0">
            {exp.period}
          </span>
        </div>

        <p className="font-mono text-xs text-text-dim leading-relaxed mb-4">{exp.desc}</p>

        <div className="flex flex-wrap gap-2">
          {exp.tags.map(tag => (
            <span
              key={tag}
              className="font-mono text-[0.65rem] tracking-wider text-accent/70 border border-accent/20 px-2 py-0.5"
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 bg-surface/30">
      <div className="max-w-4xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">02 — Experience</p>
        </RevealUp>
        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Work <span className="text-accent">History</span>
          </h2>
        </RevealUp>

        <div>
          {experiences.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
