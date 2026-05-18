import { Link } from 'react-router-dom'

function ProductCard({ product }) {
  return (
    <Link
      className="product-card"
      to={`/products/${product.productId}`}
    >
      <div className="product-image">
        {product.imageUrl && <img src={product.imageUrl} alt={product.name} />}
      </div>
      <div className="product-card-info">
        <p>{product.category || 'Uncategorized'}</p>
        <h2>{product.name}</h2>
        <span>{Number(product.price).toFixed(2)} EUR</span>
      </div>
    </Link>
  )
}

export default ProductCard
