function AuthSubmitButton({ isSubmitting, idleText, submittingText }) {
  return (
    <button type="submit" disabled={isSubmitting}>
      {isSubmitting ? submittingText : idleText}
    </button>
  )
}

export default AuthSubmitButton
