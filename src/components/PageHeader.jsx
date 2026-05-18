function PageHeader({ eyebrow, title, titleId, children }) {
  return (
    <header className="page-header">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1 id={titleId}>{title}</h1>
      </div>
      {children}
    </header>
  )
}

export default PageHeader
