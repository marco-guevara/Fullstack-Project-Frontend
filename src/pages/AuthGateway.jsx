import { Link } from 'react-router-dom'
import { ArrowRight, LogIn, UserPlus } from 'lucide-react'

function AuthGateway() {
  return (
    <main className="app">
      <section className="auth-gateway" aria-label="Baldo authentication gateway">
        <div className="auth-gateway-copy">
          <p className="eyebrow">Premium Urban Apparel</p>
          <h1>Baldo</h1>
          <p>
            Curated essentials, structured silhouettes, and everyday pieces for
            the city.
          </p>
        </div>
        <div className="auth-actions" aria-label="Account actions">
          <Link to="/login">
            <LogIn aria-hidden="true" size={16} strokeWidth={1.8} />
            Login
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
          <Link to="/register">
            <UserPlus aria-hidden="true" size={16} strokeWidth={1.8} />
            Register
          </Link>
        </div>
      </section>
    </main>
  )
}

export default AuthGateway
