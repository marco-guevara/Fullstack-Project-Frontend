import { Link } from 'react-router-dom'

function RegisterPage() {
  return (
    <main className="app">
      <section className="auth-panel" aria-labelledby="register-title">
        <p className="eyebrow">Archive Circle</p>
        <h1 id="register-title">Register</h1>
        <form className="auth-form">
          <label>
            Email
            <input type="email" name="email" autoComplete="email" />
          </label>
          <label>
            Password
            <input type="password" name="password" autoComplete="new-password" />
          </label>
          <button type="submit">Create Account</button>
        </form>
        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </section>
    </main>
  )
}

export default RegisterPage
