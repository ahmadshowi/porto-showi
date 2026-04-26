'use client'

import { useState } from 'react'
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
        desc: 'Business Analyst App NavEvent For Application Internal Company'
      },
      {
        title: 'AirNav Indonesia',
        period: '2025 — 2026',
        image: '/images/airnav.png',
        desc: 'System Analyst App STREAM Application Internal Company'
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
        desc: 'Membuat website untuk rental mobil menggunakan Next.js, Tailwind CSS, dan Firebase. Fitur termasuk pemesanan online, manajemen armada, dan'
      },
      {
        title: 'Sistem Manajemen Bengkel HS Motor',
        period: '2025',
        image: '/images/hsmotor.png',
        desc: 'Membuat aplikasi manajemen bengkel menggunakan React, Node.js, dan MongoDB. Fitur termasuk penjadwalan servis, manajemen pelanggan, dan laporan keuangan.'
      },
      {
        title: 'Sistem Penunjang Keputusan Dana Bansos',
        period: '2025',
        image: '/images/cianjur.png',
        desc: 'Memuat aplikasi penunjang keputusan untuk pendistribusian dana bansos menggunakan React, Express.js, dan PostgreSQL. Fitur termasuk analisis data penerima, visualisasi distribusi, dan rekomendasi alokasi dana.'
      },      
      {
        title: 'UI/UX Design for App Kenapa Bandung?',
        period: '2025',
        image: '/images/bandung.png',
        desc: 'Membuat desain UI/UX untuk aplikasi Kenapa Bandung? menggunakan Figma. Fitur termasuk desain antarmuka yang menarik, pengalaman pengguna yang intuitif, dan prototipe interaktif.'
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