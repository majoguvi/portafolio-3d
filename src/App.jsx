
import Navbar from './components/Navbar'
import HeroHeader from './components/HeroHeader'
import './App.css'

const PROJECTS = [
  {
    number: '01',
    title: 'Catálogo de videojuegos',
    category: 'Aplicación web · React',
    description:
      'Un espacio para explorar un catálogo de videojuegos. Desarrollado como proyecto de práctica para aplicar conceptos de desarrollo web.',
    url: 'https://catalogo-videojuegos-navy.vercel.app/',
    action: 'Explorar proyecto',
    icon: '🎮',
    tags: ['React', 'JavaScript', 'Web'],
  },
  {
    number: '02',
    title: 'Biblioteca JS',
    category: 'Aplicación web · JavaScript',
    description:
      'Proyecto enfocado en una biblioteca digital, con el que practiqué la creación de interfaces y la lógica con JavaScript.',
    url: 'https://majoguvi.github.io/biblioteca-js/',
    action: 'Visitar biblioteca',
    icon: '📚',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
  {
    number: '03',
    title: 'Técnicas de scroll',
    category: 'Diseño e interacción web',
    description:
      'Una página de práctica para experimentar con técnicas de desplazamiento y movimiento al recorrer una página web.',
    url: 'https://majoguvi.github.io/Tecnicas-scroll/',
    action: 'Ver interacción',
    icon: '🌀',
    tags: ['HTML', 'CSS', 'Animación'],
  },
  {
    number: '04',
    title: 'Libro de cuentas',
    category: 'Proyecto web académico',
    description:
      'Una herramienta web para practicar la organización de información y la construcción de una interfaz funcional.',
    url: 'https://majoguvi.github.io/parcial/',
    action: 'Abrir proyecto',
    icon: '🧾',
    tags: ['JavaScript', 'HTML', 'CSS'],
  },
]

const SKILLS = ['Java', 'JavaScript', 'React', 'HTML', 'CSS', 'Python']

function SectionHeading({ eyebrow, title, description }) {
  return (
    <div className="section-heading">
      <span className="section-heading__eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function AboutSection() {
  return (
    <section
      className="section about"
      id="sobre-mi"
      aria-labelledby="about-title"
    >
      <div className="about__ornament" aria-hidden="true">
        MJ
      </div>

      <div className="about__content">
        <span className="section-heading__eyebrow">UN POCO SOBRE MÍ</span>

        <h2 id="about-title">María José Gutiérrez</h2>

        <p>
          Estudiante de Ingeniería de Sistemas y Multimedia.
        </p>

        <p>
          Me gusta mucho la tecnología y el diseño para crear experiencias
          digitales, funcionales y bonitas. En este portafolio comparto algunos
          de mis proyectos universitarios y ejercicios prácticos, los cuales
          son parte de mi proceso de aprendizaje.
        </p>

        <a className="text-link" href="#proyectos">
          Conoce mis proyectos <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section
      className="section projects"
      id="proyectos"
      aria-labelledby="projects-title"
    >
      <SectionHeading
        eyebrow="TRABAJOS SELECCIONADOS"
        title="Proyectos y Prácticas"
        description="Estos son algunos de los proyectos académicos y ejercicios prácticos que he realizado. Selecciona uno para explorar su desarrollo e interacción."
      />

      <div className="projects__grid">
        {PROJECTS.map((project) => (
          <article className="project-card" key={project.number}>
            <div className="project-card__top">
              <span className="project-card__number">
                {project.number} / 04
              </span>
              <span className="project-card__icon" aria-hidden="true">
                {project.icon}
              </span>
            </div>

            <span className="project-card__category">
              {project.category}
            </span>

            <h3>{project.title}</h3>

            <p>{project.description}</p>

            <ul className="project-card__tags" aria-label="Tecnologías">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>

            <a
              className="project-card__link"
              href={project.url}
              target="_blank"
              rel="noreferrer"
            >
              {project.action} <span aria-hidden="true">↗</span>
            </a>
          </article>
        ))}
      </div>

      <p className="projects__note">
        ¿Quieres ver el código y más trabajos?{' '}
        <a
          href="https://github.com/majoguvi"
          target="_blank"
          rel="noreferrer"
        >
          Visita mi GitHub ↗
        </a>
      </p>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      className="section contact"
      id="contacto"
      aria-labelledby="contact-title"
    >
      <div className="contact__panel">
        <span className="section-heading__eyebrow">HABLEMOS</span>

        <h2 id="contact-title">¿Hablamos?</h2>

        <p>
          Estoy en constante aprendizaje y abierta a conectar, colaborar en
          proyectos y seguir creciendo en el mundo de la tecnología. ¡Escríbeme!
        </p>

        <div className="contact__actions">
          <a
            className="btn btn--primary"
            href="mailto:majoguvi1225@gmail.com"
          >
            Escríbeme un correo
          </a>

          <a
            className="btn btn--outline"
            href="https://github.com/majoguvi"
            target="_blank"
            rel="noreferrer"
          >
            Mi GitHub ↗
          </a>
        </div>

        <div className="contact__emails">
          <a href="mailto:mjgutierrezv1@correo.usbcali.edu.co">
            mjgutierrezv1@correo.usbcali.edu.co
          </a>

          <a href="mailto:majoguvi1225@gmail.com">
            majoguvi1225@gmail.com
          </a>
        </div>
      </div>
    </section>
  )
}

export default function App() {
  return (
    <>
      <Navbar />

      <main>
        <HeroHeader />
        <AboutSection />
        <ProjectsSection />
        <ContactSection />
      </main>

      <footer className="site-footer">
        <a className="site-footer__brand" href="#inicio">
          MJ
        </a>

        <p>Diseñado y desarrollado por María José Gutiérrez.</p>

        <a href="#inicio">Volver al inicio ↑</a>
      </footer>
    </>
  )
}
