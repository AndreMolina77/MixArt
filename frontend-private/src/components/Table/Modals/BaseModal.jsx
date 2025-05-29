import { useEffect } from 'react'
import { X } from 'lucide-react'

const BaseModal = ({ isOpen, onClose, title, children, size = 'md', showCloseButton = true }) => {
  // Cerrar modal con Escape
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  if (!isOpen) return null
  // Tamaños del modal
  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-2xl',
    lg: 'max-w-4xl',
    xl: 'max-w-6xl',
    full: 'max-w-full mx-4'
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300" onClick={onClose}/>
      {/* Modal Content */}
      <div className={`relative bg-white rounded-xl shadow-2xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col transform transition-all duration-300 scale-100 opacity-100 animate-fade-in`} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        {(title || showCloseButton) && (
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-[#E0DCC6] rounded-t-xl">
            <h3 className="text-xl font-bold text-[#7A6E6E] font-[Alexandria]">
              {title}
            </h3>
            {showCloseButton && (
              <button onClick={onClose} className="p-2 hover:bg-[#7A6E6E]/10 rounded-lg transition-colors duration-200 group">
                <X className="w-5 h-5 text-[#7A6E6E] group-hover:text-[#7A6E6E]/70" />
              </button>
            )}
          </div>
        )}
        {/* Body */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  )
}
export default BaseModal