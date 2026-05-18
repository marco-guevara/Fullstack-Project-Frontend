function FormMessage({ children, tone = 'neutral' }) {
  if (!children) {
    return null
  }

  const className = tone === 'error'
    ? 'form-message form-message-error'
    : 'form-message'

  return <p className={className}>{children}</p>
}

export default FormMessage
