import { useThree } from '@react-three/fiber'
import * as THREE from 'three'

const Moon = () => {
  const { width } = useThree((state) => state.viewport)

  return (
    <group
      position={[width, 8, -25]}>
      <mesh>
        <sphereGeometry args={[1, 64, 64]} />
        <meshPhysicalMaterial
          transmission={1}
          reflectivity={10}
          emissive={"#b8c6db"}
        />
      </mesh>
      <mesh scale={1.05}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color="#f8f8ff"
          transparent={true}
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>
      <mesh scale={1.2}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color="#e6e9ff"
          transparent={true}
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  )
}

export default Moon