'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealUp } from './RevealUp'
import MaskReveal from './MaskReveal'
import { useState, useEffect } from 'react'
import { useScrollLock } from './SmoothScroll'

type Project = {
  title: string
  desc: string
  tags: string[]
  link: string
  images: string[]
}

const projectList: Project[] = [
  {
    title: 'IBOZ ERP System',
    desc: 'ERP system at PT Pusaka Nagara. As System Analyst I analyze business processes across departments, write system specifications, and validate features with the Django development team.',
    tags: ['Django'],
    link: '',
    images: [],
  },
  {
    title: 'Wedding Invitation Website',
    desc: 'Digital wedding invitation website for sharing the couple\'s details and event information with guests.',
    tags: [],
    link: '',
    images: [],
  },
  {
    title: 'UI/UX Design Jentre NET',
    desc: 'UI/UX design for Jentre NET, from user flow to high-fidelity screens.',
    tags: ['Figma'],
    link: '',
    images: [],
  },
  {
    title: 'Cetak Barcode PT KMI',
    desc: 'Barcode printing application for PT KMI.',
    tags: [],
    link: '',
    images: [],
  },
  {
    title: 'Rental Mobil Transbulevard',
    desc: 'Car rental website with online booking, fleet management, and an admin dashboard for the rental owner.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
    link: '',
    images: [
      '/images/mockup_rental.jpg',
      '/images/transbulevard.jpg',
    ],
  },
  {
    title: 'Technical Documentation App Stream',
    desc: 'Technical documentation app for the Operations Division of AirNav Indonesia, built with PHP, Node.js, and MySQL. Covers document management, version control, and role-based access.',
    tags: ['CI', 'Node.js', 'MySQL', 'PHP'],
    link: '',
    images: [
      '/images/techdoc_stream.png',
    ],
  },
  {
    title: 'Business Analyst App NavEvent',
    desc: 'Business analysis for NavEvent, an internal event reporting app at AirNav Indonesia (Laravel, React, MySQL). Gathered user requirements, documented workflows, and kept stakeholders and developers aligned.',
    tags: ['React.js', 'Laravel', 'MySQL'],
    link: '',
    images: [
      '/images/navevent.jpg',
    ],
  },
    {
    title: 'Manajemen Bengkel HS Motor',
    desc: 'Workshop management system for HS Motor, built with PHP, JavaScript, and MySQL. Handles service scheduling, customer records, and financial reports.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
    link: '',
    images: [
      '/images/mockup_hsmotor.jpg',
    ],
  },
  {
    title: 'SPK Dana Bansos Desa Sukamaju',
    desc: 'Decision support system for distributing social assistance funds in Sukamaju Village, built with PHP, JavaScript, and MySQL. Scores recipients, visualizes distribution, and recommends allocations.',
    tags: ['PHP', 'JavaScript', 'MySQL'],
    link: '',
    images: [
      '/images/mockup_spk.jpg',
    ],
  },
  {
    title: 'UI/UX Design for App Kenapa Bandung?',
    desc: 'Mobile app UI/UX for Kenapa Bandung?, a Bandung tourism guide. Designed in Figma, from wireframes to an interactive prototype.',
    tags: ['Figma'],
    link: '',
    images: [
      '/images/kenapabandung.jpg',
    ],
  },
]

const projects = projectList.map((p, i) => ({ ...p, number: String(i + 1).padStart(2, '0') }))

// Projects without a screenshot yet get a typographic cover instead of a broken image
function Cover({ project, className }: { project: (typeof projects)[number]; className: string }) {
  if (project.images[0]) {
    return (
      <motion.img
        src={project.images[0]}
        alt={project.title}
        layoutId={`image-${project.number}`}
        className={`${className} object-cover`}
      />
    )
  }
  return (
    <motion.div
      layoutId={`image-${project.number}`}
      className={`${className} relative flex items-end p-6 bg-bg grid-bg border-b border-border overflow-hidden`}
    >
      <span className="absolute -right-4 -top-10 display-font text-[9rem] font-bold leading-none text-accent/10 select-none">
        {project.number}
      </span>
      <span className="relative display-font text-2xl font-bold text-accent leading-tight max-w-[80%]">
        {project.title}
      </span>
    </motion.div>
  )
}

export default function Projects() {
  const [active, setActive] = useState<null | (typeof projects)[number]>(null)

  useScrollLock(active !== null)

  useEffect(() => {
    if (!active) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [active])

  return (
    <section id="projects" className="py-32 px-6 bg-surface/20">
      <div className="max-w-6xl mx-auto">

        <RevealUp>
          <p className="section-label mb-4">04 — Projects</p>
        </RevealUp>

        <MaskReveal
          className="display-font text-5xl md:text-6xl font-bold text-text mb-16"
          lines={[<>Selected <span className="text-accent">Work</span></>]}
        />

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.number}
              layoutId={`card-${project.number}`}
              onClick={() => setActive(project)}
              className="cursor-pointer border border-border overflow-hidden bg-surface hover:border-accent/40 transition-all"
            >
              <Cover project={project} className="w-full h-60" />

              <div className="p-6">
                <p className="font-mono text-[10px] text-accent/70 mb-2">{project.number}</p>
                <h3 className="display-font text-lg font-bold">{project.title}</h3>
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
                  aria-label="Close"
                  className="absolute top-4 right-4 w-9 h-9 flex items-center justify-center bg-black/60 text-text-dim hover:text-white text-lg z-10"
                >
                  ✕
                </button>

                <div data-lenis-prevent className="overflow-y-auto flex-1">

                  {/* IMAGE */}
                  <Cover project={active} className="w-full h-64" />

                  <div className="p-6">

                    {/* TITLE */}
                    <h2 className="display-font text-2xl font-bold mb-4">
                      {active.title}
                    </h2>

                    {/* DESC */}
                    <p className="text-sm text-text-dim mb-6">
                      {active.desc}
                    </p>

                    {active.tags.length > 0 && (
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
                    )}

                    {active.images.length > 1 && (
                      <div className="space-y-4 mb-8">
                        {active.images.slice(1).map((img, i) => (
                          <motion.img
                            key={i}
                            src={img}
                            alt={`${active.title} screenshot ${i + 2}`}
                            className="w-full rounded-md object-cover"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                          />
                        ))}
                      </div>
                    )}

                    {active.link && (
                      <a
                        href={active.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border border-accent text-accent font-mono text-xs uppercase tracking-widest hover:bg-accent hover:text-bg transition-all"
                      >
                        Visit Website →
                      </a>
                    )}

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