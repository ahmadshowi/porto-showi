'use client'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'

const certifications = [
  {
    name: 'AWS Certified Developer – Associate',
    issuer: 'Amazon Web Services',
    date: 'Dec 2023',
    id: 'AWS-DEV-XXXX',
    icon: '☁',
    color: '#FF9900',
  },
  {
    name: 'Meta React Developer Certificate',
    issuer: 'Meta / Coursera',
    date: 'Aug 2023',
    id: 'META-REACT-XXXX',
    icon: '⚛',
    color: '#61DAFB',
  },
  {
    name: 'Google UX Design Certificate',
    issuer: 'Google / Coursera',
    date: 'May 2023',
    id: 'GOOGLE-UX-XXXX',
    icon: '◈',
    color: '#4285F4',
  },
  {
    name: 'Node.js Application Developer',
    issuer: 'OpenJS Foundation',
    date: 'Feb 2023',
    id: 'NODEJS-APP-XXXX',
    icon: '⬡',
    color: '#68A063',
  },
  {
    name: 'Fullstack Open Certificate',
    issuer: 'University of Helsinki',
    date: 'Nov 2022',
    id: 'FULLSTACK-XXXX',
    icon: '⊕',
    color: '#e8ff47',
  },
  {
    name: 'Docker Certified Associate',
    issuer: 'Docker Inc.',
    date: 'Sep 2022',
    id: 'DOCKER-XXXX',
    icon: '◫',
    color: '#2496ED',
  },
]

export default function Certifications() {
  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">05 — Certifications</p>
        </RevealUp>
        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Credentials <span className="text-accent">&</span> Certs
          </h2>
        </RevealUp>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="group relative border border-border bg-surface/50 p-6 hover:border-opacity-50 transition-all duration-300 overflow-hidden cursor-default"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
            >
              {/* Top accent line */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-0.5 origin-left"
                style={{ background: cert.color, scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />

              {/* Icon */}
              <div
                className="text-3xl mb-4 transition-transform duration-300 group-hover:scale-110 inline-block"
                style={{ color: cert.color }}
              >
                {cert.icon}
              </div>

              <h3 className="display-font text-base font-bold text-text mb-1 group-hover:text-white transition-colors leading-snug">
                {cert.name}
              </h3>

              <p className="font-mono text-xs mb-3" style={{ color: cert.color }}>
                {cert.issuer}
              </p>

              <div className="flex items-center justify-between">
                <span className="font-mono text-[0.65rem] text-text-dim">{cert.date}</span>
                <span className="font-mono text-[0.6rem] text-border bg-border/30 px-2 py-0.5">
                  {cert.id}
                </span>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-500"
                style={{
                  background: `radial-gradient(circle at 30% 30%, ${cert.color}06 0%, transparent 60%)`,
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
