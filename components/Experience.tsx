'use client'

import { useState } from 'react'
import Folder from '@/components/Folder'
import { RevealUp } from './RevealUp'

const folders = [
  {
    title: 'Company',
    items: [
      {
        title: 'Tech Startup',
        period: '2023 — Present',
        image: '/images/project1.webp',
        desc: 'Build SaaS platform with React & Next.js'
      },
      {
        title: 'Corporate App',
        period: '2022',
        image: '/images/project2.webp',
        desc: 'Dashboard internal company'
      }
    ]
  },
  {
    title: 'Freelance',
    items: [
      {
        title: 'Landing Page',
        period: '2023',
        image: '/images/project3.webp',
        desc: 'Modern UI landing page'
      }
    ]
  },
  {
    title: 'Projects',
    items: [
      {
        title: 'Portfolio',
        period: '2024',
        image: '/images/project4.webp',
        desc: 'Personal website'
      },
      {
        title: 'E-Commerce',
        period: '2023',
        image: '/images/project5.webp',
        desc: 'Fullstack shop app'
      }
    ]
  }
]

export default function Experience() {
  const [activeFolder, setActiveFolder] = useState<number | null>(null)

  return (
    <section id="experience" className="py-32 px-6 bg-surface/30">
      <div className="max-w-5xl mx-auto text-center">

        <RevealUp>
          <p className="section-label mb-4">02 — Experience</p>
        </RevealUp>

        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Work <span className="text-accent">History</span>
          </h2>
        </RevealUp>

        {/* FOLDERS */}
        <div className="flex justify-center gap-16 flex-wrap mb-16">
          {folders.map((folder, i) => (
            <div key={i}>
              <Folder
  size={1.5}
  color="#e8ff47"
  isOpen={activeFolder === i}
  onClick={() =>
    setActiveFolder(activeFolder === i ? null : i)
  }
  items={[
    <span key="1">{folder.title}</span>,
    <span key="2">{folder.items.length} items</span>,
    <span key="3">Open</span>
  ]}
/>

              <p className="mt-3 text-sm text-text-dim">
                {folder.title}
              </p>
            </div>
          ))}
        </div>

        {/* PANEL */}
        {activeFolder !== null && (
          <div className="max-w-4xl mx-auto border border-border p-6 bg-surface/50">

            <h3 className="text-xl font-bold text-accent mb-6">
              {folders[activeFolder].title}
            </h3>

            <div className="max-h-[400px] overflow-y-auto space-y-6 pr-2">

              {folders[activeFolder].items.map((item, i) => (
                <div key={i} className="flex gap-4 border border-border p-4">

                  {/* IMAGE */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-24 h-24 object-cover border border-border"
                  />

                  {/* TEXT */}
                  <div className="text-left">
                    <h4 className="font-bold text-text">{item.title}</h4>
                    <p className="text-xs text-accent">{item.period}</p>
                    <p className="text-sm text-text-dim mt-2">{item.desc}</p>
                  </div>

                </div>
              ))}

            </div>
          </div>
        )}

      </div>
    </section>
  )
}