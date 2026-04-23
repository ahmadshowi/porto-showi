'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { RevealUp } from './RevealUp'
import ContactModal from '@/components/ContactModal'
import {
  SiGithub,
  SiInstagram,
  SiWhatsapp,
} from 'react-icons/si'
import { FaLinkedin } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'
const socials = [
  { label: 'GitHub', href: 'https://github.com/ahmadshowi', icon: SiGithub },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/ahmadshowi', icon: FaLinkedin }
  { label: 'Instagram', href: 'https://www.instagram.com/ahmadshowisf/', icon: SiInstagram },
  { label: 'Email', href: 'mailto:ahmadshowi15@gmail.com', icon: MdEmail },
]

export default function Contact() {
  const [open, setOpen] = useState(false)

  return (
    <section className="py-32 px-6">
      <div className="max-w-6xl mx-auto">

        <RevealUp>
          <h2 className="text-5xl font-bold mb-10">
            Let's connect <span className="text-accent">🚀</span>
          </h2>
        </RevealUp>

        {/* SOCIAL */}
        <div className="flex gap-4 mb-12">
          {socials.map((s, i) => {
            const Icon = s.icon
            return (
              <motion.a
                key={i}
                href={s.href}
                target="_blank"
                className="p-4 border border-border hover:border-accent rounded-xl"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                <Icon size={22} />
              </motion.a>
            )
          })}
        </div>

        {/* CTA BUTTON */}
        <motion.button
          onClick={() => setOpen(true)}
          className="px-8 py-4 border border-accent text-accent font-bold"
          whileHover={{ scale: 1.05 }}
        >
          Open Contact Form ✨
        </motion.button>

        {/* MODAL */}
        <ContactModal open={open} setOpen={setOpen} />
      </div>
    </section>
  )
}