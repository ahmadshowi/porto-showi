'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, type MotionValue } from 'framer-motion'

// The analysis → delivery cycle, drawn as a loop framing the hero.
// Left side runs top→bottom, right side bottom→top, the top edge closes the loop.
const STEPS = [
  { label: 'Requirement', side: 'left', at: 0.2 },
  { label: 'Analysis', side: 'left', at: 0.5 },
  { label: 'Design', side: 'left', at: 0.8 },
  { label: 'Build', side: 'right', at: 0.8 },
  { label: 'Test', side: 'right', at: 0.5 },
  { label: 'Deploy', side: 'right', at: 0.2 },
] as const

const DRAW_SECONDS = 2.4
const LOOP_SECONDS = 11
const ACCENT = '232, 255, 71'

type Geometry = {
  w: number
  h: number
  d: string
  nodes: { x: number; y: number }[]
}

function buildGeometry(w: number, h: number): Geometry {
  const L = Math.max(100, w * 0.08)
  const R = w - L
  const T = 28
  const B = h - 28
  const r = 22
  const d = [
    `M ${L} ${T + r}`,
    `V ${B - r}`,
    `Q ${L} ${B} ${L + r} ${B}`,
    `H ${R - r}`,
    `Q ${R} ${B} ${R} ${B - r}`,
    `V ${T + r}`,
    `Q ${R} ${T} ${R - r} ${T}`,
    `H ${L + r}`,
    `Q ${L} ${T} ${L} ${T + r}`,
  ].join(' ')
  const nodes = STEPS.map((s) => ({
    x: s.side === 'left' ? L : R,
    y: T + (B - T) * s.at,
  }))
  return { w, h, d, nodes }
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)

