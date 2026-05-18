import AppFooter from './AppFooter.jsx'
import AppNav from './AppNav.jsx'

function AppLayout({ children }) {
  return (
    <main className="app">
      <AppNav />
      {children}
      <AppFooter />
    </main>
  )
}

export default AppLayout
