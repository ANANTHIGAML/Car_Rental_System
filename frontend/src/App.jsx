import { useState } from 'react'
import './App.css'
import CarList from './components/CarList'
import CancelRental from './components/CancelRental'

function App() {
  const [refreshKey, setRefreshKey] = useState(0)

  return (
    <div style={{ padding: 20 }}>
      <h1>Car Rental — Frontend</h1>
      <CarList key={refreshKey} />
      <CancelRental />
    </div>
  )
}

export default App
