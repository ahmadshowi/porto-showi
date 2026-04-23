'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { SiWhatsapp, SiGmail } from 'react-icons/si'

const phone = '6282299417885'
const email = 'ahmadshowi15@gmail.com'

export default function ContactModal({ open, setOpen }: any) {
  const [method, setMethod] = useState<'wa' | 'email'>('wa')
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [toast, setToast] = useState(false)

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768

  const handleSend = () => {
    if (!form.name || !form.message) return

    const text = `Halo, saya ${form.name}%0A${form.message}`

    const finalMethod = method || (isMobile ? 'wa' : 'email')

    if (finalMethod === 'wa') {
      window.open(`https://wa.me/${phone}?text=${text}`, '_blank')
    } else {
      window.open(`mailto:${email}?subject=Contact&body=${text}`)
    }

    setToast(true)
    setTimeout(() => setToast(false), 3000)
    setOpen(false)
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* BACKDROP */}
          <motion.div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />

          {/* MODAL */}
          <motion.div
            className="fixed z-50 top-1/2 left-1/2 w-[90%] max-w-lg -translate-x-1/2 -translate-y-1/2 bg-surface border border-border p-8"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
          >
            {/* CLOSE */}
            <button
              onClick={() => setOpen(false)}
              className="absolute top-4 right-4"
            >
              ✕
            </button>

            <h3 className="text-2xl font-bold mb-6">Send Message</h3>

            {/* METHOD SWITCH */}
            <div className="flex gap-3 mb-6">
              <button
                onClick={() => setMethod('wa')}
                className={`flex items-center gap-2 px-4 py-2 border ${
                  method === 'wa' ? 'border-accent text-accent' : 'border-border'
                }`}
              >
                <SiWhatsapp /> WhatsApp
              </button>

              <button
                onClick={() => setMethod('email')}
                className={`flex items-center gap-2 px-4 py-2 border ${
                  method === 'email' ? 'border-accent text-accent' : 'border-border'
                }`}
              >
                <SiGmail /> Email
              </button>
            </div>

            {/* FORM */}
            <div className="flex flex-col gap-4">
              <input
                placeholder="Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="border-b border-border py-2 bg-transparent"
              />

              {method === 'email' && (
                <input
                  placeholder="Email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="border-b border-border py-2 bg-transparent"
                />
              )}

              <textarea
                placeholder="Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="border-b border-border py-2 bg-transparent"
              />

              <motion.button
                onClick={handleSend}
                className="mt-4 border border-accent py-3 text-accent"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                Send 🚀
              </motion.button>
            </div>
          </motion.div>

          {/* TOAST */}
          <AnimatePresence>
            {toast && (
              <motion.div
                className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-accent text-black px-6 py-3 z-50"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
              >
                Message opened ✨
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  )
}