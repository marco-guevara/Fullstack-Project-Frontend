import { ExternalLink } from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { navItems } from './navItems.js'

const linkedInUrl = 'https://www.linkedin.com/in/marco-guevara-hern%C3%A1ndez-4b0a77396'

function AppFooter() {
  return (
    <footer className="app-footer">
      <div>
        <p className="app-footer-brand">Baldo</p>
        <p>Premium Urban Apparel</p>
      </div>

      <nav aria-label="Footer navigation">
        {navItems.map(({ label, to }) => (
          <NavLink key={to} to={to}>
            {label}
          </NavLink>
        ))}
      </nav>

      <a href={linkedInUrl} target="_blank" rel="noreferrer">
        Marco Guevara
        <ExternalLink aria-hidden="true" size={14} strokeWidth={1.8} />
      </a>
    </footer>
  )
}

export default AppFooter
