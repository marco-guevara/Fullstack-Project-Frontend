import apiClient from './apiClient.js'

export async function getCart() {
  const { data } = await apiClient.get('/cart')

  return data.cart
}

export async function addCartItem(cartItem) {
  const { data } = await apiClient.post('/cart/items', cartItem)

  return data.cart
}

export async function updateCartItem(cartItemId, quantity) {
  const { data } = await apiClient.patch(`/cart/items/${cartItemId}`, {
    quantity,
  })

  return data.cart
}

export async function removeCartItem(cartItemId) {
  const { data } = await apiClient.delete(`/cart/items/${cartItemId}`)

  return data.cart
}
