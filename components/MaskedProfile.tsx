'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function MaskedProfile() {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      className="relative aspect-[3/4] max-w-sm mx-auto overflow-hidden border border-border bg-surface group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.35 }}
    >
      {/* BASE IMAGE */}
      <img
        src="/images/showi.jpg"
        alt="Real"
        className={`w-full h-full object-cover transition-all duration-700 ${
          hovered ? 'scale-105 brightness-110' : 'scale-100'
        }`}
      />

      {/* MASKED OVERLAY */}
      <motion.img
        src="/images/showidali.png"
        alt="Masked"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none"
        animate={{
          opacity: hovered ? 0.12 : 1,
          scale: hovered ? 1.03 : 1,
          filter: hovered ? 'blur(8px)' : 'blur(0px)',
          x: hovered ? 4 : 0,
        }}
        transition={{ duration: 0.7, ease: 'easeInOut' }}
      />

      {/* RADIAL LIGHT REVEAL */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        animate={{
          opacity: hovered ? 1 : 0,
        }}
        transition={{ duration: 0.6 }}
        style={{
          background:
            'radial-gradient(circle at center, rgba(232,255,71,0.12) 0%, rgba(232,255,71,0.05) 20%, transparent 55%)',
        }}
      />

      {/* GLITCH FLASH */}
      <motion.div
        className="absolute inset-0 bg-accent/5 pointer-events-none"
        animate={{
          opacity: hovered ? [0, 0.12, 0.03, 0.08, 0] : 0,
        }}
        transition={{ duration: 0.8 }}
      />

      {/* SCAN LINES */}
      <div className="absolute inset-0 pointer-events-none opacity-15 bg-[linear-gradient(to_bottom,transparent_0%,rgba(255,255,255,0.05)_50%,transparent_100%)] bg-[length:100%_6px]" />

      {/* INFO BOX */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: hovered ? 1 : 0,
          y: hovered ? 0 : 20,
        }}
        transition={{ duration: 0.5 }}
        className="absolute bottom-5 left-5 right-5 bg-black/70 backdrop-blur-md border border-accent/30 p-4"
      >
        <p className="font-mono text-[10px] tracking-[0.35em] text-accent mb-2">
          IDENTITY VERIFIED
        </p>
        <p className="font-mono text-xs text-white">
          SYSTEM ANALYST • FULLSTACK DEVELOPER
        </p>
      </motion.div>

      {/* STATUS DOT */}
      <motion.div
        className="absolute top-4 right-4 w-3 h-3 rounded-full bg-accent"
        animate={{
          opacity: hovered ? [0.4, 1, 0.4] : 0.5,
        }}
        transition={{
          duration: 1.2,
          repeat: Infinity,
        }}
      />
    </motion.div>
  )
}