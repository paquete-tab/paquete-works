import * as THREE from 'three'
import { useRef, useState } from 'react'

const Saturn = () => {
  const saturnRef = useRef<THREE.Group>(null!)
  const [pointerDown, setPointerDown] = useState<boolean>(false)
  const [prevMouse, setPrevMouse] = useState({ x: 0, y: 0 })
  const onPointerMove = (event: PointerEvent) => {
    if (pointerDown) {
      const deltaX = event.clientX - prevMouse.x
      const deltaY = event.clientY - prevMouse.y
      saturnRef.current.rotation.y += deltaX * 0.01
      saturnRef.current.rotation.x += deltaY * 0.01
      
      saturnRef.current.rotation.x = Math.max(-Math.PI, Math.min(Math.PI, saturnRef.current.rotation.x))
      saturnRef.current.rotation.y = Math.max(-Math.PI, Math.min(Math.PI, saturnRef.current.rotation.y))
      
      setPrevMouse({ x: event.clientX, y: event.clientY })
    }
  }
  document.addEventListener('pointerup', () => setPointerDown(false))
  return (
    <group
      ref={saturnRef}
      position={[12,5,-20]}
      rotation={[Math.PI / 2, -Math.PI / 4, Math.PI / 2]}
      onPointerDown={(event: PointerEvent) => {
          setPrevMouse({ x: event.clientX, y: event.clientY })
          setPointerDown(true)
        }
      }
      onPointerUp={() => setPointerDown(false)}
      onPointerMove={onPointerMove}
    >
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshPhysicalMaterial
          color={"#cbb994"}
        />
      </mesh>
      <mesh>
        <ringGeometry args={[2.5, 3.5, 64]} />
        <meshPhysicalMaterial 
          color={"#897858"}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  )
}

export default Saturn