'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useState, useEffect } from 'react'

const projects = [
  {
    number: '01',
    title: 'Rental Mobil Transbulevard',
    desc: 'Membuat website untuk rental mobil menggunakan Next.js, Tailwind CSS, dan Firebase. Fitur termasuk pemesanan online, manajemen armada, dan',
    tags: ['PHP', 'JavaScript', 'MySQL'],
    link: '#',
    color: '#e8ff47',
    images: [
      '/images/mockup_rental.png',
      '/images/transbulevard1.png',
    ],
  },
  {
    number: '02',
    title: 'Technical Documentation App Stream',
    desc: 'Creating comprehensive technical documentation for a stream platform, built with React, Node.js, and MongoDB.',
    tags: ['React', 'Node.js', 'MongoDB'],
    link: '#',
    color: '#3effee',
    images: [
      '/images/techdoc_stream.png',
      '/images/techdoc_stream2.png',
    ],
  },
]

export default function Projects() {
  const [active, setActive] = useState<null | typeof projects[0]>(null)

  // 🔥 LOCK BODY SCROLL
  useEffect(() => {
    if (active) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }

    return () => {
      document.body.style.overflow = 'auto'
    }
  }, [active])

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
              className="cursor-pointer border border-border overflow-hidden bg-surface hover:border-accent/40 transition-all"
            >
              <motion.img
                src={project.images[0]}
                layoutId={`image-${project.number}`}
                className="w-full h-60 object-cover"
              />

              <div className="p-6">
                <h3 className="text-lg font-bold">{project.title}</h3>
                <p className="text-xs text-text-dim mt-2 line-clamp-2">
                  {project.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* MODAL */}
        <AnimatePresence>
          {active && (
            <motion.div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActive(null)}
            >

              <motion.div
                layoutId={`card-${active.number}`}
                className="bg-surface w-full max-w-3xl max-h-[90vh] border border-border relative flex flex-col"
                onClick={(e) => e.stopPropagation()}
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.9 }}
              >

                {/* CLOSE BUTTON */}
                <button
                  onClick={() => setActive(null)}
                  className="absolute top-4 right-4 text-text-dim hover:text-white text-xl z-10"
                >
                  ✕
                </button>

                {/* SCROLL AREA (INI KUNCI NYA) */}
                <div className="overflow-y-auto flex-1">

                  {/* IMAGE */}
                  <motion.img
                    src={active.images[0]}
                    layoutId={`image-${active.number}`}
                    className="w-full h-64 object-cover"
                  />

                  <div className="p-6">

                    {/* TITLE */}
                    <h2 className="text-2xl font-bold mb-4">
                      {active.title}
                    </h2>

                    {/* DESC */}
                    <p className="text-sm text-text-dim mb-6">
                      {active.desc}
                    </p>

                    {/* TECH STACK */}
                    <div className="mb-6">
                      <p className="text-xs mb-2 text-text-dim uppercase tracking-widest">
                        Tech Stack
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {active.tags.map(tag => (
                          <span
                            key={tag}
                            className="text-xs px-3 py-1 border border-accent/30 text-accent rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* GALLERY */}
                    <div className="space-y-4 mb-8">
                      {active.images.slice(1).map((img, i) => (
                        <motion.img
                          key={i}
                          src={img}
                          className="w-full rounded-md object-cover"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: i * 0.1 }}
                        />
                      ))}
                    </div>

                    {/* BUTTON */}
                    <a
                      href={active.link}
                      target="_blank"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-all"
                    >
                      Visit Website →
                    </a>

                  </div>
                </div>

              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  )
}