import { useEffect, useState } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'

const ProtectedRoute = ({ children }) => {
  const { user, authCookie, logout } = useAuth()
  const [isValidating, setIsValidating] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasShownError, setHasShownError] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const validateAuth = async () => {
      console.log("🔐 === PROTECTED ROUTE VALIDATION ===")
      console.log("👤 User:", user)
      console.log("🍪 Auth Cookie:", authCookie)

      // Si no hay usuario ni token, redirigir inmediatamente
      if (!user && !authCookie) {
        console.log("❌ No user and no cookie - redirecting to login")
        setIsAuthenticated(false)
        setIsValidating(false)
        return
      }

      try {
        console.log("🌐 Validating with server...")
        // Verificar token con el servidor
        const response = await fetch('http://localhost:4000/api/validateAuthToken', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json'
          }
        })

        console.log("📡 Server response status:", response.status)

        if (response.ok) {
          console.log("✅ Token valid - user authenticated")
          setIsAuthenticated(true)
          setHasShownError(false) // Reset error flag
        } else {
          console.log("❌ Token invalid - cleaning up")
          
          // Token inválido, limpiar datos locales
          await logout() // Esto limpiará localStorage y cookies
          setIsAuthenticated(false)
          
          // Solo mostrar error una vez
          if (!hasShownError) {
            setHasShownError(true)
            if (response.status === 401) {
              toast.error('Sesión expirada. Por favor, inicia sesión.')
            } else if (response.status === 403) {
              toast.error('Acceso no autorizado.')
            } else {
              toast.error('Error de autenticación.')
            }
          }
        }
      } catch (error) {
        console.error('❌ Error validating auth:', error)
        
        // Error de conexión, limpiar datos
        await logout()
        setIsAuthenticated(false)
        
        if (!hasShownError) {
          setHasShownError(true)
          toast.error('Error de conexión. Redirigiendo al login.')
        }
      } finally {
        setIsValidating(false)
      }
    }

    validateAuth()
  }, [user, authCookie, logout, hasShownError])

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

  // Si no está autenticado, redirigir al login
  if (!isAuthenticated) {
    console.log("🔄 Redirecting to login...")
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Si está autenticado, mostrar el contenido
  console.log("✅ User authenticated - showing protected content")
  return children
}

export default ProtectedRoute