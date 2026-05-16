import apiClient from './apiClient.js'

export async function getCart() {
  const { data } = await apiClient.get('/cart')

  return data.cart
}
