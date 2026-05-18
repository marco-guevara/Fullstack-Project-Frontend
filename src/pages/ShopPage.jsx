import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import FormMessage from '../components/FormMessage.jsx'
import PageHeader from '../components/PageHeader.jsx'
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
    <AppLayout>
      <section className="shop-page" aria-labelledby="shop-title">
        <PageHeader eyebrow="Collections / 2026" title="Shop" titleId="shop-title">
          <div className="shop-header-meta">
            <p>{products.length} items</p>
          </div>
        </PageHeader>

        <FormMessage>{isLoading && 'Loading products...'}</FormMessage>
        <FormMessage tone="error">{error}</FormMessage>

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
    </AppLayout>
  )
}

export default ShopPage
