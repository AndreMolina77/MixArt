import { useEffect, useRef } from 'react'
import { BarChart3, TrendingUp, ShoppingCart, Eye, Star, DollarSign, Package, Users } from 'lucide-react'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  LineElement, 
  PointElement,
  BarController,
  DoughnutController,
  LineController
} from 'chart.js'

// Register all necessary Chart.js components including controllers
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend, 
  ArcElement, 
  LineElement, 
  PointElement,
  BarController,
  DoughnutController,
  LineController
)

const Dashboard = () => {
  const barChartRef = useRef(null)
  const pieChartRef = useRef(null)
  const lineChartRef = useRef(null)
  
  // Datos de ejemplo
  const dashboardStats = [
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
  
  const recentSales = [
    { artwork: "Sunset Dreams", artist: "María González", price: "$1,250", status: "Completado" },
    { artwork: "Abstract Mind", artist: "Carlos Ruiz", price: "$890", status: "Pendiente" },
    { artwork: "Ocean Waves", artist: "Ana Silva", price: "$2,100", status: "Completado" },
    { artwork: "City Lights", artist: "Pedro Morales", price: "$750", status: "Procesando" }
  ]
  
  // Datos para gráficos
  const monthlyData = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    datasets: [
      {
        label: 'Ventas ($)',
        data: [12000, 19000, 15000, 25000, 18000, 22000, 28000, 20000, 24000, 30000, 21000, 32000],
        backgroundColor: 'rgba(59, 130, 246, 0.8)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
        borderRadius: 6,
        borderSkipped: false,
      }
    ]
  }
  
  const artistsData = {
    labels: ['María González', 'Carlos Ruiz', 'Ana Silva', 'Pedro Morales', 'Otros'],
    datasets: [
      {
        label: 'Ventas por Artista',
        data: [15400, 11200, 9800, 7500, 8100],
        backgroundColor: [
          'rgba(16, 185, 129, 0.8)',
          'rgba(59, 130, 246, 0.8)',
          'rgba(139, 92, 246, 0.8)',
          'rgba(245, 158, 11, 0.8)',
          'rgba(239, 68, 68, 0.8)'
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(59, 130, 246, 1)',
          'rgba(139, 92, 246, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(239, 68, 68, 1)'
        ],
        borderWidth: 2
      }
    ]
  }
  
  const trendData = {
    labels: ['Sem 1', 'Sem 2', 'Sem 3', 'Sem 4', 'Sem 5', 'Sem 6'],
    datasets: [
      {
        label: 'Ventas Semanales',
        data: [5200, 6800, 5900, 7400, 6100, 8200],
        fill: true,
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 3,
        pointBackgroundColor: 'rgba(16, 185, 129, 1)',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 6,
        tension: 0.4
      }
    ]
  }
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  }
  
  const pieOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#6B7280',
          padding: 20,
          usePointStyle: true,
          pointStyle: 'circle'
        }
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8
      }
    }
  }
  
  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#fff',
        bodyColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: false
      }
    },
    scales: {
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#6B7280'
        }
      },
      y: {
        grid: {
          color: 'rgba(0, 0, 0, 0.1)'
        },
        ticks: {
          color: '#6B7280'
        }
      }
    }
  }
  
  useEffect(() => {
    // Limpiar graficos existentes
    if (barChartRef.current) {
      barChartRef.current.destroy()
    }
    if (pieChartRef.current) {
      pieChartRef.current.destroy()
    }
    if (lineChartRef.current) {
      lineChartRef.current.destroy()
    }
    
    // Crear grafico de barras
    const barCtx = document.getElementById('barChart')
    if (barCtx) {
      barChartRef.current = new ChartJS(barCtx, {
        type: 'bar',
        data: monthlyData,
        options: chartOptions
      })
    }
    
    // Crear grafico de pie
    const pieCtx = document.getElementById('pieChart')
    if (pieCtx) {
      pieChartRef.current = new ChartJS(pieCtx, {
        type: 'doughnut',
        data: artistsData,
        options: pieOptions
      })
    }
    
    // Crear grafico de línea
    const lineCtx = document.getElementById('lineChart')
    if (lineCtx) {
      lineChartRef.current = new ChartJS(lineCtx, {
        type: 'line',
        data: trendData,
        options: lineOptions
      })
    }
    
    // Cleanup function
    return () => {
      if (barChartRef.current) {
        barChartRef.current.destroy()
      }
      if (pieChartRef.current) {
        pieChartRef.current.destroy()
      }
      if (lineChartRef.current) {
        lineChartRef.current.destroy()
      }
    }
  }, [])
  
  return (
    <div className="p-6 bg-white min-h-screen font-sans">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">Resumen de tu tienda de arte</p>
        </div>
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {dashboardStats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 hover:border-gray-300">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`p-3 rounded-lg ${stat.color} shadow-md`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`flex items-center text-sm font-medium ${stat.trend === 'up' ? 'text-emerald-600' : 'text-red-500'}`}>
                      <TrendingUp className="w-4 h-4 mr-1"/>
                      {stat.change}
                    </div>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        
        {/* Graficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Grafico de Ventas Mensuales */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Ventas Mensuales</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="h-64">
              <canvas id="barChart"></canvas>
            </div>
          </div>
          
          {/* Grafico de Artistas */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Ventas por Artista</h3>
              <div className="p-2 bg-purple-100 rounded-lg">
                <Star className="w-5 h-5 text-purple-600" />
              </div>
            </div>
            <div className="h-64">
              <canvas id="pieChart"></canvas>
            </div>
          </div>
        </div>
        
        {/* Segunda fila de graficos */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Tendencia Semanal */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Tendencia Semanal</h3>
              <div className="p-2 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
            </div>
            <div className="h-64">
              <canvas id="lineChart"></canvas>
            </div>
          </div>
          
          {/* Metricas Rapidas */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Métricas Rápidas</h3>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Eye className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <span className="text-gray-700 font-medium">Artículos en Stock</span>
                <span className="text-2xl font-bold text-blue-600">342</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
                <span className="text-gray-700 font-medium">Pedidos Pendientes</span>
                <span className="text-2xl font-bold text-green-600">18</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border border-purple-200">
                <span className="text-gray-700 font-medium">Reviews Promedio</span>
                <span className="text-2xl font-bold text-purple-600">4.8 ⭐</span>
              </div>
              <div className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <span className="text-gray-700 font-medium">Artistas Activos</span>
                <span className="text-2xl font-bold text-orange-600">12</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Tabla de Ventas Recientes */}
        <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">Ventas Recientes</h3>
            <div className="p-2 bg-green-100 rounded-lg">
              <ShoppingCart className="w-5 h-5 text-green-600" />
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Obra de Arte</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Artista</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Precio</th>
                  <th className="text-left py-3 px-4 font-semibold text-gray-700">Estado</th>
                </tr>
              </thead>
              <tbody>
                {recentSales.map((sale, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-100 to-pink-200 border border-pink-300 rounded-lg flex items-center justify-center">
                          <Eye className="w-5 h-5 text-pink-600" />
                        </div>
                        <span className="font-medium text-gray-800">{sale.artwork}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-700">{sale.artist}</td>
                    <td className="py-4 px-4 font-semibold text-gray-800">{sale.price}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                        sale.status === 'Completado' 
                          ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' 
                          : sale.status === 'Pendiente'
                          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                          : 'bg-blue-100 text-blue-800 border border-blue-200'
                      }`}>
                        {sale.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard