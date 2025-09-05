import { useState, useCallback, memo } from 'react'
import { collection, addDoc, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../contexts/AuthContext'

interface AppointmentData {
  name: string
  service: string
  date: string
  time: string
  notes: string
}

const AppointmentForm = memo(function AppointmentForm() {
  const { user } = useAuth()
  const [formData, setFormData] = useState<AppointmentData>({
    name: '',
    service: 'Basic Cut',
    date: '',
    time: '',
    notes: ''
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) return

    try {
      setLoading(true)
      await addDoc(collection(db, 'appointments'), {
        ...formData,
        userId: user.uid,
        userEmail: user.email,
        createdAt: serverTimestamp(),
        status: 'pending'
      })
      setSuccess(true)
      setFormData({ name: '', service: 'Basic Cut', date: '', time: '', notes: '' })
    } catch (error) {
      console.error('Error booking appointment:', error)
    } finally {
      setLoading(false)
    }
  }, [formData, user])

  // Early returns after all hooks
  if (!user) {
    return (
      <div className="auth-required">
        <p>Please sign in to book appointments</p>
      </div>
    )
  }

  if (success) {
    return (
      <div className="success-message">
        <h3>Appointment Requested!</h3>
        <p>We'll confirm your booking via email.</p>
        <button onClick={() => setSuccess(false)} className="btn primary">
          Book Another
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="grid two">
        <label>
          <span>Name</span>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="Full name"
            required
          />
        </label>
        <label>
          <span>Service</span>
          <select
            value={formData.service}
            onChange={(e) => setFormData({ ...formData, service: e.target.value })}
          >
            <option>Basic Cut</option>
            <option>Fade + Style</option>
            <option>Beard & Line-up</option>
          </select>
        </label>
      </div>
      <div className="grid two">
        <label>
          <span>Date</span>
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            required
          />
        </label>
        <label>
          <span>Time</span>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
            required
          />
        </label>
      </div>
      <label>
        <span>Notes</span>
        <textarea
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          placeholder="Preferences, barber name, etc."
          rows={3}
        />
      </label>
      <button 
        type="submit" 
        className="btn primary" 
        disabled={loading}
      >
        {loading ? 'Booking...' : 'Request Booking'}
      </button>
    </form>
  )
})

export default AppointmentForm
