import { useState, useMemo } from 'react'
import TableHeader from './TableHeader'
import DataTable from './DataTable'
import FormModal from './Modals/FormModal'
import ConfirmModal from './Modals/ConfirmModal'
import DetailModal from './Modals/DetailModal'

const TableContainer = ({config, data = [], onAdd, onEdit, onDelete, onExport, onView, isLoading = false, className = "", categoriesData, suppliersData, customersData, articlesData, artPiecesData, ordersData}) => {
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
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [detailModalType, setDetailModalType] = useState('generic')
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
  // Función mejorada para obtener valor de búsqueda de un objeto
  const getSearchableValue = (item, column) => {
    const value = item[column.key]
    // Si no hay valor, retornar string vacío
    if (value === null || value === undefined) return ''
    // Manejar objetos anidados (como categorías, proveedores, clientes)
    if (value && typeof value === 'object') {
      // Para clientes: buscar en nombre completo y email
      if (column.key === 'customerId' && value.name && value.lastName) {
        return `${value.name} ${value.lastName} ${value.email || ''} ${value.username || ''}`.toLowerCase()
      }
      // Para categorías
      if (value.categoryName) return value.categoryName.toLowerCase()
      // Para proveedores
      if (value.supplierName) return `${value.supplierName} ${value.email || ''}`.toLowerCase()
      // Para otros objetos con name
      if (value.name) return value.name.toLowerCase()
      if (value.username) return value.username.toLowerCase()
      // Si tiene _id, incluirlo también
      return `${value._id || ''} ${JSON.stringify(value)}`.toLowerCase()
    }
    // Manejar arrays (como items en pedidos)
    if (Array.isArray(value)) {
      // Buscar dentro de los elementos del array
      return value.map(item => {
        if (typeof item === 'object') {
          return Object.values(item).join(' ')
        }
        return item
      }).join(' ').toLowerCase()
    }
    // Manejar fechas
    if (column.key.includes('At') || column.key.includes('Date')) {
      try {
        const dateStr = new Date(value).toLocaleDateString('es-ES')
        return `${value} ${dateStr}`.toLowerCase()
      } catch {
        return value.toString().toLowerCase()
      }
    }
    // Manejar booleanos
    if (typeof value === 'boolean') {
      return value ? 'sí yes true verificado activo' : 'no false sin verificar inactivo'
    }
    // Para valores normales, convertir a string
    return value.toString().toLowerCase()
  }
  // Filtrar y ordenar datos
  const filteredAndSortedData = useMemo(() => {
    let filtered = data
    // Aplicar búsqueda
    if (searchValue && searchValue.trim()) {
      const searchLower = searchValue.toLowerCase().trim()
      const searchTerms = searchLower.split(' ').filter(term => term.length > 0)
      
      filtered = data.filter(item => {
        // Obtener todas las columnas que permiten búsqueda
        const searchableColumns = config.columns.filter(col => col.searchable !== false)
        // Crear un texto único con todos los valores buscables del item
        const searchableText = searchableColumns.map(col => 
          getSearchableValue(item, col)
        ).join(' ').toLowerCase()
        // Verificar que TODOS los términos de búsqueda estén presentes
        return searchTerms.every(term => searchableText.includes(term))
      })
    }
    // Aplicar ordenamiento
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        let aVal = a[sortBy]
        let bVal = b[sortBy]
        // Manejar objetos anidados para ordenamiento
        if (aVal && typeof aVal === 'object') {
          if (aVal.categoryName) aVal = aVal.categoryName
          else if (aVal.supplierName) aVal = aVal.supplierName
          else if (aVal.name && aVal.lastName) aVal = `${aVal.name} ${aVal.lastName}`
          else if (aVal.name) aVal = aVal.name
          else aVal = aVal._id || ''
        }
        if (bVal && typeof bVal === 'object') {
          if (bVal.categoryName) bVal = bVal.categoryName
          else if (bVal.supplierName) bVal = bVal.supplierName
          else if (bVal.name && bVal.lastName) bVal = `${bVal.name} ${bVal.lastName}`
          else if (bVal.name) bVal = bVal.name
          else bVal = bVal._id || ''
        }
        // Manejar valores nulos
        if (aVal === null || aVal === undefined) aVal = ''
        if (bVal === null || bVal === undefined) bVal = ''
        // Convertir a string para comparacion
        aVal = aVal.toString().toLowerCase()
        bVal = bVal.toString().toLowerCase()
        
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
    console.log('👀 Ver item:', item)
    setSelectedItem(item)
    // Determinar el tipo basado en la configuración actual
    let modalType = 'generic'
    if (config.title) {
      modalType = config.title.toLowerCase().replace(/\s+/g, '').replace('ías', 'ies')
      // Mapear algunos nombres específicos
      const typeMapping = {
        'artículos': 'articles',
        'categorías': 'categories', 
        'piezasdearte': 'artpieces',
        'empleados': 'employees',
        'clientes': 'customers',
        'proveedores': 'suppliers',
        'pedidos': 'orders',
        'reseñas': 'reviews',
        'ventas': 'sales'
      }
      modalType = typeMapping[modalType] || modalType
    }
    setDetailModalType(modalType)
    setShowDetailModal(true)
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
    // Limpiar filtros y recargar
    setSearchValue('')
    setSortBy(null)
    setSortOrder('asc')
    setCurrentPage(1)
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
      {/* Modal de Detalles */}
      {showDetailModal && selectedItem && (
        <DetailModal isOpen={showDetailModal} onClose={() => setShowDetailModal(false)} data={selectedItem} title={`Detalles de ${config.title?.slice(0, -1) || 'Elemento'}`} type={detailModalType}/>
      )}
    </div>
  )
}
export default TableContainer