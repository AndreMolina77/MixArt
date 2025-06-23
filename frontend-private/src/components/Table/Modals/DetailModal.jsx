import { Calendar, User, Package, Tag, DollarSign, Star, Truck, Mail, Phone, MapPin, Hash, FileText, Palette, ShoppingCart, Eye } from 'lucide-react'
import BaseModal from './BaseModal'

const DetailModal = ({ isOpen, onClose, data, title = "Detalles", type = "generic" }) => {
  if (!data) return null
  // Funcion para formatear fechas
  const formatDate = (dateString) => {
    if (!dateString) return '-'
    try {
      return new Date(dateString).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    } catch {
      return dateString
    }
  }
  // Funcion para formatear moneda
  const formatCurrency = (amount) => {
    const num = Number(amount) || 0
    return `$${num.toFixed(2)}`
  }
  // Funcion para obtener el icono según el campo
  const getFieldIcon = (fieldKey) => {
    const iconMap = {
      // Fechas
      createdAt: Calendar,
      updatedAt: Calendar,
      date: Calendar,
      // Usuarios
      name: User,
      lastName: User,
      username: User,
      artist: User,
      customerId: User,
      // Email y contacto
      email: Mail,
      phoneNumber: Phone,
      // Dirección
      address: MapPin,
      // Dinero
      price: DollarSign,
      total: DollarSign,
      subtotal: DollarSign,
      // Productos
      articleName: Package,
      artPieceName: Palette,
      items: ShoppingCart,
      stock: Package,
      quantity: Package,
      // Categorías y clasificaciones
      categoryId: Tag,
      category: Tag,
      userType: Tag,
      status: Tag,
      itemType: Tag,
      // Proveedores
      supplierName: Truck,
      supplierId: Truck,
      // Calificaciones
      rating: Star,
      // IDs
      _id: Hash,
      orderId: Hash,
      // Texto
      description: FileText,
      comment: FileText,
      paymentMethod: DollarSign,
      // Genérico
      default: Eye
    }
    return iconMap[fieldKey] || iconMap.default
  }
  // Funcion para obtener configuración específica por tipo
  const getTypeConfig = () => {
    switch (type) {
      case 'articles':
        return {
          fields: [
            { key: 'articleName', label: 'Nombre del Artículo', type: 'text' },
            { key: 'price', label: 'Precio', type: 'currency' },
            { key: 'description', label: 'Descripción', type: 'text' },
            { key: 'stock', label: 'Stock', type: 'number' },
            { key: 'categoryId', label: 'Categoría', type: 'object', objectKey: 'categoryName' },
            { key: 'supplierId', label: 'Proveedor', type: 'object', objectKey: 'supplierName' },
            { key: 'discount', label: 'Descuento', type: 'percentage' },
            { key: 'image', label: 'Imagen', type: 'image' },
            { key: 'createdAt', label: 'Fecha de Creación', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'artpieces':
        return {
          fields: [
            { key: 'artPieceName', label: 'Nombre de la Obra', type: 'text' },
            { key: 'price', label: 'Precio', type: 'currency' },
            { key: 'description', label: 'Descripción', type: 'text' },
            { key: 'artist', label: 'Artista', type: 'text' },
            { key: 'categoryId', label: 'Categoría', type: 'object', objectKey: 'categoryName' },
            { key: 'discount', label: 'Descuento', type: 'percentage' },
            { key: 'image', label: 'Imagen', type: 'image' },
            { key: 'createdAt', label: 'Fecha de Creación', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'customers':
        return {
          fields: [
            { key: 'name', label: 'Nombre', type: 'text' },
            { key: 'lastName', label: 'Apellido', type: 'text' },
            { key: 'username', label: 'Usuario', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phoneNumber', label: 'Teléfono', type: 'text' },
            { key: 'issNumber', label: 'Número ISSS', type: 'text' },
            { key: 'isVerified', label: 'Verificado', type: 'badge' },
            { key: 'emailNotifications', label: 'Notificaciones Email', type: 'badge' },
            { key: 'createdAt', label: 'Fecha de Registro', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'employees':
        return {
          fields: [
            { key: 'name', label: 'Nombre', type: 'text' },
            { key: 'lastName', label: 'Apellido', type: 'text' },
            { key: 'username', label: 'Usuario', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phoneNumber', label: 'Teléfono', type: 'text' },
            { key: 'userType', label: 'Tipo de Usuario', type: 'badge' },
            { key: 'issNumber', label: 'Número ISSS', type: 'text' },
            { key: 'isVerified', label: 'Verificado', type: 'badge' },
            { key: 'emailNotifications', label: 'Notificaciones Email', type: 'badge' },
            { key: 'profilePic', label: 'Foto de Perfil', type: 'image' },
            { key: 'createdAt', label: 'Fecha de Registro', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'categories':
        return {
          fields: [
            { key: 'categoryName', label: 'Nombre de la Categoría', type: 'text' },
            { key: 'description', label: 'Descripción', type: 'text' },
            { key: 'createdAt', label: 'Fecha de Creación', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'suppliers':
        return {
          fields: [
            { key: 'supplierName', label: 'Nombre del Proveedor', type: 'text' },
            { key: 'email', label: 'Email', type: 'email' },
            { key: 'phoneNumber', label: 'Teléfono', type: 'text' },
            { key: 'address', label: 'Dirección', type: 'text' },
            { key: 'createdAt', label: 'Fecha de Registro', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'orders':
        return {
          fields: [
            { key: 'customerId', label: 'Cliente', type: 'customer' },
            { key: 'items', label: 'Productos', type: 'items' },
            { key: 'total', label: 'Total', type: 'currency' },
            { key: 'status', label: 'Estado', type: 'badge' },
            { key: 'createdAt', label: 'Fecha del Pedido', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'reviews':
        return {
          fields: [
            { key: 'rating', label: 'Calificación', type: 'rating' },
            { key: 'comment', label: 'Comentario', type: 'text' },
            { key: 'itemType', label: 'Tipo de Producto', type: 'badge' },
            { key: 'itemId', label: 'Producto', type: 'text' },
            { key: 'customerId', label: 'Cliente', type: 'customer' },
            { key: 'createdAt', label: 'Fecha de la Reseña', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      case 'sales':
        return {
          fields: [
            { key: 'orderId', label: 'Pedido', type: 'order' },
            { key: 'paymentMethod', label: 'Método de Pago', type: 'text' },
            { key: 'address', label: 'Dirección de Entrega', type: 'text' },
            { key: 'status', label: 'Estado', type: 'badge' },
            { key: 'createdAt', label: 'Fecha de Venta', type: 'date' },
            { key: 'updatedAt', label: 'Última Actualización', type: 'date' }
          ]
        }
      default:
        return {
          fields: Object.keys(data).map(key => ({
            key,
            label: key,
            type: 'text'
          }))
        }
    }
  }
  // Funcion para renderizar el valor según su tipo
  const renderFieldValue = (field, value) => {
    if (value === null || value === undefined || value === '') {
      return <span className="text-gray-400 italic">No especificado</span>
    }
    switch (field.type) {
      case 'currency':
        return <span className="font-semibold text-green-600">{formatCurrency(value)}</span>
      case 'percentage':
        return <span className="font-medium">{value}%</span>
      case 'date':
        return <span className="text-gray-700">{formatDate(value)}</span>
      case 'email':
        return (
          <a href={`mailto:${value}`} className="text-blue-600 hover:text-blue-800 hover:underline">
            {value}
          </a>
        )
      case 'badge':
        const badgeValue = value?.toString()?.toLowerCase() || 'unknown'
        const badgeColors = {
          true: 'bg-green-100 text-green-800',
          false: 'bg-red-100 text-red-800',
          verified: 'bg-green-100 text-green-800',
          'no verificado': 'bg-red-100 text-red-800',
          vendedor: 'bg-purple-100 text-purple-800',
          artista: 'bg-orange-100 text-orange-800',
          customer: 'bg-blue-100 text-blue-800',
          admin: 'bg-gray-100 text-gray-800',
          pendiente: 'bg-yellow-100 text-yellow-800',
          'en proceso': 'bg-blue-100 text-blue-800',
          entregado: 'bg-green-100 text-green-800',
          cancelado: 'bg-red-100 text-red-800',
          vendido: 'bg-green-100 text-green-800',
          'venta pendiente': 'bg-yellow-100 text-yellow-800',
          article: 'bg-blue-100 text-blue-800',
          artpiece: 'bg-purple-100 text-purple-800'
        }
        let displayText = value
        if (typeof value === 'boolean') {
          displayText = value ? 'Sí' : 'No'
        }
        return (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${badgeColors[badgeValue] || 'bg-gray-100 text-gray-800'}`}>
            {displayText}
          </span>
        )     
      case 'object':
        if (typeof value === 'object' && value[field.objectKey]) {
          return <span className="font-medium">{value[field.objectKey]}</span>
        }
        return <span className="text-gray-400 italic">No especificado</span>
      case 'customer':
        if (typeof value === 'object' && value.name) {
          return (
            <div>
              <div className="font-medium">{value.name} {value.lastName}</div>
              <div className="text-sm text-gray-500">{value.email}</div>
            </div>
          )
        }
        return <span className="text-gray-400 italic">Cliente no encontrado</span>
      case 'order':
        if (typeof value === 'object') {
          return (
            <div>
              <div className="font-medium">Pedido #{value._id?.slice(-6)}</div>
              <div className="text-sm text-gray-500">Total: {formatCurrency(value.total)}</div>
            </div>
          )
        }
        return <span className="text-gray-400 italic">Pedido no encontrado</span>
      case 'items':
        if (Array.isArray(value) && value.length > 0) {
          return (
            <div className="space-y-2">
              {value.map((item, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-lg border">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-medium text-sm">
                        {item.itemType === 'Article' ? 'Artículo' : 'Pieza de Arte'}
                      </div>
                      <div className="text-sm text-gray-600">
                        Cantidad: {item.quantity}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-green-600">
                        {formatCurrency(item.subtotal)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total de productos:</span>
                  <span>{value.length}</span>
                </div>
              </div>
            </div>
          )
        }
        return <span className="text-gray-400 italic">Sin productos</span>
      case 'rating':
        const rating = Number(value) || 0
        return (
          <div className="flex items-center gap-2">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-medium">({rating}/5)</span>
          </div>
        )
      case 'image':
        if (value && typeof value === 'string') {
          return (
            <div className="mt-2">
              <img
                src={value}
                alt="Imagen"
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
                onError={(e) => {
                  e.target.style.display = 'none'
                }}
              />
            </div>
          )
        }
        return <span className="text-gray-400 italic">Sin imagen</span>
      default:
        return <span className="text-gray-700">{value?.toString() || '-'}</span>
    }
  }
  const config = getTypeConfig()
  return (
    <BaseModal isOpen={isOpen} onClose={onClose} title={title} size="lg">
      <div className="p-6">
        {/* ID del elemento */}
        {data._id && (
          <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Hash className="w-4 h-4" />
              <span className="font-medium">ID:</span>
              <code className="bg-white px-2 py-1 rounded border font-mono text-xs">
                {data._id}
              </code>
            </div>
          </div>
        )}
        {/* Campos de informacion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {config.fields.map((field) => {
            const value = data[field.key]
            const IconComponent = getFieldIcon(field.key)
            // No mostrar campos vacios o de sistema en algunos casos
            if (field.key === '_id' || field.key === '__v') return null
            
            return (
              <div key={field.key} className={field.type === 'items' || field.type === 'image' ? 'md:col-span-2' : ''}>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <IconComponent className="w-4 h-4 text-[#E07A5F]" />
                    <label className="text-sm font-medium text-[#7A6E6E] font-[Alexandria]">
                      {field.label}
                    </label>
                  </div>
                  <div className="pl-6">
                    {renderFieldValue(field, value)}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </BaseModal>
  )
}
export default DetailModal