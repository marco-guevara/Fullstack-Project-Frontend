import { ReceiptText } from 'lucide-react'
import { currencyFormatter } from '../utils/currencyFormatter.js'

function CartSummary({
  totalItems,
  subtotal,
  tax,
  total,
  isCheckingOut,
  onCheckout,
}) {
  return (
    <aside className="cart-summary">
      <p className="eyebrow">Summary</p>
      <h2>
        <ReceiptText aria-hidden="true" size={18} strokeWidth={1.8} />
        {totalItems} Items
      </h2>
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
        onClick={onCheckout}
      >
        {isCheckingOut ? 'Checking out...' : 'Checkout'}
      </button>
    </aside>
  )
}

export default CartSummary
