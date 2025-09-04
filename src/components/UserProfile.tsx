import { useState, useEffect } from 'react'
import { collection, query, where, getDocs, orderBy } from 'firebase/firestore'
import { signOut } from 'firebase/auth'
import { db, auth } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

interface Appointment {
  id: string
  service: string
  date: string
  time: string
  status: string
  createdAt: any
}

export default function UserProfile() {
  const { user } = useAuth()
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) return

    async function fetchAppointments() {
      try {
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

  async function handleSignOut() {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Sign-out error:', error)
    }
  }

  if (!user) {
    return <div>Please sign in to view your profile</div>
  }

  if (loading) {
    return <div>Loading...</div>
  }

  const displayName = user.displayName || user.email?.split('@')[0] || 'User'

  return (
    <div className="user-profile">
      <div className="profile-header">
        <h2>Welcome, {displayName}!</h2>
        <p>Manage your appointments and payments</p>
        <button onClick={handleSignOut} className="btn ghost">
          Sign Out
        </button>
      </div>

      <div className="profile-section">
        <h3>Your Appointments</h3>
        {appointments.length === 0 ? (
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
}
