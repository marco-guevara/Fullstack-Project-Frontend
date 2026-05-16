import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import AuthField from '../components/auth/AuthField.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AuthSubmitButton from '../components/auth/AuthSubmitButton.jsx'
import { useAuth } from '../context/useAuth.js'

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [error, setError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

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
      await register(formData)
      navigate('/home', { replace: true })
    } catch (authError) {
      setError(authError.message)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <AuthLayout
      eyebrow="Archive Circle"
      title="Register"
      titleId="register-title"
      footer={
        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
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
          autoComplete="new-password"
          value={formData.password}
          onChange={handleChange}
          required
          minLength="6"
        />
        {error && <p className="auth-error">{error}</p>}
        <AuthSubmitButton
          isSubmitting={isSubmitting}
          idleText="Create Account"
          submittingText="Creating..."
        />
      </form>
    </AuthLayout>
  )
}

export default RegisterPage
