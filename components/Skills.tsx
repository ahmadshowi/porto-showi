'use client'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import MaskReveal from './MaskReveal'

const skillGroups = [
  {
    category: 'Business Analysis',
    skills: [
      'Requirements Gathering',
      'Business Process Modeling',
      'Stakeholder Management',
      'User Stories & Use Cases',
    ],
  },
  {
    category: 'System Analysis',
    skills: [
      'System Design & Documentation',
      'UML & Flowcharts',
      'Data Analysis',
      'SQL',
    ],
  },
  {
    category: 'Tools',
    skills: ['Jira', 'Figma', 'draw.io', 'Git / GitHub'],
  },
  {
    category: 'Development',
    skills: ['React / Next.js', 'PHP / Laravel', 'REST API Design', 'Tailwind CSS'],
  },
]

const techStack = ['Django', 'TypeScript', 'Node.js', 'PostgreSQL', 'MySQL', 'MongoDB', 'Confluence', 'Notion', 'Postman']

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">03 — Skills</p>
        </RevealUp>
        <MaskReveal
          className="display-font text-5xl md:text-6xl font-bold text-text mb-16"
          lines={[<>Skills &amp; <span className="text-accent">Tools</span></>]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {skillGroups.map((group, gi) => (
            <RevealUp key={group.category} delay={gi * 0.1}>
              <div className="border border-border bg-surface/50 p-6 h-full hover:border-accent/40 transition-colors duration-300 group">
                <p className="font-mono text-[10px] text-accent/70 mb-2">
                  {String(gi + 1).padStart(2, '0')}
                </p>
                <h3 className="font-display text-lg font-bold text-text group-hover:text-accent transition-colors mb-5">
                  {group.category}
                </h3>
                <ul className="flex flex-col gap-3">
                  {group.skills.map((skill) => (
                    <li
                      key={skill}
                      className="font-mono text-xs text-text-dim group-hover:text-text transition-colors border-l border-border pl-3"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealUp>
          ))}
        </div>

        <RevealUp delay={0.2}>
          <div className="border-t border-border pt-12">
            <p className="section-label mb-6">Also familiar with</p>
            <div className="flex flex-wrap gap-3">
              {techStack.map((tech, i) => (
                <motion.span
                  key={tech}
                  className="font-mono text-xs text-text-dim border border-border px-3 py-2 hover:border-accent hover:text-accent cursor-default transition-colors duration-200"
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.03 }}
                  viewport={{ once: true }}
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
