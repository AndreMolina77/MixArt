import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { toast } from 'react-hot-toast'
import Sidebar from '../components/Dashboard/Sidebar'
import Header from '../components/Dashboard/Header'
import Dashboard from '../components/Dashboard/Dashboard'
import TableContainer from '../components/Table/TableContainer'
// Importar todos los hooks
import useDataSuppliers from '../hooks/SuppliersHooks/useDataSuppliers'
import useDataEmployees from '../hooks/EmployeesHooks/useDataEmployees'
import useDataCustomers from '../hooks/CustomersHooks/useDataCustomers'
import useDataArticles from '../hooks/ArticlesHooks/useDataArticles'
import useDataCategories from '../hooks/CategoriesHooks/useDataCategories'
import useDataArtPieces from '../hooks/ArtPiecesHooks/useDataArtPieces'
import useDataOrders from '../hooks/OrdersHooks/useDataOrders'
import useDataReviews from '../hooks/ReviewsHooks/useDataReviews'
import useDataSales from '../hooks/SalesHooks/useDataSales'
// Importar configuraciones de tablas
import { articlesConfig, categoriesConfig, suppliersConfig, customersConfig, employeesConfig, artPiecesConfig, ordersConfig, reviewsConfig, salesConfig } from '../data/TableConfigs.js'

