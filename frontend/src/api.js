import axios from 'axios'

const API_BASE = 'http://127.0.0.1:8000'
const client = axios.create({
  baseURL: API_BASE,
  timeout: 5000, // 5 second timeout
  headers: {
    'Content-Type': 'application/json'
  }
})

// Add response interceptor for error handling
client.interceptors.response.use(
  response => response,
  error => {
    console.error('API Error:', error)
    if (error.code === 'ECONNABORTED') {
      throw new Error('Request timed out. Please try again.')
    }
    if (!error.response) {
      throw new Error('Network error. Please check if the backend server is running.')
    }
    throw error
  }
)

export const getCars = () => client.get('/cars/').then(r => r.data)
export const getCar = (id) => client.get(`/cars/${id}`).then(r => r.data)
export const createCar = (payload) => client.post('/cars/', payload).then(r => r.data)
export const rentCar = (car_id, payload) => client.post(`/cars/${car_id}/rent`, payload).then(r => r.data)
export const cancelRental = (rental_id) => client.delete(`/rentals/${rental_id}`).then(r => r.data)
