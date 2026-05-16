import apiClient from './apiClient.js'

export async function getProducts() {
  const { data } = await apiClient.get('/products')

  return data.products
}
