import apiClient from './apiClient.js'

export async function loginUser(credentials) {
  const { data } = await apiClient.post('/auth/login', credentials)

  return data.user
}

export async function registerUser(credentials) {
  const { data } = await apiClient.post('/auth/register', credentials)

  return data.user
}

export async function getCurrentUser() {
  const { data } = await apiClient.get('/auth/me')

  return data.user
}

export async function logoutUser() {
  await apiClient.post('/auth/logout')
}
