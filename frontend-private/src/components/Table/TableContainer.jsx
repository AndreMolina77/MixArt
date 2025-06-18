import { useState, useMemo } from 'react'
import TableHeader from './TableHeader'
import DataTable from './DataTable'
import FormModal from './Modals/FormModal'
import ConfirmModal from './Modals/ConfirmModal'

const TableContainer = ({config, data = [], onAdd, onEdit, onDelete, onExport, isLoading = false, className = "", categoriesData, suppliersData, customersData, articlesData, artPiecesData, ordersData}) => {
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
      // Manejar categorias
      if (field.options === 'categories' && categoriesData?.categories) {
        return {
          ...field,
          options: categoriesData.categories.map(cat => ({
            value: cat._id,
            label: cat.categoryName
          }))
        }
      }
      // Manejar proveedores
      if (field.options === 'suppliers' && suppliersData?.suppliers) {
        return {
          ...field,
          options: suppliersData.suppliers.map(sup => ({
            value: sup._id,
            label: sup.supplierName
          }))
        }
      }
      // Manejar clientes
      if (field.options === 'customers' && customersData?.customers) {
        return {
          ...field,
          options: customersData.customers.map(customer => ({
            value: customer._id,
            label: `${customer.name} ${customer.lastName} (${customer.email})`
          }))
        }
      }
      // Manejar pedidos
      if (field.options === 'orders' && ordersData?.orders) {
        return {
          ...field,
          options: ordersData.orders.map(order => ({
            value: order._id,
            label: `Pedido #${order._id.slice(-6)} - $${order.total}`
          }))
        }
      }
      // Manejar productos dinamicos para reseñas (basado en itemType)
      if (field.name === 'itemId' && field.options === 'items') {
        // Este caso necesita lógica especial que se manejará en el FormModal
        return field
      }
      return field
    })
  }, [config.formFields, categoriesData?.categories, suppliersData?.suppliers, customersData?.customers, ordersData?.orders])
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
    console.log('🔧 === EDIT ITEM ===')
    console.log('📦 Item original:', item)
    // Procesar el item para extraer IDs de objetos populados
    const processedItem = { ...item }
    // Procesar campos que pueden ser objetos populados
    if (item.customerId && typeof item.customerId === 'object') {
      processedItem.customerId = item.customerId._id
    }
    if (item.categoryId && typeof item.categoryId === 'object') {
      processedItem.categoryId = item.categoryId._id
    }
    if (item.supplierId && typeof item.supplierId === 'object') {
      processedItem.supplierId = item.supplierId._id
    }
    if (item.orderId && typeof item.orderId === 'object') {
      processedItem.orderId = item.orderId._id
    }
    console.log('📦 Item procesado:', processedItem)
    
    setSelectedItem(processedItem)
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
    console.log('🔧 === HANDLE EDIT SUBMIT EN TABLECONTAINER ===')
    console.log('📦 FormData recibido:', formData)
    console.log('📦 SelectedItem:', selectedItem)
    
    setIsSubmitting(true)
    try {
      if (onEdit && selectedItem) {
        console.log('📤 Llamando onEdit con:', selectedItem._id, formData)
        await onEdit(selectedItem._id, formData)
        console.log('✅ onEdit completado exitosamente')
      } else {
        console.log('❌ onEdit o selectedItem no definido:', { onEdit: !!onEdit, selectedItem: !!selectedItem })
      }
      setShowEditModal(false)
    } catch (error) {
      console.error('❌ Error en handleEditSubmit:', error)
      // NO re-throw el error aquí para evitar el doble mensaje
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
        <FormModal isOpen={showAddModal} onClose={() => setShowAddModal(false)} onSubmit={handleAddSubmit} title={`Agregar ${config.title?.slice(0) || 'Elemento'}`} fields={processedFormFields} isLoading={isSubmitting} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData} ordersData={ordersData}/>
      )}
      {/* Modal de Editar */}
      {showEditModal && selectedItem && (
        <FormModal isOpen={showEditModal} onClose={() => setShowEditModal(false)} onSubmit={handleEditSubmit} title={`Editar ${config.title?.slice(0) || 'Elemento'}`} fields={processedFormFields} initialData={selectedItem} isLoading={isSubmitting} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData} ordersData={ordersData}/>
      )}
      {/* Modal de Confirmar Eliminacion */}
      {showDeleteModal && selectedItem && (
        <ConfirmModal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)} onConfirm={handleDeleteConfirm} title="Confirmar eliminación" message={`¿Estás seguro de que quieres eliminar este elemento? Esta acción no se puede deshacer.`} confirmText="Eliminar" cancelText="Cancelar" type="danger" isLoading={isSubmitting}/>
      )}
    </div>
  )
}
export default TableContainer