'use client'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useInView } from 'react-intersection-observer'

const skillGroups = [
  {
    category: 'Frontend',
    icon: '⬡',
    skills: [
      { name: 'React / Next.js', level: 92 },
      { name: 'TypeScript', level: 85 },
      { name: 'TailwindCSS', level: 90 },
      { name: 'Framer Motion', level: 80 },
    ],
  },
  {
    category: 'Backend',
    icon: '⬡',
    skills: [
      { name: 'Node.js / Express', level: 82 },
      { name: 'PostgreSQL', level: 75 },
      { name: 'REST API Design', level: 88 },
      { name: 'Docker', level: 68 },
    ],
  },
  {
    category: 'Tools & Design',
    icon: '⬡',
    skills: [
      { name: 'Git / GitHub', level: 92 },
      { name: 'Figma', level: 90 },
      { name: 'AWS (EC2, S3)', level: 65 },
      { name: 'CI/CD Pipelines', level: 72 },
    ],
  },
]

const techStack = ['React', 'Next.js', 'TypeScript', 'Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'Redis', 'TailwindCSS', 'Framer Motion', 'Docker', 'AWS', 'Git', 'Figma', 'Prisma', 'GraphQL']

function SkillBar({ name, level, index }: { name: string; level: number; index: number }) {
  const { ref, inView } = useInView({ threshold: 0.5, triggerOnce: true })

  return (
    <div ref={ref} className="group">
      <div className="flex justify-between mb-1.5">
        <span className="font-mono text-xs text-text-dim group-hover:text-text transition-colors">{name}</span>
        <span className="font-mono text-xs text-accent">{level}%</span>
      </div>
      <div className="h-1 bg-border overflow-hidden">
        <motion.div
          className="h-full bg-accent origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : {}}
          transition={{ duration: 1, delay: index * 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{ width: `${level}%` }}
        />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">03 — Skills</p>
        </RevealUp>
        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Tech <span className="text-accent">Stack</span>
          </h2>
        </RevealUp>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          {skillGroups.map((group, gi) => (
            <RevealUp key={group.category} delay={gi * 0.1}>
              <motion.div
                className="border border-border bg-surface/50 p-6 h-full hover:border-accent/40 transition-all duration-300 group"
                whileHover={{ y: -4 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-accent text-lg">{group.icon}</span>
                  <h3 className="font-display text-lg font-bold text-text group-hover:text-accent transition-colors">
                    {group.category}
                  </h3>
                </div>
                <div className="flex flex-col gap-4">
                  {group.skills.map((skill, si) => (
                    <SkillBar key={skill.name} name={skill.name} level={skill.level} index={si + gi * 4} />
                  ))}
                </div>
              </motion.div>
            </RevealUp>
          ))}
        </div>

        {/* Tech pill cloud */}
        <RevealUp delay={0.2}>
          <div className="border-t border-border pt-12">
            <p className="section-label mb-6">Also familiar with</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="font-mono text-xs text-text-dim border border-border px-3 py-2 hover:border-accent hover:text-accent cursor-default transition-all duration-200"
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -2 }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </div>
        </RevealUp>
      </div>
    </section>
  )
}
