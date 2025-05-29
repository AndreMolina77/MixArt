import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Sidebar from '../components/Dashboard/Sidebar'
import Header from '../components/Dashboard/Header'
import Dashboard from '../components/Dashboard/Dashboard'
import TableContainer from '../components/Table/TableContainer'
// Importar todos los hooks
import useDataSuppliers from '../hooks/'
import useDataEmployees from '../hooks/EmployeesHooks/useDataEmployees'
import useDataCustomers from '../hooks/CustomersHooks/useDataCustomers'
import useDataArticles from '../hooks/ArticlesHooks/useDataArticles'
import useDataCategories from '../hooks/CategoriesHooks/useDataCategories'
// Importar configuraciones de tablas
import { articlesConfig, categoriesConfig, suppliersConfig, customersConfig, employeesConfig } from '../data/TableConfigs.js'

const MainPage = () => {
  const { user, logout } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  // Inicializar todos los hooks
  const suppliersData = useDataSuppliers()
  const employeesData = useDataEmployees()
  const customersData = useDataCustomers()
  const articlesData = useDataArticles()
  const categoriesData = useDataCategories()

  const handleLogout = async () => {
    await logout()
  }
  // Handlers dinamicos basados en la vista actual
  const getHandlersForView = () => {
    switch (currentView) {
      case 'suppliers':
        return {
          data: suppliersData.suppliers,
          loading: suppliersData.loading,
          onAdd: async (data) => {
            // Simular evento de formulario
            const fakeEvent = { preventDefault: () => {} }
            // Setear los datos en el hook
            Object.keys(data).forEach(key => {
              const setter = suppliersData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
              if (setter) setter(data[key])
            })
            await suppliersData.saveSupplier(fakeEvent)
          },
          onEdit: async (id, data) => {
            const item = suppliersData.suppliers.find(s => s._id === id)
            if (item) {
              await suppliersData.updateSupplier(item)
              // Setear los nuevos datos
              Object.keys(data).forEach(key => {
                const setter = suppliersData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                if (setter) setter(data[key])
              })
              const fakeEvent = { preventDefault: () => {} }
              await suppliersData.handleEdit(fakeEvent)
            }
          },
          onDelete: async (id) => await suppliersData.deleteSupplier(id)
        }
      case 'employees':
        return {
          data: employeesData.employees,
          loading: employeesData.loading,
          onAdd: async (data) => {
            const fakeEvent = { preventDefault: () => {} }
            Object.keys(data).forEach(key => {
              const setter = employeesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
              if (setter) setter(data[key])
            })
            await employeesData.saveEmployee(fakeEvent)
          },
          onEdit: async (id, data) => {
            const item = employeesData.employees.find(e => e._id === id)
            if (item) {
              await employeesData.updateEmployee(item)
              Object.keys(data).forEach(key => {
                const setter = employeesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                if (setter) setter(data[key])
              })
              const fakeEvent = { preventDefault: () => {} }
              await employeesData.handleEdit(fakeEvent)
            }
          },
          onDelete: async (id) => await employeesData.deleteEmployee(id)
        }
      case 'customers':
        return {
          data: customersData.customers,
          loading: customersData.loading,
          onAdd: async (data) => {
            const fakeEvent = { preventDefault: () => {} }
            Object.keys(data).forEach(key => {
              const setter = customersData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
              if (setter) setter(data[key])
            })
            await customersData.saveCustomer(fakeEvent)
          },
          onEdit: async (id, data) => {
            const item = customersData.customers.find(c => c._id === id)
            if (item) {
              await customersData.updateCustomer(item)
              Object.keys(data).forEach(key => {
                const setter = customersData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                if (setter) setter(data[key])
              })
              const fakeEvent = { preventDefault: () => {} }
              await customersData.handleEdit(fakeEvent)
            }
          },
          onDelete: async (id) => await customersData.deleteCustomer(id)
        }
        case 'articles': 
        return {
          data: articlesData.articles,
          loading: articlesData.loading,
          onAdd: async (data) => {
            const fakeEvent = { preventDefault: () => {} }
            Object.keys(data).forEach(key => {
              const setter = articlesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
              if (setter) setter(data[key])
            })
            await articlesData.saveArticle(fakeEvent)
          },
          onEdit: async (id, data) => {
            const item = articlesData.articles.find(a => a._id === id)
            if (item) {
              await articlesData.updateArticle(item)
              Object.keys(data).forEach(key => {
                const setter = articlesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                if (setter) setter(data[key])
              })
              const fakeEvent = { preventDefault: () => {} }
              await articlesData.handleEdit(fakeEvent)
            }
          },
          onDelete: async (id) => await articlesData.deleteArticle(id)
        }
        case 'categories':
          return {
            data: categoriesData.categories,
            loading: categoriesData.loading,
            onAdd: async (data) => {
              const fakeEvent = { preventDefault: () => {} }
              Object.keys(data).forEach(key => {
                const setter = categoriesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                if (setter) setter(data[key])
              })
              await categoriesData.saveCategory(fakeEvent)
            },
            onEdit: async (id, data) => {
              const item = categoriesData.categories.find(c => c._id === id)
              if (item) {
                await categoriesData.updateCategory(item)
                Object.keys(data).forEach(key => {
                  const setter = categoriesData[`set${key.charAt(0).toUpperCase() + key.slice(1)}`]
                  if (setter) setter(data[key])
                })
                const fakeEvent = { preventDefault: () => {} }
                await categoriesData.handleEdit(fakeEvent)
              }
            },
            onDelete: async (id) => await categoriesData.deleteCategory(id)
          }
      default:
        return {
          data: [],
          loading: false,
          onAdd: async (data) => console.log('Add:', data),
          onEdit: async (id, data) => console.log('Edit:', id, data),
          onDelete: async (id) => console.log('Delete:', id)
        }
    }
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
        const articlesHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={articlesConfig} data={articlesHandler.data} onAdd={articlesHandler.onAdd} onEdit={articlesHandler.onEdit} onDelete={articlesHandler.onDelete} onExport={handleExport} isLoading={articlesHandler.loading} categoriesData={categoriesData} suppliersData={suppliersData}/>
            </div>
          </div>
        )
      case 'employees':
        const employeesHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={employeesConfig} data={employeesHandler.data} onAdd={employeesHandler.onAdd} onEdit={employeesHandler.onEdit} onDelete={employeesHandler.onDelete} onExport={handleExport} isLoading={employeesHandler.loading}/>
            </div>
          </div>
        )
      case 'categories':
        const categoriesHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={categoriesConfig} data={categoriesHandler.data} onAdd={categoriesHandler.onAdd} onEdit={categoriesHandler.onEdit} onDelete={categoriesHandler.onDelete} onExport={handleExport} isLoading={categoriesHandler.loading}/>
            </div>
          </div>
        )
      case 'customers':
        const customersHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={customersConfig} data={customersHandler.data} onAdd={customersHandler.onAdd} onEdit={customersHandler.onEdit} onDelete={customersHandler.onDelete} onExport={handleExport} isLoading={customersHandler.loading}/>
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
        const suppliersHandlers = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={suppliersConfig} data={suppliersHandlers.data} onAdd={suppliersHandlers.onAdd} onEdit={suppliersHandlers.onEdit} onDelete={suppliersHandlers.onDelete} onExport={handleExport} isLoading={suppliersHandlers.loading}/>
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
        return <Dashboard/>
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