'use client'

import { Suspense, useRef } from 'react'
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

function Model() {
  const group = useRef<THREE.Group>(null!)
  const rimLight = useRef<THREE.DirectionalLight>(null!)
  const { scene } = useGLTF('/models/showi.glb')

  // Track entrance progress separately from mouse-follow rotation
  const entrance = useRef(0)

  useFrame(({ mouse, clock }) => {
    if (!group.current) return

    // Entrance: scale + fade in from 0 on mount
    entrance.current = THREE.MathUtils.lerp(entrance.current, 1, 0.045)
    const s = 1.5 * entrance.current
    group.current.scale.set(s, s, s)

    // Mouse-follow rotation (only kicks in meaningfully once entrance has settled)
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      Math.PI + mouse.x * 0.35,
      0.08
    )

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.12,
      0.08
    )

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
        rotationIntensity={0.2}
        floatIntensity={0.8}
        floatingRange={[-0.2, 0.2]}
      >
        <Center>
          {/* rotation is driven by the ref in useFrame, not this static prop */}
          <primitive ref={group} object={scene} scale={0} />
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

        {/* OrbitControls removed from production render — it fights with the
            manual mouse-follow rotation in Model(). Re-enable only for debugging,
            and if you do, remove the rotation.y/rotation.x lerp above so they
            don't fight each other. */}
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/showi.glb')