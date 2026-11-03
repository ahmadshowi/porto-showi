'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'

// Orientation where the model faces the camera (the GLB's front is +x)
const BASE_YAW = Math.PI * 1.5
// How far the head turns toward the cursor (radians)
const MAX_YAW = 0.55
const MAX_PITCH = 0.18

// Cursor position relative to the avatar, in -1..1, shared with the render loop
const pointer = { x: 0, y: 0, active: false }

function Model({ followCursor }: { followCursor: boolean }) {
  const scaleGroup = useRef<THREE.Group>(null!)
  const lookGroup = useRef<THREE.Group>(null!)
  const rimLight = useRef<THREE.DirectionalLight>(null!)
  const { scene } = useGLTF('/models/showi.glb')

  const entrance = useRef(0)

  useFrame(({ clock }, delta) => {
    if (!scaleGroup.current || !lookGroup.current) return

    // Entrance: grow from 0 on mount
    entrance.current = THREE.MathUtils.lerp(entrance.current, 1, 0.045)
    const s = 1.5 * entrance.current
    scaleGroup.current.scale.set(s, s, s)

    // Turn toward the cursor; touch devices (no cursor) get a slow idle sway
    const t = clock.elapsedTime
    const targetYaw = followCursor && pointer.active
      ? pointer.x * MAX_YAW
      : Math.sin(t * 0.45) * 0.3
    const targetPitch = followCursor && pointer.active
      ? pointer.y * MAX_PITCH
      : 0
    // frame-rate independent easing
    const k = 1 - Math.exp(-delta * 4)
    lookGroup.current.rotation.y += (BASE_YAW + targetYaw - lookGroup.current.rotation.y) * k
    lookGroup.current.rotation.x += (targetPitch - lookGroup.current.rotation.x) * k

    if (rimLight.current) {
      rimLight.current.intensity = 1.5 + Math.sin(t * 0.6) * 0.4
    }
  })

  return (
    <>
      <directionalLight
        ref={rimLight}
        position={[-5, 3, 2]}
        intensity={1.5}
        color="#8dfcff"
      />
      <Float
        speed={2}
        rotationIntensity={0.1}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        <group ref={scaleGroup} scale={0}>
          <group ref={lookGroup} rotation={[0, BASE_YAW, 0]}>
            <Center>
              <primitive object={scene} />
            </Center>
          </group>
        </group>
      </Float>
    </>
  )
}

export default function Avatar3D() {
  const wrapper = useRef<HTMLDivElement>(null)
  const [finePointer, setFinePointer] = useState(false)

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    setFinePointer(fine)
    if (!fine) return

    // Track the cursor anywhere on the page, relative to the avatar's center,
    // so the head keeps following even when the mouse is over the text
    const onMove = (e: PointerEvent) => {
      const el = wrapper.current
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2
      const cy = r.top + r.height / 2
      pointer.x = THREE.MathUtils.clamp((e.clientX - cx) / (window.innerWidth / 2), -1, 1)
      pointer.y = THREE.MathUtils.clamp((e.clientY - cy) / (window.innerHeight / 2), -1, 1)
      pointer.active = true
    }
    const onLeave = () => { pointer.active = false }
    window.addEventListener('pointermove', onMove)
    document.addEventListener('pointerleave', onLeave)
    return () => {
      window.removeEventListener('pointermove', onMove)
      document.removeEventListener('pointerleave', onLeave)
    }
  }, [])

  return (
    <div ref={wrapper} className="w-full h-full">
      <Canvas
        camera={{
          position: [0, 0, 4.5],
          fov: 30,
        }}
      >
        <Suspense
          fallback={
            <Html center>
              <div className="text-accent font-mono">Loading...</div>
            </Html>
          }
        >
          <ambientLight intensity={1.8} />
          <directionalLight position={[5, 5, 5]} intensity={3} />
          <Environment preset="city" />

          <Model followCursor={finePointer} />

          <ContactShadows
            position={[0, -2.2, 0]}
            opacity={0.4}
            blur={2.5}
            scale={8}
          />
        </Suspense>
      </Canvas>
    </div>
  )
}

useGLTF.preload('/models/showi.glb')
