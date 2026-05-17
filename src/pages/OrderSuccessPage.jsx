import { Link, useLocation } from 'react-router-dom'

function OrderSuccessPage() {
  const location = useLocation()
  const orderReference = location.state?.orderReference

  return (
    <main className="app">
      <section className="order-success-page" aria-labelledby="order-success-title">
        <p className="eyebrow">Order Success</p>
        <h1 id="order-success-title">Thank you.</h1>
        {orderReference ? (
          <p className="order-reference">Reference: {orderReference}</p>
        ) : (
          <p className="auth-switch">No recent order reference was found.</p>
        )}
        <Link to="/shop">Return to shop</Link>
      </section>
    </main>
  )
}

export default OrderSuccessPage
