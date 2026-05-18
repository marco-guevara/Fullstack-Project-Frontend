import apiClient from './apiClient.js'

export async function updateCurrentUserProfile(profileData) {
  const { data } = await apiClient.patch('/users/me', profileData)

  return data.user
}
