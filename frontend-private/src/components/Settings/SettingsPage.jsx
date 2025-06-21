import { useState, useRef } from 'react'
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
  // Estados para configuraciones
  const [settings, setSettings] = useState({
    theme: 'light',
    notifications: true,
    emailNotifications: true,
    language: 'es'
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
    <div className="p-6 bg-white min-h-screen font-[Alexandria]">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#7A6E6E] mb-2">⚙️ Configuración</h1>
          <p className="text-gray-600">Personaliza tu perfil y preferencias</p>
        </div>
        {/* Tabs */}
        <div className="flex space-x-1 mb-8 bg-gray-100 p-1 rounded-lg">
          {tabs.map(tab => {
            const IconComponent = tab.icon
            return (
              <button key={tab.id} onClick={() => setActiveTab(tab.id)} className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-all flex-1 justify-center ${
                  activeTab === tab.id
                    ? 'bg-white text-[#E07A5F] shadow-sm'
                    : 'text-gray-600 hover:text-[#E07A5F]'
                }`}>
                <IconComponent className="w-4 h-4" />
                <span className="font-medium">{tab.label}</span>
              </button>
            )
          })}
        </div>
        {/* Contenido de las tabs */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Tab: Perfil */}
          {activeTab === 'profile' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#7A6E6E] mb-6">Información del Perfil</h2>
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
                  <h3 className="text-lg font-semibold text-[#7A6E6E]">
                    {profileData.name} {profileData.lastName}
                  </h3>
                  <p className="text-gray-600 capitalize">{user?.userType}</p>
                  <p className="text-sm text-gray-500 mt-1">Haz clic en el ícono de cámara para cambiar tu foto</p>
                </div>
              </div>
              {/* Formulario de perfil */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" value={profileData.name} onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="Tu nombre"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Apellido *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" value={profileData.lastName} onChange={(e) => setProfileData(prev => ({ ...prev, lastName: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="Tu apellido"/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="email" value={profileData.email} onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="tu@email.com" disabled={user.userType === 'admin'}/>
                  </div>
                </div>
                {/* MOSTRAR TELÉFONO SOLO SI NO ES ADMIN */}
                {user.userType !== 'admin' && (
                  <div>
                    <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                      Teléfono
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <input type="tel" value={profileData.phoneNumber} onChange={(e) => setProfileData(prev => ({ ...prev, phoneNumber: e.target.value }))} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="0000-0000"/>
                    </div>
                  </div> )}
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
              <h2 className="text-xl font-semibold text-[#7A6E6E] mb-6">Seguridad</h2>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                <h3 className="font-medium text-blue-800 mb-2">Cambiar Contraseña</h3>
                <p className="text-sm text-blue-700">Asegúrate de usar una contraseña segura con al menos 8 caracteres.</p>
              </div>
              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Contraseña Actual
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showPasswords.current ? 'text' : 'password'} value={passwordData.currentPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="Tu contraseña actual"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showPasswords.new ? 'text' : 'password'} value={passwordData.newPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="Nueva contraseña (mín. 8 caracteres)"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#7A6E6E] mb-2">
                    Confirmar Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showPasswords.confirm ? 'text' : 'password'} value={passwordData.confirmPassword} onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent" placeholder="Confirma tu nueva contraseña"/>
                    <button type="button" onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
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
          {/* Tab: Preferencias */}
          {activeTab === 'preferences' && (
            <div className="p-6">
              <h2 className="text-xl font-semibold text-[#7A6E6E] mb-6">Preferencias</h2>
              <div className="space-y-6">
                {/* Tema */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    {settings.theme === 'light' ? 
                      <Sun className="w-5 h-5 text-yellow-500" /> : 
                      <Moon className="w-5 h-5 text-blue-500" />
                    }
                    <div>
                      <h3 className="font-medium text-[#7A6E6E]">Tema</h3>
                      <p className="text-sm text-gray-500">Claro u oscuro</p>
                    </div>
                  </div>
                  <select value={settings.theme} onChange={(e) => setSettings(prev => ({ ...prev, theme: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                  </select>
                </div>
                {/* Notificaciones */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-500" />
                    <div>
                      <h3 className="font-medium text-[#7A6E6E]">Notificaciones</h3>
                      <p className="text-sm text-gray-500">Recibir notificaciones en la app</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.notifications} onChange={(e) => setSettings(prev => ({ ...prev, notifications: e.target.checked }))} className="sr-only peer"/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E07A5F]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E07A5F]"></div>
                  </label>
                </div>
                {/* Notificaciones por email */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-500" />
                    <div>
                      <h3 className="font-medium text-[#7A6E6E]">Notificaciones por Email</h3>
                      <p className="text-sm text-gray-500">Recibir updates por correo</p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" checked={settings.emailNotifications} onChange={(e) => setSettings(prev => ({ ...prev, emailNotifications: e.target.checked }))} className="sr-only peer"/>
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#E07A5F]/25 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#E07A5F]"></div>
                  </label>
                </div>
                {/* Idioma */}
                <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Palette className="w-5 h-5 text-purple-500" />
                    <div>
                      <h3 className="font-medium text-[#7A6E6E]">Idioma</h3>
                      <p className="text-sm text-gray-500">Idioma de la interfaz</p>
                    </div>
                  </div>
                  <select value={settings.language} onChange={(e) => setSettings(prev => ({ ...prev, language: e.target.value }))} className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                  </select>
                </div>
              </div>
              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-700">
                  💡 <strong>Tip:</strong> Estas configuraciones se guardan automáticamente cuando las cambias.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
export default SettingsPage