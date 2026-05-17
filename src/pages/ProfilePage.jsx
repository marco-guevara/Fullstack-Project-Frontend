import { useState } from 'react'
import { Mail, MapPin, Phone, Save, UserRound } from 'lucide-react'
import AppFooter from '../components/AppFooter.jsx'
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
          <p className="profile-email">
            <Mail aria-hidden="true" size={16} strokeWidth={1.8} />
            {user?.email}
          </p>
        </header>

        <div className="profile-layout">
          <aside className="profile-summary" aria-label="Account summary">
            <div>
              <UserRound aria-hidden="true" size={22} strokeWidth={1.6} />
              <span>Customer Profile</span>
            </div>
            <p>
              Keep your delivery details updated before completing checkout.
            </p>
          </aside>

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

            <div className="profile-contact-notes" aria-hidden="true">
              <span>
                <MapPin size={15} strokeWidth={1.8} />
                Delivery address
              </span>
              <span>
                <Phone size={15} strokeWidth={1.8} />
                Contact details
              </span>
            </div>

            {error && <p className="auth-error">{error}</p>}
            {message && <p className="auth-switch">{message}</p>}

            <button type="submit" disabled={isSaving}>
              <Save aria-hidden="true" size={16} strokeWidth={1.8} />
              {isSaving ? 'Saving...' : 'Save Profile'}
            </button>
          </form>
        </div>
      </section>
      <AppFooter />
    </main>
  )
}

export default ProfilePage
