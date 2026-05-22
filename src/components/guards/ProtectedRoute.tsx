import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import type { Role } from '../../types/profile'

interface Props {
  requireRole?: Role
}

export default function ProtectedRoute({ requireRole }: Props) {
  const { user, profile, loading } = useAuth()

  if (loading) {
    return <div className="text-center py-12 text-sm text-gray-500">Yükleniyor...</div>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  if (requireRole && profile?.role !== requireRole) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}
