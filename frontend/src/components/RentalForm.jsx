import { useState } from 'react'
import { rentCar } from '../api'

export default function RentalForm({ car, onRented, onCancel }) {
  const [userName, setUserName] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      // Convert datetime-local value to full ISO string if needed
      const payload = {
        user_name: userName,
        start_date: startDate,
        end_date: endDate,
        car_id: car.id,
      }
      await rentCar(car.id, payload)
      setUserName('')
      setStartDate('')
      setEndDate('')
      if (onRented) onRented()
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Network error'
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={submit} style={{ border: '1px solid #ddd', padding: 12 }}>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Your name</label>
        <br />
        <input value={userName} onChange={(e) => setUserName(e.target.value)} required />
      </div>
      <div>
        <label>Start date</label>
        <br />
        <input type="datetime-local" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
      </div>
      <div>
        <label>End date</label>
        <br />
        <input type="datetime-local" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit" disabled={loading}>Rent</button>
        <button type="button" onClick={onCancel} style={{ marginLeft: 8 }}>Cancel</button>
      </div>
    </form>
  )
}
