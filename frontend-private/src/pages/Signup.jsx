import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { ArrowLeft, User, Mail, Phone, Shield, Eye, EyeOff } from 'lucide-react'

const RegisterEmployee = ({ onBack = () => {}, onSuccess = () => {} }) => {
  const [formData, setFormData] = useState({
    name: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    userType: '',
    issNumber: '',
    isVerified: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }
  const validateForm = () => {
    const { name, lastName, username, email, password, confirmPassword, phoneNumber, userType, issNumber } = formData

    if (!name || !lastName || !username || !email || !password || !phoneNumber || !userType || !issNumber) {
      toast.error('Todos los campos marcados con * son obligatorios')
      return false
    }
    if (password !== confirmPassword) {
      toast.error('Las contraseñas no coinciden')
      return false
    }
    if (password.length < 8) {
      toast.error('La contraseña debe tener al menos 8 caracteres')
      return false
    }
    if (!email.includes('@')) {
      toast.error('El email no es válido')
      return false
    }
    if (phoneNumber.length < 8) {
      toast.error('El teléfono debe tener al menos 8 dígitos')
      return false
    }
    if (issNumber.length !== 11) {
      toast.error('El número de DUI debe tener 11 dígitos')
      return false
    }
    if (!['vendedor', 'artista'].includes(userType)) {
      toast.error('Debe seleccionar un tipo de usuario válido')
      return false
    }
    return true
  }
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!validateForm()) return

    setIsLoading(true)
    try {
      const response = await fetch('http://localhost:4000/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          name: formData.name,
          lastName: formData.lastName,
          username: formData.username,
          email: formData.email,
          password: formData.password,
          phoneNumber: formData.phoneNumber,
          userType: formData.userType,
          issNumber: formData.issNumber,
          isVerified: formData.isVerified
        })
      })
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message || 'Error al registrar empleado')
      }
      toast.success('Empleado registrado exitosamente')
      // Limpiar formulario
      setFormData({
        name: '',
        lastName: '',
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        phoneNumber: '',
        userType: '',
        issNumber: '',
        isVerified: false
      })
      // Ejecutar callback de éxito
      setTimeout(() => {
        onSuccess()
      }, 2000)
    } catch (error) {
      console.error('Error:', error)
      toast.error(error.message || 'Error al registrar empleado')
    } finally {
      setIsLoading(false)
    }
  }
  const userTypeOptions = [
    {
      value: 'vendedor',
      label: 'Vendedor',
      description: 'Acceso a artículos, piezas de arte, categorías, pedidos, reseñas, ventas y proveedores',
      icon: '💼'
    },
    {
      value: 'artista',
      label: 'Artista', 
      description: 'Acceso a piezas de arte, categorías, pedidos, reseñas y ventas',
      icon: '🎨'
    }
  ]
  return (
    <div className="min-h-screen bg-[#F4F1DE] font-[Alexandria]">
      {/* Header */}
      <div className="bg-[#A9A9A9] p-4 flex items-center justify-between shadow-md">
        <button onClick={onBack} className="flex items-center text-black hover:text-gray-700 transition-colors">
          <ArrowLeft className="w-5 h-5 mr-2" />
          <span className="font-medium">Volver al Dashboard</span>
        </button>
        
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
            <span className="text-white font-bold text-sm">M</span>
          </div>
          <span className="text-black font-bold text-lg">MixArt</span>
        </div>
      </div>
      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header Card */}
          <div className="bg-gradient-to-r from-[#E07A5F] to-[#F4A261] p-8 text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
              <User className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">Registrar Nuevo Empleado</h1>
            <p className="text-white/90 text-lg">Agrega un nuevo miembro al equipo de MixArt</p>
          </div>
          {/* Form */}
          <div className="p-8">
            <div className="space-y-6">
              {/* Informacion Personal */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Nombre *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="Ingresa el nombre" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Apellido *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="Ingresa el apellido" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Nombre de Usuario *
                  </label>
                  <input type="text" name="username" value={formData.username} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="Nombre de usuario único" required/>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Número de DUI *
                  </label>
                  <input type="text" name="issNumber"value={formData.issNumber} onChange={handleInputChange} className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="00000000-0" maxLength={11} required/>
                </div>
              </div>
              {/* Informacion de Contacto */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Correo Electrónico *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="correo@ejemplo.com" required/>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Teléfono *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange} className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="0000-0000" required/>
                  </div>
                </div>
              </div>
              {/* Contraseñas */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Contraseña *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showPassword ? "text" : "password"} name="password" value={formData.password} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="Mínimo 8 caracteres" required/>
                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-[#7A6E6E] mb-2">
                    Confirmar Contraseña *
                  </label>
                  <div className="relative">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input type={showConfirmPassword ? "text" : "password"} name="confirmPassword" value={formData.confirmPassword} onChange={handleInputChange} className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors" placeholder="Confirma la contraseña" required/>
                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                      {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
              </div>
              {/* Tipo de Usuario */}
              <div>
                <label className="block text-sm font-semibold text-[#7A6E6E] mb-4">
                  Tipo de Usuario *
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userTypeOptions.map((option) => (
                    <label key={option.value} className={`relative flex flex-col p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.userType === option.value 
                          ? 'border-[#E07A5F] bg-[#E07A5F]/5 shadow-md' 
                          : 'border-gray-300 hover:border-[#E07A5F]/50 hover:bg-gray-50'
                      }`}>
                      <input type="radio" name="userType" value={option.value} checked={formData.userType === option.value} onChange={handleInputChange} className="sr-only"/>
                      <div className="flex items-center mb-2">
                        <span className="text-2xl mr-3">{option.icon}</span>
                        <span className="font-semibold text-[#7A6E6E]">{option.label}</span>
                        {formData.userType === option.value && (
                          <div className="ml-auto w-5 h-5 bg-[#E07A5F] rounded-full flex items-center justify-center">
                            <div className="w-2 h-2 bg-white rounded-full"></div>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-600">{option.description}</p>
                    </label>
                  ))}
                </div>
              </div>
              {/* Verificacion */}
              <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <input type="checkbox" name="isVerified" checked={formData.isVerified} onChange={handleInputChange} className="w-4 h-4 text-[#E07A5F] bg-white border-gray-300 rounded focus:ring-[#E07A5F] focus:ring-2"/>
                <label className="text-sm text-[#7A6E6E]">
                  Marcar como empleado verificado (recomendado para empleados de confianza)
                </label>
              </div>
              {/* Botones */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <button type="button" onClick={onBack} className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Cancelar
                </button>
                <button type="button" onClick={handleSubmit} disabled={isLoading} className={`flex-1 px-6 py-3 bg-[#E07A5F] text-white rounded-lg font-medium transition-all ${
                    isLoading 
                      ? 'opacity-50 cursor-not-allowed' 
                      : 'hover:bg-[#D26B50] hover:shadow-lg transform hover:-translate-y-0.5'}`}>
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                      Registrando...
                    </div>
                  ) : (
                    'Registrar Empleado')}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Info Footer */}
        <div className="mt-8 bg-white/70 rounded-xl p-6 border border-gray-200">
          <h3 className="font-semibold text-[#7A6E6E] mb-3">ℹ️ Información sobre roles:</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-[#E07A5F]">Vendedor:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Gestionar artículos y stock</li>
                <li>Crear y administrar piezas de arte</li>
                <li>Procesar pedidos y ventas</li>
                <li>Gestionar proveedores</li>
                <li>Ver reportes de ventas</li>
              </ul>
            </div>
            <div>
              <strong className="text-[#E07A5F]">Artista:</strong>
              <ul className="list-disc list-inside mt-1 space-y-1">
                <li>Subir y gestionar sus obras</li>
                <li>Categorizar piezas de arte</li>
                <li>Ver sus ventas y comisiones</li>
                <li>Responder a reseñas</li>
                <li>Acceso limitado a datos</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default RegisterEmployee