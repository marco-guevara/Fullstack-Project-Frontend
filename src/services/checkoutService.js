import apiClient from './apiClient.js'

export async function completeCheckout() {
  const { data } = await apiClient.post('/checkout')

  return data
}
