function AuthLayout({ eyebrow, title, titleId, children, footer }) {
  return (
    <main className="app auth-page">
      <section className="auth-panel" aria-labelledby={titleId}>
        <div className="auth-panel-header">
          <p className="eyebrow">{eyebrow}</p>
          <h1 id={titleId}>{title}</h1>
          <p>Access the Baldo catalogue and manage your orders.</p>
        </div>
        <div className="auth-panel-body">
          {children}
          {footer}
        </div>
      </section>
    </main>
  )
}

export default AuthLayout
