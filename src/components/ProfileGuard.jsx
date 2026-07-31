import { useLocation, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProfileGuard({ children }) {
  const { loading, isAuthenticated } = useAuth()
  const location = useLocation()
  const hasProfile = Boolean(localStorage.getItem('healthProfile'))

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) return <Navigate to="/login" replace />

  if (!hasProfile && location.pathname !== '/complete-profile') {
    return <Navigate to="/complete-profile" replace />
  }

  return children
}
