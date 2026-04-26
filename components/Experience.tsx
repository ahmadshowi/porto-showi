'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Folder from '@/components/Folder'
import { RevealUp } from './RevealUp'

const folders = [
  {
    title: 'Company',
    items: [
      {
        title: 'AirNav Indonesia',
        period: '2025 — 2026',
        image: '/images/airnav.png',
        desc: 'Business Analyst for NavEvent, an internal enterprise event reporting application focused on workflow analysis, requirement gathering, and user process optimization.'
      },
      {
        title: 'AirNav Indonesia',
        period: '2025 — 2026',
        image: '/images/airnav.png',
        desc: 'System Analyst for STREAM, responsible for translating business needs into system specifications, process flow documentation, and feature validation.'
      }
    ]
  },
  {
    title: 'Freelance',
    items: [
      {
        title: 'Rental Mobil Transbulevard',
        period: '2025',
        image: '/images/bulevard.png',
        desc: 'Built a modern car rental website using Next.js, Tailwind CSS, and Firebase with booking management, fleet showcase, and admin dashboard.'
      },
      {
        title: 'Sistem Manajemen Bengkel HS Motor',
        period: '2025',
        image: '/images/hsmotor.png',
        desc: 'Developed a workshop management system with service scheduling, customer database, spare part tracking, and financial reports.'
      },
      {
        title: 'SPK Dana Bansos Cianjur',
        period: '2025',
        image: '/images/cianjur.png',
        desc: 'Decision support application for social fund distribution with recipient scoring, recommendation engine, and analytics dashboard.'
      },
      {
        title: 'UI/UX Design Kenapa Bandung?',
        period: '2025',
        image: '/images/bandung.png',
        desc: 'Crafted mobile app UI/UX prototype in Figma with user-friendly navigation, tourism-focused visual hierarchy, and interactive flow.'
      }
    ]
  }
]

export default function Experience() {
  const [activeFolder, setActiveFolder] = useState<number | null>(null)

  return (
    <section
      id="experience"
      className="relative py-32 px-6 overflow-hidden bg-surface/30"
    >
      {/* futuristic bg grid */}
      <div className="absolute inset-0 opacity-[0.04] bg-[linear-gradient(to_right,#fff_1px,transparent_1px),linear-gradient(to_bottom,#fff_1px,transparent_1px)] bg-[size:50px_50px]" />

      {/* ambient glow */}
      <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-accent/10 blur-[140px] rounded-full" />

      <div className="max-w-6xl mx-auto text-center relative z-10">
        <RevealUp>
          <p className="section-label mb-4">02 — Experience</p>
        </RevealUp>

        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Work <span className="text-accent">History</span>
          </h2>
        </RevealUp>

        {/* folders */}
        <div className="flex justify-center gap-24 flex-wrap mb-10">
          {folders.map((folder, i) => (
            <div key={i} className="flex flex-col items-center">
              <Folder
                size={1.6}
                color="#e8ff47"
                isOpen={activeFolder === i}
                onClick={() =>
                  setActiveFolder(activeFolder === i ? null : i)
                }
                items={[
                  <span key="1">{folder.title}</span>,
                  <span key="2">{folder.items.length} Projects</span>,
                  <span key="3">Open</span>
                ]}
              />

              <p className="mt-6 text-xs uppercase tracking-[0.35em] text-text-dim">
                {folder.title}
              </p>
            </div>
          ))}
        </div>

        {/* connector line */}
        <div className="w-full h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent mb-12" />

        {/* panel */}
        <AnimatePresence mode="wait">
          {activeFolder !== null && (
            <motion.div
              key={activeFolder}
              initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              exit={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
              transition={{ duration: 0.6 }}
              className="
                max-w-5xl mx-auto
                border border-white/10
                bg-white/5
                backdrop-blur-xl
                rounded-3xl
                p-8
                shadow-[0_0_40px_rgba(232,255,71,0.08)]
              "
            >
              <h3 className="text-2xl font-bold text-accent mb-8 text-left">
                {folders[activeFolder].title} Directory
              </h3>

              <div className="max-h-[420px] overflow-y-auto space-y-5 pr-2 custom-scroll">
                {folders[activeFolder].items.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.12 }}
                    className="
                      flex gap-5
                      border border-white/10
                      bg-black/20
                      hover:bg-white/5
                      rounded-2xl
                      p-4
                      transition-all duration-300
                      hover:translate-x-2
                    "
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-28 h-28 object-cover rounded-xl border border-white/10"
                    />

                    <div className="text-left">
                      <h4 className="font-bold text-lg text-text">
                        {item.title}
                      </h4>
                      <p className="text-xs uppercase tracking-widest text-accent mt-1">
                        {item.period}
                      </p>
                      <p className="text-sm text-text-dim mt-3 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}