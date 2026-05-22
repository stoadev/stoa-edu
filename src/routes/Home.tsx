import { Navigate } from 'react-router-dom'
import { Hero } from '../components/home/Hero'
import { useAuth } from '../contexts/AuthContext'

export default function Home() {
  const { user, loading } = useAuth()

  if (loading) return null
  if (user) return <Navigate to="/courses" replace />

  return <Hero />
}
