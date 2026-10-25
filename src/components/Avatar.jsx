import { useEffect, useMemo } from 'react'
import { useLoader } from '@react-three/fiber'
import { useAnimations } from '@react-three/drei'
import { FBXLoader } from 'three/addons/loaders/FBXLoader.js'

export default function Avatar({ url = '/models/avatar.fbx', ...props }) {
  // Carga el FBX; el hook suspende el render hasta que termine
  const fbx = useLoader(FBXLoader, url)

  // Prepara las animaciones incluidas en el archivo
  const { actions } = useAnimations(fbx.animations, fbx)

  // Mixamo puede incluir un clip vacío: se usa el de mayor duración
  const mainClip = useMemo(() => {
    const longest = [...fbx.animations].sort((a, b) => b.duration - a.duration)[0]
    return longest?.name
  }, [fbx])

  // TEMPORAL: para confirmar qué clips hay (se borra después)
  console.log(
    'Clips:',
    fbx.animations.map((a) => `${a.name} (${a.duration.toFixed(2)}s)`),
    '→ se reproduce:',
    mainClip
  )

  // Reproduce el clip principal en bucle
  useEffect(() => {
    const action = actions[mainClip]
    action?.reset().fadeIn(0.4).play()
    return () => {
      action?.fadeOut(0.4)
    }
  }, [actions, mainClip])

  // Los modelos de Mixamo vienen en centímetros: se escalan a 0.01
  return <primitive object={fbx} scale={0.01} {...props} />
}