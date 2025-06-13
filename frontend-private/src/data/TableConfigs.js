// Configuracion para Articulos
export const articlesConfig = {
  title: "Artículos",
  columns: [
    { key: 'articleName', label: 'Nombre', sortable: true, searchable: true },
    { key: 'price', label: 'Precio', sortable: true, type: 'currency' },
    { key: 'description', label: 'Descripción', searchable: true },
    { key: 'stock', label: 'Stock', sortable: true, type: 'number' },
    { key: 'categoryId', label: 'Categoría', sortable: true },
    { key: 'supplierId', label: 'Proveedor', sortable: true },
    { key: 'discount', label: 'Descuento', sortable: true, type: 'number' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'articleName', type: 'text', label: 'Nombre del Artículo', required: true, placeholder: 'Ej: Pintura Acrílica Roja' },
    { name: 'price', type: 'number', label: 'Precio', required: true, placeholder: '0.00', min: 0, step: 0.01 },
    { name: 'description', type: 'textarea', label: 'Descripción', required: true, placeholder: 'Describe el artículo...', rows: 3 },
    { name: 'image', type: 'file', label: 'Imagen', accept: 'image/*', placeholder: 'Seleccionar imagen' },
    { name: 'stock', type: 'number', label: 'Stock', required: true, placeholder: '0', min: 0 },
    { name: 'categoryId', type: 'select', label: 'Categoría', required: true, options: 'categories' }, // Indicador especial, se llena dinamicamente
    { name: 'supplierId', type: 'select', label: 'Proveedor', required: true, options: 'suppliers' }, // Indicador especial, se llena dinamicamente
    { name: 'discount', type: 'number', label: 'Descuento (%)', placeholder: '0', min: 0, max: 100 }
  ]
}
// Configuracion para Categorias
export const categoriesConfig = {
  title: "Categorías",
  columns: [
    { key: 'categoryName', label: 'Nombre', sortable: true, searchable: true },
    { key: 'description', label: 'Descripción', searchable: true },
    { key: 'createdAt', label: 'Fecha de Creación', sortable: true, type: 'date' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'categoryName', type: 'text', label: 'Nombre de la Categoría', required: true, placeholder: 'Ej: Pinturas' },
    { name: 'description', type: 'textarea', label: 'Descripción', required: true, placeholder: 'Describe la categoría...', rows: 3 }
  ]
}
// Configuracion para Proveedores
export const suppliersConfig = {
  title: "Proveedores",
  columns: [
    { key: 'supplierName', label: 'Nombre', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'phoneNumber', label: 'Teléfono', searchable: true },
    { key: 'address', label: 'Dirección', searchable: true },
    { key: 'createdAt', label: 'Fecha de Registro', sortable: true, type: 'date' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'supplierName', type: 'text', label: 'Nombre del Proveedor', required: true, placeholder: 'Ej: Pinturas Salvadoreñas S.A.' },
    { name: 'email', type: 'email', label: 'Email', required: true, placeholder: 'proveedor@email.com' },
    { name: 'phoneNumber', type: 'tel', label: 'Teléfono', required: true, placeholder: '2234-5678' },
    { name: 'address', type: 'textarea', label: 'Dirección', required: true, placeholder: 'Dirección completa...', rows: 2 }
  ]
}
// Configuracion para Clientes
export const customersConfig = {
  title: "Clientes",
  columns: [
    { key: 'name', label: 'Nombre', sortable: true, searchable: true },
    { key: 'lastName', label: 'Apellido', sortable: true, searchable: true },
    { key: 'username', label: 'Usuario', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'phoneNumber', label: 'Teléfono', searchable: true },
    { key: 'isVerified', label: 'Verificado', sortable: true, type: 'badge' },
    { key: 'createdAt', label: 'Fecha de Registro', sortable: true, type: 'date' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'name', type: 'text', label: 'Nombre', required: true, placeholder: 'Juan' },
    { name: 'lastName', type: 'text', label: 'Apellido', required: true, placeholder: 'Pérez' },
    { name: 'username', type: 'text', label: 'Nombre de Usuario', required: true, placeholder: 'juanperez' },
    { name: 'email', type: 'email', label: 'Email', required: true, placeholder: 'juan@email.com' },
    { name: 'password', type: 'password', label: 'Contraseña', required: true, placeholder: '••••••••' },
    { name: 'phoneNumber', type: 'tel', label: 'Teléfono', required: true, placeholder: '7234-5678' },
    { name: 'issNumber', type: 'text', label: 'Número de ISSS', required: true, placeholder: '12345678901' },
    { name: 'isVerified', type: 'checkbox', label: 'Cliente Verificado', checkboxLabel: 'Marcar como verificado' }
  ]
}
// Configuracion para Empleados (Vendedores y Artistas)
export const employeesConfig = {
  title: "Empleados",
  columns: [
    { key: 'name', label: 'Nombre', sortable: true, searchable: true },
    { key: 'lastName', label: 'Apellido', sortable: true, searchable: true },
    { key: 'username', label: 'Usuario', sortable: true, searchable: true },
    { key: 'email', label: 'Email', sortable: true, searchable: true },
    { key: 'phoneNumber', label: 'Teléfono', searchable: true },
    { key: 'userType', label: 'Tipo', sortable: true, type: 'badge' },
    { key: 'isVerified', label: 'Verificado', sortable: true, type: 'badge' },
    { key: 'createdAt', label: 'Fecha de Registro', sortable: true, type: 'date' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'name', type: 'text', label: 'Nombre', required: true, placeholder: 'María' },
    { name: 'lastName', type: 'text', label: 'Apellido', required: true, placeholder: 'González' },
    { name: 'username', type: 'text', label: 'Nombre de Usuario', required: true, placeholder: 'mariagonzalez' },
    { name: 'email', type: 'email', label: 'Email', required: true, placeholder: 'maria@mixart.com' },
    { name: 'password', type: 'password', label: 'Contraseña', required: true, placeholder: '••••••••' },
    { name: 'phoneNumber', type: 'tel', label: 'Teléfono', required: true, placeholder: '7234-5678' },
    { name: 'userType', type: 'select', label: 'Tipo de Usuario', required: true, options: [
      { value: 'vendedor', label: 'Vendedor' },
      { value: 'artista', label: 'Artista' }
    ]},
    { name: 'issNumber', type: 'text', label: 'Número de ISSS', required: true, placeholder: '12345678901' },
    { name: 'isVerified', type: 'checkbox', label: 'Empleado Verificado', checkboxLabel: 'Marcar como verificado' }
  ]
}
// Aqui estan los modelos que hacen falta, algunos requieren que le metamos mano, yo indicare con comentarios
// Configuracion para Piezas de Arte
export const artPiecesConfig = {
  title: "Piezas de arte",
  columns: [
    { key: 'artPieceName', label: 'Nombre', sortable: true, searchable: true },
    { key: 'price', label: 'Precio', sortable: true, type: 'currency' },
    { key: 'description', label: 'Descripción', searchable: true },
    { key: 'categoryId', label: 'Categoría', sortable: true },
    { key: 'artist', label: 'Artista', sortable: true },
    { key: 'discount', label: 'Descuento', sortable: true, type: 'number' }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'articleName', type: 'text', label: 'Nombre de la pieza de arte', required: true, placeholder: 'Ej: Small life forms III' },
    { name: 'price', type: 'number', label: 'Precio', required: true, placeholder: '0.00', min: 0, step: 0.01 },
    { name: 'description', type: 'textarea', label: 'Descripción', required: true, placeholder: 'Describe la obra...', rows: 3 },
    { name: 'image', type: 'file', label: 'Imagen', accept: 'image/*', placeholder: 'Seleccionar imagen' },
    { name: 'categoryId', type: 'select', label: 'Categoría', required: true, options: 'categories' }, // Indicador especial, se llena dinamicamente
    { name: 'artist', type: 'text', label: 'Artista', required: true },
    { name: 'discount', type: 'number', label: 'Descuento (%)', placeholder: '10', min: 0, max: 100 }
  ]
}
// Configuracion para Ventas
export const salesConfig = {
  title: "Ventas",
  columns: [
    { key: 'orderId', label: 'Orden', sortable: true, searchable: true },
    { key: 'paymentMethod', label: 'Método de pago', sortable: true },
    { key: 'address', label: 'Dirección', searchable: true },
    { key: 'status', label: 'Estado', sortable: true }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'orderId', type: 'select', label: 'Orden', required: true, options: 'orders' }, // Indicador especial, se llena dinamicamente
    { name: 'paymentMethod', type: 'select', label: 'Método de pago', required: true, options: 'paymentMethods' }, // Indicador especial, se llena dinamicamente con datos de data.js (ya que serían opciones preexistentes)
    { name: 'address', type: 'text', label: 'Dirección', required: true, placeholder: 'Calle Principal 123, Col. Centro, Ciudad de México' },
    { name: 'status', type: 'select', label: 'Estado', required: true, placeholder: 'states' } // Indicador especial, se llena dinamicamente (con estados pre establecidos???)
  ]
}
// Configuracion para Reseñas
export const reviewsConfig = {
  title: "Reseñas",
  columns: [
    { key: 'rating', label: 'Calificación', sortable: true, searchable: true }, // Quisiera que se mostrara por estrellas (incluyendo decimales)
    { key: 'comment', label: 'Comentario', sortable: true },
    { key: 'itemId', label: 'Producto', searchable: true }, // Este campo depende de itemType de `backend`
    { key: 'customerId', label: 'Cliente', sortable: true }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'rating', type: 'number', label: 'Calificación', required: true, placeholder: '4', min: 1, max: 5 }, // Ahorita esta como number, pero no se si se puede hacer como estrella de 1 a 5
    { name: 'comment', type: 'textarea', label: 'Comentario', required: true, placeholder: 'Escribe un comentario...', rows: 5 }, 
    { name: 'itemId', type: 'select', label: 'Producto', required: true, options: 'itemType' }, // Indicador especial???? (Revisar backend)
    { name: 'customerId', type: 'select', label: 'Cliente', required: true, options: 'customers' } // Indicador especial, se llena dinamicamente
  ]
}
// Configuracion para pedidos
export const ordersConfig = {
  title: "Ventas",
  columns: [
    { key: 'customerId', label: 'Cliente', sortable: true, searchable: true },
    { key: 'items', label: 'Productos', sortable: true }, // Este es el array confuso de backend
    { key: 'total', label: 'Total', searchable: true },
    { key: 'status', label: 'Estado', sortable: true }
  ],
  actions: {
    canAdd: true,
    canEdit: true,
    canDelete: true,
    canExport: true
  },
  formFields: [
    { name: 'customerId', type: 'select', label: 'Cliente', required: true, options: 'customers' }, // Indicador especial, se llena dinamicamente
    { name: 'items', type: 'select', label: 'Información del producto', required: true, options: ['articles', 'artpieces'] }, // Indicador especial??? Lo he dejado así provisionalmente (ver backend)
    { name: 'total', type: 'text', label: 'Total', required: true, placeholder: 'Total' }, // Autollenable con el campo anterior (quizas)
    { name: 'status', type: 'select', label: 'Estado', required: true, placeholder: 'states' } // Indicador especial, se llena dinamicamente (con estados pre establecidos???)
  ]
}