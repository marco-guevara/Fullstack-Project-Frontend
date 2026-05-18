import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import FormMessage from '../components/FormMessage.jsx'
import AuthField from '../components/auth/AuthField.jsx'
import AuthLayout from '../components/auth/AuthLayout.jsx'
import AuthSubmitButton from '../components/auth/AuthSubmitButton.jsx'
import { useAuth } from '../context/useAuth.js'

function RegisterPage() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    address: '',
    city: '',
    postalCode: '',
    country: '',
    phone: '',
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
        <p className="muted-text">
          Already registered? <Link to="/login">Login</Link>
        </p>
      }
    >
      <form className="auth-form" onSubmit={handleSubmit}>
        <AuthField
          label="First Name"
          type="text"
          name="firstName"
          autoComplete="given-name"
          value={formData.firstName}
          onChange={handleChange}
        />
        <AuthField
          label="Last Name"
          type="text"
          name="lastName"
          autoComplete="family-name"
          value={formData.lastName}
          onChange={handleChange}
        />
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
        <AuthField
          label="Address"
          type="text"
          name="address"
          autoComplete="street-address"
          value={formData.address}
          onChange={handleChange}
        />
        <AuthField
          label="City"
          type="text"
          name="city"
          autoComplete="address-level2"
          value={formData.city}
          onChange={handleChange}
        />
        <AuthField
          label="Postal Code"
          type="text"
          name="postalCode"
          autoComplete="postal-code"
          value={formData.postalCode}
          onChange={handleChange}
        />
        <AuthField
          label="Country"
          type="text"
          name="country"
          autoComplete="country-name"
          value={formData.country}
          onChange={handleChange}
        />
        <AuthField
          label="Phone"
          type="tel"
          name="phone"
          autoComplete="tel"
          value={formData.phone}
          onChange={handleChange}
        />
        <FormMessage tone="error">{error}</FormMessage>
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
