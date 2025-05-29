import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button.jsx'
import GoogleButton from '../components/GoogleButton.jsx'
import TextInput from '../components/Input.jsx'
import PasswordInput from '../components/PasswordInput.jsx'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const { Login: authLogin } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    // Validaciones chikitas
    if (!email || !password) {
      toast.error('Por favor completa todos los campos')
      return
    }
    if (!email.includes('@')) {
      toast.error('Por favor ingresa un email válido')
      return
    }
    setIsLoading(true)
    try {
      const result = await authLogin(email, password)
      if (result.success) {
        toast.success('¡Inicio de sesión exitoso!')
        // Esperar un poco para que se vea el toast antes de redirigir
        setTimeout(() => {
          navigate('/dashboard')
        }, 1000)
      } else {
        toast.error(result.message || 'Error al iniciar sesión')
      }
    } catch (error) {
      toast.error('Error de conexión. Verifica tu internet.')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }
  const handleGoogleLogin = () => {
    toast('Función de Google en desarrollo', {
      icon: '🚧',
      duration: 3000
    })
  }
  return (
    <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
      {/* DESKTOP */}
      <div className="hidden lg:flex h-full">
        {/* Sección izquierda con logo y decoracion */}
        <div className="w-1/2 relative flex flex-col items-center justify-center bg-[#A9A9A9] overflow-hidden">
          {/* Monogram en esquina superior izquierda */}
          <img src={monogramHq} alt="Monogram" className="absolute top-6 left-6 w-12 h-12 object-contain"/>
          {/* Logo MixArt centrado */}
          <div className="text-center mb-8">
            <img src={logo} alt="MixArt Logo" className="w-120 h-auto object-contain mb-6" />
          </div>
        </div>
        {/* Seccion derecha con correo y contraseña */}
        <div className="w-1/2 flex flex-col justify-center px-16 bg-[#F4F1DE]">
          <div className="max-w-md w-full mx-auto">
            {/* Boton de volver */}
            <button onClick={() => navigate(-1)}className="flex items-center text-[#7A6E6E] mb-8 hover:text-[#5c5252] transition">
              <span className="text-xl mr-2">&lt;</span>
              <span className="text-md">Atrás</span>
            </button>
            {/* Titulo */}
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-[#7A6E6E] mb-2">Iniciar sesión</h1>
              <p className="text-[#7A6E6E] mb-6">Únete a nuestro equipo</p>
              <div className="w-full h-px bg-[#7A6E6E]"></div>
            </div>
            {/* Formulario */}
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Campo de email */}
              <TextInput text="Correo electrónico:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" disabled={isLoading} required/>
              {/* Campo de contraseña */}
              <PasswordInput text="Contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" disabled={isLoading} required/>
              {/* Recordarme y olvidaste contraseña */}
              <div className="flex items-center justify-between">
                <label className="flex items-center">
                  <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-4 h-4 text-[#E07A5F] bg-[#EBFEF5] border-[#81B29A] rounded focus:ring-[#E07A5F] focus:ring-2"/>
                  <span className="ml-2 text-sm text-[#7A6E6E]">Recordarme</span>
                </label>
                <button type="button" className="text-sm text-[#7A6E6E] underline hover:text-[#5c5252] transition">
                  ¿Olvidaste tu contraseña?
                </button>
              </div>
              {/* Botón de continuar */}
              <div className="pt-4">
                <Button Text="Continuar"/>
              </div>
            </form>
            {/* Separador */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
              <span className="px-4 text-sm text-[#7A6E6E]">o</span>
              <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
            </div>
            {/* Botón de Google */}
            <GoogleButton onClick={handleGoogleLogin} />
          </div>
        </div>
      </div>
      {/* MOBILE */}
      <div className="flex lg:hidden flex-col min-h-screen px-6 py-8">
        {/* Header movil */}
        <div className="flex items-center justify-between mb-8">
          <button onClick={() => navigate(-1)} className="flex items-center text-[#7A6E6E] hover:text-[#5c5252] transition">
            <span className="text-xl mr-2">&lt;</span>
            <span className="text-sm">Atrás</span>
          </button>
          <img src={monogramHq} alt="Monogram" className="w-8 h-8 object-contain"/>
        </div>
        {/* Logo centrado */}
        <div className="text-center mb-8">
          <img src={logo} alt="MixArt Logo" className="w-48 h-auto object-contain mx-auto mb-4" />
        </div>
        {/* Contenido del formulario */}
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#7A6E6E] mb-2 text-center">Iniciar sesión</h1>
          <p className="text-[#7A6E6E] mb-8 text-center">
            Únete a nuestro equipo
          </p>
          {/* Formulario movil */}
          <form onSubmit={handleLogin} className="space-y-4">
            <TextInput text="Correo electrónico:" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="email@example.com" disabled={isLoading} required/>
            <PasswordInput text="Contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Tu contraseña" disabled={isLoading} required/>
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className="w-3 h-3 text-[#E07A5F] bg-[#EBFEF5] border-[#81B29A] rounded"/>
                <span className="ml-1 text-[#7A6E6E]">Recordarme</span>
              </label>
              <button type="button" className="text-[#7A6E6E] underline hover:text-[#5c5252] transition">
                ¿Olvidaste tu contraseña?
              </button>
            </div>
            <div className="pt-4">
              <Button Text="Continuar"/>
            </div>
          </form>
          <div className="my-4 flex items-center">
            <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
            <span className="px-4 text-sm text-[#7A6E6E]">o</span>
            <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
          </div>
          <GoogleButton onClick={handleGoogleLogin} />
        </div>
      </div>
    </div>
  )
}
export default Login