import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import BaseModal from './BaseModal'
import ItemsSelector from './ItemSelector'
import { Save, X, Upload, Eye, EyeOff } from 'lucide-react'
import { useState } from 'react'

const FormModal = ({isOpen, onClose, onSubmit, title, fields, initialData = {}, isLoading = false, submitButtonText = 'Guardar', customersData, articlesData, artPiecesData, ordersData}) => {
  const [showPasswords, setShowPasswords] = useState({})
  const [dynamicOptions, setDynamicOptions] = useState({})
  // Configurar react-hook-form
  const { register, handleSubmit, formState: { errors }, reset, watch, setValue } = useForm({
    mode: 'onChange', // Validar en tiempo real
    defaultValues: {}
  })
  // Inicializar formulario cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      console.log('🚀 === INICIALIZANDO REACT HOOK FORM ===')
      console.log('📦 Initial data:', initialData)
      
      const defaultValues = {}
      fields.forEach(field => {
        const initialValue = initialData[field.name]
        if (field.type === 'checkbox') {
          defaultValues[field.name] = Boolean(initialValue)
        } else if (field.type === 'number') {
          defaultValues[field.name] = initialValue !== undefined ? Number(initialValue) : ''
        } else {
          defaultValues[field.name] = initialValue || ''
        }
      })
      console.log('🔄 Resetting form with:', defaultValues)
      reset(defaultValues)
      setShowPasswords({})
    }
  }, [isOpen]) // Solo depende de isOpen - NUNCA fields o initialData
  // Manejar cambios en el tipo de item seleccionado para mostrar opciones dinámicas
  useEffect(() => {
    // Manejar opciones dinámicas para reseñas
    const watchedItemType = watch('itemType')
    if (watchedItemType) {
      const newOptions = {}
      
      if (watchedItemType === 'Article' && articlesData?.articles) {
        newOptions.itemId = articlesData.articles.map(article => ({
          value: article._id,
          label: article.articleName
        }))
      } else if (watchedItemType === 'ArtPiece' && artPiecesData?.artPieces) {
        newOptions.itemId = artPiecesData.artPieces.map(artPiece => ({
          value: artPiece._id,
          label: artPiece.artPieceName
        }))
      }
      
      setDynamicOptions(newOptions)
    }
  }, [watch('itemType'), articlesData?.articles, artPiecesData?.artPieces])
  // Manejar envio del formulario
  const onFormSubmit = (data) => {
    console.log('✅ === FORM ENVIADO CON REACT HOOK FORM ===')
    console.log('📤 Data:', data)
    onSubmit(data)
  }
  // Obtener reglas de validacion para cada campo
  const getValidationRules = (field) => {
    const rules = {}
    if (field.required && field.type !== 'checkbox') {
      rules.required = `${field.label} es requerido`
    }
    if (field.type === 'email') {
      rules.pattern = {
        value: /\S+@\S+\.\S+/,
        message: 'Email inválido'
      }
    }
    if (field.type === 'tel') {
      rules.pattern = {
        value: /^\d{8,}$/,
        message: 'Teléfono debe tener al menos 8 dígitos'
      }
      rules.setValueAs = (value) => value.replace(/\D/g, '') // Limpiar caracteres no numericos
    }
    if (field.type === 'number') {
      rules.min = {
        value: field.min || 0,
        message: `Debe ser mayor o igual a ${field.min || 0}`
      }
      if (field.max) {
        rules.max = {
          value: field.max,
          message: `Debe ser menor o igual a ${field.max}`
        }
      }
      rules.setValueAs = (value) => value === '' ? '' : Number(value)
    }
    if (field.minLength) {
      rules.minLength = {
        value: field.minLength,
        message: `Mínimo ${field.minLength} caracteres`
      }
    }
    if (field.maxLength) {
      rules.maxLength = {
        value: field.maxLength,
        message: `Máximo ${field.maxLength} caracteres`
      }
    }
    return rules
  }
  // Renderizar campo segun tipo
  const renderField = (field) => {
    const hasError = errors[field.name]
    const validation = getValidationRules(field)

    const baseInputClasses = `w-full px-3 py-2 border rounded-lg font-[Alexandria] transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] ${
      hasError 
        ? 'border-red-300 bg-red-50 focus:border-red-500' 
        : 'border-gray-300 bg-white focus:border-[#E07A5F]'
    }`
    switch (field.type) {
      case 'textarea':
        return (
          <textarea {...register(field.name, validation)} placeholder={field.placeholder} rows={field.rows || 3} className={`${baseInputClasses} resize-none`} disabled={isLoading}/>
        )
      case 'select':
        // Usar opciones dinámicas si existen, sino usar las opciones del campo
        let selectOptions = dynamicOptions[field.name] || field.options || []
        // Asegurarse de que selectOptions sea un array
        if (!Array.isArray(selectOptions)) {
          selectOptions = []
        }
        return (
          <select {...register(field.name, validation)} className={baseInputClasses} disabled={isLoading}>
            <option value="">Seleccionar {field.label}</option>
            {selectOptions.map(option => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        )
      case 'file':
        return (
          <div className="relative">
            <input {...register(field.name, validation)} type="file" accept={field.accept} className="hidden" id={`file-${field.name}`} disabled={isLoading}/>
            <label htmlFor={`file-${field.name}`} className={`${baseInputClasses} cursor-pointer flex items-center justify-center space-x-2 hover:bg-gray-50`}>
              <Upload className="w-4 h-4 text-gray-500" />
              <span className="text-gray-500">
                {watch(field.name)?.[0]?.name || field.placeholder || 'Seleccionar archivo'}
              </span>
            </label>
          </div>
        )
      case 'password':
        return (
          <div className="relative">
            <input {...register(field.name, validation)} type={showPasswords[field.name] ? 'text' : 'password'} placeholder={field.placeholder} className={`${baseInputClasses} pr-10`} disabled={isLoading}/>
            <button type="button" onClick={() => setShowPasswords(prev => ({...prev, [field.name]: !prev[field.name] }))} className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
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
            <input {...register(field.name)} type="checkbox" className="w-4 h-4 text-[#E07A5F] border-gray-300 rounded focus:ring-[#E07A5F]" disabled={isLoading}/>
            <span className="text-sm text-gray-600">{field.checkboxLabel || field.label}</span>
          </div>
        )
      case 'number':
        return (
          <input {...register(field.name, validation)} type="number" placeholder={field.placeholder} className={baseInputClasses} disabled={isLoading} min={field.min} max={field.max} step={field.step || 'any'}/>
        )
      case 'items':
        return (
          <ItemsSelector value={watch(field.name) || []}
            onChange={(items) => {
              // Usar setValue directamente del hook useForm
              setValue(field.name, items, { shouldValidate: true })
            }}
            onTotalChange={(total) => {
              // Actualizar el total automáticamente
              setValue('total', total, { shouldValidate: true })
            }} articlesData={articlesData} artPiecesData={artPiecesData} disabled={isLoading}/>
        )
      default:
        return (
          <input {...register(field.name, validation)} type={field.type || 'text'} placeholder={field.placeholder} className={baseInputClasses} disabled={isLoading}/>
        )
    }
  }
  // Procesar datos antes de enviar (para archivos)
  const processFormData = (data) => {
    const processedData = { ...data }
    // Procesar archivos
    fields.forEach(field => {
      if (field.type === 'file' && data[field.name]) {
        // Si es un FileList, tomar el primer archivo
        if (data[field.name] instanceof FileList) {
          processedData[field.name] = data[field.name][0] || null
        }
      }
    })
    return processedData
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <form onSubmit={handleSubmit((data) => onFormSubmit(processFormData(data)))} className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {fields.map((field) => (
            <div key={field.name} className={field.fullWidth ? 'md:col-span-2' : ''}>
              <label className="block text-sm font-medium text-[#7A6E6E] mb-2 font-[Alexandria]">
                {field.label}
                {field.required && <span className="text-red-500 ml-1">*</span>}
              </label>
              {renderField(field)}
              {errors[field.name] && (
                <p className="mt-1 text-sm text-red-600 font-[Alexandria]">
                  {errors[field.name]?.message}
                </p>
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