import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import CartItemCard from '../components/CartItemCard.jsx'
import CartSummary from '../components/CartSummary.jsx'
import FormMessage from '../components/FormMessage.jsx'
import PageHeader from '../components/PageHeader.jsx'
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from '../services/cartService.js'
import { completeCheckout } from '../services/checkoutService.js'

const TAX_RATE = 0.21

function CartPage() {
  const navigate = useNavigate()
  const [cart, setCart] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)
  const [updatingItemId, setUpdatingItemId] = useState('')
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  useEffect(() => {
    async function loadCart() {
      try {
        const cartData = await getCart()
        setCart(cartData)
      } catch (cartError) {
        setError(cartError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadCart()
  }, [])

  const items = cart?.items || []
  const totalItems = items.reduce((total, item) => total + item.quantity, 0)
  const subtotal = items.reduce((total, item) => {
    const itemPrice = Number(item.product?.price || 0)

    return total + itemPrice * item.quantity
  }, 0)
  const tax = subtotal * TAX_RATE
  const total = subtotal + tax

  async function handleQuantityChange(cartItemId, nextQuantity) {
    if (nextQuantity < 1) return

    setError('')
    setUpdatingItemId(cartItemId)

    try {
      const updatedCart = await updateCartItem(cartItemId, nextQuantity)
      setCart(updatedCart)
    } catch (cartError) {
      setError(cartError.message)
    } finally {
      setUpdatingItemId('')
    }
  }

  async function handleRemoveItem(cartItemId) {
    setError('')
    setUpdatingItemId(cartItemId)

    try {
      const updatedCart = await removeCartItem(cartItemId)
      setCart(updatedCart)
    } catch (cartError) {
      setError(cartError.message)
    } finally {
      setUpdatingItemId('')
    }
  }

  async function handleCheckout() {
    setError('')
    setIsCheckingOut(true)

    try {
      const checkoutResult = await completeCheckout()
      navigate('/order-success', {
        state: {
          orderReference: checkoutResult.orderReference,
        },
      })
    } catch (checkoutError) {
      setError(checkoutError.message)
    } finally {
      setIsCheckingOut(false)
    }
  }

  return (
    <AppLayout>
      <section className="cart-page" aria-labelledby="cart-title">
        <PageHeader eyebrow="Private Selection" title="Cart" titleId="cart-title">
          <Link to="/shop">Shop</Link>
        </PageHeader>

        <FormMessage>{isLoading && 'Loading cart...'}</FormMessage>
        <FormMessage tone="error">{error}</FormMessage>

        {!isLoading && !error && items.length === 0 && (
          <div className="empty-state">
            <p>Your cart is empty.</p>
            <Link to="/shop">Explore products</Link>
          </div>
        )}

        {!isLoading && !error && items.length > 0 && (
          <div className="cart-layout">
            <div className="cart-items">
              {items.map((item) => (
                <CartItemCard
                  key={item.cartItemId}
                  item={item}
                  isUpdating={updatingItemId === item.cartItemId}
                  onQuantityChange={handleQuantityChange}
                  onRemove={handleRemoveItem}
                />
              ))}
            </div>

            <CartSummary
              totalItems={totalItems}
              subtotal={subtotal}
              tax={tax}
              total={total}
              isCheckingOut={isCheckingOut}
              onCheckout={handleCheckout}
            />
          </div>
        )}
      </section>
    </AppLayout>
  )
}

export default CartPage
