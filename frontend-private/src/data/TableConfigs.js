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
    { name: 'categoryId', type: 'select', label: 'Categoría', required: true, options: 'categories' }, // Indicador especial, se llenara dinámicamente
    { name: 'supplierId', type: 'select', label: 'Proveedor', required: true, options: 'suppliers' }, // Indicador especial, se llenara dinámicamente
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