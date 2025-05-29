import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import Dashboard from '../components/Dashboard'

const MainPage = () => {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')

  const handleLogout = async () => {
    await logout()
  }
  // Funcion para renderizar el contenido basado en la vista actual
  const renderContent = () => {
    switch (currentView) {
      case 'dashboard':
        return <Dashboard />
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
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Artículos</h1>
              <p className="text-gray-600">Gestión de artículos en desarrollo...</p>
            </div>
          </div>
        )
      case 'artists':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Artistas</h1>
              <p className="text-gray-600">Gestión de artistas en desarrollo...</p>
            </div>
          </div>
        )
      case 'categories':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Categorías</h1>
              <p className="text-gray-600">Gestión de categorías en desarrollo...</p>
            </div>
          </div>
        )
      case 'customers':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Clientes</h1>
              <p className="text-gray-600">Gestión de clientes en desarrollo...</p>
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
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">Proveedores</h1>
              <p className="text-gray-600">Gestión de proveedores en desarrollo...</p>
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
      default: return <Dashboard/>
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
        {/* Contenido dinámico */}
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
export default MainPage