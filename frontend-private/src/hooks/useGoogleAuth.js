import { useState, useEffect } from 'react'
import { account } from '../data/AppWrite.js'
import { toast } from 'react-hot-toast'

const useGoogleAuth = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [user, setUser] = useState(null)
  // Verificar si hay sesion activa al cargar
  useEffect(() => {
    checkSession()
  }, [])
  const checkSession = async () => {
    try {
      const session = await account.get()
      setUser(session)
      return session
    } catch (error) {
      // No hay sesión activa
      return null;
    }
  }
  const loginWithGoogle = async () => {
    try {
      setIsLoading(true)
      console.log('🚀 Iniciando OAuth con Google...')
      // Configurar URLs de redireccion
      const successURL = `${window.location.origin}/auth/google/success`
      const failureURL = `${window.location.origin}/auth/google/failure`
      
      console.log('🔗 URLs configuradas:', { successURL, failureURL })
      // Iniciar OAuth con Google
      account.createOAuth2Session('google', successURL, failureURL )
      // No establecer isLoading(false) aquí porque la pagina se redirigira
    } catch (error) {
      console.error('Error al iniciar sesión con Google:', error)
      toast.error('Error al iniciar sesión con Google')
      setIsLoading(false)
    }
  }
  const logout = async () => {
    try {
      setIsLoading(true)
      await account.deleteSession('current')
      setUser(null)
      toast.success('Sesión cerrada exitosamente')
    } catch (error) {
      console.error('Error al cerrar sesión:', error)
      toast.error('Error al cerrar sesión')
    } finally {
      setIsLoading(false)
    }
  }
  return { user, isLoading, loginWithGoogle, logout, checkSession }
}
export default useGoogleAuth