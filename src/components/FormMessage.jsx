function FormMessage({ children, tone = 'neutral' }) {
  if (!children) {
    return null
  }

  const className = tone === 'error' ? 'auth-error' : 'auth-switch'

  return <p className={className}>{children}</p>
}

export default FormMessage
