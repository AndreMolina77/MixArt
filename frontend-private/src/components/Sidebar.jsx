import { useState } from 'react'
import { Settings, Power, Menu, X } from 'lucide-react'
import menuItems from '../data/MenuData.js'
import BlackLogo from '../assets/mixartnegro.png' 
import Monogram from '../assets/image.png'

const Sidebar = ({ currentView, setCurrentView, onLogout }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }
  const handleMenuClick = (itemId) => {
    setCurrentView(itemId)
  }
  return (
    <div className={`bg-[#E07A5F] h-screen transition-all duration-300 ease-in-out ${isCollapsed ? 'w-20' : 'w-64'} flex flex-col relative shadow-lg`}>
      {/* Header con Logo */}
      <div className="bg-[#A9A9A9] h-16 flex items-center justify-between px-4 border-b border-gray-300">
        {!isCollapsed && (
          <div className="flex items-center gap-3">
            <img src={BlackLogo} alt="MixArt Logo" className="h-8 w-auto object-contain"
              onError={(e) => {
                // Fallback si no existe la imagen
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}/>
            {/* Fallback visual si no hay imagen */}
            <div className="flex items-center gap-2" style={{display: 'none'}}>
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-black font-[Alexandria] font-bold text-lg">MixArt</span>
            </div>
          </div>
        )} 
        {isCollapsed && (
          <div className="mx-auto">
            <img src={Monogram}alt="MixArt Logo" className="w-24 h-24 object-contain"
                onError={(e) => {
                // Fallback si no existe la imagen
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}/>
            {/* Fallback visual si no hay imagen */}
            <div className="w-12 h-12 bg-black rounded-lg flex items-center justify-center" style={{display: 'none'}}>
              <span className="text-white font-bold text-lg">M</span>
            </div>
          </div>
        )}
        <button  onClick={toggleSidebar} className="text-black hover:bg-gray-300 rounded-lg p-2 transition-colors duration-200">
          {isCollapsed ? <Menu size={20} /> : <X size={20} />}
        </button>
      </div>
      {/* Menu Items con Scroll */}
      <div className="flex-1 py-4 overflow-y-auto scrollbar-thin scrollbar-thumb-black/20 scrollbar-track-transparent">
        {menuItems.map((item) => {
          const IconComponent = item.icon;
          const isActive = currentView === item.id;
          return (
            <div key={item.id} onClick={() => handleMenuClick(item.id)} className={`flex items-center px-4 py-3 mx-2 mb-1 rounded-lg cursor-pointer transition-all duration-200 group ${isActive ? 'bg-white/20 shadow-md border-l-4 border-white' : 'hover:bg-white/10 hover:translate-x-1'}`}>
              <div className={`p-2 rounded-lg transition-colors duration-200 ${isActive ? 'bg-white text-[#E07A5F]' : 'text-white group-hover:bg-white/20'}`}>
                <IconComponent size={20} className="flex-shrink-0"/>
              </div>
              {!isCollapsed && (
                <span className={`ml-3 font-[Alexandria] text-sm font-medium transition-colors duration-200 ${
                  isActive ? 'text-white font-semibold' : 'text-white/90'}`}>
                  {item.label}
                </span>
              )}
            </div>
          )
        })}
      </div>
      {/* Separador */}
      <div className="border-t border-white/60 mx-4"></div>
      {/* Configuración */}
      <div className="py-3">
        <div className="flex items-center px-4 py-3 mx-2 mb-1 rounded-lg cursor-pointer hover:bg-white/10 hover:translate-x-1 transition-all duration-200 group">
          <div className="p-2 rounded-lg text-white group-hover:bg-white/20 transition-colors duration-200">
            <Settings size={20} className="flex-shrink-0" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-white/90 font-[Alexandria] text-sm font-medium">
              Configuración
            </span>
          )}
        </div>
      </div>
      {/* Logout */}
      <div className="pb-4">
        <div onClick={onLogout} className="flex items-center px-4 py-3 mx-2 mb-1 rounded-lg cursor-pointer hover:bg-red-500/20 hover:translate-x-1 transition-all duration-200 group">
          <div className="p-2 rounded-lg text-white group-hover:bg-red-500/30 transition-colors duration-200">
            <Power size={20} className="flex-shrink-0" />
          </div>
          {!isCollapsed && (
            <span className="ml-3 text-white/90 font-[Alexandria] text-sm font-medium">
              Cerrar sesión
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
export default Sidebar