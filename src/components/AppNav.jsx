import { LogOut, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { navItems } from './navItems.js'

function AppNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  async function handleLogout() {
    await logout()
    setIsMenuOpen(false)
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-nav">
      <Link className="app-nav-brand" to="/home" onClick={() => setIsMenuOpen(false)}>
        Baldo
      </Link>
      <button
        className="app-nav-menu-button"
        type="button"
        aria-controls="primary-navigation"
        aria-expanded={isMenuOpen}
        onClick={() => setIsMenuOpen((currentState) => !currentState)}
      >
        {isMenuOpen ? (
          <X aria-hidden="true" size={18} strokeWidth={1.8} />
        ) : (
          <Menu aria-hidden="true" size={18} strokeWidth={1.8} />
        )}
        <span>Menu</span>
      </button>
      <nav
        id="primary-navigation"
        className={isMenuOpen ? 'app-nav-menu open' : 'app-nav-menu'}
        aria-label="Primary navigation"
      >
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            className={({ isActive }) => (
              isActive ? 'app-nav-link active' : 'app-nav-link'
            )}
            key={to}
            to={to}
            onClick={() => setIsMenuOpen(false)}
          >
            <Icon aria-hidden="true" size={15} strokeWidth={1.8} />
            <span>{label}</span>
          </NavLink>
        ))}
        <button type="button" onClick={handleLogout}>
          <LogOut aria-hidden="true" size={15} strokeWidth={1.8} />
          <span>Logout</span>
        </button>
      </nav>
    </header>
  )
}

export default AppNav
