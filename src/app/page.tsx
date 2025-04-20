"use client"
import type { NextPage } from "next"
import * as THREE from 'three'
import { Canvas } from "@react-three/fiber"
import BubbleCard from "./BubbleCard"
import { Stars } from "@react-three/drei"
import Header from "./Header"

const Home: NextPage = () => {
  return(
    <div>
      <div>
        <Header />
      </div>
      <div className="top-20 left-2 overlay">
          <p className="ml-4 font-black text-3xl text-black">Links</p>
      </div>
      <div className="top-80 left-2 overlay">
          <p className="ml-4 font-black text-3xl text-black">Tech Stacks</p>
      </div>
      <Canvas
        flat
        camera={{
          fov: 35
        }}
        style={{
          position: "fixed",
        }}>
        <ambientLight />
        <directionalLight position={[1, 1, 0]} intensity={2.0} />
        <BubbleCard position={new THREE.Vector3(-5, 2, -5)} radius={0.6} texturePath={"/github-mark-white.png"} linkURL={"https://github.com/paquete-tab"} />
        <BubbleCard position={new THREE.Vector3(-3, 2, -5)} radius={0.6} texturePath={"/qiita-icon.png"} linkURL={"https://qiita.com/paquete"} />
        <BubbleCard position={new THREE.Vector3(-5, 0, -5)} radius={0.6} texturePath={"/nextjs-icon.png"} linkURL={""} />
        <Stars />
      </Canvas>
    </div>
  )
}

export default Home