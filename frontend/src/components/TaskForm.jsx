import { useState } from 'react'
import { createTask } from '../api'

export default function TaskForm({ onCreated }) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState(null)

  const submit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      await createTask({ title, description })
      setTitle('')
      setDescription('')
      if (onCreated) onCreated()
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <form onSubmit={submit} style={{ marginBottom: 20 }}>
      <h2>Create Task</h2>
      {error && <div style={{ color: 'red' }}>{error}</div>}
      <div>
        <label>Title</label>
        <br />
        <input value={title} onChange={(e) => setTitle(e.target.value)} required />
      </div>
      <div>
        <label>Description</label>
        <br />
        <input value={description} onChange={(e) => setDescription(e.target.value)} />
      </div>
      <button type="submit">Create</button>
    </form>
  )
}
