function AuthLayout({ eyebrow, title, titleId, children, footer }) {
  return (
    <main className="app">
      <section className="auth-panel" aria-labelledby={titleId}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
        {children}
        {footer}
      </section>
    </main>
  )
}

export default AuthLayout
