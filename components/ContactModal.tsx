'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SiWhatsapp, SiGmail } from 'react-icons/si'

const phone = '6282299417885'
const emailTarget = 'ahmadshowi15@gmail.com'

interface Props {
  open: boolean
  setOpen: (v: boolean) => void
}

export default function ContactModal({ open, setOpen }: Props) {
  const [method, setMethod] = useState<'wa' | 'email'>('wa')
  const [form, setForm] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [toast, setToast] = useState(false)

  const handleSend = () => {
    if (!form.name || !form.message) return

    const text = `Halo, saya ${form.name}%0A%0A${form.message}`

    if (method === 'wa') {
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
    } else {
      window.open(
        `mailto:${emailTarget}?subject=Portfolio Contact from ${form.name}&body=${text}`
      )
    }

    setToast(true)
    setTimeout(() => setToast(false), 2500)
    setOpen(false)
  }

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            {/* BACKDROP */}
            <motion.div
              className="fixed inset-0 z-[9998] bg-black/70 backdrop-blur-md"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />

            {/* WRAPPER CENTER */}
            <div className="fixed inset-0 z-[9999] flex items-center justify-center px-4 py-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-3xl border border-white/10 bg-white/5 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.5)] p-6 md:p-8"
                onClick={(e) => e.stopPropagation()}
              >
                {/* CLOSE */}
                <button
                  onClick={() => setOpen(false)}
                  className="absolute top-4 right-4 text-white/50 hover:text-accent transition text-xl"
                >
                  ✕
                </button>

                {/* TITLE */}
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Let’s Work Together 🚀
                </h3>
                <p className="text-text-dim text-sm mb-7">
                  Choose your preferred communication method and send me a quick message.
                </p>

                {/* METHOD SWITCH */}
                <div className="grid grid-cols-2 gap-3 mb-7">
                  <button
                    onClick={() => setMethod('wa')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                      method === 'wa'
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text-dim hover:border-accent/50'
                    }`}
                  >
                    <SiWhatsapp />
                    WhatsApp
                  </button>

                  <button
                    onClick={() => setMethod('email')}
                    className={`flex items-center justify-center gap-2 py-3 rounded-xl border transition ${
                      method === 'email'
                        ? 'border-accent bg-accent/10 text-accent'
                        : 'border-border text-text-dim hover:border-accent/50'
                    }`}
                  >
                    <SiGmail />
                    Email
                  </button>
                </div>

                {/* FORM */}
                <div className="space-y-4">
                  <input
                    placeholder="Your Name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:border-accent"
                  />

                  {method === 'email' && (
                    <input
                      placeholder="Your Email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:border-accent"
                    />
                  )}

                  <textarea
                    rows={5}
                    placeholder="Tell me about your project, collaboration, or opportunity..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className="w-full rounded-xl border border-border bg-transparent px-4 py-3 outline-none focus:border-accent resize-none"
                  />

                  <motion.button
                    onClick={handleSend}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full mt-2 rounded-xl bg-accent text-black font-bold py-3"
                  >
                    Send Message
                  </motion.button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>

      {/* TOAST */}
      <AnimatePresence>
        {toast && (
          <motion.div
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[10000] rounded-xl bg-accent text-black px-6 py-3 font-semibold shadow-lg"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
          >
            Opening message window ✨
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}