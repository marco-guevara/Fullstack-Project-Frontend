import { useState } from 'react'
import AppNav from '../components/AppNav.jsx'
import { useAuth } from '../context/useAuth.js'

function getInitialProfileData(user) {
  return {
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    address: user?.address || '',
    city: user?.city || '',
    postalCode: user?.postalCode || '',
    country: user?.country || '',
    phone: user?.phone || '',
  }
}

function ProfilePage() {
  const { updateProfile, user } = useAuth()
  const [formData, setFormData] = useState(() => getInitialProfileData(user))
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const [isSaving, setIsSaving] = useState(false)

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
    setMessage('')
    setIsSaving(true)

    try {
      await updateProfile(formData)
      setMessage('Profile updated.')
    } catch (profileError) {
      setError(profileError.message)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <main className="app">
      <AppNav />
      <section className="profile-page" aria-labelledby="profile-title">
        <header className="shop-header">
          <div>
            <p className="eyebrow">Account</p>
            <h1 id="profile-title">Profile</h1>
          </div>
          <p className="auth-switch">{user?.email}</p>
        </header>

        <form className="profile-form" onSubmit={handleSubmit}>
          <label>
            First name
            <input
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
            />
          </label>
          <label>
            Last name
            <input
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
            />
          </label>
          <label>
            Address
            <input
              name="address"
              type="text"
              value={formData.address}
              onChange={handleChange}
            />
          </label>
          <label>
            City
            <input
              name="city"
              type="text"
              value={formData.city}
              onChange={handleChange}
            />
          </label>
          <label>
            Postal code
            <input
              name="postalCode"
              type="text"
              value={formData.postalCode}
              onChange={handleChange}
            />
          </label>
          <label>
            Country
            <input
              name="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
            />
          </label>
          <label>
            Phone
            <input
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
            />
          </label>

          {error && <p className="auth-error">{error}</p>}
          {message && <p className="auth-switch">{message}</p>}

          <button type="submit" disabled={isSaving}>
            {isSaving ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </section>
    </main>
  )
}

export default ProfilePage
