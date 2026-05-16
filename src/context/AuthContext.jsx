import { useEffect, useState } from 'react'
import AuthContext from './authContext.js'
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from '../services/authService.js'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function restoreSession() {
      try {
        const currentUser = await getCurrentUser()
        setUser(currentUser)
      } catch {
        setUser(null)
      } finally {
        setIsLoading(false)
      }
    }

    restoreSession()
  }, [])

  async function login(credentials) {
    const authenticatedUser = await loginUser(credentials)
    setUser(authenticatedUser)

    return authenticatedUser
  }

  async function register(credentials) {
    const authenticatedUser = await registerUser(credentials)
    setUser(authenticatedUser)

    return authenticatedUser
  }

  async function logout() {
    await logoutUser()
    setUser(null)
  }

  const value = {
    user,
    isLoading,
    isAuthenticated: Boolean(user),
    login,
    logout,
    register,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
