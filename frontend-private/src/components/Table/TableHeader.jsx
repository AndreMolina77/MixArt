import TableActions from './TableActions'

const TableHeader = ({ 
  title, subtitle, searchValue, onSearch, actions = {}, onAdd, onExport, onFilter, onRefresh, addButtonText, addButtonIcon, customActions = [], isLoading = false, className = ""
}) => {
  return (
    <div className={`mb-6 ${className}`}>
      {/* Titulo y subtitulo */}
      {(title || subtitle) && (
        <div className="mb-4">
          {title && (
            <h1 className="text-2xl font-bold text-[#7A6E6E] font-[Alexandria]">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[#7A6E6E]/70 font-[Alexandria] mt-1">
              {subtitle}
            </p>
          )}
        </div>
      )}
      {/* Barra de acciones */}
      <TableActions actions={actions} onAdd={onAdd} onExport={onExport} onFilter={onFilter} onRefresh={onRefresh} onSearch={onSearch} searchValue={searchValue} isLoading={isLoading} addButtonText={addButtonText} addButtonIcon={addButtonIcon} customActions={customActions}/>
    </div>
  )
}
export default TableHeader