"use client";
import React, { useRef } from "react";
import { api } from "~/trpc/server";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

export default async function Home() {
  return (
    <main className="h-screen">
      <Canvas>
        <OrbitControls></OrbitControls>
        <ambientLight intensity={2}></ambientLight>
        <directionalLight position={[2, 1, 1]}></directionalLight>
        <Cube></Cube>
      </Canvas>
    </main>
  );
}

function Cube() {
  const mesh = useRef(null);

  useFrame((state, delta) => {
    mesh.current.rotation.x += delta * 0.1;
  });

  return (
    <mesh ref={mesh}>
      <boxGeometry args={[3, 3, 3]}></boxGeometry>
      <meshStandardMaterial color={"orange"}></meshStandardMaterial>
    </mesh>
  );
}
