'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useState } from 'react'

const projects = [
  {
    number: '01',
    title: 'E-Commerce Platform',
    desc: 'Full-featured online store with real-time inventory and payment integration.',
    tags: ['Next.js', 'Stripe', 'PostgreSQL'],
    link: '#',
    color: '#e8ff47',
    images: [
      '/images/project1-1.jpg',
      '/images/project1-2.jpg',
      '/images/project1-3.jpg',
    ],
  },
  {
    number: '02',
    title: 'Task Management SaaS',
    desc: 'Collaborative tool with real-time updates and team analytics.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    color: '#3effee',
    images: [
      '/images/project2-1.jpg',
      '/images/project2-2.jpg',
      '/images/project2-3.jpg',
    ],
  },
]

export default function Projects() {
  const [active, setActive] = useState<null | typeof projects[0]>(null)

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

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.number}
              layoutId={`card-${project.number}`}
              onClick={() => setActive(project)}
              className="cursor-pointer border border-border overflow-hidden bg-surface"
            >
              <motion.img
                src={project.images[0]}
                layoutId={`image-${project.number}`}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-xs text-text-dim mt-2">{project.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* FULLSCREEN EXPERIENCE */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-lg overflow-y-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* CLOSE BUTTON */}
              <button
                onClick={() => setActive(null)}
                className="fixed top-6 right-6 z-50 text-white text-2xl"
              >
                ✕
              </button>

              <motion.div
                layoutId={`card-${active.number}`}
                className="max-w-5xl mx-auto pt-32 pb-20 px-6"
              >

                {/* HERO IMAGE */}
                <motion.img
                  src={active.images[0]}
                  layoutId={`image-${active.number}`}
                  className="w-full h-[500px] object-cover mb-10"
                />

                {/* TITLE */}
                <h2 className="text-4xl font-bold text-white mb-6">
                  {active.title}
                </h2>

                {/* DESC */}
                <p className="text-sm text-white/70 mb-10 max-w-2xl">
                  {active.desc}
                </p>

                {/* TAGS */}
                <div className="flex flex-wrap gap-3 mb-12">
                  {active.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-xs border border-white/20 text-white/70 px-3 py-1"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* GALLERY */}
                <div className="space-y-10">
                  {active.images.map((img, i) => (
                    <motion.img
                      key={i}
                      src={img}
                      className="w-full object-cover rounded-md"
                      initial={{ opacity: 0, y: 40 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    />
                  ))}
                </div>

                {/* LINK */}
                <div className="mt-16">
                  <a
                    href={active.link}
                    target="_blank"
                    className="text-lg text-accent"
                  >
                    Visit Project →
                  </a>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}