import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import TextInput from '../components/Input/Input'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'

const ForgotPassword = () => {
  const [email, setEmail] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!email) {
      toast.error('Por favor ingresa tu correo electrónico')
      return
    }
    if (!email.includes('@')) {
      toast.error('Por favor ingresa un email válido')
      return
    }
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
        toast.success('Código enviado a tu correo electrónico')
        // Redirigir a la pagina de verificación de codigo
        navigate('/verify-code', { state: { email } })
      } else {
        toast.error(data.message || 'Error al enviar el código')
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
            {/* Botón de volver */}
            <button onClick={() => navigate('/login')} className="flex items-center text-[#7A6E6E] mb-8 hover:text-[#5c5252] transition">
              <span className="text-xl mr-2">&lt;</span>
              <span className="text-md">Volver al login</span>
            </button>
            {/* Titulo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#7A6E6E] mb-2">¿Olvidaste tu contraseña?</h1>
              <p className="text-[#7A6E6E] mb-6">
                Ingresa tu correo electrónico y te enviaremos un código para restablecer tu contraseña
              </p>
              <div className="w-full h-px bg-[#7A6E6E]"></div>
            </div>
            {/* Formulario */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <TextInput text="Correo electrónico:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" disabled={isLoading} required/>
              <div className="pt-4">
                <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${  isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer' }`}>
                  {isLoading ? 'Enviando código...' : 'Enviar código'}
                </button>
              </div>
            </form>
            {/* Link para volver al login */}
            <div className="text-center mt-6">
              <button onClick={() => navigate('/login')} className="text-sm text-[#7A6E6E] underline hover:text-[#5c5252] transition">
                Volver al inicio de sesión
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col min-h-screen px-6 py-8">
        {/* Header movil */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate('/login')} className="flex items-center text-[#7A6E6E] hover:text-[#5c5252] transition">
            <span className="text-xl mr-2">&lt;</span>
            <span className="text-sm">Volver</span>
          </button>
          <img src={monogramHq} alt="Monogram" className="w-8 h-8 object-contain"/>
        </div>
        {/* Logo centrado */}
        <div className="text-center mb-8">
          <img src={logo} alt="MixArt Logo" className="w-48 h-auto object-contain mx-auto mb-4" />
        </div>
        {/* Contenido del formulario movil */}
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#7A6E6E] mb-2 text-center">¿Olvidaste tu contraseña?</h1>
          <p className="text-[#7A6E6E] mb-8 text-center text-sm">
            Ingresa tu correo y te enviaremos un código de recuperación
          </p>
          {/* Formulario movil */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <TextInput text="Correo electrónico:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" disabled={isLoading} required/>
            <div className="pt-4">
              <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${ isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}>
                {isLoading ? 'Enviando...' : 'Enviar código'}
              </button>
            </div>
          </form>
          <div className="text-center mt-4">
            <button onClick={() => navigate('/login')} className="text-sm text-[#7A6E6E] underline hover:text-[#5c5252] transition">
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ForgotPassword