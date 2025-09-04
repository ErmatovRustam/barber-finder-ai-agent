import { useState } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

export default function AuthButton() {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSignOut() {
    try {
      setLoading(true)
      await signOut(auth)
    } catch (error) {
      console.error('Sign-out error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (user) {
    return (
      <div className="user-menu">
        <span className="user-email">{user.displayName || user.email}</span>
        <Link to="/profile" className="btn ghost">
          Profile
        </Link>
        <button 
          onClick={handleSignOut} 
          className="btn ghost"
          disabled={loading}
        >
          {loading ? 'Signing out...' : 'Sign Out'}
        </button>
      </div>
    )
  }

  return (
    <>
      <button 
        onClick={() => setShowModal(true)} 
        className="btn primary"
      >
        Sign In
      </button>
      {showModal && (
        <AuthModal 
          isOpen={showModal} 
          onClose={() => setShowModal(false)} 
        />
      )}
    </>
  )
}
