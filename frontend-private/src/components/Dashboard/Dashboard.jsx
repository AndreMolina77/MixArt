import { BarChart3, TrendingUp, ShoppingCart, Eye, Star } from 'lucide-react'
import { dashboardStats, recentSales, topArtists, monthlySalesData, monthLabels } from '../../data/DashboardData.js'

const Dashboard = () => {
  return (
    <div className="p-6 bg-white min-h-screen font-[Alexandria]">
      <div className="max-w-7xl mx-auto">
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
        {/* Fila de graficos y tablas */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Resumen de ventas */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Ventas Mensuales</h3>
              <div className="p-2 bg-blue-100 rounded-lg">
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
            </div>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlySalesData.map((height, index) => (
                <div key={index} className="flex-1 flex flex-col items-center">
                  <div 
                    className="w-full bg-gradient-to-t from-blue-500 to-blue-400 rounded-t-md transition-all duration-500 shadow-sm hover:shadow-md"
                    style={{ height: `${height}%` }}
                  ></div>
                  <span className="text-xs text-gray-600 mt-2 font-medium">
                    {monthLabels[index]}
                  </span>
                </div>
              ))}
            </div>
          </div>
          {/* Artistas destacados */}
          <div className="bg-gradient-to-br from-white to-gray-50 border border-gray-200 rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-gray-800">Artistas Destacados</h3>
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
            </div>
            <div className="space-y-4">
              {topArtists.map((artist, index) => (
                <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-200 hover:border-gray-300 hover:shadow-md transition-all duration-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center shadow-md">
                      <span className="text-white font-semibold text-sm">
                        {artist.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-gray-800">{artist.name}</p>
                      <p className="text-sm text-gray-600">{artist.sales} ventas</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-gray-800">{artist.revenue}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Tabla de ventas recientes */}
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