const MainPage = () => {
  const { user, logout, API } = useAuth()
  const [currentView, setCurrentView] = useState('dashboard')
  // Inicializar todos los hooks
  const suppliersData = useDataSuppliers()
  const employeesData = useDataEmployees()
  const customersData = useDataCustomers()
  const articlesData = useDataArticles()
  const categoriesData = useDataCategories()
  const artPiecesData = useDataArtPieces()
  const ordersData = useDataOrders()
  const reviewsData = useDataReviews()
  const salesData = useDataSales()

  const handleLogout = async () => {
    await logout()
  }
  // Funcion handleExport
  const handleExport = (format, data) => {
    console.log(`Exportando ${data?.length || 0} elementos en formato ${format}`)
    // In progress
  }
  // FIX: Handlers directos que NO usan setters
  const getHandlersForView = () => {
    switch (currentView) {
      case 'suppliers':
        return {
          data: suppliersData.suppliers,
          loading: suppliersData.loading,
          onAdd: async (data) => {
            console.log('🚀 === SUPPLIERS ADD ===')
            console.log('📦 Data recibido:', data)
            
            try {
              const response = await fetch(`${API}/suppliers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar proveedor")
              }
              toast.success('Proveedor registrado exitosamente')
              suppliersData.fetchSuppliers()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar proveedor")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === SUPPLIERS EDIT ===')
            console.log('ID:', id, 'Data:', data)
            
            try {
              const response = await fetch(`${API}/suppliers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar proveedor")
              }
              toast.success('Proveedor actualizado exitosamente')
              suppliersData.fetchSuppliers()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar proveedor")
              throw error
            }
          },
          onDelete: async (id) => await suppliersData.deleteSupplier(id)
        }
      case 'employees':
        return {
          data: employeesData.employees,
          loading: employeesData.loading,
          onAdd: async (data) => {
            console.log('🚀 === EMPLOYEES ADD ===')
            console.log('📦 Data recibido:', data)
            
            try {
              const response = await fetch(`${API}/employees`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar empleado")
              }
              toast.success('Empleado registrado exitosamente')
              employeesData.fetchEmployees()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar empleado")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === EMPLOYEES EDIT ===')
            
            try {
              const response = await fetch(`${API}/employees/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar empleado")
              }
              toast.success('Empleado actualizado exitosamente')
              employeesData.fetchEmployees()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar empleado")
              throw error
            }
          },
          onDelete: async (id) => await employeesData.deleteEmployee(id)
        }
      case 'customers':
        return {
          data: customersData.customers,
          loading: customersData.loading,
          onAdd: async (data) => {
            console.log('🚀 === CUSTOMERS ADD ===')
            console.log('📦 Data recibido:', data)
            
            try {
              const response = await fetch(`${API}/customers`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar cliente")
              }
              toast.success('Cliente registrado exitosamente')
              customersData.fetchCustomers()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar cliente")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === CUSTOMERS EDIT ===')
            try {
              const response = await fetch(`${API}/customers/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })    
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar cliente")
              }
              toast.success('Cliente actualizado exitosamente')
              customersData.fetchCustomers()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar cliente")
              throw error
            }
          },
          onDelete: async (id) => await customersData.deleteCustomer(id)
        }
      case 'articles': 
        return {
          data: articlesData.articles,
          loading: articlesData.loading,
          onAdd: async (data) => {
            console.log('🚀 === ARTICLES ADD ===')
            console.log('📦 Data recibido:', data)
            try {
              // Para artículos, usar FormData si hay imagen
              let body
              let headers = { credentials: "include" }
              
              if (data.image && data.image instanceof File) {
                console.log('📸 Detected file upload, using FormData')
                const formData = new FormData()
                Object.keys(data).forEach(key => {
                  formData.append(key, data[key])
                })
                body = formData
                // No set Content-Type for FormData, let browser set it
              } else {
                console.log('📝 No file, using JSON')
                headers["Content-Type"] = "application/json"
                body = JSON.stringify(data)
              }
              const response = await fetch(`${API}/articles`, {
                method: "POST",
                headers,
                credentials: "include",
                body
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar artículo")
              }
              toast.success('Artículo registrado exitosamente')
              articlesData.fetchArticles()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar artículo")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === ARTICLES EDIT ===')
            
            try {
              let body
              let headers = { credentials: "include" }
              
              if (data.image && data.image instanceof File) {
                const formData = new FormData()
                Object.keys(data).forEach(key => {
                  formData.append(key, data[key])
                })
                body = formData
              } else {
                headers["Content-Type"] = "application/json"
                body = JSON.stringify(data)
              }
              const response = await fetch(`${API}/articles/${id}`, {
                method: "PUT",
                headers,
                credentials: "include",
                body
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar artículo")
              }
              toast.success('Artículo actualizado exitosamente')
              articlesData.fetchArticles()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar artículo")
              throw error
            }
          },
          onDelete: async (id) => await articlesData.deleteArticle(id)
        }
      case 'categories':
        return {
          data: categoriesData.categories,
          loading: categoriesData.loading,
          onAdd: async (data) => {
            console.log('🚀 === CATEGORIES ADD ===')
            console.log('📦 Data recibido:', data)
            
            try {
              const response = await fetch(`${API}/categories`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar categoría")
              }
              toast.success('Categoría registrada exitosamente')
              categoriesData.fetchCategories()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar categoría")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === CATEGORIES EDIT ===')
            console.log('ID:', id, 'Data:', data)
            
            try {
              const response = await fetch(`${API}/categories/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar categoría")
              }
              toast.success('Categoría actualizada exitosamente')
              categoriesData.fetchCategories()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar categoría")
              throw error
            }
          },
          onDelete: async (id) => await categoriesData.deleteCategory(id)
        }
      case 'artPieces': 
        return {
          data: artPiecesData.artPieces,
          loading: artPiecesData.loading,
          onAdd: async (data) => {
            console.log('🚀 === ARTPIECES ADD ===')
            console.log('📦 Data recibido:', data)
            try {
              let body
              let headers = { credentials: "include" }
              
              if (data.image && data.image instanceof File) {
                console.log('📸 Detected file upload, using FormData')
                const formData = new FormData()
                Object.keys(data).forEach(key => {
                  formData.append(key, data[key])
                })
                body = formData
              } else {
                console.log('📝 No file, using JSON')
                headers["Content-Type"] = "application/json"
                body = JSON.stringify(data)
              }
              const response = await fetch(`${API}/artpieces`, {
                method: "POST",
                headers,
                credentials: "include",
                body
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar pieza de arte")
              }
              toast.success('Pieza de arte registrada exitosamente')
              artPiecesData.fetchArtPieces()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar pieza de arte")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === ARTPIECES EDIT ===')
            try {
              let body
              let headers = { credentials: "include" }
              
              if (data.image && data.image instanceof File) {
                const formData = new FormData()
                Object.keys(data).forEach(key => {
                  formData.append(key, data[key])
                })
                body = formData
              } else {
                headers["Content-Type"] = "application/json"
                body = JSON.stringify(data)
              }
              const response = await fetch(`${API}/artpieces/${id}`, {
                method: "PUT",
                headers,
                credentials: "include",
                body
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar pieza de arte")
              }
              toast.success('Pieza de arte actualizada exitosamente')
              artPiecesData.fetchArtPieces()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar pieza de arte")
              throw error
            }
          },
          onDelete: async (id) => await artPiecesData.deleteArtPiece(id)
        }
      case 'orders':
        return {
          data: ordersData.orders,
          loading: ordersData.loading,
          onAdd: async (data) => {
            console.log('🚀 === ORDERS ADD ===')
            try {
              const response = await fetch(`${API}/orders`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar pedido")
              }
              toast.success('Pedido registrado exitosamente')
              ordersData.fetchOrders()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar pedido")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === ORDERS EDIT EN MAINPAGE ===')
            console.log('ID:', id)
            console.log('Data recibido:', data)
            
            try {
              // Validar que los datos estén correctos
              if (!data.customerId || !data.items || !Array.isArray(data.items) || data.items.length === 0) {
                throw new Error("Datos de pedido incompletos")
              }
              // Preparar los datos para enviar
              const orderData = {
                customerId: data.customerId,
                items: data.items.map(item => ({
                  itemType: item.itemType,
                  itemId: item.itemId,
                  quantity: parseInt(item.quantity),
                  subtotal: parseFloat(item.subtotal || 0)
                })),
                total: parseFloat(data.total || 0),
                status: data.status
              }
              console.log('📤 Enviando datos procesados:', orderData)
              const response = await fetch(`${API}/orders/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(orderData)
              })
              console.log('🌐 Response status:', response.status)
              if (!response.ok) {
                const errorData = await response.json()
                console.log('❌ Error del servidor:', errorData)
                throw new Error(errorData.message || "Error al actualizar pedido")
              }
              const responseData = await response.json()
              console.log('✅ Respuesta exitosa:', responseData)
              toast.success('Pedido actualizado exitosamente')
              ordersData.fetchOrders()
            } catch (error) {
              console.error("❌ Error en onEdit orders:", error)
              toast.error(error.message || "Error al actualizar pedido")
              throw error
            }
          },
          onDelete: async (id) => await ordersData.deleteOrder(id)
        }
      case 'reviews':
        return {
          data: reviewsData.reviews,
          loading: reviewsData.loading,
          onAdd: async (data) => {
            console.log('🚀 === REVIEWS ADD ===')
            try {
              const response = await fetch(`${API}/reviews`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar reseña")
              }
              toast.success('Reseña registrada exitosamente')
              reviewsData.fetchReviews()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar reseña")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === REVIEWS EDIT ===')
            try {
              const response = await fetch(`${API}/reviews/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar reseña")
              }
              toast.success('Reseña actualizada exitosamente')
              reviewsData.fetchReviews()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar reseña")
              throw error
            }
          },
          onDelete: async (id) => await reviewsData.deleteReview(id)
        }
      case 'sales':
        return {
          data: salesData.sales,
          loading: salesData.loading,
          onAdd: async (data) => {
            console.log('🚀 === SALES ADD ===')
            try {
              const response = await fetch(`${API}/sales`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al registrar venta")
              }
              toast.success('Venta registrada exitosamente')
              salesData.fetchSales()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al registrar venta")
              throw error
            }
          },
          onEdit: async (id, data) => {
            console.log('🔧 === SALES EDIT ===')
            try {
              const response = await fetch(`${API}/sales/${id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(data)
              })
              if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Error al actualizar venta")
              }
              toast.success('Venta actualizada exitosamente')
              salesData.fetchSales()
            } catch (error) {
              console.error("Error:", error)
              toast.error(error.message || "Error al actualizar venta")
              throw error
            }
          },
          onDelete: async (id) => await salesData.deleteSale(id)
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
        const artPiecesHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer  config={artPiecesConfig} data={artPiecesHandler.data} onAdd={artPiecesHandler.onAdd} onEdit={artPiecesHandler.onEdit} onDelete={artPiecesHandler.onDelete} onExport={handleExport} isLoading={artPiecesHandler.loading} categoriesData={categoriesData}/>
            </div>
          </div>
        )
      case 'articles':
        const articlesHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={articlesConfig} data={articlesHandler.data} onAdd={articlesHandler.onAdd}  onEdit={articlesHandler.onEdit} onDelete={articlesHandler.onDelete} onExport={handleExport} isLoading={articlesHandler.loading} categoriesData={categoriesData} suppliersData={suppliersData}/>
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
        const ordersHandler = getHandlersForView()
        // DEBUG: Verificar que los datos llegan
        console.log('🐛 Orders render - articlesData:', articlesData.articles?.length || 0)
        console.log('🐛 Orders render - artPiecesData:', artPiecesData.artPieces?.length || 0)
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={ordersConfig} data={ordersHandler.data} onAdd={ordersHandler.onAdd} onEdit={ordersHandler.onEdit} onDelete={ordersHandler.onDelete} onExport={handleExport} isLoading={ordersHandler.loading} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData}/>
            </div>
          </div>
        )
      case 'reviews':
        const reviewsHandler = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={reviewsConfig} data={reviewsHandler.data} onAdd={reviewsHandler.onAdd} onEdit={reviewsHandler.onEdit} onDelete={reviewsHandler.onDelete}  onExport={handleExport} isLoading={reviewsHandler.loading} customersData={customersData} articlesData={articlesData} artPiecesData={artPiecesData}/>
            </div>
          </div>
        )
      case 'sales':
        const salesHandlers = getHandlersForView()
        return (
          <div className="p-6 bg-white min-h-screen font-[Alexandria]">
            <div className="max-w-7xl mx-auto">
              <TableContainer config={salesConfig} data={salesHandlers.data} onAdd={salesHandlers.onAdd} onEdit={salesHandlers.onEdit} onDelete={salesHandlers.onDelete} onExport={handleExport} isLoading={salesHandlers.loading} ordersData={ordersData}/>
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