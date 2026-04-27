'use client'

import { useEffect, useRef } from 'react'

/**
 * Drop-in replacement untuk IntroAnimation.tsx
 * Interface sama persis — cukup ganti file lama dengan ini.
 *
 * Dependencies yang dibutuhkan:
 *   npm install gsap lenis
 */

interface Props {
  onComplete: () => void
}

export default function IntroAnimation({ onComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const progressBarRef = useRef<HTMLDivElement>(null)
  const hintRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)
  const titleRef = useRef<HTMLDivElement>(null)
  const glitchRef = useRef<HTMLDivElement>(null)
  const ringsRef = useRef<HTMLDivElement[]>([])
  const rafRef = useRef<number>(0)
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    let gsapMod: typeof import('gsap') | null = null
    let ScrollTriggerMod: typeof import('gsap/ScrollTrigger').ScrollTrigger | null = null
    let lenisMod: InstanceType<typeof import('lenis').default> | null = null
    let killed = false

    async function init() {
      const [{ default: gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
        import('gsap'),
        import('gsap/ScrollTrigger'),
        import('lenis'),
      ])
      if (killed) return
      gsapMod = gsap
      ScrollTriggerMod = ScrollTrigger
      gsap.registerPlugin(ScrollTrigger)

      // ── Lenis smooth scroll ─────────────────────────────────────────────────
      const lenis = new Lenis({
        duration: 1.4,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
        wheelMultiplier: 0.85,
        touchMultiplier: 1.2,
      })
      lenisMod = lenis
      lenis.on('scroll', ScrollTrigger.update)
      const tickerFn = (time: number) => lenis.raf(time * 1000)
      gsap.ticker.add(tickerFn)
      gsap.ticker.lagSmoothing(0)

      // ── Canvas particle + grid ──────────────────────────────────────────────
      const canvas = canvasRef.current!
      const ctx = canvas.getContext('2d')!
      let W = window.innerWidth, H = window.innerHeight
      canvas.width = W; canvas.height = H

      const pts: { x: number; y: number; z: number }[] = []
      for (let i = 0; i < 180; i++) {
        const angle = Math.random() * Math.PI * 2
        const r = 50 + Math.random() * 380
        pts.push({ x: Math.cos(angle) * r, y: Math.sin(angle) * r, z: Math.random() * 1400 })
      }

      let tunnelDepth = 0

      function drawFrame() {
        ctx.clearRect(0, 0, W, H)
        const cx = W / 2, cy = H / 2
        const fov = 600

        // perspective grid lines
        const gridCount = 10
        for (let i = 0; i <= gridCount; i++) {
          const t = i / gridCount
          const alpha = 0.03 + tunnelDepth * 0.07
          ctx.strokeStyle = `rgba(0,255,180,${alpha})`
          ctx.lineWidth = 0.5

          // horizontal lines
          ctx.beginPath()
          for (let z = 0; z <= 1400; z += 50) {
            const s = fov / (fov + z)
            const y = (t - 0.5) * 1000 * s
            if (z === 0) ctx.moveTo(cx - 500 * s, cy + y)
            else ctx.lineTo(cx - 500 * s, cy + y)
          }
          ctx.stroke()

          // vertical lines
          ctx.beginPath()
          for (let z = 0; z <= 1400; z += 50) {
            const s = fov / (fov + z)
            const x = (t - 0.5) * 1000 * s
            if (z === 0) ctx.moveTo(cx + x, cy - 500 * s)
            else ctx.lineTo(cx + x, cy + 500 * s)
          }
          ctx.stroke()
        }

        // particles
        pts.forEach(p => {
          p.z -= 1.5 + tunnelDepth * 5
          if (p.z < 1) p.z = 1400
          const s = fov / (fov + p.z)
          const sx = cx + p.x * s
          const sy = cy + p.y * s
          const alpha = Math.min(1, (1 - p.z / 1400) * 2) * (0.3 + tunnelDepth * 0.7)
          const size = Math.max(0.4, (1 - p.z / 1400) * 2.8)

          ctx.beginPath()
          ctx.arc(sx, sy, size, 0, Math.PI * 2)
          ctx.fillStyle = `rgba(0,255,180,${alpha})`
          ctx.fill()

          // motion streak
          const s2 = fov / (fov + p.z + 35)
          ctx.beginPath()
          ctx.moveTo(sx, sy)
          ctx.lineTo(cx + p.x * s2, cy + p.y * s2)
          ctx.strokeStyle = `rgba(0,255,180,${alpha * 0.25})`
          ctx.lineWidth = size * 0.5
          ctx.stroke()
        })

        rafRef.current = requestAnimationFrame(drawFrame)
      }
      drawFrame()

      // ── Rings initial state ─────────────────────────────────────────────────
      ringsRef.current.forEach(r => {
        if (r) gsap.set(r, { opacity: 0, scale: 0.1 })
      })
      gsap.set(titleRef.current, { opacity: 0, y: 30, filter: 'blur(12px)' })
      gsap.set(glitchRef.current, { opacity: 0 })
      gsap.set(overlayRef.current, { opacity: 0 })

      // ── ScrollTrigger timeline ──────────────────────────────────────────────
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=300%',
          pin: true,
          scrub: 1.2,
          anticipatePin: 1,
          onUpdate(self) {
            tunnelDepth = self.progress

            if (progressBarRef.current) {
              progressBarRef.current.style.width = `${self.progress * 100}%`
            }
            if (hintRef.current) {
              hintRef.current.style.opacity = self.progress > 0.04 ? '0' : '1'
            }
          },
          onLeave() {
            gsap.to(overlayRef.current, {
              opacity: 1,
              duration: 0.55,
              ease: 'power2.in',
              onComplete: () => onCompleteRef.current(),
            })
          },
          onEnterBack() {
            gsap.to(overlayRef.current, { opacity: 0, duration: 0.25 })
          },
        },
      })

      // rings cascade
      ringsRef.current.forEach((ring, i) => {
        if (!ring) return
        tl.to(ring,
          { scale: 1.8 + i * 0.5, opacity: i % 2 === 0 ? 0.9 : 0.5, ease: 'none' },
          i * 0.07
        )
        tl.to(ring, { opacity: 0, ease: 'none' }, i * 0.07 + 0.12)
      })

      // vignette
      tl.to('.st-vignette', { opacity: 0.9, ease: 'none' }, 0)
      tl.to('.st-vignette', { opacity: 0.35, ease: 'none' }, 0.5)
      tl.to('.st-vignette', { opacity: 1, ease: 'none' }, 0.92)

      // name reveal mid journey
      tl.to(titleRef.current, { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.18, ease: 'power3.out' }, 0.33)
      tl.to(titleRef.current, { opacity: 0, y: -24, filter: 'blur(10px)', duration: 0.15, ease: 'power2.in' }, 0.68)

      // glitch near end
      tl.to(glitchRef.current, { opacity: 1, ease: 'none' }, 0.78)
      tl.to(glitchRef.current, { opacity: 0, ease: 'none' }, 0.91)

      const onResize = () => {
        W = window.innerWidth; H = window.innerHeight
        canvas.width = W; canvas.height = H
        ScrollTrigger.refresh()
      }
      window.addEventListener('resize', onResize)

      return () => {
        window.removeEventListener('resize', onResize)
        gsap.ticker.remove(tickerFn)
      }
    }

    let cleanup: (() => void) | undefined
    init().then(fn => { cleanup = fn })

    return () => {
      killed = true
      cancelAnimationFrame(rafRef.current)
      cleanup?.()
      lenisMod?.destroy()
      ScrollTriggerMod?.getAll().forEach(t => t.kill())
    }
  }, [])

  const RING_COUNT = 14

  return (
    <>
      {/*
        Wrapper div — height 100vh (the visible window).
        ScrollTrigger will pin this and create 300vh of scroll space above it.
      */}
      <div
        ref={containerRef}
        className="relative w-full h-screen overflow-hidden"
        style={{ zIndex: 50, background: '#000' }}
      >
        {/* ── Canvas: particle field + perspective grid ── */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0 w-full h-full"
          style={{
            background: 'radial-gradient(ellipse at 50% 50%, #030f0a 0%, #000 68%)',
          }}
        />

        {/* ── Vignette ── */}
        <div
          className="st-vignette absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 50% 50%, transparent 15%, #000 100%)',
            opacity: 0.45,
          }}
        />

        {/* ── Tunnel rings (CSS 3D) ── */}
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{ perspective: '900px', perspectiveOrigin: '50% 50%' }}
        >
          {Array.from({ length: RING_COUNT }).map((_, i) => {
            const isSquare = i % 4 === 1
            const isThin = i % 3 !== 0
            return (
              <div
                key={i}
                ref={el => { if (el) ringsRef.current[i] = el }}
                className="absolute"
                style={{
                  width: `${100 + i * 55}px`,
                  height: `${100 + i * 55}px`,
                  border: `${isThin ? '0.5' : '1.5'}px solid rgba(0,255,180,${0.75 - i * 0.04})`,
                  borderRadius: isSquare ? '4px' : '50%',
                  boxShadow: `0 0 ${6 + i * 3}px rgba(0,255,180,0.12)`,
                  transform: `rotateZ(${i * 15}deg)`,
                  opacity: 0,
                  willChange: 'transform, opacity',
                }}
              />
            )
          })}
        </div>

        {/* ── Mid-tunnel name reveal ── */}
        <div
          ref={titleRef}
          className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          style={{ zIndex: 10 }}
        >
          <p
            className="font-mono uppercase tracking-[0.55em] text-xs mb-3"
            style={{ color: 'rgba(0,255,180,0.45)' }}
          >
            portfolio of
          </p>
          <h1
            className="font-mono font-bold tracking-[0.25em] uppercase"
            style={{
              fontSize: 'clamp(2.5rem, 7vw, 6rem)',
              color: '#00ffb4',
              textShadow:
                '0 0 30px rgba(0,255,180,0.7), 0 0 80px rgba(0,255,180,0.2)',
            }}
          >
            SHOWI
          </h1>
        </div>

        {/* ── Glitch scanlines ── */}
        <div
          ref={glitchRef}
          className="absolute inset-0 pointer-events-none opacity-0"
          style={{
            background:
              'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,255,180,0.025) 2px, rgba(0,255,180,0.025) 4px)',
            animation: 'stGlitch 0.12s steps(2) infinite',
          }}
        />

        {/* ── Scanline texture (always on, subtle) ── */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,0,0,0.07) 3px, rgba(0,0,0,0.07) 4px)',
            zIndex: 5,
          }}
        />

        {/* ── Corner HUD brackets ── */}
        {(['top-5 left-5', 'top-5 right-5', 'bottom-5 left-5', 'bottom-5 right-5'] as const).map(
          (pos, i) => (
            <div key={i} className={`absolute ${pos} pointer-events-none`} style={{ zIndex: 8 }}>
              <div
                style={{
                  width: 28,
                  height: 28,
                  borderTop: i < 2 ? '1px solid rgba(0,255,180,0.35)' : 'none',
                  borderBottom: i >= 2 ? '1px solid rgba(0,255,180,0.35)' : 'none',
                  borderLeft: i % 2 === 0 ? '1px solid rgba(0,255,180,0.35)' : 'none',
                  borderRight: i % 2 === 1 ? '1px solid rgba(0,255,180,0.35)' : 'none',
                }}
              />
            </div>
          )
        )}

        {/* ── HUD top label ── */}
        <div
          className="absolute top-5 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ zIndex: 8 }}
        >
          <p
            className="font-mono text-xs tracking-widest"
            style={{ color: 'rgba(0,255,180,0.28)' }}
          >
            SYS.INIT // DATA-LINK ACTIVE
          </p>
        </div>

        {/* ── Bottom: progress bar + label ── */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 pointer-events-none"
          style={{ width: 180, zIndex: 8 }}
        >
          <div style={{ height: 1, background: 'rgba(0,255,180,0.12)', position: 'relative' }}>
            <div
              ref={progressBarRef}
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                height: '100%',
                width: '0%',
                background: '#00ffb4',
                boxShadow: '0 0 8px rgba(0,255,180,0.9)',
              }}
            />
          </div>
          <p
            className="font-mono text-center mt-2 text-xs tracking-[0.35em] uppercase"
            style={{ color: 'rgba(0,255,180,0.28)' }}
          >
            scroll to enter
          </p>
        </div>

        {/* ── Scroll mouse hint ── */}
        <div
          ref={hintRef}
          className="absolute pointer-events-none"
          style={{
            bottom: 60,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 8,
            transition: 'opacity 0.5s ease',
          }}
        >
          <div
            style={{
              width: 26,
              height: 42,
              border: '1px solid rgba(0,255,180,0.38)',
              borderRadius: 13,
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'center',
              paddingTop: 6,
            }}
          >
            <div
              style={{
                width: 3,
                height: 8,
                background: '#00ffb4',
                borderRadius: 2,
                animation: 'stDot 1.6s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* ── Final black fade overlay ── */}
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-black pointer-events-none"
          style={{ zIndex: 20, opacity: 0 }}
        />
      </div>

      {/* ── Keyframes ── */}
      <style>{`
        @keyframes stDot {
          0%   { transform: translateY(0);   opacity: 1; }
          100% { transform: translateY(16px); opacity: 0; }
        }
        @keyframes stGlitch {
          0%   { transform: translate(0, 0) skewX(0deg); }
          25%  { transform: translate(-2px, 1px) skewX(1deg); }
          50%  { transform: translate(2px, -1px) skewX(-0.5deg); }
          75%  { transform: translate(-1px, 2px) skewX(0.5deg); }
          100% { transform: translate(0, 0) skewX(0deg); }
        }
      `}</style>
    </>
  )
}