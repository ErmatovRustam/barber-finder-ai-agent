import { useState, useCallback, memo } from 'react'
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  sendPasswordResetEmail,
  updateProfile,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential
} from 'firebase/auth'
import { auth } from '../firebase/config'

type AuthMode = 'signin' | 'signup' | 'forgot' | 'phone'

interface AuthModalProps {
  isOpen: boolean
  onClose: () => void
}

const AuthModal = memo(function AuthModal({ isOpen, onClose }: AuthModalProps) {
  // All hooks must be at the top - no early returns before hooks
  const [mode, setMode] = useState<AuthMode>('signin')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [phoneVerificationId, setPhoneVerificationId] = useState<string | null>(null)
  const [confirmationResult, setConfirmationResult] = useState<any>(null)
  
  // Form data
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    smsCode: ''
  })

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
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
      } else if (mode === 'phone') {
        if (!confirmationResult) {
          // Send SMS code
          const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
            size: 'invisible',
            callback: () => {
              // reCAPTCHA solved, allow signInWithPhoneNumber
            }
          })
          
          const result = await signInWithPhoneNumber(auth, formData.phoneNumber, appVerifier)
          setConfirmationResult(result)
          setError('SMS code sent! Enter the 6-digit code below.')
        } else {
          // Verify SMS code
          await confirmationResult.confirm(formData.smsCode)
          onClose()
        }
      }
    } catch (error: any) {
      setError(error.message || 'An error occurred')
      
      // If signInWithPhoneNumber results in an error, reset the reCAPTCHA
      if (mode === 'phone' && !confirmationResult) {
        const recaptchaContainer = document.getElementById('recaptcha-container')
        if (recaptchaContainer) {
          recaptchaContainer.innerHTML = ''
        }
      }
    } finally {
      setLoading(false)
    }
  }, [mode, formData, confirmationResult, onClose])

  const resetForm = useCallback(() => {
    setFormData({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
      phoneNumber: '',
      smsCode: ''
    })
    setError(null)
    setPhoneVerificationId(null)
    setConfirmationResult(null)
  }, [])

  const switchMode = useCallback((newMode: AuthMode) => {
    setMode(newMode)
    resetForm()
  }, [resetForm])

  const handleGoogleSignIn = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const provider = new GoogleAuthProvider()
      provider.addScope('email')
      provider.addScope('profile')
      
      await signInWithPopup(auth, provider)
      onClose()
    } catch (error: any) {
      setError(error.message || 'Google sign-in failed')
    } finally {
      setLoading(false)
    }
  }, [onClose])

  const handleGitHubSignIn = useCallback(async () => {
    try {
      setLoading(true)
      setError(null)
      
      const provider = new GithubAuthProvider()
      provider.addScope('user:email')
      
      await signInWithPopup(auth, provider)
      onClose()
    } catch (error: any) {
      setError(error.message || 'GitHub sign-in failed')
    } finally {
      setLoading(false)
    }
  }, [onClose])

  // Early return after all hooks
  if (!isOpen) return null

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        
        <div className="auth-header">
          <h2>
            {mode === 'signup' && 'Create Account'}
            {mode === 'signin' && 'Sign In'}
            {mode === 'forgot' && 'Reset Password'}
            {mode === 'phone' && (confirmationResult ? 'Enter SMS Code' : 'Phone Sign In')}
          </h2>
          <p className="auth-subtitle">
            {mode === 'signup' && 'Join us to book appointments'}
            {mode === 'signin' && 'Welcome back'}
            {mode === 'forgot' && 'Enter your email to reset password'}
            {mode === 'phone' && (confirmationResult ? 'Check your phone for the verification code' : 'Enter your phone number to receive a code')}
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

          {mode !== 'phone' && (
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
          )}

          {mode !== 'forgot' && mode !== 'phone' && (
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

          {mode === 'phone' && !confirmationResult && (
            <label>
              <span>Phone Number</span>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                placeholder="+1 (555) 123-4567"
                required
              />
            </label>
          )}

          {mode === 'phone' && confirmationResult && (
            <>
              <label>
                <span>SMS Verification Code</span>
                <input
                  type="text"
                  value={formData.smsCode}
                  onChange={(e) => setFormData({ ...formData, smsCode: e.target.value })}
                  placeholder="123456"
                  maxLength={6}
                  required
                />
              </label>
              <p style={{ textAlign: 'center', margin: '8px 0', fontSize: '14px', color: 'var(--muted)' }}>
                Didn't receive the code?{' '}
                <button 
                  type="button"
                  onClick={() => setConfirmationResult(null)}
                  className="link"
                  style={{ background: 'none', border: 'none', color: 'var(--accent)', cursor: 'pointer' }}
                >
                  Resend SMS
                </button>
              </p>
            </>
          )}

          {error && (
            <div className={`error-message ${error.includes('sent') ? 'success' : ''}`}>
              {error}
            </div>
          )}

          {/* Social Sign-In Buttons */}
          {mode !== 'forgot' && mode !== 'phone' && (
            <>
              <div className="social-buttons">
                <button 
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="btn google-signin"
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Google
                </button>
                
                <button 
                  type="button"
                  onClick={handleGitHubSignIn}
                  className="btn github-signin"
                  disabled={loading}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" style={{ marginRight: '8px' }}>
                    <path fill="currentColor" d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  GitHub
                </button>
              </div>
              
              <div className="divider">
                <span>or</span>
              </div>
            </>
          )}

          <button 
            type="submit" 
            className="btn primary full-width" 
            disabled={loading}
          >
            {loading ? 'Processing...' : (
              mode === 'signup' ? 'Create Account' :
              mode === 'signin' ? 'Sign In' :
              mode === 'phone' ? (confirmationResult ? 'Verify Code' : 'Send SMS Code') :
              'Send Reset Email'
            )}
          </button>
        </form>

        <div className="auth-footer">
          {mode === 'signin' && (
            <>
              <p>Don't have an account? <button onClick={() => switchMode('signup')} className="link">Sign up</button></p>
              <p><button onClick={() => switchMode('forgot')} className="link">Forgot password?</button></p>
              <p><button onClick={() => switchMode('phone')} className="link">Sign in with phone</button></p>
            </>
          )}
          {mode === 'signup' && (
            <>
              <p>Already have an account? <button onClick={() => switchMode('signin')} className="link">Sign in</button></p>
              <p><button onClick={() => switchMode('phone')} className="link">Sign up with phone</button></p>
            </>
          )}
          {mode === 'forgot' && (
            <p><button onClick={() => switchMode('signin')} className="link">Back to sign in</button></p>
          )}
          {mode === 'phone' && (
            <p><button onClick={() => switchMode('signin')} className="link">Back to email sign in</button></p>
          )}
        </div>
        
        {/* reCAPTCHA container for phone auth */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  )
})

export default AuthModal
