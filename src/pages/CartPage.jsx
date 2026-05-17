import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  getCart,
  removeCartItem,
  updateCartItem,
} from '../services/cartService.js'
import { completeCheckout } from '../services/checkoutService.js'

const TAX_RATE = 0.21

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
})

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
    <main className="app">
      <section className="cart-page" aria-labelledby="cart-title">
        <header className="shop-header">
          <div>
            <p className="eyebrow">Private Selection</p>
            <h1 id="cart-title">Cart</h1>
          </div>
          <Link to="/shop">Shop</Link>
        </header>

        {isLoading && <p className="auth-switch">Loading cart...</p>}
        {error && <p className="auth-error">{error}</p>}

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
                <article className="cart-item" key={item.cartItemId}>
                  <div className="cart-item-image">
                    {item.product?.imageUrl && (
                      <img src={item.product.imageUrl} alt={item.product.name} />
                    )}
                  </div>
                  <div>
                    <p className="eyebrow">{item.product?.category || 'Product'}</p>
                    <h2>{item.product?.name}</h2>
                    <p className="auth-switch">Size: {item.selectedSize || 'One size'}</p>
                    <p className="auth-switch">Color: {item.selectedColor || 'Standard'}</p>
                    <div className="cart-item-controls" aria-label="Cart item controls">
                      <button
                        type="button"
                        disabled={updatingItemId === item.cartItemId || item.quantity <= 1}
                        onClick={() => handleQuantityChange(item.cartItemId, item.quantity - 1)}
                      >
                        -
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        disabled={updatingItemId === item.cartItemId}
                        onClick={() => handleQuantityChange(item.cartItemId, item.quantity + 1)}
                      >
                        +
                      </button>
                      <button
                        type="button"
                        disabled={updatingItemId === item.cartItemId}
                        onClick={() => handleRemoveItem(item.cartItemId)}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <p className="eyebrow">Summary</p>
              <h2>{totalItems} Items</h2>
              <div className="summary-line">
                <span>Subtotal</span>
                <strong>{currencyFormatter.format(subtotal)}</strong>
              </div>
              <div className="summary-line">
                <span>Tax</span>
                <strong>{currencyFormatter.format(tax)}</strong>
              </div>
              <div className="summary-line summary-line-total">
                <span>Total</span>
                <strong>{currencyFormatter.format(total)}</strong>
              </div>
              <button
                className="checkout-button"
                type="button"
                disabled={isCheckingOut}
                onClick={handleCheckout}
              >
                {isCheckingOut ? 'Checking out...' : 'Checkout'}
              </button>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default CartPage
