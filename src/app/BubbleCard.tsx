import { JSX, RefObject, useRef, useState } from "react"
import * as THREE from 'three'
import { useFrame, useLoader} from "@react-three/fiber"
import { Float, MotionPathControls, MotionPathRef, useCursor } from "@react-three/drei"

type Props = {
  texturePath: string,
  linkURL?: string | null,
  radius?: number,
} & JSX.IntrinsicElements['mesh']

const BubbleCard = ({ texturePath, linkURL, radius = 1, ...props } : Props) => {
  const bubbleCardRef = useRef<THREE.Group>(null!)
  const motionPathRef = useRef<MotionPathRef>(null!)
  const bubbleRef = useRef<THREE.Mesh>(null!)
  const cardRef = useRef<THREE.Mesh>(null!)
  const [hoveredOnBubble, setHoveredOnBubble] = useState<boolean>(false)
  if (linkURL) {
    useCursor(hoveredOnBubble)
  }
  const texture = useLoader(THREE.TextureLoader, texturePath)

  useFrame((state, delta) => {
    if (motionPathRef.current) {
      if (motionPathRef.current.motion.current < 0.99){
        motionPathRef.current.motion.current += 0.01
      }
    }
    if (bubbleRef.current) {
      if (hoveredOnBubble) {
        inflate(bubbleRef, delta)
      } else {
        deflate(bubbleRef, delta)
      }
      keepScale(bubbleRef, 1.0, 1.1)
    }
    if (cardRef.current) {
      if (hoveredOnBubble) {
        rotateCard(cardRef, 0.1)
      } else {
        reverseRotateCard(cardRef, 0.1)
      }
      keepRotation(cardRef, 0, 2 * Math.PI)
    }
  })
  return (
    <Float rotationIntensity={0.2}>
      <MotionPathControls
        ref={motionPathRef}
        object={bubbleCardRef}
        curves={[
          new THREE.CubicBezierCurve3(
            new THREE.Vector3(0, -2, -6),
            new THREE.Vector3(-1, 0, -4),
            new THREE.Vector3(0, 1, -2),
            new THREE.Vector3(-0.5, 0, 0)
          ),
        ]}
        damping={0.7}
      />
      <group ref={bubbleCardRef}>
        <mesh
          {...props}
          onPointerOver={() => setHoveredOnBubble(true)}
          onPointerOut={() => setHoveredOnBubble(false)}
          ref={bubbleRef}
        >
          <sphereGeometry args={[radius, 64, 64]} />
          <meshPhysicalMaterial
            color="#c0c0c0"
            metalness={0}
            roughness={0}
            transmission={1.8}
            transparent={true}
            opacity={0.3}
            reflectivity={1}
            clearcoat={1}
            clearcoatRoughness={0.1}
            iridescence={1}
            iridescenceIOR={1.3}
            iridescenceThicknessRange={[100, 800]}
            side={THREE.DoubleSide}
          />
        </mesh>
        <mesh
          {...props}
          onClick={() => {
            if (linkURL && window !== undefined) {
              window.open(linkURL, "_blank")
            }
          }}
          ref={cardRef}
        >
          <circleGeometry args={[0.8 * radius, 64]} />
          <meshStandardMaterial map={texture} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </Float>
  )
}

const inflate = (bubbleRef: RefObject<THREE.Mesh>, rate: number) => {
  if (bubbleRef.current.scale.x <= 1.1) {
    bubbleRef.current.scale.x += rate;
  }
  if (bubbleRef.current.scale.y <= 1.1) {
    bubbleRef.current.scale.y += rate;
  }
}

const deflate = (bubbleRef: RefObject<THREE.Mesh>, rate: number) => {
  if (bubbleRef.current.scale.x >= 1.0) {
    bubbleRef.current.scale.x -= rate;
  }
  if (bubbleRef.current.scale.y >= 1.0) {
    bubbleRef.current.scale.y -= rate;
  }
}

const keepScale = (bubbleRef: RefObject<THREE.Mesh>, minScale: number, maxScale: number) => {
  if (bubbleRef.current.scale.x < minScale) {
    bubbleRef.current.scale.setX(minScale)
  }
  if (bubbleRef.current.scale.y < minScale) {
    bubbleRef.current.scale.setY(minScale)
  }
  if (bubbleRef.current.scale.x > maxScale) {
    bubbleRef.current.scale.setX(maxScale)
  }
  if (bubbleRef.current.scale.y > maxScale) {
    bubbleRef.current.scale.setY(maxScale)
  }
}

const rotateCard = (cardRef: RefObject<THREE.Mesh>, rate: number) => {
  if (cardRef.current.rotation.y < 2 * Math.PI) {
    cardRef.current.rotation.y += rate
  }
}

const reverseRotateCard = (cardRef: RefObject<THREE.Mesh>, rate: number) => {
  if (cardRef.current.rotation.y > 0) {
    cardRef.current.rotation.y -= rate
  }
}

const keepRotation = (cardRef: RefObject<THREE.Mesh>, minRotation: number, maxRotation: number) => {
  if (cardRef.current.rotation.y < minRotation) {
    cardRef.current.rotation.y = minRotation
  }
  if (cardRef.current.rotation.y > maxRotation) {
    cardRef.current.rotation.y = maxRotation
  }
}

export default BubbleCard