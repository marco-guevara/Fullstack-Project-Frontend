import { Link } from 'react-router-dom'
import AppFooter from '../components/AppFooter.jsx'
import AppNav from '../components/AppNav.jsx'
import { useAuth } from '../context/useAuth.js'

function HomePage() {
  const { user } = useAuth()

  return (
    <main className="app">
      <AppNav />
      <section className="auth-gateway" aria-label="Baldo private home">
        <p className="eyebrow">Private Archive</p>
        <h1>Home</h1>
        <p className="auth-switch">{user?.email}</p>
        <div className="auth-actions">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </section>
      <AppFooter />
    </main>
  )
}

export default HomePage
