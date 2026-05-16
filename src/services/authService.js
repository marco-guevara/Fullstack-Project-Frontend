import { apiRequest } from './apiClient.js'

export async function loginUser(credentials) {
  const data = await apiRequest('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  return data.user
}

export async function registerUser(credentials) {
  const data = await apiRequest('/auth/register', {
    method: 'POST',
    body: JSON.stringify(credentials),
  })

  return data.user
}

export async function getCurrentUser() {
  const data = await apiRequest('/auth/me')

  return data.user
}

export async function logoutUser() {
  await apiRequest('/auth/logout', {
    method: 'POST',
  })
}
