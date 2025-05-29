import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Sidebar from '../components/Dashboard/Sidebar'
import Header from '../components/Dashboard/Header'
import Dashboard from '../components/Dashboard/Dashboard'
import TableContainer from '../components/Table/TableContainer'
// Importar configuraciones de tablas
import { articlesConfig, categoriesConfig, suppliersConfig, customersConfig, employeesConfig } from '../data/TableConfigs.js'

const MainPage = () => {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')

  const handleLogout = async () => {
    await logout()
  }
  // Datos de ejemplo vacios para mostrar el estado sin datos
  const emptyData = []
  // Handlers temporales para las acciones CRUD (por ahora solo console.log)
  const handleAdd = async (data) => {
    console.log('Agregar: ', data)
    // Aquí irá la logica para agregar al backend
  }
  const handleEdit = async (id, data) => {
    console.log('Editar: ', id, data)
    // Aquí irá la logica para editar en el backend
  }
  const handleDelete = async (id) => {
    console.log('Eliminar:', id)
    // Aquí irá la logica para eliminar del backend
  }
  const handleExport = (format, data) => {
    console.log(`Exportar ${data.length} elementos en formato ${format}`)
    // Aquí ira la logica para exportar
  }
  // Funcion para renderizar el contenido basado en la vista actual
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard/>
      case 'search':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Buscar</h1>
              <p className="text-gray-600">Función de búsqueda en desarrollo...</p>
            </div>
          </div>
        )
      case 'artpieces':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Obras de Arte</h1>
              <p className="text-gray-600">Gestión de obras de arte en desarrollo...</p>
            </div>
          </div>
        )
      case 'articles':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={articlesConfig} data={emptyData} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} isLoading={false}/>
            </div>
          </div>
        )
      case 'artists':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={employeesConfig} data={emptyData} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} isLoading={false}/>
            </div>
          </div>
        )
      case 'categories':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={categoriesConfig} data={emptyData} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} isLoading={false}/>
            </div>
          </div>
        )
      case 'clients':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={customersConfig} data={emptyData} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} isLoading={false}/>
            </div>
          </div>
        )
      case 'orders':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Pedidos</h1>
              <p className="text-gray-600">Gestión de pedidos en desarrollo...</p>
            </div>
          </div>
        )
      case 'reviews':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Reseñas</h1>
              <p className="text-gray-600">Gestión de reseñas en desarrollo...</p>
            </div>
          </div>
        )
      case 'sales':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Ventas</h1>
              <p className="text-gray-600">Gestión de ventas en desarrollo...</p>
            </div>
          </div>
        )
      case 'suppliers':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={suppliersConfig} data={emptyData} onAdd={handleAdd} onEdit={handleEdit} onDelete={handleDelete} onExport={handleExport} isLoading={false}/>
            </div>
          </div>
        )
      case 'wishlist':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Lista de Deseos</h1>
              <p className="text-gray-600">Gestión de lista de deseos en desarrollo...</p>
            </div>
          </div>
        )
      default: 
        return <Dashboard />
    }
  }
  return (
    <div className="flex h-screen bg-white font-[Alexandria] overflow-hidden">
      {/* Sidebar */}
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout}/>
      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header onLogout={handleLogout} />
        {/* Contenido dinamico */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
export default MainPage