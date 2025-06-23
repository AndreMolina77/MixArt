import { useState, useRef, useEffect } from 'react'
import { useAuth } from '../../hooks/useAuth'
import { useLanguage, useTranslation } from '../../context/LanguageContext'
import { useEmailNotifications } from '../../hooks/useEmailNotifications.js'
import { useTheme } from '../../context/ThemeContext'
import { toast } from 'react-hot-toast'
import { User, Camera, Mail, Phone, Shield, Palette, Moon, Sun, Bell, Save, Eye, EyeOff } from 'lucide-react'

const SettingsPage = () => {
  const { user, API, setUser } = useAuth()
  const { isDarkMode, toggleDarkMode } = useTheme()
  const { language, changeLanguage } = useLanguage()
  const { t } = useTranslation()
  const { emailNotifications, loading: emailLoading, toggleEmailNotifications } = useEmailNotifications()
  const fileInputRef = useRef(null)
  // Estados para la informacion del perfil
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    profilePic: user?.profilePic || ''
  })
  // Estados para notificaciones del navegador
  const [browserNotifications, setBrowserNotifications] = useState('default')
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
  // Verificar estado de notificaciones del navegador
  useEffect(() => {
    if ('Notification' in window) {
      setBrowserNotifications(Notification.permission)
    }
  }, [])
  // Debug para verificar el estado
  useEffect(() => {
    console.log('🔔 Browser notifications state:', browserNotifications)
    console.log('🔔 Actual permission:', Notification.permission)
  }, [browserNotifications])
  // Manejar notificaciones del navegador
  const handleBrowserNotifications = async () => {
    if (!('Notification' in window)) {
      toast.error('Tu navegador no soporta notificaciones')
      return
    }
    if (Notification.permission === 'granted') {
      setBrowserNotifications('granted')
      new Notification('Notificaciones activadas', {
        body: 'Recibirás notificaciones importantes',
        
      })
    } else if (Notification.permission === 'denied') {
      toast.error('Las notificaciones están bloqueadas. Actívalas en la configuración del navegador.')
    } else {
      const permission = await Notification.requestPermission()
      setBrowserNotifications(permission)
      
      if (permission === 'granted') {
        toast.success('Notificaciones activadas')
        new Notification('¡Bienvenido!', {
          body: 'Las notificaciones han sido configuradas correctamente',
        })
      } else {
        toast.error('Permisos de notificación denegados')
      }
    }
  }
  // Funcion para mostrar notificacion de prueba (aqui se implementara notificaciones del sistema)
  const showTestNotification = () => {
    const isEdge = /Edg/.test(navigator.userAgent)
  
    if (isEdge) {
      toast.success('🔔 Edge detectado: Las notificaciones pueden no mostrarse en localhost. Revisa el centro de notificaciones de Windows o prueba en Chrome.')
      // Crear la notificación de todas formas
      new Notification('MixArt Test', { body: 'Prueba en Edge' })
    } else {
      // Código normal para otros navegadores
      new Notification('🎨 MixArt Test', {
        body: 'Esta es una notificación de prueba',
        icon: '/vite.svg'
      })
      toast.success('Notificación enviada')
    }
    /*
    console.log('🔔 Intentando mostrar notificación de prueba...')
    console.log('🔔 Notification support:', 'Notification' in window)
    console.log('🔔 Permission status:', Notification.permission)
    
    if (!('Notification' in window)) {
      toast.error('Tu navegador no soporta notificaciones')
      return
    }
    if (Notification.permission === 'granted') {
      try {
        const notification = new Notification('🎨 Notificación de prueba - MixArt', {
          body: 'Esta es una notificación de prueba. ¡Funciona correctamente!',
          icon: '/vite.svg',
          tag: 'test-notification',
          requireInteraction: false
        })
        console.log('🔔 Notificación creada:', notification)
        toast.success('Notificación enviada - revisa tu escritorio')
        // Auto-cerrar después de 5 segundos
        setTimeout(() => {
          notification.close()
        }, 5000)
        // Agregar al final de showTestNotification, despues de setTimeout:
        notification.onshow = () => {
          console.log('✅ Notificación MOSTRADA correctamente')
        }
        notification.onerror = (error) => {
          console.error('❌ Error al mostrar notificación:', error)
          toast.error('Error: La notificación fue bloqueada por el navegador')
        }
        notification.onclose = () => {
          console.log('🔔 Notificación cerrada')
        }
      } catch (error) {
        console.error('🔔 Error creando notificación:', error)
        toast.error('Error al crear la notificación: ' + error.message)
      }
    } else {
      console.log('🔔 Permisos no concedidos, status:', Notification.permission)
      toast.error('Las notificaciones no están activadas. Estado: ' + Notification.permission)
    } */
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
    // Validar tamaño (maximo 5MB)
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
      // Manejar la respuesta del servido segun el tipo de usuario
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
    <div className={`p-6 min-h-screen font-[Alexandria] transition-colors duration-300 ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className={`text-3xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>⚙️ {t('settings') || 'Configuración'}</h1>
          <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>{t('personalizeProfile') || 'Personaliza tu perfil y preferencias'}</p>
        </div>
        {/* Tabs */}
        <div className={`flex space-x-1 mb-8 p-1 rounded-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}`}>
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? isDarkMode 
                      ? 'bg-gray-700 text-[#E07A5F] shadow-sm' 
                      : 'bg-white text-[#E07A5F] shadow-sm'
                    : isDarkMode
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
        <div className={`rounded-xl shadow-sm border overflow-hidden ${isDarkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-gray-200'}`}>
          {/* Tab: Perfil */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('profileInformation') || 'Información del Perfil'}</h2>
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
                  <h3 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>
                    {profileData.name} {profileData.lastName}
                  </h3>
                  <p className={`capitalize ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{user?.userType}</p>
                  <p className={`text-sm mt-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t('clickCameraIcon') || 'Haz clic en el ícono de cámara para cambiar tu foto'}</p>
                </div>
              </div>
              {/* Formulario de perfil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('name') || 'Nombre'} *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder={t('yourName') || 'Tu nombre'}/>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('lastName') || 'Apellido'} *
                  </label>
                  <div className="relative">
                    <User className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="text" value={profileData.lastName} onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder={t('yourLastName') || 'Tu apellido'}/>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('email') || 'Email'} *
                  </label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type="email" value={profileData.email} onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="tu@email.com" disabled={user.userType === 'admin'}/>
                  </div>
                </div>
                {/* MOSTRAR TELÉFONO SOLO SI NO ES ADMIN */}
                {user.userType !== 'admin' && (
                  <div>
                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                      {t('phone') || 'Teléfono'}
                    </label>
                    <div className="relative">
                      <Phone className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                      <input type="tel" value={profileData.phoneNumber} onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))} className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder="0000-0000"/>
                    </div>
                  </div>
                )}
              </div>
              <button onClick={handleProfileUpdate} disabled={isLoading} className="flex items-center space-x-2 bg-[#E07A5F] text-white px-6 py-3 rounded-lg hover:bg-[#D26B50] transition-colors disabled:opacity-50">
                <Save className="w-4 h-4" />
                <span>{isLoading ? (t('saving') || 'Guardando...') : (t('saveChanges') || 'Guardar Cambios')}</span>
              </button>
            </div>
          )}
          {/* Tab: Seguridad */}
          {activeTab === 'security' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('security') || 'Seguridad'}</h2>
              <div className={`border rounded-lg p-4 mb-6 ${isDarkMode ? 'bg-blue-900/30 border-blue-700' : 'bg-blue-50 border-blue-200'}`}>
                <h3 className={`font-medium mb-2 ${isDarkMode ? 'text-blue-300' : 'text-blue-800'}`}>{t('changePassword') || 'Cambiar Contraseña'}</h3>
                <p className={`text-sm ${isDarkMode ? 'text-blue-400' : 'text-blue-700'}`}>{t('passwordRequirements') || 'Asegúrate de usar una contraseña segura con al menos 8 caracteres.'}</p>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('currentPassword') || 'Contraseña Actual'}
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.current ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder={t('yourCurrentPassword') || 'Tu contraseña actual'}/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('newPassword') || 'Nueva Contraseña'}
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder={t('newPasswordPlaceholder') || 'Nueva contraseña (mín. 8 caracteres)'}/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-200' : 'text-[#7A6E6E]'}`}>
                    {t('confirmPassword') || 'Confirmar Nueva Contraseña'}
                  </label>
                  <div className="relative">
                    <Shield className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`} />
                    <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))} className={`w-full pl-10 pr-12 py-3 border rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-700 border-gray-600 text-white' : 'border-gray-300'}`} placeholder={t('confirmPasswordPlaceholder') || 'Confirma tu nueva contraseña'}/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))} className={`absolute right-3 top-1/2 transform -translate-y-1/2 hover:text-gray-600 ${isDarkMode ? 'text-gray-400' : 'text-gray-400'}`}>
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              <button onClick={handlePasswordChange} disabled={isLoading} className="flex items-center space-x-2 bg-[#E07A5F] text-white px-6 py-3 rounded-lg hover:bg-[#D26B50] transition-colors disabled:opacity-50">
                <Shield className="w-4 h-4" />
                <span>{isLoading ? (t('changing') || 'Cambiando...') : (t('changePassword') || 'Cambiar Contraseña')}</span>
              </button>
            </div>
          )}
          {/* Tab: Preferencias */}
          {activeTab === 'preferences' && (
            <div className="p-6">
              <h2 className={`text-xl font-semibold mb-6 ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('preferences') || 'Preferencias'}</h2>
              <div className="space-y-6">
                {/* Tema */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    {isDarkMode ? 
                      <Moon className="w-5 h-5 text-blue-400" /> : 
                      <Sun className="w-5 h-5 text-yellow-500" />
                    }
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('theme') || 'Tema'}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('themeDescription') || 'Claro u oscuro'}</p>
                    </div>
                  </div>
                  <button onClick={toggleDarkMode} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ isDarkMode ? 'bg-[#E07A5F]' : 'bg-gray-300'}`}>
                    <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ isDarkMode ? 'translate-x-6' : 'translate-x-1' }`}/>
                  </button>
                </div>
                {/* Idioma */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('language') || 'Idioma'}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>{t('languageDescription') || 'Idioma de la interfaz'}</p>
                    </div>
                  </div>
                  <select value={language} onChange={(e) => changeLanguage(e.target.value)} className={`border rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent ${isDarkMode ? 'bg-gray-600 border-gray-500 text-white' : 'border-gray-300'}`}>
                    <option value="es">🇪🇸 {t('spanish') || 'Español'}</option>
                    <option value="en">🇺🇸 {t('english') || 'English'}</option>
                  </select>
                </div>
                {/* Notificaciones Email */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('emailNotifications') || 'Notificaciones por Email'}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {emailNotifications ? 
                          (t('emailNotificationsOn') || 'Recibirás notificaciones por email') : 
                          (t('emailNotificationsOff') || 'No recibirás notificaciones por email')
                        }
                      </p>
                    </div>
                  </div>
                  <button onClick={toggleEmailNotifications} disabled={emailLoading} className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${ emailNotifications ? 'bg-[#E07A5F]' : 'bg-gray-300' } ${emailLoading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${ emailNotifications ? 'translate-x-6' : 'translate-x-1' }`}/>
                  </button>
                </div>
                {/* Notificaciones del Navegador */}
                <div className={`flex items-center justify-between p-4 border rounded-lg ${isDarkMode ? 'border-gray-600 bg-gray-700' : 'border-gray-200'}`}>
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className={`font-medium ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>{t('browserNotifications') || 'Notificaciones del Navegador'}</h3>
                      <p className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-500'}`}>
                        {browserNotifications === 'granted' ? 
                          (t('browserNotificationsEnabled') || 'Notificaciones activadas') :
                          browserNotifications === 'denied' ?
                          (t('browserNotificationsBlocked') || 'Notificaciones bloqueadas') :
                          (t('browserNotificationsDisabled') || 'Notificaciones desactivadas')
                        }
                      </p>
                    </div>
                  </div>
                  <button onClick={browserNotifications === 'granted' ? showTestNotification : handleBrowserNotifications} className="px-4 py-2 bg-[#E07A5F] text-white text-sm rounded-lg hover:bg-[#E07A5F]/90 transition-colors">
                    {browserNotifications === 'granted' ? 
                      (t('testNotification') || 'Probar') :
                      (t('enableNotifications') || 'Activar')
                    }
                  </button>
                </div>
                {/* Informacion del estado actual */}
                <div className={`p-4 rounded-lg border-l-4 border-l-[#E07A5F] ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                  <h4 className={`font-medium mb-2 ${isDarkMode ? 'text-white' : 'text-[#7A6E6E]'}`}>📊 {t('currentStatus') || 'Estado Actual'}</h4>
                  <div className={`text-sm space-y-1 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                    <p>🎨 {t('theme') || 'Tema'}: <span className="font-medium">{isDarkMode ? (t('dark') || 'Oscuro') : (t('light') || 'Claro')}</span></p>
                    <p>🔔 {t('browserNotifications') || 'Notificaciones'}: <span className="font-medium">{browserNotifications === 'granted' ? (t('enabled') || 'Activadas') : (t('disabled') || 'Desactivadas')}</span></p>
                    <p>📧 {t('email') || 'Email'}: <span className="font-medium">{emailNotifications ? (t('enabled') || 'Activado') : (t('disabled') || 'Desactivado')}</span></p>
                    <p>🌍 {t('language') || 'Idioma'}: <span className="font-medium">{language === 'es' ? (t('spanish') || 'Español') : (t('english') || 'English')}</span></p>
                  </div>
                </div>
              </div>
              {/* Tips */}
              <div className={`mt-8 p-4 border rounded-lg ${ isDarkMode ? 'bg-green-900/30 border-green-700' : 'bg-green-50 border-green-200' }`}>
                <p className={`text-sm ${ isDarkMode ? 'text-green-300' : 'text-green-700' }`}>
                  💡 <strong>{t('tips') || 'Tips'}:</strong>
                </p>
                <ul className={`text-sm mt-2 space-y-1 ${ isDarkMode ? 'text-green-400' : 'text-green-600' }`}>
                  <li>• {t('tip1') || 'Las configuraciones se guardan automáticamente'}</li>
                  <li>• {t('tip2') || 'Puedes probar las notificaciones con el botón "Probar"'}</li>
                  <li>• {t('tip3') || 'El tema se aplica inmediatamente en toda la aplicación'}</li>
                  <li>• {t('tip4') || 'El idioma cambia toda la interfaz de usuario'}</li>
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