import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getProductById } from '../services/productService.js'

function ProductDetailPage() {
  const { productId } = useParams()
  const [product, setProduct] = useState(null)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProduct() {
      try {
        const productData = await getProductById(productId)
        setProduct(productData)
      } catch (productError) {
        setError(productError.message)
      } finally {
        setIsLoading(false)
      }
    }

    loadProduct()
  }, [productId])

  return (
    <main className="app">
      <section className="product-detail-page" aria-labelledby="product-title">
        <Link className="back-link" to="/shop">
          Back to shop
        </Link>

        {isLoading && <p className="auth-switch">Loading product...</p>}
        {error && <p className="auth-error">{error}</p>}

        {!isLoading && !error && product && (
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
                  <dt>Sizes</dt>
                  <dd>{product.sizes?.length ? product.sizes.join(', ') : 'One size'}</dd>
                </div>
                <div>
                  <dt>Colors</dt>
                  <dd>{product.colors?.length ? product.colors.join(', ') : 'Standard'}</dd>
                </div>
                <div>
                  <dt>Stock</dt>
                  <dd>{product.stock}</dd>
                </div>
              </dl>
            </div>
          </article>
        )}
      </section>
    </main>
  )
}

export default ProductDetailPage
