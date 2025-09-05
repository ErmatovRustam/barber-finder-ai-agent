import { createContext, useContext, useEffect, useState, ReactNode, useMemo, useCallback } from 'react'
import type { User } from 'firebase/auth'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '../firebase/config'

interface AuthContextType {
  user: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true })

export function useAuth() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  const handleAuthStateChange = useCallback((user: User | null) => {
    setUser(user)
    setLoading(false)
  }, [])

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChange)
    return unsubscribe
  }, [handleAuthStateChange])

  const value = useMemo(() => ({ user, loading }), [user, loading])

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
