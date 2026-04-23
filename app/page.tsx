'use client'

import { useEffect } from 'react'
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
import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <div className="noise" />
      <CursorGlow />
      <AnimatePresence>
        {!introComplete && (
          <IntroAnimation onComplete={() => setIntroComplete(true)} />
        )}
      </AnimatePresence>
      {introComplete && (
        <SmoothScroll>
          <div className="relative bg-bg min-h-screen grid-bg">
            <Navbar />
            <main>
              <Hero />
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
      )}
    </>
  )
}
