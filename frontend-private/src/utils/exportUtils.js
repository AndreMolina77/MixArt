export const exportToCSV = (data, filename = 'datos') => {
  if (!data || data.length === 0) {
    console.warn('No hay datos para exportar')
    return
  }
  // Obtener las claves del primer objeto para los headers
  const headers = Object.keys(data[0])
  // Crear el contenido CSV
  const csvContent = [
    // Headers
    headers.join(','),
    // Datos
    ...data.map(row => 
      headers.map(header => {
        let value = row[header]
        // Manejar objetos anidados (como categorías, proveedores, etc.)
        if (value && typeof value === 'object') {
          if (value.categoryName) value = value.categoryName
          else if (value.supplierName) value = value.supplierName
          else if (value.name && value.lastName) value = `${value.name} ${value.lastName}`
          else if (value.name) value = value.name
          else if (value.username) value = value.username
          else value = value._id || JSON.stringify(value)
        }
        // Manejar arrays (como items en pedidos)
        if (Array.isArray(value)) {
          value = `${value.length} productos`
        }
        // Escapar comas y comillas en el valor
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value || ''
      }).join(',')
    )
  ].join('\n')
  // Crear y descargar el archivo
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
export const exportToExcel = (data, filename = 'datos') => {
  if (!data || data.length === 0) {
    console.warn('No hay datos para exportar')
    return
  }
  // Preparar datos para Excel (similar a CSV pero con mejor formato)
  const processedData = data.map(row => {
    const processedRow = {}
    
    Object.keys(row).forEach(key => {
      let value = row[key]
      // Manejar objetos anidados
      if (value && typeof value === 'object') {
        if (value.categoryName) processedRow[key] = value.categoryName
        else if (value.supplierName) processedRow[key] = value.supplierName
        else if (value.name && value.lastName) processedRow[key] = `${value.name} ${value.lastName}`
        else if (value.name) processedRow[key] = value.name
        else if (value.username) processedRow[key] = value.username
        else processedRow[key] = value._id || 'Objeto complejo'
      }
      // Manejar arrays
      else if (Array.isArray(value)) {
        processedRow[key] = `${value.length} elementos`
      }
      // Manejar fechas
      else if (key.includes('At') || key.includes('Date')) {
        processedRow[key] = value ? new Date(value).toLocaleDateString() : ''
      }
      // Valores normales
      else {
        processedRow[key] = value
      }
    })
    
    return processedRow
  })
  // Crear headers en español
  const headerTranslations = {
    _id: 'ID',
    name: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    phoneNumber: 'Teléfono',
    articleName: 'Nombre del Artículo',
    artPieceName: 'Nombre de la Obra',
    categoryName: 'Categoría',
    supplierName: 'Proveedor',
    price: 'Precio',
    description: 'Descripción',
    stock: 'Stock',
    discount: 'Descuento',
    artist: 'Artista',
    customerId: 'Cliente',
    items: 'Productos',
    total: 'Total',
    status: 'Estado',
    rating: 'Calificación',
    comment: 'Comentario',
    createdAt: 'Fecha de Creación',
    updatedAt: 'Fecha de Actualización',
    isVerified: 'Verificado',
    userType: 'Tipo de Usuario'
  }
  // Crear CSV con headers en español
  const headers = Object.keys(processedData[0])
  const translatedHeaders = headers.map(header => headerTranslations[header] || header)
  
  const csvContent = [
    translatedHeaders.join(','),
    ...processedData.map(row => 
      headers.map(header => {
        let value = row[header]
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          value = `"${value.replace(/"/g, '""')}"`
        }
        return value || ''
      }).join(',')
    )
  ].join('\n')
  // Descargar como archivo Excel (CSV compatible)
  const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' })
  const link = document.createElement('a')
  
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `${filename}.xlsx`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
export const exportToPDF = (data, filename = 'datos', title = 'Reporte de Datos') => {
  if (!data || data.length === 0) {
    console.warn('No hay datos para exportar')
    return
  }
  // Crear contenido HTML para el PDF
  const processedData = data.slice(0, 50) // Limitar a 50 registros para PDF
  
  const headerTranslations = {
    _id: 'ID',
    name: 'Nombre',
    lastName: 'Apellido',
    email: 'Email',
    phoneNumber: 'Teléfono',
    articleName: 'Artículo',
    artPieceName: 'Obra de Arte',
    categoryName: 'Categoría',
    supplierName: 'Proveedor',
    price: 'Precio',
    description: 'Descripción',
    stock: 'Stock',
    discount: 'Descuento',
    artist: 'Artista',
    customerId: 'Cliente',
    total: 'Total',
    status: 'Estado',
    rating: 'Calificación',
    createdAt: 'Fecha de Creación',
    isVerified: 'Verificado',
    userType: 'Tipo'
  }
  // Seleccionar solo las columnas más importantes para PDF
  const importantColumns = Object.keys(processedData[0]).filter(key => 
    !key.includes('_id') || 
    ['name', 'lastName', 'email', 'articleName', 'artPieceName', 'price', 'status', 'total'].includes(key)
  ).slice(0, 6) // Máximo 6 columnas para que quepa en PDF

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>${title}</title>
      <style>
        body { 
          font-family: Arial, sans-serif; 
          margin: 20px;
          font-size: 12px;
        }
        .header {
          text-align: center;
          margin-bottom: 30px;
          border-bottom: 2px solid #E07A5F;
          padding-bottom: 10px;
        }
        .header h1 {
          color: #E07A5F;
          margin: 0;
        }
        .header p {
          color: #7A6E6E;
          margin: 5px 0;
        }
        table { 
          width: 100%; 
          border-collapse: collapse; 
          margin-top: 20px;
        }
        th, td { 
          border: 1px solid #ddd; 
          padding: 8px; 
          text-align: left;
          font-size: 10px;
        }
        th { 
          background-color: #E07A5F; 
          color: white;
          font-weight: bold;
        }
        tr:nth-child(even) { 
          background-color: #f9f9f9; 
        }
        .footer {
          margin-top: 30px;
          text-align: center;
          font-size: 10px;
          color: #7A6E6E;
          border-top: 1px solid #ddd;
          padding-top: 10px;
        }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🎨 MixArt</h1>
        <h2>${title}</h2>
        <p>Generado el: ${new Date().toLocaleDateString('es-ES', { 
          year: 'numeric', 
          month: 'long', 
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })}</p>
        <p>Total de registros: ${data.length}${processedData.length < data.length ? ` (Mostrando primeros ${processedData.length})` : ''}</p>
      </div>   
      <table>
        <thead>
          <tr>
            ${importantColumns.map(col => `<th>${headerTranslations[col] || col}</th>`).join('')}
          </tr>
        </thead>
        <tbody>
          ${processedData.map(row => `
            <tr>
              ${importantColumns.map(col => {
                let value = row[col]
                // Procesar valores para mostrar
                if (value && typeof value === 'object') {
                  if (value.categoryName) value = value.categoryName
                  else if (value.supplierName) value = value.supplierName
                  else if (value.name && value.lastName) value = `${value.name} ${value.lastName}`
                  else if (value.name) value = value.name
                  else value = 'Objeto'
                }
                if (Array.isArray(value)) {
                  value = `${value.length} items`
                }
                if (col.includes('At') && value) {
                  value = new Date(value).toLocaleDateString()
                }
                if (typeof value === 'boolean') {
                  value = value ? 'Sí' : 'No'
                }
                // Limitar longitud del texto
                if (typeof value === 'string' && value.length > 30) {
                  value = value.substring(0, 27) + '...'
                }
                return `<td>${value || '-'}</td>`
              }).join('')}
            </tr>
          `).join('')}
        </tbody>
      </table>
      <div class="footer">
        <p>© 2025 MixArt - Sistema de Gestión de Arte y Productos</p>
        <p>Este reporte contiene información confidencial de la empresa</p>
      </div>
    </body>
    </html>
  `
  // Crear y descargar PDF
  const printWindow = window.open('', '_blank')
  printWindow.document.write(htmlContent)
  printWindow.document.close()
  
  // Esperar a que se cargue y luego imprimir
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      // No cerrar automáticamente para que el usuario pueda guardar como PDF
    }, 500)
  }
}
// Funcion principal que maneja todos los formatos
export const handleExport = (format, data, filename, title) => {
  if (!data || data.length === 0) {
    alert('No hay datos para exportar')
    return
  }
  const timestamp = new Date().toISOString().slice(0, 10)
  const fullFilename = `${filename}_${timestamp}`

  switch (format) {
    case 'csv':
      exportToCSV(data, fullFilename)
      break
    case 'excel':
      exportToExcel(data, fullFilename)
      break
    case 'pdf':
      exportToPDF(data, fullFilename, title)
      break
    default:
      console.warn('Formato de exportación no soportado:', format)
  }
}