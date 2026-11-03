'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { SiWhatsapp } from 'react-icons/si'
import { MdEmail } from 'react-icons/md'
import { useScrollLock } from './SmoothScroll'

const phone = '6282299417885'
const emailTarget = 'ahmadshowi15@gmail.com'

interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

export default function ContactModal({ open, setOpen }: Props) {
  const [method, setMethod] = useState<'wa' | 'email'>('wa')
  const [form, setForm] = useState({ name: '', message: '' })
  const [toast, setToast] = useState(false)

  useScrollLock(open)

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, setOpen])

  useEffect(() => {
    if (!toast) return
    const t = setTimeout(() => setToast(false), 2500)
    return () => clearTimeout(t)
  }, [toast])

  const canSend = form.name.trim() !== '' && form.message.trim() !== ''

  const handleSend = () => {
    if (!canSend) return

    const text = `Halo, saya ${form.name.trim()}\n\n${form.message.trim()}`

    if (method === 'wa') {
      window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank')
    } else {
      const subject = `Portfolio contact from ${form.name.trim()}`
      window.location.href = `mailto:${emailTarget}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`
    }

    setToast(true)
    setOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            <div
              className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6"
              onClick={() => setOpen(false)}
            >
              <motion.div
                role="dialog"
                aria-modal="true"
                aria-labelledby="contact-title"
                data-lenis-prevent
                initial={{ opacity: 0, scale: 0.95, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto border border-border bg-surface p-6 md:p-8 text-left"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setOpen(false)}
                  aria-label="Close"
                  className="absolute top-4 right-4 text-text-dim hover:text-accent transition text-xl"
                >
                  ✕
                </button>

                <p className="section-label mb-3">Contact</p>
                <h3 id="contact-title" className="display-font text-2xl md:text-3xl font-bold mb-2">
                  Send a message
                </h3>
                <p className="text-text-dim text-sm mb-7">
                  Pick WhatsApp or email. Your message opens in that app, ready to send.
                </p>

                <div className="grid grid-cols-2 gap-3 mb-7">
                  {([
                    { key: 'wa', label: 'WhatsApp', icon: SiWhatsapp },
                    { key: 'email', label: 'Email', icon: MdEmail },
                  ] as const).map(({ key, label, icon: Icon }) => (
                    <button
                      key={key}
                      onClick={() => setMethod(key)}
                      aria-pressed={method === key}
                      className={`flex items-center justify-center gap-2 py-3 border font-mono text-sm transition ${
                        method === key
                          ? 'border-accent bg-accent/10 text-accent'
                          : 'border-border text-text-dim hover:border-accent/50'
                      }`}
                    >
                      <Icon />
                      {label}
                    </button>
                  ))}
                </div>

                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault()
                    handleSend()
                  }}
                >
                  <input
                    placeholder="Your name"
                    aria-label="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border bg-transparent px-4 py-3 outline-none focus:border-accent"
                  />

                  <textarea
                    rows={5}
                    placeholder="What would you like to talk about?"
                    aria-label="Message"
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full border border-border bg-transparent px-4 py-3 outline-none focus:border-accent resize-none"
                  />

                  <button
                    type="submit"
                    disabled={!canSend}
                    className="w-full mt-2 bg-accent text-bg font-mono font-bold py-3 transition-opacity disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {method === 'wa' ? 'Open WhatsApp' : 'Open email'}
                  </button>
                </form>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] bg-accent text-bg font-mono text-sm px-6 py-3 font-bold"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            Opening {method === 'wa' ? 'WhatsApp' : 'your email app'}…
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
