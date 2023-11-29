"use client";
import React, { Suspense, useRef, useState, useEffect } from "react";

import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { OrbitControls, Points, PointMaterial } from "@react-three/drei";
import { random } from "maath";

import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

import Navbar from "./_components/navbar";

import About_me from "./_components/about_me";

export default function Home() {
  const [scrollPosition, setScrollPosition] = useState(0);

  const myModel = useLoader(GLTFLoader, "rocket.glb");

  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <div>
        <Navbar></Navbar>
      </div>
      <div className="flex h-screen bg-black">
        <About_me></About_me>
        <div className="fixed inset-0 z-[20] h-auto w-full">
          <Canvas camera={{ position: [0, 0, 2] }}>
            <Stars scale={[2, 2, 2]} />
            <OrbitControls enableZoom={false}></OrbitControls>
            <pointLight
              position={[-10, -10, -10]}
              color="grey"
              intensity={5000}
            />
            <pointLight position={[10, 10, 10]} intensity={5000} />

            <primitive
              position={[2, scrollPosition * 0.01, 0]}
              object={myModel.scene}
            ></primitive>
          </Canvas>
        </div>
      </div>
      <div className="flex h-screen bg-gray-900">
        <About_me></About_me>
      </div>
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

function Stars(props: any) {
  const ref = useRef<THREE.Mesh>(null!);
  const [sphere] = useState(() =>
    random.inSphere(new Float32Array(5000), { radius: 5 }),
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
          size={0.01}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}
