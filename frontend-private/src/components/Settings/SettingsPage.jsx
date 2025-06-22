import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { toast } from 'react-hot-toast'
import { User, Camera, Mail, Phone, Shield, Palette, Moon, Sun, Bell, Save, Eye, EyeOff } from 'lucide-react'

const SettingsPage = () => {
  const { user, API, setUser } = useAuth()
  const fileInputRef = useRef(null)
  
  // Estados para la informacion del perfil
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePic: user?.profilePic || ''
  })
  
  // Estados para configuraciones - ahora con persistencia
  const [settings, setSettings] = useState(() => {
    // Cargar configuraciones guardadas o usar valores por defecto
    const savedSettings = localStorage.getItem('userPreferences')
    if (savedSettings) {
      return JSON.parse(savedSettings)
    }
    return {
      theme: 'light',
      notifications: true,
      emailNotifications: true,
      language: 'es'
    }
  })
  
  // Estados para cambio de contraseña
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')

  // Efecto para aplicar el tema cuando cambie
  useEffect(() => {
    applyTheme(settings.theme)
  }, [settings.theme])

  // Efecto para cargar configuraciones al montar el componente
  useEffect(() => {
    loadUserPreferences()
  }, [])

  // Función para cargar preferencias del usuario
  const loadUserPreferences = () => {
    const savedSettings = localStorage.getItem('userPreferences')
    if (savedSettings) {
      const parsedSettings = JSON.parse(savedSettings)
      setSettings(parsedSettings)
      applyTheme(parsedSettings.theme)
    }
  }

  // Función para guardar preferencias
  const saveUserPreferences = (newSettings) => {
    localStorage.setItem('userPreferences', JSON.stringify(newSettings))
    toast.success('Preferencias guardadas correctamente')
  }

  // Función para aplicar el tema
  const applyTheme = (theme) => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
      document.body.style.backgroundColor = '#1a1a1a'
    } else {
      root.classList.remove('dark')
      document.body.style.backgroundColor = '#F4F1DE'
    }
  }

  // Función para manejar cambios en las configuraciones
  const handleSettingChange = (key, value) => {
    const newSettings = { ...settings, [key]: value }
    setSettings(newSettings)
    saveUserPreferences(newSettings)
    
    // Aplicar cambios inmediatos según la configuración
    switch (key) {
      case 'theme':
        applyTheme(value)
        toast.success(`Tema cambiado a ${value === 'dark' ? 'oscuro' : 'claro'}`)
        break
      case 'notifications':
        if (value) {
          // Solicitar permisos de notificación si están disponibles
          if ('Notification' in window && Notification.permission === 'default') {
            Notification.requestPermission().then(permission => {
              if (permission === 'granted') {
                new Notification('¡Notificaciones activadas!', {
                  body: 'Ahora recibirás notificaciones de MixArt',
                  icon: '/src/assets/logo copy.png'
                })
              }
            })
          }
          toast.success('Notificaciones activadas')
        } else {
          toast.success('Notificaciones desactivadas')
        }
        break
      case 'emailNotifications':
        toast.success(`Notificaciones por email ${value ? 'activadas' : 'desactivadas'}`)
        break
      case 'language':
        toast.success(`Idioma cambiado a ${value === 'es' ? 'Español' : 'English'}`)
        // Aquí podrías integrar una librería de internacionalización como i18next
        break
      default:
        break
    }
  }

  // Función para mostrar notificación de prueba
  const showTestNotification = () => {
    if (!settings.notifications) {
      toast.error('Las notificaciones están desactivadas')
      return
    }

    if ('Notification' in window) {
      if (Notification.permission === 'granted') {
        new Notification('🎨 Notificación de prueba', {
          body: 'Esta es una notificación de prueba de MixArt',
          icon: '/src/assets/logo copy.png'
        })
        toast.success('Notificación enviada')
      } else if (Notification.permission !== 'denied') {
        Notification.requestPermission().then(permission => {
          if (permission === 'granted') {
            new Notification('🎨 Notificación de prueba', {
              body: 'Esta es una notificación de prueba de MixArt',
              icon: '/src/assets/logo copy.png'
            })
            toast.success('Notificación enviada')
          }
        })
      } else {
        toast.error('Las notificaciones están bloqueadas en tu navegador')
      }
    } else {
      toast.error('Tu navegador no soporta notificaciones')
    }
  }

  // Función para resetear preferencias
  const resetPreferences = () => {
    const defaultSettings = {
      theme: 'light',
      notifications: true,
      emailNotifications: true,
      language: 'es'
    }
    setSettings(defaultSettings)
    saveUserPreferences(defaultSettings)
    applyTheme('light')
    toast.success('Preferencias restablecidas a valores por defecto')
  }

  // Manejar cambio de foto de perfil
  const handleImageUpload = async (event) => {
    const file = event.target.files[0]
    if (!file) return
    // Validar tipo de archivo
    if (!file.type.startsWith('image/')) {
      toast.error('Por favor selecciona un archivo de imagen válido')
      return
    }
    // Validar tamaño (máximo 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('La imagen no puede ser mayor a 5MB')
      return
    }
    try {
      setIsLoading(true)
      
      const formData = new FormData()
      formData.append('profilePic', file)
      // Determinar el endpoint según el tipo de usuario
      let endpoint = ''
      if (user.userType === 'admin') {
        endpoint = `http://localhost:4000/api/admin/profile`
      } else if (user.userType === 'customer') {
        endpoint = `${API}/customers/${user.id}`
      } else {
        endpoint = `${API}/employees/${user.id}`
      }
      const response = await fetch(endpoint, {
        method: 'PUT',
        credentials: 'include',
        body: formData
      })
      if (!response.ok) {
        throw new Error('Error al subir la imagen')
      }
      // NUEVA LÓGICA - Manejar response correctamente:
      if (user.userType === 'admin') {
        // Para admin, leer la respuesta del servidor
        const responseData = await response.json()
        console.log("📸 Admin response data:", responseData)
        // Actualizar con datos de la respuesta
        const newProfilePic = responseData.user?.profilePic || ''
        setProfileData(prev => ({ ...prev, profilePic: newProfilePic }))
        
        const updatedUser = { ...user, profilePic: newProfilePic }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      } else {
        // Para empleados y clientes, NO leer response aqui, hacer fetch separado
        await response.text() // Consumir el response para evitar problemas
        // Hacer fetch separado para obtener datos actualizados
        let userDataEndpoint = ''
        if (user.userType === 'customer') {
          userDataEndpoint = `${API}/customers/${user.id}`
        } else {
          userDataEndpoint = `${API}/employees/${user.id}`
        }
        const userDataResponse = await fetch(userDataEndpoint, {
          credentials: 'include'
        })
        if (userDataResponse.ok) {
          const freshUserData = await userDataResponse.json()
          console.log("📸 Fresh user data:", freshUserData.profilePic)
          
          setProfileData(prev => ({ ...prev, profilePic: freshUserData.profilePic }))
          const updatedUser = { ...user, profilePic: freshUserData.profilePic }
          localStorage.setItem("user", JSON.stringify(updatedUser))
          setUser(updatedUser)
        }
      }
      toast.success('Foto de perfil actualizada correctamente')
    } catch (error) {
      console.error('Error al subir imagen:', error)
      toast.error('Error al actualizar la foto de perfil')
    } finally {
      setIsLoading(false)
    }
  }
  // Manejar actualizacion del perfil
  const handleProfileUpdate = async () => {
    try {
      setIsLoading(true)
      // Validaciones basicas
      if (!profileData.name || !profileData.lastName || !profileData.email) {
        toast.error('Por favor completa todos los campos obligatorios')
        return
      }
      // Determinar el endpoint según el tipo de usuario
      let endpoint = ''
      if (user.userType === 'admin') {
        endpoint = `${API.replace('/api', '')}/api/admin/profile`
      } else if (user.userType === 'customer') {
        endpoint = `${API}/customers/${user.id}`
      } else {
        endpoint = `${API}/employees/${user.id}`
      }
      console.log('🔧 Endpoint final:', endpoint)
      console.log('🔧 User ID:', user.id)
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({name: profileData.name,
        lastName: profileData.lastName,
        email: profileData.email,
        phoneNumber: profileData.phoneNumber})
      })
      if (!response.ok) {
        throw new Error('Error al actualizar el perfil')
      }
      if (user.userType === 'admin') {
        const responseData = await response.json()
        // Actualizar contexto con datos de la respuesta
        const updatedUser = { 
          ...user, 
          name: profileData.name,
          lastName: profileData.lastName,
          profilePic: responseData.user?.profilePic || user.profilePic
        }
        localStorage.setItem("user", JSON.stringify(updatedUser))
        setUser(updatedUser)
      }
      toast.success('Perfil actualizado correctamente')
    } catch (error) {
      console.error('Error al actualizar perfil:', error)
      toast.error('Error al actualizar el perfil')
    } finally {
      setIsLoading(false)
    }
  }
  // Manejar cambio de contraseña
  const handlePasswordChange = async () => {
    try {
      // Validaciones
      if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
        toast.error('Por favor completa todos los campos de contraseña')
        return
      }
      if (passwordData.newPassword !== passwordData.confirmPassword) {
        toast.error('Las contraseñas nuevas no coinciden')
        return
      }
      if (passwordData.newPassword.length < 8) {
        toast.error('La nueva contraseña debe tener al menos 8 caracteres')
        return
      }
      setIsLoading(true)
      // Validar contraseña actual con el servidor
      let endpoint = ''
      let body = {}

      if (user.userType === 'admin') {
        endpoint = `${API.replace('/api', '')}/api/admin/profile/password`
        body = {
          currentPassword: passwordData.currentPassword,
          newPassword: passwordData.newPassword
        }
      } else {
        // Validar contraseña actual primero para no-admin
        const validateResponse = await fetch(`${API.replace('/api', '')}/api/validatePassword`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ currentPassword: passwordData.currentPassword })
        })
        if (!validateResponse.ok) {
          toast.error('Contraseña actual incorrecta')
          return
        }
        if (user.userType === 'customer') {
          endpoint = `${API}/customers/${user.userId || user.id}`
        } else {
          endpoint = `${API}/employees/${user.userId || user.id}`
        }
        body = { password: passwordData.newPassword }
      }
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(body)
      })
      if (!response.ok) {
        throw new Error('Error al cambiar la contraseña')
      }
      toast.success('Contraseña cambiada correctamente')
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch (error) {
      console.error('Error al cambiar contraseña:', error)
      toast.error('Error al cambiar la contraseña')
    } finally {
      setIsLoading(false)
    }
  }

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'security', label: 'Seguridad', icon: Shield },
    { id: 'preferences', label: 'Preferencias', icon: Palette }
  ]

  return (
    <div className={`p-6 min-h-screen font-[Alexandria] transition-colors duration-300 ${settings.theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>⚙️ Configuración</h1>
          <p className={settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}>Personaliza tu perfil y preferencias</p>
        </div>

        {/* Tabs */}
        <div className={`flex space-x-1 mb-8 p-1 rounded-lg ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? settings.theme === 'dark' 
                      ? 'bg-gray-700 text-[#E07A5F] shadow-sm' 
                      : 'bg-white text-[#E07A5F] shadow-sm'
                    : settings.theme === 'dark'
                      ? 'text-gray-300 hover:text-[#E07A5F]'
                      : 'text-gray-600 hover:text-[#E07A5F]'
                }`}>
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>

        {/* Contenido de las tabs */}
        <div className={`rounded-xl shadow-sm border overflow-hidden ${settings.theme === 'dark' ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Tab: Perfil */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Información del Perfil</h2>
              {/* Foto de perfil */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <div className="w-24 h-24 rounded-full overflow-hidden shadow-lg border-4 border-white">
                    {profileData.profilePic ? (
                      <img src={profileData.profilePic} alt="Perfil" className="w-full h-full object-cover"
                       onError={(e) => {
                          e.target.style.display = 'none'
                          e.target.nextSibling.style.display = 'flex'
                        }}/>
                    ) : null}
                    <div className={`w-full h-full bg-gradient-to-br from-[#E07A5F] to-[#F4A261] flex items-center justify-center text-white text-2xl font-bold ${profileData.profilePic ? 'hidden' : 'flex'}`} style={{ display: profileData.profilePic ? 'none' : 'flex' }}>
                      {`${profileData.name?.charAt(0) || user?.name?.charAt(0) || 'U'}${profileData.lastName?.charAt(0) || user?.lastName?.charAt(0) || ''}`}
                    </div>
                  </div>
                  <button onClick={() => fileInputRef.current?.click()} disabled={isLoading} className="absolute -bottom-2 -right-2 bg-[#E07A5F] text-white p-2 rounded-full hover:bg-[#D26B50] transition-colors shadow-lg disabled:opacity-50 group">
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"/>
                    ) : (
                      <Camera className="w-4 h-4 group-hover:scale-110 transition-transform"/>
                    )}
                  </button>
                  <input ref={fileInputRef} type="file" accept="image/*" onChange={handleImageUpload} className="hidden"/>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>
                    {profileData.name} {profileData.lastName}
                  </h3>
                  <p className={`capitalize ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>{user?.userType}</p>
                  <p className={`text-sm mt-1 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-500'}`}>Haz clic en el ícono de cámara para cambiar tu foto</p>
                </div>
              </div>
              {/* Formulario de perfil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="Tu nombre"/>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Apellido *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="text" value={profileData.lastName} onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="Tu apellido"/>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="email" value={profileData.email} onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="tu@email.com" disabled={user.userType === 'admin'}/>
                  </div>
                </div>
                {/* MOSTRAR TELÉFONO SOLO SI NO ES ADMIN */}
                {user.userType !== 'admin' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                      <input type="tel" value={profileData.phoneNumber} onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="0000-0000"/>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleProfileUpdate} disabled={isLoading} className="flex items-center space-x-2 bg-[#E07A5F] text-white px-6 py-3 rounded-lg hover:bg-[#D26B50] transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />
                <span>{isLoading ? 'Guardando...' : 'Guardar Cambios'}</span>
              </button>
            </div>
          )}

          {/* Tab: Seguridad */}
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Seguridad</h2>
              <div className={`border rounded-lg p-4 mb-6 ${settings.theme === 'dark' ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                <h3 className={`font-medium mb-2 ${settings.theme === 'dark' ? 'text-blue-300' : 'text-blue-800'}`}>Cambiar Contraseña</h3>
                <p className={`text-sm ${settings.theme === 'dark' ? 'text-blue-400' : 'text-blue-700'}`}>Asegúrate de usar una contraseña segura con al menos 8 caracteres.</p>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Contraseña Actual
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.current ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="Tu contraseña actual"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="Nueva contraseña (mín. 8 caracteres)"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${settings.theme === 'dark' ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="Confirma tu nueva contraseña"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${settings.theme === 'dark' ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handlePasswordChange} disabled={isLoading} className="flex items-center space-x-2 bg-[#E07A5F] text-white px-6 py-3 rounded-lg hover:bg-[#D26B50] transition-colors disabled:opacity-50">
                <Shield className="w-4 h-4" />
                <span>{isLoading ? 'Cambiando...' : 'Cambiar Contraseña'}</span>
              </button>
            </div>
          )}

          {/* Tab: Preferencias - AQUÍ ESTÁ TODA LA FUNCIONALIDAD NUEVA */}
          {activeTab === 'preferences' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Preferencias</h2>
              
              <div className="space-y-6">
                {/* Tema */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${settings.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    {settings.theme === 'light' ? 
                      <Sun className="w-5 h-5 text-yellow-500" /> : 
                      <Moon className="w-5 h-5 text-blue-400" />
                    }
                    <div>
                      <h3 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Tema</h3>
                      <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Claro u oscuro</p>
                    </div>
                  </div>
                  <select 
                    value={settings.theme} 
                    onChange={(e) => handleSettingChange('theme', e.target.value)} 
                    className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
                  >
                    <option value="light">☀️ Claro</option>
                    <option value="dark">🌙 Oscuro</option>
                  </select>
                </div>

                {/* Notificaciones */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${settings.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Notificaciones</h3>
                      <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Recibir notificaciones en la app</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        checked={settings.notifications} 
                        onChange={(e) => handleSettingChange('notifications', e.target.checked)} 
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E07A5F]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E07A5F]"></div>
                    </label>
                    {settings.notifications && (
                      <button 
                        onClick={showTestNotification}
                        className="ml-2 px-3 py-1 text-xs bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
                      >
                        Probar
                      </button>
                    )}
                  </div>
                </div>

                {/* Notificaciones por email */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${settings.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Notificaciones por Email</h3>
                      <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Recibir updates por correo</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input 
                      type="checkbox" 
                      checked={settings.emailNotifications} 
                      onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)} 
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E07A5F]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E07A5F]"></div>
                  </label>
                </div>

                {/* Idioma */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${settings.theme === 'dark' ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <div>
                      <h3 className={`font-medium ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>Idioma</h3>
                      <p className={`text-sm ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-500'}`}>Idioma de la interfaz</p>
                    </div>
                  </div>
                  <select 
                    value={settings.language} 
                    onChange={(e) => handleSettingChange('language', e.target.value)} 
                    className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${settings.theme === 'dark' ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}
                  >
                    <option value="es">🇪🇸 Español</option>
                    <option value="en">🇺🇸 English</option>
                  </select>
                </div>

                {/* Información del estado actual */}
                <div className={`p-4 rounded-lg border-l-4 border-l-[#E07A5F] ${settings.theme === 'dark' ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${settings.theme === 'dark' ? 'text-white' : 'text-[#7A6E6E]'}`}>📊 Estado Actual</h4>
                  <div className={`text-sm space-y-1 ${settings.theme === 'dark' ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>🎨 Tema: <span className="font-medium">{settings.theme === 'dark' ? 'Oscuro' : 'Claro'}</span></p>
                    <p>🔔 Notificaciones: <span className="font-medium">{settings.notifications ? 'Activadas' : 'Desactivadas'}</span></p>
                    <p>📧 Email: <span className="font-medium">{settings.emailNotifications ? 'Activado' : 'Desactivado'}</span></p>
                    <p>🌍 Idioma: <span className="font-medium">{settings.language === 'es' ? 'Español' : 'English'}</span></p>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-4">
                  <button 
                    onClick={resetPreferences}
                    className={`flex items-center space-x-2 px-4 py-2 border rounded-lg transition-colors ${
                      settings.theme === 'dark' 
                        ? 'border-gray-600 text-gray-300 hover:bg-gray-700' 
                        : 'border-gray-300 text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <span>🔄</span>
                    <span>Restablecer</span>
                  </button>
                </div>
              </div>

              {/* Tips */}
              <div className={`mt-8 p-4 border rounded-lg ${
                settings.theme === 'dark' 
                  ? 'bg-green-900/30 border-green-700' 
                  : 'bg-green-50 border-green-200'
              }`}>
                <p className={`text-sm ${
                  settings.theme === 'dark' ? 'text-green-300' : 'text-green-700'
                }`}>
                  💡 <strong>Tips:</strong>
                </p>
                <ul className={`text-sm mt-2 space-y-1 ${
                  settings.theme === 'dark' ? 'text-green-400' : 'text-green-600'
                }`}>
                  <li>• Las configuraciones se guardan automáticamente</li>
                  <li>• Puedes probar las notificaciones con el botón "Probar"</li>
                  <li>• El tema se aplica inmediatamente en toda la aplicación</li>
                  <li>• Usa "Restablecer" para volver a la configuración por defecto</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage