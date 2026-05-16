import { Link } from 'react-router-dom'

function AuthGateway() {
  return (
    <main className="app">
      <section className="auth-gateway" aria-label="Baldo authentication gateway">
        <p className="eyebrow">Architectural Utility</p>
        <h1>Baldo</h1>
        <div className="auth-actions">
          <Link to="/login">Login</Link>
          <Link to="/register">Register</Link>
        </div>
      </section>
    </main>
  )
}

export default AuthGateway
