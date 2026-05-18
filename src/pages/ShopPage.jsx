import { SlidersHorizontal } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import AppLayout from '../components/AppLayout.jsx'
import PageHeader from '../components/PageHeader.jsx'
import { getProducts } from '../services/productService.js'

function ShopPage() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('All')
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

  const categories = useMemo(() => {
    const productCategories = products
      .map((product) => product.category || 'Uncategorized')
      .filter(Boolean)

    return ['All', ...new Set(productCategories)]
  }, [products])

  const visibleProducts = selectedCategory === 'All'
    ? products
    : products.filter((product) => (
      (product.category || 'Uncategorized') === selectedCategory
    ))

  return (
    <AppLayout>
      <section className="shop-page" aria-labelledby="shop-title">
        <PageHeader eyebrow="Collections / 2026" title="Shop" titleId="shop-title">
          <div className="shop-header-meta">
            <span>
              <SlidersHorizontal aria-hidden="true" size={14} strokeWidth={1.8} />
              Filters
            </span>
            <p>{visibleProducts.length} items</p>
          </div>
        </PageHeader>

        {isLoading && <p className="auth-switch">Loading products...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!isLoading && !error && (
          <>
            <div className="category-filters" aria-label="Product categories">
              {categories.map((category) => (
                <button
                  className={category === selectedCategory ? 'active' : ''}
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </button>
              ))}
            </div>

            <div className="product-grid">
              {visibleProducts.map((product) => (
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
          </>
        )}
      </section>
    </AppLayout>
  )
}

export default ShopPage
