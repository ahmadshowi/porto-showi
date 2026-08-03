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
  const { scene } = useGLTF('/models/showi.glb')

  useFrame(({ mouse }) => {
    if (!group.current) return

    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      mouse.x * 0.35,
      0.08
    )

    group.current.rotation.x = THREE.MathUtils.lerp(
      group.current.rotation.x,
      -mouse.y * 0.12,
      0.08
    )
  })

  return (
    <Float
      speed={2}
      rotationIntensity={0.2}
      floatIntensity={0.8}
      floatingRange={[-0.2, 0.2]}
    >
      <Center>
        <primitive
          ref={group}
          object={scene}
          scale={1.5}
          rotation={[0, Math.PI, 0]}
        />
      </Center>
    </Float>
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

        <directionalLight
          position={[5, 5, 5]}
          intensity={3}
        />

        <directionalLight
          position={[-5, 3, 2]}
          intensity={1.5}
          color="#8dfcff"
        />

        <Environment preset="city" />

        <Model />

        <ContactShadows
          position={[0, -2.2, 0]}
          opacity={0.4}
          blur={2.5}
          scale={8}
        />

        {/* Aktifkan sementara untuk debug */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
        />
      </Suspense>
    </Canvas>
  )
}

useGLTF.preload('/models/showi.glb')
