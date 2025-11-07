import { useEffect, useState } from 'react'
import { getCars } from '../api'
import RentalForm from './RentalForm'

export default function CarList() {
  const [cars, setCars] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedCar, setSelectedCar] = useState(null)

  const load = async () => {
    setLoading(true)
    setError(null)
    try {
      const data = await getCars()
      setCars(data)
    } catch (e) {
      setError(e.response?.data?.detail || e.message || 'Network error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const onRented = () => {
    setSelectedCar(null)
    load()
  }

  return (
    <div>
      <div className="header">
        <div className="brand">
          <h1>Available Cars</h1>
        </div>
        <div className="sub">Browse and book cars — secure & simple</div>
      </div>

      {error && <div className="error">Error: {error}</div>}
      {loading && <div className="notice">Loading cars...</div>}

      <div className="grid">
        {cars.map((c) => (
          <div key={c.id} className="card">
            <div className="car-title">{c.make} {c.model}</div>
            <div className="meta">{c.year} • ${c.daily_rate.toFixed(2)}/day</div>
            <div style={{ marginTop: 10 }}>
              <button className="btn" onClick={() => setSelectedCar(c)} disabled={!c.available}>
                {c.available ? 'Rent this car' : 'Not available'}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedCar && (
        <div style={{ marginTop: 20 }} className="card">
          <h3>Rent {selectedCar.make} {selectedCar.model}</h3>
          <RentalForm car={selectedCar} onRented={onRented} onCancel={() => setSelectedCar(null)} />
        </div>
      )}
    </div>
  )
}
