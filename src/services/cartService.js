import apiClient from './apiClient.js'

export async function getCart() {
  const { data } = await apiClient.get('/cart')

  return data.cart
}

export async function addCartItem(cartItem) {
  const { data } = await apiClient.post('/cart/items', cartItem)

  return data.cart
}
