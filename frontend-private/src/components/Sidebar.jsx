import { useState } from 'react';
import { Search, BarChart3, Palette, FileText, Users, Grid3X3, UserCheck, ShoppingCart, Star, TrendingUp, Truck, Bookmark, Settings, Power, ChevronLeft, ChevronRight, X } from 'lucide-react';
import menuItems from '../data/MenuData.js'

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  return (
    <div className={`bg-[#E07A5F] h-screen transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } flex flex-col`}>
      {/* Header */}
      <div className="bg-[#A9A9A9] h-16 flex items-center justify-between px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-black font-alexandria font-bold text-lg">MixArt</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-8 h-8 bg-black rounded flex items-center justify-center mx-auto">
            <span className="text-white font-bold text-sm">M</span>
          </div>
        )}
        <button onClick={toggleSidebar} className="text-black hover:bg-gray-400 rounded p-1 transition-colors duration-200">
          <X size={20} />
        </button>
      </div>
      {/* Menu Items */}
      <div className="flex-1 py-4">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          return (
            <div key={item.id} className={`flex items-center px-4 py-3 mx-2 rounded cursor-pointer transition-colors duration-200 ${
                item.active ? 'bg-black bg-opacity-20' : 'hover:bg-black hover:bg-opacity-10'
              }`}>
              <IconComponent size={28} className="text-black flex-shrink-0" />
              {!isCollapsed && (
                <span className="ml-3 text-black font-alexandria text-base">
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {/* Separador */}
      <div className="border-t border-black border-opacity-20 mx-4"></div>
      {/* Configuracion */}
      <div className="py-4">
        <div className="flex items-center px-4 py-3 mx-2 rounded cursor-pointer hover:bg-black hover:bg-opacity-10 transition-colors duration-200">
          <Settings size={28} className="text-black flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-black font-alexandria text-base">
              Configuración
            </span>
          )}
        </div>
      </div>
      {/* Logout */}
      <div className="pb-4">
        <div className="flex items-center px-4 py-3 mx-2 rounded cursor-pointer hover:bg-black hover:bg-opacity-10 transition-colors duration-200">
          <Power size={28} className="text-black flex-shrink-0" />
          {!isCollapsed && (
            <span className="ml-3 text-black font-alexandria text-base">
              Cerrar sesión
            </span>
          )}
        </div>
      </div>
      {/* Boton de alternancia de colapso */}
      <div className="absolute top-1/2 -right-3 transform -translate-y-1/2">
        <button onClick={toggleSidebar} className="bg-[#E07A5F] border-2 border-black rounded-full w-6 h-6 flex items-center justify-center hover:bg-opacity-80 transition-colors duration-200">
          {isCollapsed ? (
            <ChevronRight size={14} className="text-black" />
          ) : (
            <ChevronLeft size={14} className="text-black" />
          )}
        </button>
      </div>
    </div>
  )
}
export default Sidebar