export default function ProcessLoop({ play, opacity }: { play: boolean; opacity: MotionValue<number> }) {
  const box = useRef<HTMLDivElement>(null)
  const basePath = useRef<SVGPathElement>(null)
  const drawPath = useRef<SVGPathElement>(null)
  const tailPath = useRef<SVGPathElement>(null)
  const headPath = useRef<SVGPathElement>(null)
  const dot = useRef<SVGCircleElement>(null)
  const nodeEls = useRef<(HTMLDivElement | null)[]>([])
  const loopLabel = useRef<HTMLDivElement>(null)
  const [geo, setGeo] = useState<Geometry | null>(null)

  // Size the diagram to the hero; skipped below 1280px where the sides are too narrow
  useEffect(() => {
    const el = box.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect
      setGeo(width >= 1280 && height > 400 ? buildGeometry(width, height) : null)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    if (!geo || !play) return
    const path = basePath.current
    if (!path) return

    const len = path.getTotalLength()

    // Where each node sits along the path (0..1), found by sampling
    const samples = 800
    const pts = Array.from({ length: samples + 1 }, (_, i) => path.getPointAtLength((i / samples) * len))
    const fractions = geo.nodes.map((n) => {
      let best = 0
      let bestDist = Infinity
      pts.forEach((p, i) => {
        const dist = (p.x - n.x) ** 2 + (p.y - n.y) ** 2
        if (dist < bestDist) {
          bestDist = dist
          best = i
        }
      })
      return best / samples
    })

    const draw = drawPath.current!
    const tail = tailPath.current!
    const head = headPath.current!
    const circle = dot.current!
    const nodes = nodeEls.current
    const longTail = Math.min(260, len * 0.12)
    const shortTail = Math.min(70, len * 0.035)

    draw.style.strokeDasharray = `${len}`
    tail.style.strokeDasharray = `${longTail} ${len - longTail}`
    head.style.strokeDasharray = `${shortTail} ${len - shortTail}`

    const setNode = (i: number, shown: boolean, heat: number) => {
      const el = nodes[i]
      if (!el) return
      el.style.opacity = shown ? '1' : '0'
      el.style.transform = `translate(-50%, -50%) scale(${shown ? 1 : 0.85})`
      el.style.borderColor = `rgba(${ACCENT}, ${0.18 + 0.82 * heat})`
      el.style.color = heat > 0.02 ? `rgba(${ACCENT}, ${0.55 + 0.45 * heat})` : ''
      el.style.boxShadow = heat > 0.02 ? `0 0 ${28 * heat}px rgba(${ACCENT}, ${0.3 * heat})` : 'none'
    }

    const placeComet = (dist: number, alpha: number) => {
      const p = path.getPointAtLength(((dist % len) + len) % len)
      circle.setAttribute('cx', `${p.x}`)
      circle.setAttribute('cy', `${p.y}`)
      circle.style.opacity = `${alpha}`
      tail.style.strokeDashoffset = `${longTail - dist}`
      head.style.strokeDashoffset = `${shortTail - dist}`
      tail.style.opacity = `${alpha * 0.35}`
      head.style.opacity = `${alpha}`
    }

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduced) {
      draw.style.strokeDashoffset = '0'
      geo.nodes.forEach((_, i) => setNode(i, true, 0))
      if (loopLabel.current) loopLabel.current.style.opacity = '1'
      placeComet(0, 0)
      return
    }

    // Only animate while the hero is on screen
    let visible = true
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting })
    if (box.current) io.observe(box.current)

    let elapsed = 0
    let last = performance.now()
    let raf = 0

    const frame = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.1)
      last = now
      if (visible && !document.hidden) elapsed += dt

      if (elapsed < DRAW_SECONDS) {
        // Phase 1: the line draws itself, nodes pop in as the pen reaches them
        const p = easeInOut(elapsed / DRAW_SECONDS)
        draw.style.strokeDashoffset = `${len * (1 - p)}`
        fractions.forEach((f, i) => {
          const since = p - f
          setNode(i, since >= 0, since >= 0 ? Math.max(0, 1 - since / 0.12) : 0)
        })
        placeComet(p * len, p < 0.97 ? 1 : (1 - p) / 0.03)
      } else {
        // Phase 2: a pulse travels the loop forever, lighting each step it passes
        draw.style.strokeDashoffset = '0'
        if (loopLabel.current) loopLabel.current.style.opacity = '1'
        const t = ((elapsed - DRAW_SECONDS) / LOOP_SECONDS) % 1
        // fade the pulse in after the draw so it doesn't pop
        const fadeIn = Math.min(1, (elapsed - DRAW_SECONDS) / 0.8)
        placeComet(t * len, fadeIn)
        fractions.forEach((f, i) => {
          const since = (t - f + 1) % 1
          setNode(i, true, fadeIn * Math.max(0, 1 - since / 0.14))
        })
      }
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
    }
  }, [geo, play])

  return (
    <motion.div
      ref={box}
      aria-hidden
      className="absolute inset-0 pointer-events-none"
      style={{ opacity }}
    >
      {geo && (
        <>
          <svg className="absolute inset-0 overflow-visible" width={geo.w} height={geo.h}>
            <defs>
              <filter id="loop-glow" x="-200%" y="-200%" width="500%" height="500%">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
            {/* faint guide the line draws over */}
            <path ref={basePath} d={geo.d} fill="none" stroke={`rgba(${ACCENT}, 0.05)`} strokeWidth={1} strokeDasharray="2 6" />
            <path ref={drawPath} d={geo.d} fill="none" stroke={`rgba(${ACCENT}, 0.16)`} strokeWidth={1} style={{ strokeDashoffset: 99999 }} />
            <path ref={tailPath} d={geo.d} fill="none" stroke={`rgb(${ACCENT})`} strokeWidth={1.5} strokeLinecap="round" style={{ opacity: 0 }} />
            <path ref={headPath} d={geo.d} fill="none" stroke={`rgb(${ACCENT})`} strokeWidth={2} strokeLinecap="round" filter="url(#loop-glow)" style={{ opacity: 0 }} />
            <circle ref={dot} r={3.5} fill={`rgb(${ACCENT})`} filter="url(#loop-glow)" style={{ opacity: 0 }} />
          </svg>

          {STEPS.map((step, i) => (
            <div
              key={step.label}
              ref={(el) => { nodeEls.current[i] = el }}
              className="absolute bg-bg border border-border px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-text-dim whitespace-nowrap transition-[opacity,transform] duration-500"
              style={{
                left: geo.nodes[i].x,
                top: geo.nodes[i].y,
                opacity: 0,
                transform: 'translate(-50%, -50%) scale(0.85)',
              }}
            >
              <span className="text-accent/60 mr-2">{String(i + 1).padStart(2, '0')}</span>
              {step.label}
            </div>
          ))}

          <div
            ref={loopLabel}
            className="absolute bg-bg px-3 font-mono text-[9px] uppercase tracking-[0.3em] text-text-dim/70 transition-opacity duration-1000"
            style={{ left: geo.w / 2, top: 28, transform: 'translate(-50%, -50%)', opacity: 0 }}
          >
            ↺ Feedback loop
          </div>
        </>
      )}
    </motion.div>
  )
}
