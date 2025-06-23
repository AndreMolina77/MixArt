import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import PasswordInput from '../components/Input/PasswordInput'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  // Redirigir si no hay email
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])
  const validatePassword = (password) => {
    const errors = []
    if (password.length < 8) {
      errors.push('Mínimo 8 caracteres')
    }
    if (!/[A-Z]/.test(password)) {
      errors.push('Al menos una mayúscula')
    }
    if (!/[a-z]/.test(password)) {
      errors.push('Al menos una minúscula')
    }
    if (!/[0-9]/.test(password)) {
      errors.push('Al menos un número')
    }
    return errors
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!newPassword || !confirmPassword) {
      toast.error('Por favor completa todos los campos')
      return
    }
    const passwordErrors = validatePassword(newPassword)
    if (passwordErrors.length > 0) {
      toast.error(`Contraseña debe tener: ${passwordErrors.join(', ')}`)
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/recoveryPassword/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ newPassword })
      })
      const data = await response.json()

      if (response.ok) {
        toast.success('Contraseña cambiada exitosamente')
        // Redirigir al login después de un breve delay
        setTimeout(() => {
          navigate('/login')
        }, 1500)
      } else {
        toast.error(data.message || 'Error al cambiar la contraseña')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión. Verifica tu internet.')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
      {/* DESKTOP */}
      <div className="hidden lg:flex h-full">
        {/* Seccion izquierda con logo */}
        <div className="w-1/2 relative flex flex-col items-center justify-center bg-[#A9A9A9] overflow-hidden">
          <img src={monogramHq} alt="Monogram" className="absolute top-6 left-6 w-12 h-12 object-contain"/>
          <div className="text-center mb-8">
            <img src={logo} alt="MixArt Logo" className="w-120 h-auto object-contain mb-6" />
          </div>
        </div>     
        {/* Seccion derecha con formulario */}
        <div className="w-1/2 flex flex-col justify-center px-16 bg-[#F4F1DE]">
          <div className="max-w-md w-full mx-auto">
            {/* Boton de volver */}
            <button onClick={() => navigate('/verify-code', { state: { email } })} className="flex items-center text-[#7A6E6E] mb-8 hover:text-[#5c5252] transition">
              <span className="text-xl mr-2">&lt;</span>
              <span className="text-md">Atrás</span>
            </button>
            {/* Titulo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#7A6E6E] mb-2">Nueva contraseña</h1>
              <p className="text-[#7A6E6E] mb-6">Crea una nueva contraseña segura para tu cuenta</p>
              <div className="w-full h-px bg-[#7A6E6E]"></div>
            </div>
            {/* Informacion de seguridad */}
            <div className="bg-[#EBFEF5] border border-[#81B29A] rounded-lg p-4 mb-6">
              <h3 className="text-sm font-semibold text-[#7A6E6E] mb-2">Tu contraseña debe contener:</h3>
              <ul className="text-xs text-[#7A6E6E] space-y-1">
                <li>• Mínimo 8 caracteres</li>
                <li>• Al menos una letra mayúscula</li>
                <li>• Al menos una letra minúscula</li>
                <li>• Al menos un número</li>
              </ul>
            </div>
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <PasswordInput text="Nueva contraseña:" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Tu nueva contraseña" disabled={isLoading} required/>
              <PasswordInput text="Confirmar contraseña:" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirma tu contraseña" disabled={isLoading} required/>
              {/* Indicador de coincidencia de contraseñas */}
              {confirmPassword && (
                <div className={`text-sm ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                  {newPassword === confirmPassword ? '✓ Las contraseñas coinciden' : '✗ Las contraseñas no coinciden'}
                </div>
              )}
              <div className="pt-4">
                <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}>
                  {isLoading ? 'Cambiando contraseña...' : 'Cambiar contraseña'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col min-h-screen px-6 py-8">
        {/* Header movil */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/verify-code', { state: { email } })} className="flex items-center text-[#7A6E6E] hover:text-[#5c5252] transition">
            <span className="text-xl mr-2">&lt;</span>
            <span className="text-sm">Atrás</span>
          </button>
          <img src={monogramHq} alt="Monogram" className="w-8 h-8 object-contain"/>
        </div>
        {/* Logo centrado */}
        <div className="text-center mb-8">
          <img src={logo} alt="MixArt Logo" className="w-48 h-auto object-contain mx-auto mb-4" />
        </div>
        {/* Contenido del formulario movil */}
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#7A6E6E] mb-2 text-center">Nueva contraseña</h1>
          <p className="text-[#7A6E6E] mb-6 text-center text-sm">Crea una contraseña segura</p>
          {/* Informacion de seguridad movil */}
          <div className="bg-[#EBFEF5] border border-[#81B29A] rounded-lg p-3 mb-4">
            <h3 className="text-xs font-semibold text-[#7A6E6E] mb-1">Debe contener:</h3>
            <ul className="text-xs text-[#7A6E6E] space-y-0.5">
              <li>• Mínimo 8 caracteres</li>
              <li>• Una mayúscula y minúscula</li>
              <li>• Al menos un número</li>
            </ul>
          </div>
          {/* Formulario movil */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <PasswordInput text="Nueva contraseña:" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder="Tu nueva contraseña" disabled={isLoading} required/>
            <PasswordInput text="Confirmar:" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} placeholder="Confirma tu contraseña" disabled={isLoading} required/>
            {/* Indicador de coincidencia movil */}
            {confirmPassword && (
              <div className={`text-xs ${newPassword === confirmPassword ? 'text-green-600' : 'text-red-600'}`}>
                {newPassword === confirmPassword ? '✓ Coinciden' : '✗ No coinciden'}
              </div>
            )}
            <div className="pt-4">
              <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}>
                {isLoading ? 'Cambiando...' : 'Cambiar contraseña'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default ResetPassword