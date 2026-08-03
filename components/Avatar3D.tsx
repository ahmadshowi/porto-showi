'use client'

import { Suspense, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import {
  Center,
  ContactShadows,
  Environment,
  Float,
  Html,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'
import * as THREE from 'three'

function Model() {
  const group = useRef<THREE.Group>(null!)
  const rimLight = useRef<THREE.DirectionalLight>(null!)
  const { scene } = useGLTF('/models/showi.glb')

  // Track entrance progress on mount (scale 0 -> 1)
  const entrance = useRef(0)

  useFrame(({ clock }) => {
    if (!group.current) return

    // Entrance: scale + fade in from 0 on mount
    entrance.current = THREE.MathUtils.lerp(entrance.current, 1, 0.045)
    const s = 1.5 * entrance.current
    group.current.scale.set(s, s, s)

    // Subtle breathing rim light — intensity drifts slowly, never fully static
    if (rimLight.current) {
      rimLight.current.intensity = 1.5 + Math.sin(clock.elapsedTime * 0.6) * 0.4
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
        rotationIntensity={0.15}
        floatIntensity={0.6}
        floatingRange={[-0.15, 0.15]}
      >
        <Center>
          {/* rotation.y here is the resting/starting orientation — the user
              can then grab and drag to rotate further via OrbitControls */}
          <primitive ref={group} object={scene} scale={0} rotation={[0, Math.PI, 0]} />
        </Center>
      </Float>
    </>
  )
}

export default function Avatar3D() {
  return (
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

        <Model />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.4}
          blur={2.5}
          scale={8}
        />

        {/* Drag to rotate. Zoom/pan stay off so the model can't be pushed
            out of frame or scaled weirdly by scroll/two-finger gestures. */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          enableDamping
          dampingFactor={0.08}
          rotateSpeed={0.6}
          autoRotate
          autoRotateSpeed={0.6}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/showi.glb')