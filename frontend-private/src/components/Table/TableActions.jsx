import { Search, Filter, RefreshCw } from 'lucide-react'
import ActionButton from './ActionButton'
import ExportButton from './ExportButton'

const TableActions = ({
  // Configuración de acciones
  actions = { canAdd: true, canExport: true, canFilter: true, canRefresh: true
  },
  // Callbacks
  onAdd, onExport, onFilter, onRefresh, onSearch,
  // Estados
  isLoading = false, searchValue = "",
  // Personalizacion
  addButtonText = "Añadir", addButtonIcon = "add", title = "",
  // Props adicionales
  customActions = [], className = ""
}) => {
  const handleSearchChange = (e) => {
    if (onSearch) {
      onSearch(e.target.value)
    }
  }
  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-4 mb-6 font-[Alexandria] ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Lado izquierdo - Titulo y búsqueda */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 flex-1">
          {title && (
            <h2 className="text-xl font-semibold text-[#7A6E6E]">
              {title}
            </h2>
          )}
          {/* Campo de busqueda */}
          {onSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input type="text" placeholder="Buscar..." value={searchValue} onChange={handleSearchChange} className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg bg-[#EBFEF5] text-[#7A6E6E] placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E07A5F] focus:border-transparent transition-colors"/>
            </div>
          )}
        </div>
        {/* Lado derecho - Botones de accion */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Acciones personalizadas */}
          {customActions.map((action, index) => (
            <ActionButton key={index} variant={action.variant || "ghost"} icon={action.icon} onClick={action.onClick} disabled={action.disabled || isLoading} className={action.className}>
              {action.label}
            </ActionButton>
          ))}
          {/* Boton de filtro */}
          {actions.canFilter && onFilter && (
            <ActionButton variant="ghost" icon={Filter} onClick={onFilter} disabled={isLoading}>
              Filtrar
            </ActionButton>
          )}
          {/* Boton de refrescar */}
          {actions.canRefresh && onRefresh && (
            <ActionButton variant="ghost" icon={RefreshCw} onClick={onRefresh} disabled={isLoading} size="icon"/>
          )}
          {/* Boton de exportar */}
          {actions.canExport && onExport && (
            <ExportButton onExport={onExport} disabled={isLoading}/>
          )}
          {/* Boton de añadir */}
          {actions.canAdd && onAdd && (
            <ActionButton variant="primary" icon={addButtonIcon} onClick={onAdd} disabled={isLoading}>
              {addButtonText}
            </ActionButton>
          )}
        </div>
      </div>
      {/* Linea separadora sutil */}
      <div className="mt-4 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
    </div>
  )
}
export default TableActions