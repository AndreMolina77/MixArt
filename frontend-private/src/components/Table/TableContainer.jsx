import { useState, useMemo } from 'react'
import TableHeader from './TableHeader'
import DataTable from './DataTable'
import FormModal from './Modals/FormModal'
import ConfirmModal from './Modals/ConfirmModal'

const TableContainer = ({config, data = [], onAdd, onEdit, onDelete, onExport, isLoading = false, className = "", categoriesData, suppliersData}) => {
  const [searchValue, setSearchValue] = useState("")
  const [sortBy, setSortBy] = useState(null)
  const [sortOrder, setSortOrder] = useState('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [selectedItem, setSelectedItem] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  // Procesar campos con opciones dinamicas
  const processedFormFields = useMemo(() => {
    return config.formFields.map(field => {
      if (field.options === 'categories' && categoriesData?.categories) {
        return {
          ...field,
          options: categoriesData.categories.map(cat => ({
            value: cat._id,
            label: cat.categoryName
          }))
        }
      }
      if (field.options === 'suppliers' && suppliersData?.suppliers) {
        return {
          ...field,
          options: suppliersData.suppliers.map(sup => ({
            value: sup._id,
            label: sup.supplierName
          }))
        }
      }
      return field
    })
  }, [config.formFields, categoriesData?.categories, suppliersData?.suppliers])
  // Filtrar y ordenar datos
  const filteredAndSortedData = useMemo(() => {
    let filtered = data
    // Aplicar búsqueda
    if (searchValue) {
      const searchableColumns = config.columns.filter(col => col.searchable)
      filtered = data.filter(item =>
        searchableColumns.some(col =>
          String(item[col.key] || '').toLowerCase().includes(searchValue.toLowerCase())
        )
      )
    }
    // Aplicar ordenamiento
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const aVal = a[sortBy]
        const bVal = b[sortBy]
        
        if (aVal === bVal) return 0
        const result = aVal > bVal ? 1 : -1
        return sortOrder === 'asc' ? result : -result
      })
    }
    return filtered
  }, [data, searchValue, sortBy, sortOrder, config.columns])
  // Datos paginados
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize
    return filteredAndSortedData.slice(startIndex, startIndex + pageSize)
  }, [filteredAndSortedData, currentPage, pageSize])
  // Handlers
  const handleSearch = (value) => {
    setSearchValue(value)
    setCurrentPage(1) // Reset a primera pagina
  }
  const handleSort = (columnKey, direction) => {
    setSortBy(columnKey)
    setSortOrder(direction)
  }
  const handlePageChange = (page) => {
    setCurrentPage(page)
  }
  const handlePageSizeChange = (size) => {
    setPageSize(size)
    setCurrentPage(1)
  }
  const handleAdd = () => {
    setSelectedItem(null)
    setShowAddModal(true)
  }
  const handleEdit = (item) => {
    setSelectedItem(item)
    setShowEditModal(true)
  }
  const handleDelete = (item) => {
    setSelectedItem(item)
    setShowDeleteModal(true)
  }
  const handleView = (item) => {
    console.log('Ver item:', item)
    // Logica de vista in progress
  }
  const handleAddSubmit = async (formData) => {
    console.log('🏗️ === DEBUG TABLECONTAINER - HANDLE ADD SUBMIT ===')
    console.log('📦 FormData recibido en TableContainer:', formData)
    console.log('📊 Tipo de formData:', typeof formData)
    console.log('📋 Keys de formData:', Object.keys(formData))
    console.log('📝 Valores:', Object.values(formData))
    
    setIsSubmitting(true)
    try {
      if (onAdd) {
        console.log('📤 Llamando a onAdd con:', formData)
        await onAdd(formData)
        console.log('✅ onAdd completado exitosamente')
      } else {
        console.log('❌ onAdd no está definido')
      }
      setShowAddModal(false)
    } catch (error) {
      console.error('❌ Error en handleAddSubmit:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleEditSubmit = async (formData) => {
    setIsSubmitting(true)
    try {
      if (onEdit && selectedItem) {
        await onEdit(selectedItem._id, formData)
      }
      setShowEditModal(false)
    } catch (error) {
      console.error('Error al editar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleDeleteConfirm = async () => {
    setIsSubmitting(true)
    try {
      if (onDelete && selectedItem) {
        await onDelete(selectedItem._id)
      }
      setShowDeleteModal(false)
    } catch (error) {
      console.error('Error al eliminar:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  const handleExport = (format) => {
    if (onExport) {
      onExport(format, filteredAndSortedData)
    } else {
      console.log(`Exportando ${filteredAndSortedData.length} elementos en formato ${format}`)
    }
  }
  const handleRefresh = () => {
    // Por ahora solo refrescar la pagina
    window.location.reload()
  }
  return (
    <div className={`font-[Alexandria] ${className}`}>
      {/* Header con titulo y acciones */}
      <TableHeader title={config.title} subtitle={`${filteredAndSortedData.length} ${filteredAndSortedData.length === 1 ? 'elemento' : 'elementos'}`} searchValue={searchValue} onSearch={handleSearch} actions={config.actions} onAdd={config.actions?.canAdd ? handleAdd : undefined} onExport={config.actions?.canExport ? handleExport : undefined} onRefresh={handleRefresh} addButtonText={`Añadir ${config.title?.slice(0) || 'Elemento'}`} addButtonIcon="add" isLoading={isLoading}/>
      {/* Tabla principal */}
      <DataTable data={paginatedData} columns={config.columns} isLoading={isLoading}
        pagination={{
          page: currentPage,
          pageSize: pageSize,
          total: filteredAndSortedData.length
        }} onPageChange={handlePageChange} onPageSizeChange={handlePageSizeChange} onSort={handleSort} onEdit={config.actions?.canEdit ? handleEdit : undefined} onDelete={config.actions?.canDelete ? handleDelete : undefined} onView={handleView} sortBy={sortBy} sortOrder={sortOrder}/>
      {/* Modal de Agregar */}
      {showAddModal && (
        <FormModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddSubmit} title={`Agregar ${config.title?.slice(0) || 'Elemento'}`} fields={processedFormFields} isLoading={isSubmitting}/>
      )}
      {/* Modal de Editar */}
      {showEditModal && selectedItem && (
        <FormModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSubmit={handleEditSubmit} title={`Editar ${config.title?.slice(0) || 'Elemento'}`} fields={processedFormFields} initialData={selectedItem} isLoading={isSubmitting}/>
      )}
      {/* Modal de Confirmar Eliminacion */}
      {showDeleteModal && selectedItem && (
        <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirm} title="Confirmar eliminación" message={`¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.`} confirmText="Eliminar" cancelText="Cancelar" type="danger" isLoading={isSubmitting}/>
      )}
    </div>
  )
}
export default TableContainer