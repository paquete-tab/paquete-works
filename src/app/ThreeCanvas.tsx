import * as THREE from 'three'
import { Canvas, useThree } from "@react-three/fiber"
import { Cloud, Scroll, ScrollControls, Stars } from "@react-three/drei"
import BubbleCard from "./BubbleCard"
import Moon from "./Moon"
import Saturn from "./Saturn"

const BubbleCardViewPort = () => {
  const { width: viewWidth, height: viewHeight } = useThree((state) => state.viewport)
  const linkRadius = THREE.MathUtils.clamp(0.5, viewWidth * 0.11, 1.0)
  const techStackRadius = THREE.MathUtils.clamp(0.3, viewWidth * 0.08, 0.5)
  const minProfile = 0.3
  const profileRadius = Math.max(minProfile, viewWidth * 0.11)
  return (
    <>
      {/* Links */}
      <BubbleCard position={[viewWidth * 0.1, viewHeight * 0.25, -1]} radius={linkRadius} texturePath={"/github-mark-white.png"} linkURL={"https://github.com/paquete-tab"} />
      <BubbleCard position={[viewWidth * 0.5, -viewHeight * 0.05, -1]} radius={linkRadius} texturePath={"/qiita-icon.png"} linkURL={"https://qiita.com/paquete"} />
      <BubbleCard position={[viewWidth * 0.1, -viewHeight * 0.30, -1]} radius={linkRadius} texturePath={"/react.svg"} linkURL={"https://weather-map-frontend.pages.dev/"} />

      {/* Tech Stacks */}
      <BubbleCard position={[viewWidth * 0.05, -viewHeight * 0.8, -1]} radius={techStackRadius} texturePath={"/nextjs-icon.png"} />
      <BubbleCard position={[viewWidth * 0.50, -viewHeight * 0.8, -1]} radius={techStackRadius} texturePath={"/php.png"} />
      <BubbleCard position={[viewWidth * 0.15, -viewHeight * 1.1, -1]} radius={techStackRadius} texturePath={"/typescript.png"} />
      <BubbleCard position={[viewWidth * 0.60, -viewHeight * 1.1, -1]} radius={techStackRadius} texturePath={"/python.png"} />
      <BubbleCard position={[viewWidth * 0.05, -viewHeight * 1.4, -1]} radius={techStackRadius} texturePath={"/laravel.png"} />
      <BubbleCard position={[viewWidth * 0.50, -viewHeight * 1.4, -1]} radius={techStackRadius} texturePath={"/docker.png"} />

      {/* Profile */}
      <BubbleCard position={[-viewWidth * 0.032, -viewHeight * 1.9, -1]} radius={profileRadius} texturePath={"/profile-icon.jpg"} />
    </>
  )
}

const ThreeCanvas = () => {
  return (
    <Canvas
      flat
      camera={{
        fov: 35,
      }}
      style={{
        position: "fixed",
      }}>
      <ambientLight />
      <directionalLight position={[1, 1, 2]} intensity={2.0} />
      <ScrollControls pages={3.2}>
        <Scroll>
          <BubbleCardViewPort />
        </Scroll>
        <Scroll html style={{ width: "100%" }}>
          <div style={{ width: '40vw', position: 'absolute', top: '0.5vh', left: '2vw', display: 'flex', flexFlow: 'column' }}>
            <h1 style={{ fontWeight: 'bold', fontSize: 'clamp(2.0rem, 10vw, 20rem)', color: "#000000" }}>Links</h1>
            <p style={{ fontWeight: 'bold', fontSize: 'clamp(1.2rem, 2vw, 1.7rem)', color: "#000000" }}>GitHub, Qiitaと個人開発したReactアプリのリンクです</p>
          </div>
          <h1 style={{ position: 'absolute', top: '110vh', left: '2vw', fontWeight: 'bold', fontSize: 'clamp(2.0rem, 7vw, 20rem)', color: "#000000" }}>Tech stacks</h1>
          <h1 style={{ position: 'absolute', top: '220vh', left: '2vw', fontWeight: 'bold', fontSize: 'clamp(2.0rem, 7vw, 20rem)', color: "#000000" }}>Profile</h1>
          <div style={{ position: 'absolute', top: '225vh', left: '50vw', display: 'flex', flexFlow: 'column' }}>
            <h2 style={{ padding: 10, fontWeight: 'bold', fontSize: 40, color: "#000000" }}>Paquete</h2>
            <div style={{ padding: 10, fontWeight: 'bold', fontSize: 'clamp(1.2rem, calc(1rem + 0.625vw), 1.7rem)', color: "#000000" }}>
              <p>フロントエンド勉強中の学生です。</p>
              <p>普段はLLMの研究をしつつ、バックエンドエンジニアのアルバイトとしてLaravelを使った開発をしています。</p>
              <p>Qiitaでは趣味の自宅サーバー(Raspberry Pi)開発などの記事を載せています。</p>
              <p>音楽やアニメ、バイクも好きです。</p>
            </div>
          </div>
        </Scroll>
      </ScrollControls>
      <Stars />
      <Cloud position={[-7,0,-15]} segments={20} scale={2.5} concentrate="random" opacity={0.1} color="orange" />
      <Cloud position={[7,0,-15]} segments={20} scale={2.5} concentrate="random" opacity={0.1} color="hotpink" />
      <Moon />
      <Saturn />
    </Canvas>
  )
}

export default ThreeCanvas