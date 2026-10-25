import './ScrollHint.css'

export default function ScrollHint() {
  return (
    <a className="scroll-hint" href="#proyectos" aria-label="Ir a proyectos">
      <span className="scroll-hint__label">Desliza</span>
      <span className="scroll-hint__track" aria-hidden="true">
        <span className="scroll-hint__dot" />
      </span>
    </a>
  )
}