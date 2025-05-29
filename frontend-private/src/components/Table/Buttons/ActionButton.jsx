import { Plus, Edit, Trash2, Eye, Mail, Download, Filter } from 'lucide-react'

const ActionButton = ({variant = "primary", size = "md", icon, children, onClick, disabled = false, loading = false, className = "", ...props }) => {
  
  // Configuracion de iconos por defecto segun la variante
  const getDefaultIcon = () => {
    switch (variant) {
      case 'add': return Plus
      case 'edit': return Edit
      case 'delete': return Trash2
      case 'view': return Eye
      case 'email': return Mail
      case 'export': return Download
      case 'filter': return Filter
      default: return null
    }
  }

  // Configuración de estilos por variant
  const getVariantStyles = () => {
    switch (variant) {
      case 'primary':
      case 'add':
        return 'bg-[#E07A5F] border-[#E07A5F] text-white hover:bg-transparent hover:text-[#E07A5F] focus:ring-[#E07A5F]/20'
      case 'secondary':
        return 'bg-[#81B29A] border-[#81B29A] text-white hover:bg-transparent hover:text-[#81B29A] focus:ring-[#81B29A]/20'
      case 'edit':
        return 'bg-blue-600 border-blue-600 text-white hover:bg-transparent hover:text-blue-600 focus:ring-blue-500/20'
      case 'delete':
        return 'bg-red-600 border-red-600 text-white hover:bg-transparent hover:text-red-600 focus:ring-red-500/20'
      case 'view':
        return 'bg-gray-600 border-gray-600 text-white hover:bg-transparent hover:text-gray-600 focus:ring-gray-500/20'
      case 'outline':
        return 'bg-transparent border-[#7A6E6E] text-[#7A6E6E] hover:bg-[#7A6E6E] hover:text-white focus:ring-[#7A6E6E]/20'
      case 'ghost':
        return 'bg-transparent border-transparent text-[#7A6E6E] hover:bg-[#7A6E6E]/10 hover:border-[#7A6E6E]/20 focus:ring-[#7A6E6E]/20'
      default:
        return 'bg-[#E07A5F] border-[#E07A5F] text-white hover:bg-transparent hover:text-[#E07A5F] focus:ring-[#E07A5F]/20'
    }
  }

  // Configuración de tamaños
  const getSizeStyles = () => {
    switch (size) {
      case 'xs':
        return 'px-2 py-1 text-xs'
      case 'sm':
        return 'px-3 py-1.5 text-sm'
      case 'md':
        return 'px-4 py-2 text-sm'
      case 'lg':
        return 'px-6 py-3 text-base'
      case 'xl':
        return 'px-8 py-4 text-lg'
      default:
        return 'px-4 py-2 text-sm'
    }
  }

  const IconComponent = icon || getDefaultIcon()
  const variantStyles = getVariantStyles()
  const sizeStyles = getSizeStyles()

  return (
    <button
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        inline-flex items-center justify-center gap-2 
        font-[Alexandria] font-medium
        border-2 rounded-lg
        transition-all duration-300
        focus:outline-none focus:ring-2 focus:ring-offset-2
        disabled:opacity-50 disabled:cursor-not-allowed
        transform hover:scale-105 active:scale-95
        shadow-sm hover:shadow-md
        ${variantStyles}
        ${sizeStyles}
        ${className}
      `}
      {...props}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
          <span>Cargando...</span>
        </>
      ) : (
        <>
          {IconComponent && <IconComponent className="w-4 h-4 flex-shrink-0" />}
          {children && <span>{children}</span>}
        </>
      )}
    </button>
  )
}
export default ActionButton