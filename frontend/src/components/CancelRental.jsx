import { useState } from 'react'
import { cancelRental } from '../api'

export default function CancelRental() {
  const [id, setId] = useState('')
  const [msg, setMsg] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setMsg(null)
    try {
      const res = await cancelRental(Number(id))
      setMsg(res.message || 'Cancelled')
      setId('')
    } catch (err) {
      const message = err.response?.data?.detail || err.message || 'Network error'
      setMsg(message)
    }
  }

  return (
    <form onSubmit={submit} style={{ marginTop: 20 }}>
      <h3>Cancel Rental</h3>
      <div>
        <label>Rental ID</label>
        <br />
        <input value={id} onChange={(e) => setId(e.target.value)} required />
      </div>
      <div style={{ marginTop: 8 }}>
        <button type="submit">Cancel</button>
      </div>
      {msg && <div style={{ marginTop: 8 }}>{msg}</div>}
    </form>
  )
}
