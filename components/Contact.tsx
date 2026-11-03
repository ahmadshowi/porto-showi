'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import MaskReveal from './MaskReveal'
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

        <RevealUp>
          <p className="section-label mb-4">06 — Contact</p>
        </RevealUp>

        <MaskReveal
          className="display-font text-4xl md:text-6xl font-bold mb-5"
          lines={[<>Let&apos;s <span className="text-accent">talk</span></>]}
        />

        <RevealUp delay={0.1}>
          <p className="max-w-2xl mx-auto text-text-dim text-sm md:text-base leading-relaxed mb-12">
            Have a project, a role, or just a question about system analysis?
            Message me on any of these, or use the form.
          </p>
        </RevealUp>

        <RevealUp delay={0.2}>
          <div className="flex flex-wrap justify-center gap-4 md:gap-5 mb-12">
            {socials.map((s) => {
              const Icon = s.icon
              return (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="w-14 h-14 md:w-16 md:h-16 border border-border bg-surface/50 flex items-center justify-center text-text-dim hover:text-accent hover:border-accent transition-colors duration-300"
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.96 }}
                >
                  <Icon size={24} />
                </motion.a>
              )
            })}
          </div>
        </RevealUp>

        <RevealUp delay={0.2}>
          <motion.button
            onClick={() => setOpen(true)}
            className="px-8 md:px-10 py-4 bg-accent text-bg font-mono font-bold text-sm transition-shadow duration-300 hover:shadow-[0_0_25px_rgba(232,255,71,0.35)]"
            whileTap={{ scale: 0.96 }}
          >
            Send a message
          </motion.button>
        </RevealUp>

        <ContactModal open={open} setOpen={setOpen} />
      </div>
    </section>
  )
}
