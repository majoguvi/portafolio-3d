import { useEffect, useMemo, useRef, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { ExtrudeGeometry, MathUtils, Shape } from 'three'

// Opacidad de las figuras: sutiles en reposo, más visibles al interactuar
const BASE_OPACITY = 0.3
const HOVER_OPACITY = 0.65
const ACTIVE_OPACITY = 0.9

// Opciones de relieve compartidas por corazones y estrellas
const EXTRUDE_OPTIONS = {
  depth: 0.25,
  bevelEnabled: true,
  bevelThickness: 0.08,
  bevelSize: 0.07,
  bevelSegments: 4,
  curveSegments: 24,
}

// Corazón a partir de la ecuación paramétrica clásica (punta hacia abajo)
function createHeartGeometry() {
  const shape = new Shape()
  const steps = 64
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * Math.PI * 2
    const x = 16 * Math.sin(t) ** 3
    const y =
      13 * Math.cos(t) -
      5 * Math.cos(2 * t) -
      2 * Math.cos(3 * t) -
      Math.cos(4 * t)
    // Se divide entre 16 para que el ancho sea de aprox. 2 unidades
    if (i === 0) shape.moveTo(x / 16, y / 16)
    else shape.lineTo(x / 16, y / 16)
  }
  const geometry = new ExtrudeGeometry(shape, EXTRUDE_OPTIONS)
  geometry.center()
  return geometry
}

// Estrella de 5 puntas alternando radio exterior e interior
function createStarGeometry(outer = 1, inner = 0.45, points = 5) {
  const shape = new Shape()
  for (let i = 0; i < points * 2; i++) {
    const radius = i % 2 === 0 ? outer : inner
    const angle = (i / (points * 2)) * Math.PI * 2 + Math.PI / 2 // punta hacia arriba
    const x = Math.cos(angle) * radius
    const y = Math.sin(angle) * radius
    if (i === 0) shape.moveTo(x, y)
    else shape.lineTo(x, y)
  }
  shape.closePath()
  const geometry = new ExtrudeGeometry(shape, EXTRUDE_OPTIONS)
  geometry.center()
  return geometry
}

// Cada figura: tipo, posición, colores y velocidad
const SHAPES = [
  { id: 1, type: 'heart', position: [-2.8, 1.4, -0.5], size: 0.5, speed: 0.7, phase: 0, color: '#c48a9c', activeColor: '#e8bcc4' },
  { id: 2, type: 'star', position: [2.9, 1.2, -0.8], size: 0.5, speed: 0.9, phase: 1.5, color: '#d4aa6c', activeColor: '#d9a12a' },
  { id: 3, type: 'heart', position: [-2.4, -0.8, 0.2], size: 0.4, speed: 0.6, phase: 3, color: '#bf6350', activeColor: '#e8bcc4' },
  { id: 4, type: 'star', position: [2.5, -1.0, 0.4], size: 0.4, speed: 0.8, phase: 4.5, color: '#e8bcc4', activeColor: '#d9a12a' },
  { id: 5, type: 'star', position: [0.4, 2.3, -1.2], size: 0.35, speed: 0.5, phase: 2, color: '#d4aa6c', activeColor: '#e8bcc4' },
  { id: 6, type: 'heart', position: [1.9, 2.1, -0.4], size: 0.3, speed: 0.75, phase: 5.5, color: '#c48a9c', activeColor: '#d9a12a' },
]

function FloatingShape({ type, position, size, speed, phase, color, activeColor }) {
  const meshRef = useRef()
  const materialRef = useRef()
  const [hovered, setHovered] = useState(false)
  const [active, setActive] = useState(false)

  // La geometría se crea una sola vez por figura
  const geometry = useMemo(
    () => (type === 'heart' ? createHeartGeometry() : createStarGeometry()),
    [type]
  )

  // Cursor de mano mientras el mouse está sobre la figura
  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  // Profundidad: las figuras más cercanas a la cámara reaccionan más al mouse
  const depth = 0.4 + (position[2] + 1.5) * 0.3

  // Se ejecuta en cada frame: giro, balanceo, flotación, mouse, escala y opacidad
  useFrame((state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return

    const t = state.clock.elapsedTime
    const { x: pointerX, y: pointerY } = state.pointer

    mesh.rotation.y += delta * speed
    mesh.rotation.z = Math.sin(t * speed + phase) * 0.2

    // Posición objetivo: base + flotación + seguimiento del mouse
    const targetX = position[0] + pointerX * depth
    const targetY =
      position[1] + Math.sin(t * speed + phase) * 0.25 + pointerY * depth * 0.5
    mesh.position.x = MathUtils.lerp(mesh.position.x, targetX, 0.06)
    mesh.position.y = MathUtils.lerp(mesh.position.y, targetY, 0.08)

    const targetScale = size * (active ? 1.6 : hovered ? 1.25 : 1)
    mesh.scale.setScalar(MathUtils.lerp(mesh.scale.x, targetScale, 0.1))

    // Transparencia suave: sutil en reposo, más visible al interactuar
    const material = materialRef.current
    if (material) {
      const targetOpacity = active ? ACTIVE_OPACITY : hovered ? HOVER_OPACITY : BASE_OPACITY
      material.opacity = MathUtils.lerp(material.opacity, targetOpacity, 0.1)
    }
  })

  return (
    <mesh
      ref={meshRef}
      geometry={geometry}
      position={position}
      scale={size}
      onPointerOver={(e) => {
        e.stopPropagation()
        setHovered(true)
      }}
      onPointerOut={() => setHovered(false)}
      onClick={(e) => {
        e.stopPropagation()
        setActive((prev) => !prev)
      }}
    >
      <meshStandardMaterial
        ref={materialRef}
        color={active || hovered ? activeColor : color}
        roughness={0.3}
        metalness={0.2}
        transparent
        opacity={BASE_OPACITY}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function FloatingShapes() {
  return (
    <group>
      {SHAPES.map(({ id, ...shape }) => (
        <FloatingShape key={id} {...shape} />
      ))}
    </group>
  )
}