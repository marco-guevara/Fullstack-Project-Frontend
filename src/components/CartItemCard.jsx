import { Minus, Plus, Trash2 } from 'lucide-react'

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'EUR',
})

function CartItemCard({
  item,
  isUpdating,
  onQuantityChange,
  onRemove,
}) {
  const itemPrice = Number(item.product?.price || 0)

  return (
    <article className="cart-item">
      <div className="cart-item-image">
        {item.product?.imageUrl && (
          <img src={item.product.imageUrl} alt={item.product.name} />
        )}
      </div>
      <div>
        <p className="eyebrow">{item.product?.category || 'Product'}</p>
        <h2>{item.product?.name}</h2>
        <p className="cart-item-price">
          {currencyFormatter.format(itemPrice)} each
        </p>
        <p className="auth-switch">Size: {item.selectedSize || 'One size'}</p>
        <p className="auth-switch">Color: {item.selectedColor || 'Standard'}</p>
        <div className="cart-item-controls" aria-label="Cart item controls">
          <button
            type="button"
            disabled={isUpdating || item.quantity <= 1}
            onClick={() => onQuantityChange(item.cartItemId, item.quantity - 1)}
          >
            <Minus aria-hidden="true" size={14} strokeWidth={1.8} />
          </button>
          <span>{item.quantity}</span>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onQuantityChange(item.cartItemId, item.quantity + 1)}
          >
            <Plus aria-hidden="true" size={14} strokeWidth={1.8} />
          </button>
          <button
            type="button"
            disabled={isUpdating}
            onClick={() => onRemove(item.cartItemId)}
          >
            <Trash2 aria-hidden="true" size={14} strokeWidth={1.8} />
            Remove
          </button>
        </div>
      </div>
      <strong className="cart-item-total">
        {currencyFormatter.format(itemPrice * item.quantity)}
      </strong>
    </article>
  )
}

export default CartItemCard
