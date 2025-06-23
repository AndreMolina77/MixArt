import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import TextInput from '../components/Input/Input'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'

const VerifyCode = () => {
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [timeLeft, setTimeLeft] = useState(20 * 60) // 20 minutos en segundos
  const navigate = useNavigate()
  const location = useLocation()
  const email = location.state?.email
  // Redirigir si no hay email
  useEffect(() => {
    if (!email) {
      navigate('/forgot-password')
    }
  }, [email, navigate])
  // Contador de tiempo
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [timeLeft])
  // Formatear tiempo restante
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60)
    const remainingSeconds = seconds % 60
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`
  }
  const handleSubmit = async (e) => {
    e.preventDefault() 
    if (!code) {
      toast.error('Por favor ingresa el código')
      return
    }
    if (code.length !== 5) {
      toast.error('El código debe tener 5 dígitos')
      return
    }
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/recoveryPassword/verifyCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ code })
      })
      const data = await response.json()
      if (response.ok) {
        toast.success('Código verificado correctamente')
        // Redirigir a la pagina de nueva contraseña
        navigate('/reset-password', { state: { email } })
      } else {
        toast.error(data.message || 'Código incorrecto')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión. Verifica tu internet.')
    } finally {
      setIsLoading(false)
    }
  }
  const handleResendCode = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/recoveryPassword/requestCode', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email })
      })
      const data = await response.json()

      if (response.ok) {
        toast.success('Nuevo código enviado')
        setTimeLeft(20 * 60) // Reiniciar contador
        setCode('')
      } else {
        toast.error(data.message || 'Error al reenviar el código')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Error de conexión')
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
      {/* DESKTOP */}
      <div className="hidden lg:flex h-full">
        {/* Sección izquierda con logo */}
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
            <button onClick={() => navigate('/forgot-password')} className="flex items-center text-[#7A6E6E] mb-8 hover:text-[#5c5252] transition">
              <span className="text-xl mr-2">&lt;</span>
              <span className="text-md">Atrás</span>
            </button>
            {/* Titulo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#7A6E6E] mb-2">Verificar código</h1>
              <p className="text-[#7A6E6E] mb-2">Hemos enviado un código de 5 dígitos a:</p>
              <p className="text-[#E07A5F] font-semibold mb-6">{email}</p>
              <div className="w-full h-px bg-[#7A6E6E]"></div>
            </div>
            {/* Contador de tiempo */}
            <div className="text-center mb-6">
              <div className="bg-[#EBFEF5] border border-[#81B29A] rounded-lg p-4">
                <p className="text-[#7A6E6E] text-sm mb-1">El código expira en:</p>
                <p className="text-2xl font-bold text-[#E07A5F]">{formatTime(timeLeft)}</p>
              </div>
            </div>
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput text="Código de verificación:" type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="12345" disabled={isLoading} required maxLength={5}/>
              <div className="pt-4">
                <button type="submit" disabled={isLoading || timeLeft === 0} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${(isLoading || timeLeft === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}>
                  {isLoading ? 'Verificando...' : 'Verificar código'}
                </button>
              </div>
            </form>
            {/* Reenviar codigo */}
            <div className="text-center mt-6">
              <p className="text-sm text-[#7A6E6E] mb-2">¿No recibiste el código?</p>
              <button onClick={handleResendCode} disabled={isLoading || timeLeft > 0} className={`text-sm underline transition ${(isLoading || timeLeft > 0) ? 'text-gray-400 cursor-not-allowed' : 'text-[#E07A5F] hover:text-[#c86b56]'}`}>
                {timeLeft > 0 ? 'Reenviar código disponible cuando expire' : 'Reenviar código'}
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col min-h-screen px-6 py-8">
        {/* Header movil */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/forgot-password')} className="flex items-center text-[#7A6E6E] hover:text-[#5c5252] transition">
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
          <h1 className="text-2xl font-bold text-[#7A6E6E] mb-2 text-center">Verificar código</h1>
          <p className="text-[#7A6E6E] mb-1 text-center text-sm">Código enviado a:</p>
          <p className="text-[#E07A5F] font-semibold mb-4 text-center text-sm">{email}</p>
          {/* Contador de tiempo movil */}
          <div className="text-center mb-6">
            <div className="bg-[#EBFEF5] border border-[#81B29A] rounded-lg p-3">
              <p className="text-[#7A6E6E] text-xs mb-1">Expira en:</p>
              <p className="text-xl font-bold text-[#E07A5F]">{formatTime(timeLeft)}</p>
            </div>
          </div>
          {/* Formulario movil */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput text="Código:" type="text" value={code} onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 5))} placeholder="12345" disabled={isLoading} required maxLength={5}/>
            <div className="pt-4">
              <button type="submit" disabled={isLoading || timeLeft === 0} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${ (isLoading || timeLeft === 0) ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer' }`}>
                {isLoading ? 'Verificando...' : 'Verificar'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <p className="text-xs text-[#7A6E6E] mb-1">¿No recibiste el código?</p>
            <button onClick={handleResendCode} disabled={isLoading || timeLeft > 0} className={`text-xs underline transition ${ (isLoading || timeLeft > 0) ? 'text-gray-400 cursor-not-allowed' : 'text-[#E07A5F] hover:text-[#c86b56]' }`}>
              {timeLeft > 0 ? 'Disponible cuando expire' : 'Reenviar código'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default VerifyCode