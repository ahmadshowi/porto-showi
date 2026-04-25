'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'

const certifications = [
  {
    name: 'Pemrograman',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: '2024',
    id: 'BNSP-JWP-001',
    logo: '/images/LogoBNSP.png',
    color: '#1D4ED8',
  },
  {
    name: 'MagangHub',
    issuer: 'Kementerian Ketenagakerjaan RI',
    date: '2024',
    id: 'MAGANGHUB-002',
    logo: '/images/LogoMaganghub.png',
    color: '#16A34A',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">05 — Certifications</p>
        </RevealUp>

        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Credentials <span className="text-accent">&</span> Certifications
          </h2>
        </RevealUp>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="group relative border border-border bg-surface/60 p-8 hover:border-opacity-40 transition-all duration-300 overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -6 }}
            >
              {/* top line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: cert.color, scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />

              {/* logo */}
              <div className="mb-6">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={60}
                  height={60}
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* title */}
              <h3 className="display-font text-xl font-bold text-text mb-2 group-hover:text-white transition-colors leading-snug">
                {cert.name}
              </h3>

              {/* issuer */}
              <p className="font-mono text-sm mb-5" style={{ color: cert.color }}>
                {cert.issuer}
              </p>

              {/* footer */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs text-text-dim">{cert.date}</span>
                <span className="font-mono text-[0.65rem] text-border bg-border/20 px-3 py-1">
                  {cert.id}
                </span>
              </div>

              {/* glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 20% 20%, ${cert.color}08 0%, transparent 65%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}