import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Dashboard/Sidebar'
import Header from '../components/Dashboard/Header'
import Dashboard from '../components/Dashboard/Dashboard'
import TableContainer from '../components/Table/TableContainer'
import RegisterEmployee from './Signup.jsx'
import SettingsPage from '../components/Settings/SettingsPage'
import GlobalSearch from '../components/Search/GlobalSearch.jsx'
import { useConditionalData } from '../hooks/MainHook/useConditionalData.js'
import { handleExport } from '../utils/exportUtils.js'
// Importar configuraciones de tablas
import { articlesConfig, categoriesConfig, suppliersConfig, customersConfig, employeesConfig, artPiecesConfig, ordersConfig, reviewsConfig, salesConfig } from '../data/TableConfigs.js'

const MainPage = () => {
  const { user, logout, API } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  const [showRegisterEmployee, setShowRegisterEmployee] = useState(false)
  // Usar el hook condicional - TODOS los hooks se ejecutan siempre
  const {
    suppliersData,
    employeesData,
    customersData,
    articlesData,
    categoriesData,
    artPiecesData,
    ordersData,
    reviewsData,
    salesData,
    canAccess
  } = useConditionalData()

  const handleLogout = async () => {
    await logout()
  }
  // Funcion handleExport
  const handleDataExport = (format, data, sectionName) => {
    console.log(`Exportando ${data?.length || 0} elementos de ${sectionName} en formato ${format}`)
    
    if (!data || data.length === 0) {
      toast.error('No hay datos para exportar')
      return
    }
    try {
      const filename = `${sectionName.toLowerCase().replace(/\s+/g, '_')}`
      const title = `Reporte de ${sectionName} - MixArt`
      
      handleExport(format, data, filename, title)
      toast.success(`Exportación de ${sectionName} iniciada en formato ${format.toUpperCase()}`)
    } catch (error) {
      console.error('Error al exportar:', error)
      toast.error('Error al exportar los datos')
    }
  }
  // Agregar funcion para verificar permisos
  const hasPermission = (view) => {
    if (!user?.userType) return false
    
    const permissions = {
      'admin': [ 'dashboard', 'search', 'artpieces', 'articles', 'employees', 'categories', 'customers', 'orders', 'reviews', 'sales', 'suppliers', 'settings' ],
      'vendedor': [ 'dashboard', 'search', 'artpieces', 'articles', 'categories', 'customers', 'orders', 'reviews', 'sales', 'suppliers', 'settings' ], // Vendedor NO puede ver employees
      'artista': [ 'dashboard', 'search', 'artpieces', 'categories',  'orders', 'reviews', 'sales', 'settings' ], // Artista NO puede ver articles, employees, customers, suppliers
      'customer': [ 'dashboard', 'orders', 'reviews', 'settings' ]
    }
    const userPermissions = permissions[user.userType] || []
    console.log(`🔍 Checking permission for ${view}, user type: ${user.userType}, has permission: ${userPermissions.includes(view)}`)
    
    return userPermissions.includes(view) 
  }
  // Funciones para manejar el registro:
  const handleShowRegisterEmployee = () => {
    setShowRegisterEmployee(true)
  }
  const handleBackToMain = () => {
    setShowRegisterEmployee(false)
  }
  const handleRegistrationSuccess = () => {
    setShowRegisterEmployee(false)
    // Refrescar datos si es necesario
    if (currentView === 'employees') {
      employeesData.fetchEmployees()
    }
  }
  console.log("🐛 DEBUG MainPage - User:", user);
  console.log("🐛 DEBUG MainPage - Current view:", currentView);
  console.log("🐛 DEBUG MainPage - Has permission:", hasPermission(currentView));
  const renderContent = () => {
    // Si esta mostrando registro de empleado
    if (showRegisterEmployee) {
      return (
        <RegisterEmployee onBack={handleBackToMain} onSuccess={handleRegistrationSuccess}/>
      )
    }
    // Verificar permisos antes de renderizar
    if (!hasPermission(currentView)) {
      console.log("❌ No permission for view:", currentView, "User type:", user?.userType);
      return (
        <div className="p-6 bg-white min-h-screen font-[Alexandria] flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-600 mb-4">Acceso Denegado</h1>
            <p className="text-gray-600">No tienes permisos para acceder a esta sección.</p>
            <p className="text-sm text-gray-500 mt-2">Tu rol: {user?.userType}</p>
            <p className="text-sm text-gray-500">Sección: {currentView}</p>
          </div>
        </div>
      );
    }
    switch (currentView) {
      case 'dashboard':
        return <Dashboard/>
      case 'search':
        return <GlobalSearch/>
      case 'artpieces':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer  config={artPiecesConfig} {...artPiecesData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Piezas de Arte')} categoriesData={categoriesData}/>
            </div>
          </div>
        )
      case 'articles':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={articlesConfig} {...articlesData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Artículos')} categoriesData={categoriesData} suppliersData={suppliersData}/>
            </div>
          </div>
        )
      case 'employees':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              {/* BOTON DE REGISTRAR EMPLEADOS */}
              <div className="mb-4 flex justify-end">
                <button onClick={handleShowRegisterEmployee} className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white text-sm font-medium rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 shadow-sm hover:shadow-md">
                  <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                  </svg>
                  Registro Completo de Empleado
                </button>
              </div>
              <TableContainer config={employeesConfig} {...employeesData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Empleados')} onRegister={handleShowRegisterEmployee}/>
            </div>
          </div>
        )
      case 'categories':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={categoriesConfig} {...categoriesData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Categorías')}/>
            </div>
          </div>
        )
      case 'customers':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={customersConfig} {...customersData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Clientes')}/>
            </div>
          </div>
        )
      case 'orders':
        // DEBUG: Verificar que los datos llegan
        console.log('🐛 Orders render - articlesData:', articlesData.articles?.length || 0)
        console.log('🐛 Orders render - artPiecesData:', artPiecesData.artPieces?.length || 0)
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={ordersConfig} {...ordersData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Pedidos')} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData}/>
            </div>
          </div>
        )
      case 'reviews':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={reviewsConfig} {...reviewsData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Reseñas')} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData}/>
            </div>
          </div>
        )
      case 'sales':
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={salesConfig} {...salesData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Ventas')} ordersData={ordersData}/>
            </div>
          </div>
        )
      case 'suppliers':
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={suppliersConfig} {...suppliersData.createHandlers(API)} onExport={(format, data) => handleDataExport(format, data, 'Proveedores')}/>
            </div>
          </div>
        )
      case 'settings':
        return <SettingsPage/>
      default: 
        return <Dashboard/>
    }
  }
  return (
    <div className="flex h-screen bg-white font-[Alexandria] overflow-hidden">
      <Sidebar currentView={currentView} setCurrentView={setCurrentView} onLogout={handleLogout}/>
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header onLogout={handleLogout}/>
        <div className="flex-1 overflow-auto">
          {renderContent()}
        </div>
      </div>
    </div>
  )
}
export default MainPage