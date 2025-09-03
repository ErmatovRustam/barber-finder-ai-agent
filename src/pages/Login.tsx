import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    // Placeholder auth
    if (email && password) {
      navigate('/')
    } else {
      setError('Please enter email and password')
    }
  }

  return (
    <div className="container">
      <div className="card narrow">
        <h1>Login</h1>
        <form onSubmit={handleSubmit} className="form" aria-labelledby="login-title">
          <h1 id="login-title" style={{ marginBottom: '8px' }}>Welcome back</h1>
          <label>
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
            />
          </label>
          <label>
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </label>
          {error && <p className="error">{error}</p>}
          <button type="submit" className="btn primary">Sign in</button>
        </form>
        <p style={{ marginTop: '1rem' }}>
          <Link to="/">← Back to Home</Link>
        </p>
      </div>
    </div>
  )
}


