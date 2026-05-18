import { Link, useLocation } from 'react-router-dom'
import { ArrowRight, CheckCircle2, ReceiptText, UserRound } from 'lucide-react'
import AppLayout from '../components/AppLayout.jsx'

function OrderSuccessPage() {
  const location = useLocation()
  const orderReference = location.state?.orderReference

  return (
    <AppLayout>
      <section className="order-success-page" aria-labelledby="order-success-title">
        <div className="success-mark">
          <CheckCircle2 aria-hidden="true" size={30} strokeWidth={1.6} />
        </div>
        <div className="order-success-copy">
          <p className="eyebrow">Order Success</p>
          <h1 id="order-success-title">Thank you.</h1>
          <p>Your order has been received and the cart is ready for your next purchase.</p>
        </div>

        <div className="order-reference">
          <ReceiptText aria-hidden="true" size={18} strokeWidth={1.8} />
          {orderReference ? (
            <span>Reference: {orderReference}</span>
          ) : (
            <span>No recent order reference was found.</span>
          )}
        </div>

        <div className="order-success-actions">
          <Link to="/shop">
            Return to shop
            <ArrowRight aria-hidden="true" size={16} strokeWidth={1.8} />
          </Link>
          <Link to="/profile">
            <UserRound aria-hidden="true" size={16} strokeWidth={1.8} />
            View profile
          </Link>
        </div>
      </section>
    </AppLayout>
  )
}

export default OrderSuccessPage
