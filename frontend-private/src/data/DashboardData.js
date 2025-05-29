import { DollarSign, Package, Users, Star } from 'lucide-react'
// Estadisticas principales
export const dashboardStats = [
  {
    title: "Ventas Totales",
    value: "$45,231",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
    color: "bg-gradient-to-br from-emerald-500 to-emerald-600"
  },
  {
    title: "Obras Vendidas",
    value: "156",
    change: "+8.2%",
    trend: "up", 
    icon: Package,
    color: "bg-gradient-to-br from-blue-500 to-blue-600"
  },
  {
    title: "Nuevos Clientes",
    value: "24",
    change: "+15.3%",
    trend: "up",
    icon: Users,
    color: "bg-gradient-to-br from-purple-500 to-purple-600"
  },
  {
    title: "Valoración Promedio",
    value: "4.8",
    change: "+0.3",
    trend: "up",
    icon: Star,
    color: "bg-gradient-to-br from-orange-500 to-orange-600"
  }
]
// Ventas recientes
export const recentSales = [
  { 
    artwork: "Sunset Dreams", 
    artist: "María González", 
    price: "$1,250", 
    status: "Completado" 
  },
  { 
    artwork: "Abstract Mind", 
    artist: "Carlos Ruiz", 
    price: "$890", 
    status: "Pendiente" 
  },
  { 
    artwork: "Ocean Waves", 
    artist: "Ana Silva", 
    price: "$2,100", 
    status: "Completado" 
  },
  { 
    artwork: "City Lights", 
    artist: "Pedro Morales", 
    price: "$750", 
    status: "Procesando" 
  }
]
// Artistas destacados
export const topArtists = [
  { 
    name: "María González", 
    sales: 12, 
    revenue: "$15,400" 
  },
  { 
    name: "Carlos Ruiz", 
    sales: 8, 
    revenue: "$11,200" 
  },
  { 
    name: "Ana Silva", 
    sales: 6, 
    revenue: "$9,800" 
  },
  { 
    name: "Pedro Morales", 
    sales: 5, 
    revenue: "$7,500" 
  }
]
// Datos para el grafico de ventas mensuales
export const monthlySalesData = [40, 65, 45, 80, 55, 70, 85, 60, 75, 90, 65, 95]
// Etiquetas de meses para el grafico
export const monthLabels = ['E', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']