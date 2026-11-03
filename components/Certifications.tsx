'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import MaskReveal from './MaskReveal'

const certifications: { name: string; issuer: string; date?: string; logo: string; color: string }[] = [
  {
    name: 'Asisten Pengembang Web',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    logo: '/images/LogoBNSP.png',
    color: '29, 78, 216',
  },
  {
    name: 'Pemrograman',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: '2025',
    logo: '/images/LogoBNSP.png',
    color: '29, 78, 216',
  },
  {
    name: 'MagangHub',
    issuer: 'Kementerian Ketenagakerjaan RI',
    date: '2026',
    logo: '/images/maganghub.png',
    color: '22, 163, 74',
  },
]

// Moves the hover glow to follow the cursor inside the card
function trackPointer(e: React.MouseEvent<HTMLDivElement>) {
  const rect = e.currentTarget.getBoundingClientRect()
  e.currentTarget.style.setProperty('--x', `${e.clientX - rect.left}px`)
  e.currentTarget.style.setProperty('--y', `${e.clientY - rect.top}px`)
}

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">05 — Certifications</p>
        </RevealUp>

        <MaskReveal
          className="display-font text-5xl md:text-6xl font-bold text-text mb-16"
          lines={[<>Credentials <span className="text-accent">&amp;</span> Certifications</>]}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.name}
              onMouseMove={trackPointer}
              className="group relative border border-border bg-surface p-8 md:p-9 overflow-hidden hover:border-white/20 transition-colors duration-300"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{
                  background: `radial-gradient(400px circle at var(--x, 50%) var(--y, 50%), rgba(${cert.color},0.18), transparent 60%)`,
                }}
              />
              <div
                className="absolute left-0 top-0 h-full w-px"
                style={{ background: `rgb(${cert.color})` }}
              />

              <div className="relative z-10 flex items-start justify-between mb-10">
                <Image
                  src={cert.logo}
                  alt={cert.issuer}
                  width={74}
                  height={74}
                  className="object-contain"
                />
                <span className="font-mono text-xs text-text-dim">{cert.date}</span>
              </div>

              <div className="relative z-10">
                <h3 className="display-font text-2xl md:text-3xl font-bold text-text mb-3">
                  {cert.name}
                </h3>
                <p className="font-mono text-sm text-text-dim">
                  {cert.issuer}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
