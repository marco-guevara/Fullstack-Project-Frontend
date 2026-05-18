import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLocation, useNavigate } from 'react-router-dom'
import FormMessage from '../components/FormMessage.jsx'
import AuthField from '../components/auth/AuthField.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AuthSubmitButton from '../components/auth/AuthSubmitButton.jsx'
import { useAuth } from '../context/useAuth.js'

function LoginPage() {
  const { login } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = location.state?.from?.pathname || '/home'

  function handleChange(event) {
    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value,
    }))
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setError('')
    setIsSubmitting(true)

    try {
      await login(formData)
      navigate(redirectTo, { replace: true })
    } catch (authError) {
      setError(authError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Account Access"
      title="Login"
      titleId="login-title"
      footer={
        <p className="muted-text">
          New to Baldo? <Link to="/register">Create account</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthField
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <AuthField
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <FormMessage tone="error">{error}</FormMessage>
        <AuthSubmitButton
          isSubmitting={isSubmitting}
          idleText="Enter"
          submittingText="Entering..."
        />
      </form>
    </AuthLayout>
  )
}

export default LoginPage
