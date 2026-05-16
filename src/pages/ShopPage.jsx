import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProducts } from '../services/productService.js'

function ShopPage() {
  const [products, setProducts] = useState([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        const productList = await getProducts()
        setProducts(productList)
      } catch (productError) {
        setError(productError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  return (
    <main className="app">
      <section className="shop-page" aria-labelledby="shop-title">
        <header className="shop-header">
          <div>
            <p className="eyebrow">Archive Selection</p>
            <h1 id="shop-title">Shop</h1>
          </div>
          <Link to="/home">Home</Link>
        </header>

        {isLoading && <p className="auth-switch">Loading products...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!isLoading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <Link
                className="product-card"
                key={product.productId}
                to={`/products/${product.productId}`}
              >
                <div className="product-image">
                  {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
                </div>
                <div className="product-info">
                  <p>{product.category || 'Uncategorized'}</p>
                  <h2>{product.name}</h2>
                  <span>{Number(product.price).toFixed(2)} EUR</span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}

export default ShopPage
