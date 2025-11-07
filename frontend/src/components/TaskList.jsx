import { useEffect, useState } from 'react'
import { getTasks, updateTaskStatus } from '../api'

export default function TaskList() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    try {
      const data = await getTasks()
      setTasks(data)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { load() }, [])

  const markCompleted = async (id) => {
    try {
      await updateTaskStatus(id, 'completed')
      await load()
    } catch (e) {
      setError(e.message)
    }
  }

  if (loading) return <div>Loading tasks...</div>
  if (error) return <div style={{ color: 'red' }}>Error: {error}</div>

  return (
    <div>
      <h2>Tasks</h2>
      {tasks.length === 0 && <div>No tasks found.</div>}
      <ul>
        {tasks.map((t) => (
          <li key={t.id} style={{ marginBottom: 10 }}>
            <strong>{t.title}</strong> — {t.description || 'No description'}
            <div>Status: <em>{t.status}</em></div>
            {t.status !== 'completed' && (
              <button onClick={() => markCompleted(t.id)}>Mark completed</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
