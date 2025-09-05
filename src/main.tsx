import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import App from './App.tsx'
import UserProfile from './components/UserProfile.tsx'
import { AuthProvider } from './contexts/AuthContext.tsx'
import { CartProvider } from './contexts/CartContext.tsx'

// Initialize theme immediately to prevent white page
function initializeTheme() {
  try {
    const stored = localStorage.getItem('theme')
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    const theme = stored === 'dark' || stored === 'light' ? stored : (prefersDark ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
    console.log('Theme initialized:', theme)
  } catch (error) {
    console.error('Theme initialization error:', error)
    // Fallback to dark theme
    document.documentElement.setAttribute('data-theme', 'dark')
  }
}

initializeTheme()

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: '/profile',
    element: <UserProfile />,
  },
])

console.log('Starting app render...')

try {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <StrictMode>
      <AuthProvider>
        <CartProvider>
          <RouterProvider router={router} />
        </CartProvider>
      </AuthProvider>
    </StrictMode>,
  )
  console.log('App rendered successfully')
} catch (error) {
  console.error('App render error:', error)
}
