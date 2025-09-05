import { useState, useEffect, useCallback, memo, useMemo } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'
import { Link } from 'react-router-dom'

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: string
  createdAt: any
}

const UserProfile = memo(function UserProfile() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!user) return

    async function fetchAppointments() {
      try {
        setLoading(true)
        const q = query(
          collection(db, 'appointments'),
          where('userId', '==', user.uid),
          orderBy('createdAt', 'desc')
        )
        const snapshot = await getDocs(q)
        const apps = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Appointment[]
        setAppointments(apps)
      } catch (error) {
        console.error('Error fetching appointments:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchAppointments()
  }, [user])

  const handleSignOut = useCallback(async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign-out error:', error)
    }
  }, [])

  const userInfo = useMemo(() => ({
    displayName: user?.displayName || 'User',
    email: user?.email || 'No email',
    firstName: user?.displayName?.split(' ')[0] || 'User',
    lastName: user?.displayName?.split(' ').slice(1).join(' ') || ''
  }), [user])

  // Early returns after all hooks
  if (!user) {
    return <div>Please sign in to view your profile</div>
  }

  return (
    <div className="user-profile">
      <div className="profile-header">
        <div className="user-info">
          <h2>Welcome, {userInfo.firstName}!</h2>
          <div className="user-details">
            <p><strong>Full Name:</strong> {userInfo.displayName}</p>
            <p><strong>Email:</strong> {userInfo.email}</p>
          </div>
        </div>
        <div className="profile-actions">
          <Link to="/" className="btn primary">
            ← Back to Main Page
          </Link>
          <button onClick={handleSignOut} className="btn ghost">
            Sign Out
          </button>
        </div>
      </div>

      <div className="profile-section">
        <h3>Your Appointments</h3>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: 'var(--muted)' }}>
            Loading appointments...
          </div>
        ) : appointments.length === 0 ? (
          <p>No appointments yet. Book your first cut!</p>
        ) : (
          <div className="appointments-list">
            {appointments.map((app) => (
              <div key={app.id} className="appointment-card">
                <div className="appointment-info">
                  <h4>{app.service}</h4>
                  <p>{app.date} at {app.time}</p>
                  <span className={`status ${app.status}`}>{app.status}</span>
                </div>
                <div className="appointment-actions">
                  <button className="btn ghost">Reschedule</button>
                  <button className="btn ghost">Cancel</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="profile-section">
        <h3>Payment Methods</h3>
        <div className="payment-section">
          <p>Add payment methods to book appointments</p>
          <button className="btn primary">Add Payment Method</button>
        </div>
      </div>
    </div>
  )
})

export default UserProfile
