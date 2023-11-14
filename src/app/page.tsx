"use client";
import React, { useRef, useState } from "react";
import { api } from "~/trpc/server";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { buffer, random } from "maath";

export default async function Home() {
  return (
    <main className="h-screen bg-gray-900">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Cube></Cube>
        <Stars />
        <OrbitControls enableZoom={false}></OrbitControls>
      </Canvas>
    </main>
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

function Stars(props) {
  const ref = useRef<THREE.Mesh>(null!);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 1.5 }),
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
