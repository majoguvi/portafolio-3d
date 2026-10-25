import './Navbar.css'

const LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mi', label: 'Sobre mí' },
  { href: '#proyectos', label: 'Proyectos' },
  { href: '#contacto', label: 'Contacto' },
]

export default function Navbar() {
  return (
    <header className="navbar">
      <a className="navbar__brand" href="#inicio" aria-label="Ir al inicio">
        MJ
      </a>

      <nav aria-label="Principal">
        <ul className="navbar__links">
          {LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}