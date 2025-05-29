import { AlertTriangle, Trash2, X } from 'lucide-react'
import BaseModal from './BaseModal'

const ConfirmModal = ({isOpen, onClose, onConfirm, 
  title = "Confirmar acción",
  message = "¿Estás seguro de que quieres realizar esta acción?",
  confirmText = "Confirmar", cancelText = "Cancelar", type = "danger", // danger, warning, info
  isLoading = false, icon: CustomIcon
}) => {
  const getTypeStyles = () => {
    switch (type) {
      case 'danger':
        return {
          iconBg: 'bg-red-100',
          iconColor: 'text-red-600',
          confirmButton: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
          defaultIcon: Trash2
        }
      case 'warning':
        return {
          iconBg: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          confirmButton: 'bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500',
          defaultIcon: AlertTriangle
        }
      case 'info':
        return {
          iconBg: 'bg-blue-100',
          iconColor: 'text-blue-600',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
          defaultIcon: AlertTriangle
        }
      default:
        return {
          iconBg: 'bg-gray-100',
          iconColor: 'text-gray-600',
          confirmButton: 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500',
          defaultIcon: AlertTriangle
        }
    }
  }
  const styles = getTypeStyles()
  const IconComponent = CustomIcon || styles.defaultIcon

  const handleConfirm = async () => {
    if (onConfirm) {
      await onConfirm()
    }
  }
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} maxWidth="md">
      <div className="p-6 font-[Alexandria]">
        {/* Header con icono */}
        <div className="flex items-center justify-center mb-6">
          <div className={`p-3 rounded-full ${styles.iconBg} ${styles.iconColor}`}>
            <IconComponent className="w-8 h-8" />
          </div>
        </div>
        {/* Titulo y mensaje */}
        <div className="text-center mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-3">{title}</h2>
          <p className="text-gray-600 leading-relaxed">{message}</p>
        </div>
        {/* Botones de accion */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
          {/* Boton cancelar */}
          <button type="button" onClick={onClose} disabled={isLoading} className="flex-1 px-4 py-3 text-gray-700 bg-white border-2 border-gray-300 rounded-lg font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed">
            {cancelText}
          </button>
          {/* Botón confirmar */}
          <button type="button" onClick={handleConfirm} disabled={isLoading} className={`flex-1 px-4 py-3 text-white font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${styles.confirmButton}`}>
            {isLoading ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Procesando...</span>
              </div>
            ) : (
              confirmText
            )}
          </button>
        </div>
      </div>
    </BaseModal>
  )
}
export default ConfirmModal