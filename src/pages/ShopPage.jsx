import { useEffect, useState } from 'react'
import AppLayout from '../components/AppLayout.jsx'
import FormMessage from '../components/FormMessage.jsx'
import PageHeader from '../components/PageHeader.jsx'
import ProductCard from '../components/ProductCard.jsx'
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
          <div className="page-header-meta">
            <p>{products.length} items</p>
          </div>
        </PageHeader>

        <FormMessage>{isLoading && 'Loading products...'}</FormMessage>
        <FormMessage tone="error">{error}</FormMessage>

        {!isLoading && !error && (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard key={product.productId} product={product} />
            ))}
          </div>
        )}
      </section>
    </AppLayout>
  )
}

export default ShopPage
