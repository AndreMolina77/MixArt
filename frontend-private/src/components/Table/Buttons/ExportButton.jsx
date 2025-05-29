import { useState, useRef, useEffect } from 'react'
import { Download, ChevronDown, FileText, Table, FileSpreadsheet } from 'lucide-react'
import ActionButton from './ActionButton'

const ExportButton = ({ 
  onExport, 
  disabled = false, 
  isLoading = false,
  exportOptions = [
    { key: 'excel', label: 'Excel (.xlsx)', icon: FileSpreadsheet },
    { key: 'csv', label: 'CSV (.csv)', icon: Table },
    { key: 'pdf', label: 'PDF (.pdf)', icon: FileText }
  ],
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef(null)
  const buttonRef = useRef(null)
  // Cerrar dropdown al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target) &&
          buttonRef.current && !buttonRef.current.contains(event.target)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])
  const handleExport = (format) => {
    if (onExport) {
      onExport(format)
    }
    setIsOpen(false)
  }
  const toggleDropdown = () => {
    if (!disabled && !isLoading) {
      setIsOpen(!isOpen)
    }
  }
  return (
    <div className="relative inline-block">
      <div ref={buttonRef}>
        <ActionButton variant="outline" icon={Download} onClick={toggleDropdown} disabled={disabled} isLoading={isLoading} className={`${className} ${isOpen ? 'ring-2 ring-[#E07A5F] ring-offset-2' : ''}`}>
          <span>Exportar</span>
          <ChevronDown 
            className={`w-4 h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          />
        </ActionButton>
      </div>
      {/* Dropdown menu */}
      {isOpen && (
        <div ref={dropdownRef} className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50 overflow-hidden font-[Alexandria]">
          <div className="py-1">
            {exportOptions.map((option) => {
              const IconComponent = option.icon
              return (
                <button key={option.key} onClick={() => handleExport(option.key)} className="flex items-center w-full px-4 py-3 text-left text-[#7A6E6E] hover:bg-[#EBFEF5] hover:text-[#E07A5F] transition-colors duration-200 group">
                  <IconComponent className="w-4 h-4 mr-3 text-gray-500 group-hover:text-[#E07A5F] transition-colors" />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              )
            })}
          </div>
          {/* Separador y nota */}
          <div className="border-t border-gray-100">
            <div className="px-4 py-2">
              <p className="text-xs text-gray-500">Se exportarán los datos filtrados</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
export default ExportButton