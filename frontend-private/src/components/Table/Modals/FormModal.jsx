import { useState, useEffect } from 'react'
import BaseModal from './BaseModal'
import { Save, X, Upload, Eye, EyeOff } from 'lucide-react'

const FormModal = ({ isOpen, onClose, onSubmit, title, fields, initialData = {}, isLoading = false, submitButtonText = 'Guardar'}) => {
  const [formData, setFormData] = useState({})
  const [errors, setErrors] = useState({})
  const [showPasswords, setShowPasswords] = useState({})
  // Inicializar datos del formulario
  useEffect(() => {
    if (isOpen) {
      const initialFormData = {}
      fields.forEach(field => {
        initialFormData[field.name] = initialData[field.name] || ''
      })
      setFormData(initialFormData)
      setErrors({})
      setShowPasswords({})
    }
  }, [isOpen, fields, initialData])
  // Validar campo individual
  const validateField = (field, value) => {
    let error = ''
    // Validar campo segun su tipo
    if (field.required && (!value || value.toString().trim() === '')) {
      error = `${field.label} es requerido`
    } else if (field.type === 'email' && value && !/\S+@\S+\.\S+/.test(value)) {
      error = 'Email inválido'
    } else if (field.type === 'tel' && value && !/^\d{8,}$/.test(value.replace(/\D/g, ''))) {
      error = 'Teléfono debe tener al menos 8 dígitos'
    } else if (field.type === 'number' && value && (isNaN(value) || Number(value) < 0)) {
      error = 'Debe ser un número válido mayor o igual a 0'
    } else if (field.minLength && value && value.length < field.minLength) {
      error = `Mínimo ${field.minLength} caracteres`
    } else if (field.maxLength && value && value.length > field.maxLength) {
      error = `Máximo ${field.maxLength} caracteres`
    } 
    return error
  }
  // Manejar cambios en los campos
  const handleInputChange = (fieldName, value) => {
    setFormData(prev => ({
      ...prev,
      [fieldName]: value
    }))
    // Validar en tiempo real
    const field = fields.find(f => f.name === fieldName)
    if (field) {
      const error = validateField(field, value)
      setErrors(prev => ({
        ...prev,
        [fieldName]: error
      }))
    }
  }
  // Validar todo el formulario
  const validateForm = () => {
    const newErrors = {}
    let isValid = true
    
    fields.forEach(field => {
      const error = validateField(field, formData[field.name])
      if (error) {
        newErrors[field.name] = error
        isValid = false
      }
    })
    setErrors(newErrors)
    return isValid
  }
  // Enviar formulario
  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (validateForm()) {
      onSubmit(formData)
    }
  }
  // Renderizar campo según tipo
  const renderField = (field) => {
    const hasError = errors[field.name]
    const value = formData[field.name] || ''

    const baseInputClasses = `w-full px-3 py-2 border rounded-lg font-[Alexandria] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] ${
      hasError 
        ? 'border-red-300 bg-red-50 focus:border-red-500' 
        : 'border-gray-300 bg-white focus:border-[#E07A5F]'
    }`
    switch (field.type) {
      case 'textarea':
        return (
          <textarea value={value} onChange={(e) => handleInputChange(field.name, e.target.value)} placeholder={field.placeholder} rows={field.rows || 3} className={`${baseInputClasses} resize-none`} disabled={isLoading}/>
        )
      case 'select':
        return (
          <select value={value} onChange={(e) => handleInputChange(field.name, e.target.value)} className={baseInputClasses} disabled={isLoading}>
            <option value="">Seleccionar {field.label}</option>
            {field.options?.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'file':
        return (
          <div className="relative">
            <input type="file" onChange={(e) => handleInputChange(field.name, e.target.files[0])} accept={field.accept} className="hidden" id={`file-${field.name}`} disabled={isLoading}/>
            <label htmlFor={`file-${field.name}`} className={`${baseInputClasses} cursor-pointer flex items-center justify-center space-x-2 hover:bg-gray-50`}>
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">
                {value ? value.name || 'Archivo seleccionado' : field.placeholder || 'Seleccionar archivo'}
              </span>
            </label>
          </div>
        )
      case 'password':
        return (
          <div className="relative">
            <input type={showPasswords[field.name] ? 'text' : 'password'} value={value} onChange={(e) => handleInputChange(field.name, e.target.value)} placeholder={field.placeholder}
              className={`${baseInputClasses} pr-10`} disabled={isLoading}/>
            <button type="button" onClick={() => setShowPasswords(prev => ({
                ...prev,
                [field.name]: !prev[field.name]
              }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              {showPasswords[field.name] ? 
                <EyeOff className="w-4 h-4" /> : 
                <Eye className="w-4 h-4" />
              }
            </button>
          </div>
        )
      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <input type="checkbox" checked={Boolean(value)} onChange={(e) => handleInputChange(field.name, e.target.checked)} className="w-4 h-4 text-[#E07A5F] border-gray-300 rounded focus:ring-[#E07A5F]" disabled={isLoading}/>
            <span className="text-sm text-gray-600">{field.checkboxLabel || field.label}</span>
          </div>
        )
      default:
        return (
          <input type={field.type || 'text'} value={value} onChange={(e) => handleInputChange(field.name, e.target.value)} placeholder={field.placeholder} className={baseInputClasses} disabled={isLoading} min={field.type === 'number' ? field.min : undefined} max={field.type === 'number' ? field.max : undefined} step={field.type === 'number' ? field.step : undefined}/>
        )
    }
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-[#7A6E6E] mb-2 font-[Alexandria]">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>

              {renderField(field)}
              
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600 font-[Alexandria]">{errors[field.name]}</p>
              )}
              {field.helperText && !errors[field.name] && (
                <p className="mt-1 text-sm text-gray-500 font-[Alexandria]">{field.helperText}</p>
              )}
            </div>
          ))}
        </div>
        {/* Botones */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
          <button type="button" onClick={onClose} disabled={isLoading} className="px-4 py-2 text-[#7A6E6E] border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-[Alexandria] disabled:opacity-50">
            <X className="w-4 h-4 inline mr-2" />
            Cancelar
          </button>
          <button type="submit" disabled={isLoading} className="px-4 py-2 bg-[#E07A5F] text-white rounded-lg hover:bg-[#E07A5F]/90 transition-colors duration-200 font-[Alexandria] disabled:opacity-50 flex items-center">
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2" />
                Guardando...
              </>
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                {submitButtonText}
              </>
            )}
          </button>
        </div>
      </form>
    </BaseModal>
  )
}
export default FormModal