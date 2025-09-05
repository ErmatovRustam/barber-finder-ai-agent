import { useState, useCallback, memo, useMemo, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import AuthModal from './AuthModal'

const AuthButton = memo(function AuthButton() {
  const { user } = useAuth()
  const [showModal, setShowModal] = useState(false)
  const [showUserInfo, setShowUserInfo] = useState(false)
  const [loading, setLoading] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSignOut = useCallback(async () => {
    try {
      setLoading(true)
      await signOut(auth)
    } catch (error) {
      console.error('Sign-out error:', error)
    } finally {
      setLoading(false)
    }
  }, [])

  const openModal = useCallback(() => setShowModal(true), [])
  const closeModal = useCallback(() => setShowModal(false), [])
  const openUserInfo = useCallback(() => setShowUserInfo(true), [])
  const closeUserInfo = useCallback(() => setShowUserInfo(false), [])

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowUserInfo(false)
      }
    }

    if (showUserInfo) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showUserInfo])

  const userDisplayInfo = useMemo(() => {
    if (!user) return null
    return {
      displayName: user.displayName || 'User',
      email: user.email || '',
      firstName: user.displayName?.split(' ')[0] || user.email?.split('@')[0] || 'User'
    }
  }, [user])

  if (user && userDisplayInfo) {
    return (
      <>
        <div className="user-dropdown" ref={dropdownRef}>
          <button className="user-trigger" onClick={openUserInfo}>
            <div className="user-avatar">
              {userDisplayInfo.firstName.charAt(0).toUpperCase()}
            </div>
            <span className="user-name">{userDisplayInfo.firstName}</span>
            <svg className="dropdown-arrow" width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {showUserInfo && (
            <div className="dropdown-menu">
              <div className="dropdown-header">
                <div className="user-info">
                  <div className="user-avatar large">
                    {userDisplayInfo.firstName.charAt(0).toUpperCase()}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{userDisplayInfo.displayName}</div>
                    <div className="user-email">{userDisplayInfo.email}</div>
                  </div>
                </div>
              </div>
              <div className="dropdown-divider"></div>
              <div className="dropdown-items">
                <Link to="/profile" className="dropdown-item" onClick={closeUserInfo}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                  Profile
                </Link>
                <button 
                  onClick={handleSignOut} 
                  className="dropdown-item"
                  disabled={loading}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                    <polyline points="16,17 21,12 16,7"/>
                    <line x1="21" y1="12" x2="9" y2="12"/>
                  </svg>
                  {loading ? 'Signing out...' : 'Sign Out'}
                </button>
              </div>
            </div>
          )}
        </div>
      </>
    )
  }

  return (
    <>
      <button 
        onClick={openModal} 
        className="btn primary"
      >
        Sign In
      </button>
      {showModal && (
        <AuthModal 
          isOpen={showModal} 
          onClose={closeModal} 
        />
      )}
    </>
  )
})

export default AuthButton
