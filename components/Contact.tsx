'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import ContactModal from '@/components/ContactModal'
import {
  SiGithub,
  SiInstagram,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const socials = [
  { label: 'GitHub', href: 'https://github.com/ahmadshowi', icon: SiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmadshowi', icon: FaLinkedin },
  { label: 'Instagram', href: 'https://www.instagram.com/ahmadshowisf/', icon: SiInstagram },
  { label: 'Email', href: 'mailto:ahmadshowi15@gmail.com', icon: MdEmail },
]

export default function Contact() {
  const [open, setOpen] = useState(false)

  return (
    <section id="contact" className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Heading */}
        <RevealUp>
          <h2 className="text-4xl md:text-6xl font-bold mb-5">
            Let&apos;s Connect <span className="text-accent">🚀</span>
          </h2>
        </RevealUp>

        <RevealUp>
          <p className="max-w-2xl mx-auto text-text-dim text-sm md:text-base leading-relaxed mb-12">
            Interested in collaboration, project discussions, or professional opportunities?
            Feel free to reach out through any platform below or send a message directly.
          </p>
        </RevealUp>

        {/* Social Icons */}
        <RevealUp>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-12">
            {socials.map((s, i) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-14 h-14 md:w-16 md:h-16 rounded-2xl border border-border bg-surface/50 backdrop-blur-md flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-all duration-300"
                  whileHover={{ scale: 1.08, y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon size={24} />
                </motion.a>
              )
            })}
          </div>
        </RevealUp>

        {/* CTA */}
        <RevealUp>
          <motion.button
            onClick={() => setOpen(true)}
            className="px-8 md:px-10 py-4 rounded-2xl bg-accent text-bg font-bold text-sm md:text-base transition-all duration-300 hover:shadow-[0_0_25px_rgba(232,255,71,0.35)] hover:scale-105"
            whileTap={{ scale: 0.96 }}
          >
            Open Contact Form ✨
          </motion.button>
        </RevealUp>

        <ContactModal open={open} setOpen={setOpen} />
      </div>
    </section>
  )
}