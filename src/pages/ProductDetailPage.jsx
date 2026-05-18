import { Boxes, Palette, Ruler } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import AppFooter from '../components/AppFooter.jsx'
import AppNav from '../components/AppNav.jsx'
import { addCartItem } from '../services/cartService.js'
import { getProductById } from '../services/productService.js'

function ProductDetailPage() {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [selectedSize, setSelectedSize] = useState('')
  const [selectedColor, setSelectedColor] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [productError, setProductError] = useState('')
  const [cartError, setCartError] = useState('')
  const [cartMessage, setCartMessage] = useState('')
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  function buildCartPayload() {
    const payload = {
      productId: product?.productId || productId,
      quantity: Math.max(1, Number(quantity) || 1),
    }

    if (product?.sizes?.length > 0) {
      payload.selectedSize = selectedSize || product.sizes[0]
    }

    if (product?.colors?.length > 0) {
      payload.selectedColor = selectedColor || product.colors[0]
    }

    return payload
  }

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProductById(productId)
        setProduct(productData)
        setSelectedSize(productData.sizes?.[0] || '')
        setSelectedColor(productData.colors?.[0] || '')
      } catch (productError) {
        setProductError(productError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  async function handleAddToCart(event) {
    event.preventDefault()

    if (!product || isAddingToCart) {
      return false
    }

    setCartError('')
    setCartMessage('')
    setIsAddingToCart(true)

    try {
      await addCartItem(buildCartPayload())
      setCartMessage('Product added to cart.')
      return true
    } catch (cartError) {
      setCartError(cartError.message)
      return false
    } finally {
      setIsAddingToCart(false)
    }
  }

  async function handleAddAndViewCart(event) {
    const wasAdded = await handleAddToCart(event)

    if (wasAdded) {
      navigate('/cart')
    }
  }

  return (
    <main className="app">
      <AppNav />
      <section className="product-detail-page" aria-labelledby="product-title">
        <div className="detail-actions">
          <Link className="back-link" to="/shop">
            Back to shop
          </Link>
          <Link className="back-link" to="/cart">
            Cart
          </Link>
        </div>

        {isLoading && <p className="auth-switch">Loading product...</p>}
        {productError && <p className="auth-error">{productError}</p>}

        {!isLoading && !productError && product && (
          <article className="product-detail">
            <div className="product-detail-image">
              {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
            </div>

            <div className="product-detail-info">
              <p className="eyebrow">{product.category || 'Uncategorized'}</p>
              <h1 id="product-title">{product.name}</h1>
              <p className="product-price">{Number(product.price).toFixed(2)} EUR</p>
              {product.description && <p className="product-description">{product.description}</p>}

              <dl className="product-meta">
                <div>
                  <dt>
                    <Ruler aria-hidden="true" size={15} strokeWidth={1.8} />
                    Sizes
                  </dt>
                  <dd>{product.sizes?.length ? product.sizes.join(', ') : 'One size'}</dd>
                </div>
                <div>
                  <dt>
                    <Palette aria-hidden="true" size={15} strokeWidth={1.8} />
                    Colors
                  </dt>
                  <dd>{product.colors?.length ? product.colors.join(', ') : 'Standard'}</dd>
                </div>
                <div>
                  <dt>
                    <Boxes aria-hidden="true" size={15} strokeWidth={1.8} />
                    Stock
                  </dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>

              <form className="cart-form" onSubmit={handleAddToCart}>
                {product.sizes?.length > 0 && (
                  <label>
                    Size
                    <select
                      name="selectedSize"
                      value={selectedSize}
                      onChange={(event) => setSelectedSize(event.target.value)}
                    >
                      {product.sizes.map((size) => (
                        <option key={size} value={size}>
                          {size}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                {product.colors?.length > 0 && (
                  <label>
                    Color
                    <select
                      name="selectedColor"
                      value={selectedColor}
                      onChange={(event) => setSelectedColor(event.target.value)}
                    >
                      {product.colors.map((color) => (
                        <option key={color} value={color}>
                          {color}
                        </option>
                      ))}
                    </select>
                  </label>
                )}

                <label>
                  Quantity
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(event) => setQuantity(Number(event.target.value))}
                  />
                </label>

                {cartMessage && <p className="auth-switch">{cartMessage}</p>}
                {cartError && <p className="auth-error">{cartError}</p>}

                <button type="submit" disabled={isAddingToCart || product.stock < 1}>
                  {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                </button>
                <button
                  type="button"
                  disabled={isAddingToCart || product.stock < 1}
                  onClick={handleAddAndViewCart}
                >
                  Add and View Cart
                </button>
              </form>
            </div>
          </article>
        )}
      </section>
      <AppFooter />
    </main>
  )
}

export default ProductDetailPage
