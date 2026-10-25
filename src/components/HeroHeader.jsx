import { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Sparkles } from '@react-three/drei'
import Avatar from './Avatar'
import FloatingShapes from './FloatingShapes'
import HeroContent from './HeroContent'
import ScrollHint from './ScrollHint'
import Starfield from './Starfield'
import './HeroHeader.css'

// Desplaza la imagen del Canvas sin mover el centro de la órbita:
// en pantallas anchas hacia la derecha, en celular hacia abajo.
function ViewShift() {
  const camera = useThree((state) => state.camera)
  const size = useThree((state) => state.size)

  useEffect(() => {
    const isWide = size.width > 900
    const offsetX = isWide ? -size.width * 0.24 : 0
    const offsetY = isWide ? 0 : -size.height * 0.14

    camera.setViewOffset(size.width, size.height, offsetX, offsetY, size.width, size.height)

    return () => camera.clearViewOffset()
  }, [camera, size])

  return null
}

export default function HeroHeader() {
  return (
    <section className="hero" id="inicio">
      {/* Estrellitas blancas de fondo (detrás de todo) */}
      <Starfield />

      <div className="hero__canvas">
        {/* Canvas transparente: el fondo lo da el CSS de .hero */}
        <Canvas
          camera={{ position: [0, 0.8, 4.5], fov: 45 }}
          dpr={[1, 2]}
          gl={{ alpha: true }}
        >
          <ViewShift />

          {/* Iluminación: ambiental + direccional cálida + punto rosado */}
          <ambientLight intensity={0.7} />
          <directionalLight position={[4, 6, 5]} intensity={1.6} color="#fff1e0" />
          <pointLight position={[-4, 2, 3]} intensity={25} color="#e8bcc4" />

          {/* Modelo FBX animado; Suspense espera a que cargue */}
          <Suspense fallback={null}>
            <Avatar position={[0, -1.7, 0]} scale={0.0125} />
          </Suspense>

          {/* Corazones y estrellas translúcidos que giran y siguen el mouse */}
          <FloatingShapes />

          {/* Polvo dorado sutil */}
          <Sparkles count={35} scale={[9, 5, 4]} size={2.5} speed={0.35} color="#d4aa6c" />

          {/* Órbita restringida: sin zoom ni desplazamiento */}
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={Math.PI / 3}
            maxPolarAngle={Math.PI / 1.8}
          />
        </Canvas>
      </div>

      {/* UI superpuesta sobre el Canvas */}
      <HeroContent />
      <ScrollHint />
    </section>
  )
}