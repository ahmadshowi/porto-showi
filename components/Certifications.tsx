'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

const certifications = [
  {
    name: 'Pemrograman',
    issuer: 'Badan Nasional Sertifikasi Profesi (BNSP)',
    date: '2025',
    id: 'BNSP-JWP-001',
    logo: '/images/LogoBNSP.png',
    color: '29, 78, 216',
  },
  {
    name: 'MagangHub',
    issuer: 'Kementerian Ketenagakerjaan RI',
    date: '2026',
    id: 'MAGANGHUB-002',
    logo: '/images/maganghub.png',
    color: '22, 163, 74',
  },
]

export default function Certifications() {
  const gridRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.magic-card')
    if (!cards) return

    const spotlight = document.createElement('div')
    spotlight.style.cssText = `
      position: fixed;
      width: 850px;
      height: 850px;
      border-radius: 50%;
      pointer-events: none;
      background: radial-gradient(circle, rgba(132,0,255,0.14) 0%, rgba(132,0,255,0.05) 30%, transparent 70%);
      transform: translate(-50%, -50%);
      opacity: 0;
      z-index: 1;
      mix-blend-mode: screen;
    `
    document.body.appendChild(spotlight)

    const handleMouseMove = (e: MouseEvent) => {
      gsap.to(spotlight, {
        left: e.clientX,
        top: e.clientY,
        opacity: 1,
        duration: 0.15,
      })

      cards.forEach((card: any) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top
        const centerX = rect.width / 2
        const centerY = rect.height / 2

        card.style.setProperty('--x', `${(x / rect.width) * 100}%`)
        card.style.setProperty('--y', `${(y / rect.height) * 100}%`)

        const rotateX = ((y - centerY) / centerY) * -4
        const rotateY = ((x - centerX) / centerX) * 4

        gsap.to(card, {
          rotateX,
          rotateY,
          x: (x - centerX) * 0.015,
          y: (y - centerY) * 0.015,
          transformPerspective: 1000,
          duration: 0.25,
          ease: 'power2.out',
        })
      })
    }

    const handleLeave = () => {
      cards.forEach((card: any) => {
        gsap.to(card, {
          rotateX: 0,
          rotateY: 0,
          x: 0,
          y: 0,
          duration: 0.4,
        })
      })

      gsap.to(spotlight, {
        opacity: 0,
        duration: 0.4,
      })
    }

    document.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleLeave)

    cards.forEach((card: any) => {
      card.addEventListener('click', (e: any) => {
        const rect = card.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        const ripple = document.createElement('span')
        ripple.style.cssText = `
          position:absolute;
          width:20px;
          height:20px;
          left:${x}px;
          top:${y}px;
          border-radius:50%;
          background:rgba(132,0,255,.45);
          transform:translate(-50%,-50%) scale(0);
          pointer-events:none;
          z-index:20;
        `
        card.appendChild(ripple)

        gsap.to(ripple, {
          scale: 20,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          onComplete: () => ripple.remove(),
        })
      })
    })

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleLeave)
      spotlight.remove()
    }
  }, [])

  return (
    <section id="certifications" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">05 — Certifications</p>
        </RevealUp>

        <RevealUp delay={0.1}>
          <h2 className="display-font text-5xl md:text-6xl font-bold text-text mb-16">
            Credentials <span className="text-accent">&</span> Certifications
          </h2>
        </RevealUp>

        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-8 perspective-[1200px]">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.id}
              className="magic-card group relative rounded-[30px] border border-white/10 bg-[#120F17]/95 backdrop-blur-xl p-9 overflow-hidden cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: i * 0.12 }}
              viewport={{ once: true }}
            >
              {/* dynamic glow */}
              <div
                className="absolute inset-0 rounded-[30px] opacity-0 group-hover:opacity-100 transition duration-300"
                style={{
                  background: `radial-gradient(450px circle at var(--x) var(--y), rgba(${cert.color},0.30), transparent 40%)`,
                }}
              />

              {/* neon border */}
              <div
                className="absolute inset-0 rounded-[30px] pointer-events-none"
                style={{
                  boxShadow: `inset 0 0 0 1px rgba(${cert.color},0.25), 0 0 35px rgba(${cert.color},0.08)`,
                }}
              />

              {/* shimmer */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full" />

              {/* particles */}
              <div className="absolute inset-0 pointer-events-none">
                {[...Array(14)].map((_, idx) => (
                  <span
                    key={idx}
                    className="absolute w-1 h-1 rounded-full animate-pulse"
                    style={{
                      background: `rgba(${cert.color},1)`,
                      left: `${Math.random() * 100}%`,
                      top: `${Math.random() * 100}%`,
                      opacity: 0.2 + Math.random() * 0.6,
                      boxShadow: `0 0 12px rgba(${cert.color},0.9)`,
                    }}
                  />
                ))}
              </div>

              <div className="relative z-10 flex items-start justify-between mb-10">
                <Image
                  src={cert.logo}
                  alt={cert.name}
                  width={74}
                  height={74}
                  className="object-contain drop-shadow-xl group-hover:scale-110 transition duration-500"
                />

                <span
                  className="text-[10px] font-mono px-3 py-1 rounded-full"
                  style={{
                    color: `rgb(${cert.color})`,
                    border: `1px solid rgba(${cert.color},0.5)`,
                  }}
                >
                  VERIFIED
                </span>
              </div>

              <div className="relative z-10">
                <h3 className="display-font text-3xl font-bold text-white mb-3">
                  {cert.name}
                </h3>

                <p className="font-mono text-sm mb-10" style={{ color: `rgba(${cert.color},1)` }}>
                  {cert.issuer}
                </p>

                <div className="flex items-center justify-between text-xs font-mono text-white/40">
                  <span>{cert.date}</span>
                  <span>{cert.id}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}