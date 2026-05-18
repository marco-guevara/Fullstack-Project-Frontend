function PageHeader({ eyebrow, title, titleId, children }) {
  return (
    <header className="shop-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
      </div>
      {children}
    </header>
  )
}

export default PageHeader
