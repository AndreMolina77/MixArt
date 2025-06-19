import { useAuth } from '../useAuth.js'
import useDataSuppliers from '../SuppliersHooks/useDataSuppliers'
import useDataEmployees from '../EmployeesHooks/useDataEmployees'
import useDataCustomers from '../CustomersHooks/useDataCustomers'
import useDataArticles from '../ArticlesHooks/useDataArticles'
import useDataCategories from '../CategoriesHooks/useDataCategories'
import useDataArtPieces from '../ArtPiecesHooks/useDataArtPieces'
import useDataOrders from '../OrdersHooks/useDataOrders'
import useDataReviews from '../ReviewsHooks/useDataReviews'
import useDataSales from '../SalesHooks/useDataSales'

export const useConditionalData = () => {
  const { user } = useAuth()
  // TODOS los hooks se ejecutan SIEMPRE (cumple reglas de React)
  const allSuppliersData = useDataSuppliers()
  const allEmployeesData = useDataEmployees()
  const allCustomersData = useDataCustomers()
  const allArticlesData = useDataArticles()
  const allCategoriesData = useDataCategories()
  const allArtPiecesData = useDataArtPieces()
  const allOrdersData = useDataOrders()
  const allReviewsData = useDataReviews()
  const allSalesData = useDataSales()
  
  const canAccess = (section) => {
    if (!user?.userType) return false
    
    const permissions = {
      'admin': ['suppliers', 'employees', 'customers', 'articles', 'categories', 'artpieces', 'orders', 'reviews', 'sales'],
      'vendedor': ['suppliers', 'customers', 'articles', 'categories', 'artpieces', 'orders', 'reviews', 'sales'],
      'artista': ['categories', 'artpieces', 'orders', 'reviews', 'sales'],
      'customer': ['orders', 'reviews']
    }
    
    return permissions[user.userType]?.includes(section) || false
  }
  // Objeto vacio para cuando no hay acceso
  const emptyData = { 
    data: [], 
    loading: false, 
    fetch: () => {},
    // Propiedades especificas segun el tipo de data
    suppliers: [],
    employees: [],
    customers: [],
    articles: [],
    categories: [],
    artPieces: [],
    orders: [],
    reviews: [],
    sales: []
  }
  return {
    suppliersData: canAccess('suppliers') ? allSuppliersData : emptyData,
    employeesData: canAccess('employees') ? allEmployeesData : emptyData,
    customersData: canAccess('customers') ? allCustomersData : emptyData,
    articlesData: canAccess('articles') ? allArticlesData : emptyData,
    categoriesData: canAccess('categories') ? allCategoriesData : emptyData,
    artPiecesData: canAccess('artpieces') ? allArtPiecesData : emptyData,
    ordersData: canAccess('orders') ? allOrdersData : emptyData,
    reviewsData: canAccess('reviews') ? allReviewsData : emptyData,
    salesData: canAccess('sales') ? allSalesData : emptyData,
    canAccess
  }
}