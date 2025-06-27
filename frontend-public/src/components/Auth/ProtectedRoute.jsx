import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import  useAuth  from '../../hooks/useAuth.js'
import { toast } from 'react-hot-toast'
import Loader from '../Misc/Loader'

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, isAuthenticated, isLoading } = useAuth()
  const [hasShownError, setHasShownError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    // Solo mostrar error si es necesaria autenticación y no está autenticado
    if (!isLoading && requireAuth && !isAuthenticated && !hasShownError) {
      setHasShownError(true)
      toast.error('Debes iniciar sesión para acceder a esta página')
    }
  }, [isLoading, requireAuth, isAuthenticated, hasShownError])

  // Mostrar loading mientras valida
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
        <div className="text-center">
          <Loader size="xl" />
          <p className="text-[#7A6E6E] font-[Alexandria] mt-4">Verificando sesión...</p>
        </div>
      </div>
    )
  }

  // Si requiere autenticación y no está autenticado, redirigir al registro
  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/signup" state={{ from: location }} replace />
  }

  // Si está autenticado o no requiere autenticación, mostrar el contenido
  return children
}

export default ProtectedRoute