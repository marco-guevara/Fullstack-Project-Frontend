import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCart } from '../services/cartService.js'

function CartPage() {
  const [cart, setCart] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

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
                    <p className="auth-switch">Quantity: {item.quantity}</p>
                    <p className="auth-switch">Size: {item.selectedSize || 'One size'}</p>
                    <p className="auth-switch">Color: {item.selectedColor || 'Standard'}</p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="cart-summary">
              <p className="eyebrow">Summary</p>
              <h2>{totalItems} Items</h2>
            </aside>
          </div>
        )}
      </section>
    </main>
  )
}

export default CartPage
