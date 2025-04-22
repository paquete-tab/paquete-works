import { Canvas, useThree } from "@react-three/fiber"
import { Cloud, Scroll, ScrollControls, Stars } from "@react-three/drei"
import BubbleCard from "./BubbleCard"
import Moon from "./Moon"
import Saturn from "./Saturn"

const BubbleCardViewPort = () => {
  const { width: viewWidth, height: viewHeight } = useThree((state) => state.viewport)
  const minLinkRadius = 0.5
  const minTechStackRadius = 0.3
  return (
    <>
      {/* Links */}
      <BubbleCard position={[viewWidth * 0.1, viewHeight * 0.2, -1]} radius={Math.max(minLinkRadius, viewWidth * 0.13)} texturePath={"/github-mark-white.png"} linkURL={"https://github.com/paquete-tab"} />
      <BubbleCard position={[viewWidth * 0.4, -viewHeight * 0.1, -1]} radius={Math.max(minLinkRadius, viewWidth * 0.13)} texturePath={"/qiita-icon.png"} linkURL={"https://qiita.com/paquete"} />

      {/* Tech Stacks */}
      <BubbleCard position={[viewWidth * 0.05, -viewHeight * 0.8, 0]} radius={Math.max(minTechStackRadius, viewWidth * 0.08)} texturePath={"/nextjs-icon.png"} />
      <BubbleCard position={[viewWidth * 0.4, -viewHeight * 0.8, 0]} radius={Math.max(minTechStackRadius, viewWidth * 0.08)} texturePath={"/php.png"} />
      <BubbleCard position={[viewWidth * 0.25, -viewHeight * 1.0, 0]} radius={Math.max(minTechStackRadius, viewWidth * 0.08)} texturePath={"/laravel.png"} />
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
      <ScrollControls pages={3}>
        <Scroll>
          <BubbleCardViewPort />
        </Scroll>
        <Scroll html style={{ width: "100%" }}>
          <h1 style={{ position: 'absolute', top: '10vh', left: '2vw', fontWeight: 'bold', fontSize: '10vw', color: "#000000" }}>Links</h1>
          <h1 style={{ position: 'absolute', top: '110vh', left: '2vw', fontWeight: 'bold', fontSize: '7vw', color: "#000000" }}>Tech stacks</h1>
          <h1 style={{ position: 'absolute', top: '210vh', left: '2vw', fontWeight: 'bold', fontSize: '7vw', color: "#000000" }}>Profile</h1>
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