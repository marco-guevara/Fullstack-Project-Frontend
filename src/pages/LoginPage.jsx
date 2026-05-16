import { Link } from 'react-router-dom'

function LoginPage() {
  return (
    <main className="app">
      <section className="auth-panel" aria-labelledby="login-title">
        <p className="eyebrow">Account Access</p>
        <h1 id="login-title">Login</h1>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" autoComplete="current-password" />
          </label>
          <button type="submit">Enter</button>
        </form>
        <p className="auth-switch">
          New to Baldo? <Link to="/register">Create account</Link>
        </p>
      </section>
    </main>
  )
}

export default LoginPage
