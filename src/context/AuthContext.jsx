import { useCallback, useEffect, useMemo, useState } from 'react'
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

  const login = useCallback(async (credentials) => {
    const authenticatedUser = await loginUser(credentials)
    setUser(authenticatedUser)

    return authenticatedUser
  }, [])

  const register = useCallback(async (credentials) => {
    const authenticatedUser = await registerUser(credentials)
    setUser(authenticatedUser)

    return authenticatedUser
  }, [])

  const logout = useCallback(async () => {
    await logoutUser()
    setUser(null)
  }, [])

  const value = useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: Boolean(user),
      login,
      logout,
      register,
    }),
    [isLoading, login, logout, register, user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
