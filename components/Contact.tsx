'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { RevealUp } from './RevealUp'
import { useState, useRef } from 'react'

const socials = [
  { label: 'GitHub', handle: '@alexdev', href: 'https://github.com', icon: '⌥' },
  { label: 'LinkedIn', handle: 'Alex Developer', href: 'https://linkedin.com', icon: '◈' },
  { label: 'Twitter/X', handle: '@alexdev_', href: 'https://twitter.com', icon: '✦' },
  { label: 'Email', handle: 'alex@email.com', href: 'mailto:alex@email.com', icon: '◎' },
]

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [focused, setFocused] = useState<string | null>(null)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.MouseEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simulate sending
    await new Promise(r => setTimeout(r, 1800))
    setStatus('sent')
    setForm({ name: '', email: '', message: '' })
    setTimeout(() => setStatus('idle'), 4000)
  }

  return (
    <section id="contact" className="py-32 px-6 bg-surface/30">
      <div className="max-w-6xl mx-auto">
        <RevealUp>
          <p className="section-label mb-4">07 — Contact</p>
        </RevealUp>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <div>
            <RevealUp delay={0.1}>
              <h2 className="display-font text-5xl md:text-6xl font-bold text-text leading-tight mb-6">
                Let's build<br />something{' '}
                <span className="text-accent">great</span>
              </h2>
            </RevealUp>

            <RevealUp delay={0.2}>
              <p className="font-mono text-sm text-text-dim leading-relaxed mb-12">
                I'm currently available for freelance work and open to full-time opportunities.
                Whether you have a project in mind or just want to say hi — my inbox is always open.
              </p>
            </RevealUp>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {socials.map((s, i) => (
                <RevealUp key={s.label} delay={0.3 + i * 0.07} direction="left">
                  <motion.a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between border border-border px-5 py-4 hover:border-accent/50 transition-all duration-300 bg-surface/30"
                    whileHover={{ x: 6 }}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-accent font-mono text-lg">{s.icon}</span>
                      <div>
                        <div className="font-mono text-[0.65rem] text-text-dim uppercase tracking-widest">{s.label}</div>
                        <div className="font-mono text-sm text-text group-hover:text-accent transition-colors">{s.handle}</div>
                      </div>
                    </div>
                    <motion.span
                      className="text-text-dim group-hover:text-accent font-mono text-sm transition-colors"
                      initial={{ x: 0 }}
                      whileHover={{ x: 4 }}
                    >
                      →
                    </motion.span>
                  </motion.a>
                </RevealUp>
              ))}
            </div>
          </div>

          {/* Right: Form */}
          <RevealUp delay={0.2} direction="right">
            <div className="border border-border bg-surface/50 p-8 relative">
              {/* Corner decorations */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-accent/40" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-accent/40" />

              <p className="font-mono text-xs text-accent tracking-widest uppercase mb-8">// Send a message</p>

              <div className="flex flex-col gap-6">
                {/* Name */}
                <div className="relative">
                  <label
                    className={`absolute left-0 font-mono text-xs tracking-widest uppercase transition-all duration-200 pointer-events-none
                      ${focused === 'name' || form.name ? '-top-5 text-[0.6rem] text-accent' : 'top-3 text-text-dim'}`}
                  >
                    Name
                  </label>
                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-mono text-sm text-text py-3 transition-colors duration-200"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <label
                    className={`absolute left-0 font-mono text-xs tracking-widest uppercase transition-all duration-200 pointer-events-none
                      ${focused === 'email' || form.email ? '-top-5 text-[0.6rem] text-accent' : 'top-3 text-text-dim'}`}
                  >
                    Email
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-mono text-sm text-text py-3 transition-colors duration-200"
                  />
                </div>

                {/* Message */}
                <div className="relative">
                  <label
                    className={`absolute left-0 font-mono text-xs tracking-widest uppercase transition-all duration-200 pointer-events-none
                      ${focused === 'message' || form.message ? '-top-5 text-[0.6rem] text-accent' : 'top-3 text-text-dim'}`}
                  >
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    rows={4}
                    className="w-full bg-transparent border-b border-border focus:border-accent outline-none font-mono text-sm text-text py-3 transition-colors duration-200 resize-none"
                  />
                </div>

                {/* Submit */}
                <motion.button
                  onClick={handleSubmit}
                  disabled={status === 'sending' || status === 'sent'}
                  className="relative overflow-hidden group mt-2 border border-accent px-8 py-4 font-mono text-sm font-bold tracking-widest uppercase text-accent disabled:opacity-60 disabled:cursor-not-allowed"
                  whileHover={status === 'idle' ? { scale: 1.01 } : {}}
                  whileTap={status === 'idle' ? { scale: 0.98 } : {}}
                >
                  <motion.div
                    className="absolute inset-0 bg-accent"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: 0 }}
                    transition={{ duration: 0.3 }}
                  />
                  <span className="relative z-10 group-hover:text-bg transition-colors duration-300">
                    <AnimatePresence mode="wait">
                      {status === 'idle' && (
                        <motion.span key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Send Message →
                        </motion.span>
                      )}
                      {status === 'sending' && (
                        <motion.span key="sending" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          Sending...
                        </motion.span>
                      )}
                      {status === 'sent' && (
                        <motion.span key="sent" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-bg">
                          Message Sent ✓
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </span>
                </motion.button>
              </div>
            </div>
          </RevealUp>
        </div>
      </div>
    </section>
  )
}
