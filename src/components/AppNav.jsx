import { LogOut } from 'lucide-react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'
import { navItems } from './navItems.js'

function AppNav() {
  const { logout } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <header className="app-nav">
      <Link className="app-nav-brand" to="/home">
        Baldo
      </Link>
      <nav aria-label="Primary navigation">
        {navItems.map(({ icon: Icon, label, to }) => (
          <NavLink
            className={({ isActive }) => (
              isActive ? 'app-nav-link active' : 'app-nav-link'
            )}
            key={to}
            to={to}
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
