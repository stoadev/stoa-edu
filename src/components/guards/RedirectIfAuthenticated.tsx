import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export default function RedirectIfAuthenticated() {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (user) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
