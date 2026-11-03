'use client'

import { useState } from 'react'
import { AnimatePresence, MotionConfig } from 'framer-motion'
import IntroAnimation from '@/components/IntroAnimation'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Experience from '@/components/Experience'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import CursorGlow from '@/components/CursorGlow'
import SmoothScroll from '@/components/SmoothScroll'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)
  // true as soon as the intro panels start opening (or right away when it's skipped)
  const [revealed, setRevealed] = useState(false)

  return (
    <MotionConfig reducedMotion="user">
      <div className="noise" />
      <CursorGlow />
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation
            onReveal={() => setRevealed(true)}
            onComplete={() => setIntroComplete(true)}
          />
        )}
      </AnimatePresence>
      {/* Content is always rendered (so it's in the HTML for crawlers);
          the intro just sits on top of it until it finishes. */}
      <SmoothScroll>
        <div className="relative bg-bg min-h-screen grid-bg">
          <Navbar />
          <main>
            <Hero revealed={revealed} />
            <About />
            <Experience />
            <Skills />
            <Projects />
            <Certifications />
            <Contact />
          </main>
          <Footer />
        </div>
      </SmoothScroll>
    </MotionConfig>
  )
}
