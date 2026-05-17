import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

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
        <Link to="/home">Home</Link>
        <Link to="/shop">Shop</Link>
        <Link to="/cart">Cart</Link>
        <button type="button" onClick={handleLogout}>
          Logout
        </button>
      </nav>
    </header>
  )
}

export default AppNav
