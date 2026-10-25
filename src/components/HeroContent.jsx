
import './HeroContent.css'

const EMAIL = 'majoguvi1225@gmail.com'

export default function HeroContent() {
  return (
    <div className="hero-content">
      <span className="hero-content__line" aria-hidden="true" />

      <h1 className="hero-content__name">
        María José <em>Gutierrez</em>
      </h1>

      <p className="hero-content__title">
        Estudiante de Ingeniería de Sistemas y Multimedia
      </p>

      <div className="hero-content__actions">
        <a
          className="btn btn--primary"
          href="#proyectos"
        >
          Ver Proyectos
        </a>

        <a
          className="btn btn--link"
          href={`mailto:${EMAIL}`}
        >
          {EMAIL}
        </a>
      </div>
    </div>
  )
}
