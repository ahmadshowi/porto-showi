'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useState } from 'react'

const navItems = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Certs', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar() {
  const { scrollY } = useScroll()
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const [menuOpen, setMenuOpen] = useState(false)

  const handleNav = (href: string) => {
    setMenuOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-40 px-6 py-4 flex items-center justify-between"
        style={{}}
      >
        <motion.div
          className="absolute inset-0 border-b border-border backdrop-blur-md"
          style={{ opacity: bgOpacity }}
        />

        {/* Logo */}
        <motion.a
          href="#"
          className="relative z-10 font-display font-bold text-xl text-accent"
          whileHover={{ scale: 1.05 }}
        >
          Showi<span className="text-text">.</span>
        </motion.a>

        {/* Desktop nav */}
        <ul className="relative z-10 hidden md:flex items-center gap-8">
          {navItems.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 + 0.2 }}
            >
              <button
                onClick={() => handleNav(item.href)}
                className="font-mono text-xs tracking-widest text-text-dim hover:text-accent uppercase transition-colors duration-200 relative group"
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-300" />
              </button>
            </motion.li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="relative z-10 md:hidden flex flex-col gap-1.5 p-1"
        >
          <motion.span
            className="block w-6 h-px bg-accent"
            animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-4 h-px bg-accent"
            animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.2 }}
          />
          <motion.span
            className="block w-6 h-px bg-accent"
            animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            transition={{ duration: 0.2 }}
          />
        </button>
      </motion.nav>

      {/* Mobile menu */}
      <motion.div
        className="fixed inset-0 z-30 bg-bg/95 backdrop-blur-md flex flex-col items-center justify-center gap-8 md:hidden"
        initial={{ opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 28px)' }}
        animate={menuOpen
          ? { opacity: 1, clipPath: 'circle(150% at calc(100% - 40px) 28px)' }
          : { opacity: 0, clipPath: 'circle(0% at calc(100% - 40px) 28px)' }
        }
        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
      >
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            onClick={() => handleNav(item.href)}
            className="font-display text-4xl font-bold text-text hover:text-accent transition-colors"
            initial={{ opacity: 0, y: 20 }}
            animate={menuOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ delay: i * 0.06 + 0.1 }}
          >
            {item.label}
          </motion.button>
        ))}
      </motion.div>
    </>
  )
}
