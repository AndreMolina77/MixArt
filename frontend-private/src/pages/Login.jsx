import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useAuth } from '../hooks/useAuth'
import GoogleButton from '../components/Buttons/GoogleButton'
import TextInput from '../components/Input/Input'
import PasswordInput from '../components/Input/PasswordInput'
import monogramHq from '../assets/monogram-hq.png'
import logo from '../assets/logo.png'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const { Login: authLogin, user, isLoading: authLoading } = useAuth()
  // Redirigir si ya está autenticado
  useEffect(() => {
    if (!authLoading && user) {
      const from = location.state?.from?.pathname || '/main'
      navigate(from, { replace: true })
    }
  }, [user, authLoading, navigate, location])

  const handleLogin = async (e) => {
    e.preventDefault()
    // Validaciones
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
        // Redirigir a la página que intentaba acceder o al main
        const from = location.state?.from?.pathname || '/main'
        // Pequeño delay para que se vea el toast
        setTimeout(() => {
          navigate(from, { replace: true })
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
  // Función para iniciar sesion con Google
  const handleGoogleLogin = () => {
    toast('Función de Google en desarrollo', {
      icon: '🚧',
      duration: 3000
    })
  }
  // Mostrar loading si está verificando autenticacion
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F1DE]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#E07A5F] mx-auto mb-4"></div>
          <p className="text-[#7A6E6E] font-[Alexandria]">Cargando...</p>
        </div>
      </div>
    )
  }
  return (
    <div className="relative w-full h-screen bg-[#F4F1DE] overflow-hidden font-[Alexandria]">
      {/* DESKTOP */}
      <div className="hidden lg:flex h-full">
        {/* Sección izquierda con logo y decoración */}
        <div className="w-1/2 relative flex flex-col items-center justify-center bg-[#A9A9A9] overflow-hidden">
          {/* Monogram en esquina superior izquierda */}
          <img src={monogramHq} alt="Monogram" className="absolute top-6 left-6 w-12 h-12 object-contain"/>
          {/* Logo MixArt centrado */}
          <div className="text-center mb-8">
            <img src={logo} alt="MixArt Logo" className="w-120 h-auto object-contain mb-6" />
          </div>
        </div>
        {/* Seccion derecha con formulario */}
        <div className="w-1/2 flex flex-col justify-center px-16 bg-[#F4F1DE]">
          <div className="max-w-md w-full mx-auto">
            {/* Boton de volver */}
            <button onClick={() => navigate(-1)} className="flex items-center text-[#7A6E6E] mb-8 hover:text-[#5c5252] transition">
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
              {/* Boton de continuar */}
              <div className="pt-4">
                <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}> {isLoading ? 'Iniciando sesión...' : 'Continuar'}
                </button>
              </div>
            </form>
            {/* Separador */}
            <div className="my-6 flex items-center">
              <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
              <span className="px-4 text-sm text-[#7A6E6E]">o</span>
              <div className="flex-1 border-t border-[#7A6E6E] opacity-30"></div>
            </div>
            {/* Boton de Google */}
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
        {/* Contenido del formulario movil */}
        <div className="flex-1 flex flex-col justify-center max-w-sm mx-auto w-full">
          <h1 className="text-2xl font-bold text-[#7A6E6E] mb-2 text-center">Iniciar sesión</h1>
          <p className="text-[#7A6E6E] mb-8 text-center">Únete a nuestro equipo</p>
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
              <button type="submit" disabled={isLoading} className={`w-full h-12 bg-[#E07A5F] border-[#E07A5F] hover:bg-transparent border-2 text-white text-base font-semibold leading-6 rounded-md transition duration-300 shadow-sm font-[Alexandria] ${isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:text-[#E07A5F] cursor-pointer'}`}>{isLoading ? 'Iniciando sesión...' : 'Continuar'}</button>
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