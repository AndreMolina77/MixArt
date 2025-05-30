import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {
  const { user, authCookie } = useAuth()
  const [isValidating, setIsValidating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const validateAuth = async () => {
      // Si no hay usuario ni token, redirigir inmediatamente
      if (!user && !authCookie) {
        setIsAuthenticated(false)
        setIsValidating(false)
        return
      }
      try {
        // Verificar token con el servidor
        const response = await fetch('http://localhost:4000/api/validateAuthToken', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (response.ok) {
          setIsAuthenticated(true)
        } else {
          // Token invalido, limpiar datos locales
          localStorage.removeItem('authToken')
          localStorage.removeItem('user')
          setIsAuthenticated(false)
          toast.error('Sesión expirada. Por favor, inicia sesión nuevamente.')
        }
      } catch (error) {
        console.error('Error validating auth:', error)
        setIsAuthenticated(false)
        toast.error('Error de conexión. Redirigiendo al login.')
      } finally {
        setIsValidating(false)
      }
    }
    validateAuth()
  }, [user, authCookie])
  // Mostrar loading mientras valida
  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E07A5F] mx-auto mb-4"></div>
          <p className="text-[#7A6E6E] font-[Alexandria]">Verificando sesión...</p>
        </div>
      </div>
    )
  }
  // Si no esta autenticado, redirigir al login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  // Si está autenticado, mostrar el contenido
  return children
}
export default ProtectedRoute