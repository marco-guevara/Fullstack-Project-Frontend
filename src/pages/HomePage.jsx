import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/useAuth.js'

function HomePage() {
  const { logout, user } = useAuth()
  const navigate = useNavigate()

  async function handleLogout() {
    await logout()
    navigate('/login', { replace: true })
  }

  return (
    <main className="app">
      <section className="auth-gateway" aria-label="Baldo private home">
        <p className="eyebrow">Private Archive</p>
        <h1>Home</h1>
        <p className="auth-switch">{user?.email}</p>
        <div className="auth-actions">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
          <button type="button" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </section>
    </main>
  )
}

export default HomePage
