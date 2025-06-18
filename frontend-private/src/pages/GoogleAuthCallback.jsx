import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { account } from '../data/AppWrite.js'
import { toast } from 'react-hot-toast'

const GoogleAuthCallback = () => {
  const navigate = useNavigate()
  const [status, setStatus] = useState('processing')

  useEffect(() => {
    handleGoogleCallback();
  }, [])
  const handleGoogleCallback = async () => {
    try {
      // Obtener informacion del usuario de AppWrite
      const appwriteUser = await account.get();
      
      if (!appwriteUser) {
        throw new Error('No se pudo obtener información del usuario')
      }
      // Crear o verificar usuario en tu backend
      const response = await fetch('http://localhost:4000/api/login/google-auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          email: appwriteUser.email,
          name: appwriteUser.name,
          appwriteUserId: appwriteUser.$id,
          isVerified: appwriteUser.emailVerification
        })
      })
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al autenticar usuario')
      }
      const userData = await response.json();
      // Guardar informacion del usuario en localStorage
      localStorage.setItem('user', JSON.stringify({
        ...userData.user,
        appwriteUser: appwriteUser
      }))
      setStatus('success')
      toast.success('Inicio de sesión exitoso');
      // Redirigir segun el rol del usuario
      if (userData.user.userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error en callback de Google:', error);
      setStatus('error');
      toast.error(error.message || 'Error al procesar inicio de sesión');
      // Redirigir al login despues de 3 segundos
      setTimeout(() => {
        navigate('/login')
      }, 3000)
    }
  }
  const renderContent = () => {
    switch (status) {
      case 'processing':
        return (
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-[#E07A5F] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold text-[#7A6E6E] mb-2">Procesando inicio de sesión...</h2>
            <p className="text-gray-600">Por favor espera mientras verificamos tu cuenta</p>
          </div>
        )
      case 'success':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#7A6E6E] mb-2">¡Inicio de sesión exitoso!</h2>
            <p className="text-gray-600">Redirigiendo...</p>
          </div>
        )
      case 'error':
        return (
          <div className="text-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </div>
            <h2 className="text-xl font-bold text-[#7A6E6E] mb-2">Error en el inicio de sesión</h2>
            <p className="text-gray-600">Redirigiendo al login...</p>
          </div>
        )
      default:
        return null
    }
  }
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#F4F3F1] to-[#FFECE7] flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg max-w-md w-full mx-4">
        {renderContent()}
      </div>
    </div>
  )
}
export default GoogleAuthCallback