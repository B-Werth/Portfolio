"use client";

import { api } from "~/trpc/server";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default async function Home() {
  return (
    <main className="flex min-h-screen">
      <Canvas>
        <ambientLight intensity={2}></ambientLight>
        <directionalLight position={[2, 1, 1]}></directionalLight>
        <Cube></Cube>
      </Canvas>
    </main>
  );
}

function Cube() {
  return (
    <mesh>
      <boxGeometry args={[3, 3, 3]}></boxGeometry>
    </mesh>
  );
}
