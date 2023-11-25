"use client";
import React, { useRef, useState } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

export default function Home() {
  const myModel = useLoader(GLTFLoader, "/rocket.glb");

  return (
    <main className="h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Cube></Cube>
        <Stars />
        <OrbitControls enableZoom={false}></OrbitControls>
        <pointLight
          position={[-10, -10, -10]}
          color="#48cc90"
          intensity={5000}
        />
        <pointLight position={[10, 10, 10]} intensity={5000} />

        <primitive object={myModel.scene}></primitive>
      </Canvas>
    </main>
  );
}

function Overlay() {
  return (
    <div>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
        Hi, my name is Bastian.
      </h1>
    </div>
  );
}

function Cube() {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color={"blue"} />
    </mesh>
  );
}

function Stars(props: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(1500), { radius: 1.5 }),
  );
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points
        ref={ref}
        positions={sphere}
        stride={3}
        frustumCulled={false}
        {...props}
      >
        <PointMaterial
          transparent
          color="#ffa0e0"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
