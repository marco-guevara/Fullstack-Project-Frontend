import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import { useAuth } from '../context/useAuth.js'

function HomePage() {
  const { user } = useAuth()

  return (
    <AppLayout>
      <section className="auth-gateway" aria-label="Baldo private home">
        <p className="eyebrow">Your Urban Wardrobe</p>
        <h1>Home</h1>
        <p className="muted-text">{user?.email}</p>
        <div className="auth-actions">
          <Link to="/shop">Shop</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </section>
    </AppLayout>
  )
}

export default HomePage
