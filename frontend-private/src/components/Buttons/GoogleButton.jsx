import { useState } from 'react'
import { FcGoogle } from 'react-icons/fc'
import useGoogleAuth from '../../hooks/useGoogleAuth'

const GoogleAuthButton = ({ onSuccess, disabled = false }) => {
  const { loginWithGoogle, isLoading } = useGoogleAuth()
  const [localLoading, setLocalLoading] = useState(false)

  const handleGoogleLogin = async () => {
    setLocalLoading(true)
    try {
      await loginWithGoogle()
      if (onSuccess) onSuccess()
    } catch (error) {
      console.error('Error en Google Auth:', error)
    } finally {
      setLocalLoading(false)
    }
  }
  
  const buttonDisabled = disabled || isLoading || localLoading

  return (
    <button 
      type="button" 
      onClick={handleGoogleLogin} 
      disabled={buttonDisabled}
      className="w-full h-12 flex items-center justify-center gap-2 border-2 border-[#E07A5F] rounded-md py-2 text-[#7A6E6E] font-[Alexandria] hover:bg-[#fbeeea] transition disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {localLoading ? (
        <div className="w-5 h-5 border-2 border-gray-300 border-t-[#E07A5F] rounded-full animate-spin"></div>
      ) : (
        <FcGoogle className="text-xl" />
      )}
      {localLoading ? 'Iniciando sesión...' : 'Continuar con Google'}
    </button>
  )
}

export default GoogleAuthButton