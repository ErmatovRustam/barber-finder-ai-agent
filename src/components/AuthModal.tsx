import { useState } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile 
} from 'firebase/auth'
import { auth } from '../firebase/config'

type AuthMode = 'signin' | 'signup' | 'forgot'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const [mode, setMode] = useState<AuthMode>('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  if (!isOpen) return null

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      if (mode === 'signup') {
        if (formData.password !== formData.confirmPassword) {
          throw new Error('Passwords do not match')
        }
        if (formData.password.length < 6) {
          throw new Error('Password must be at least 6 characters')
        }

        const userCredential = await createUserWithEmailAndPassword(
          auth, 
          formData.email, 
          formData.password
        )
        
        // Update profile with first and last name
        await updateProfile(userCredential.user, {
          displayName: `${formData.firstName} ${formData.lastName}`
        })
        
        onClose()
      } else if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, formData.email, formData.password)
        onClose()
      } else if (mode === 'forgot') {
        await sendPasswordResetEmail(auth, formData.email)
        setError('Password reset email sent! Check your inbox.')
        setTimeout(() => setMode('signin'), 2000)
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  function resetForm() {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    setError(null)
  }

  function switchMode(newMode: AuthMode) {
    setMode(newMode)
    resetForm()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <h2>
            {mode === 'signup' && 'Create Account'}
            {mode === 'signin' && 'Sign In'}
            {mode === 'forgot' && 'Reset Password'}
          </h2>
          <p className="auth-subtitle">
            {mode === 'signup' && 'Join us to book appointments'}
            {mode === 'signin' && 'Welcome back'}
            {mode === 'forgot' && 'Enter your email to reset password'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {mode === 'signup' && (
            <div className="grid two">
              <label>
                <span>First Name</span>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  placeholder="John"
                  required
                />
              </label>
              <label>
                <span>Last Name</span>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  placeholder="Doe"
                  required
                />
              </label>
            </div>
          )}

          <label>
            <span>Email</span>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="you@example.com"
              required
            />
          </label>

          {mode !== 'forgot' && (
            <label>
              <span>Password</span>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                required
              />
            </label>
          )}

          {mode === 'signup' && (
            <label>
              <span>Confirm Password</span>
              <input
                type="password"
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                placeholder="••••••••"
                required
              />
            </label>
          )}

          {error && (
            <div className={`error-message ${error.includes('sent') ? 'success' : ''}`}>
              {error}
            </div>
          )}

          <button 
            type="submit" 
            className="btn primary full-width" 
            disabled={loading}
          >
            {loading ? 'Processing...' : (
              mode === 'signup' ? 'Create Account' :
              mode === 'signin' ? 'Sign In' :
              'Send Reset Email'
            )}
          </button>
        </form>

        <div className="auth-footer">
          {mode === 'signin' && (
            <>
              <p>Don't have an account? <button onClick={() => switchMode('signup')} className="link">Sign up</button></p>
              <p><button onClick={() => switchMode('forgot')} className="link">Forgot password?</button></p>
            </>
          )}
          {mode === 'signup' && (
            <p>Already have an account? <button onClick={() => switchMode('signin')} className="link">Sign in</button></p>
          )}
          {mode === 'forgot' && (
            <p><button onClick={() => switchMode('signin')} className="link">Back to sign in</button></p>
          )}
        </div>
      </div>
    </div>
  )
}
