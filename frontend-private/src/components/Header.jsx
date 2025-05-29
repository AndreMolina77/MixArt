import { Bell, User } from 'lucide-react'
import { useAuth } from '../hooks/useAuth'

const Header = ({ onLogout }) => {
  const { user } = useAuth();
  // Funcion para obtener el nombre a mostrar
  const getDisplayName = () => {
    if (!user?.email) return 'Usuario';
    // Si es el email del admin, mostrar "Admin"
    if (user.email === 'thehillsami@gmail.com') {
      return 'Admin';
    }
    // Para otros usuarios, extraer el nombre del email (parte antes del @)
    const emailName = user.email.split('@')[0];
    // Capitalizar primera letra
    return emailName.charAt(0).toUpperCase() + emailName.slice(1);
  }
  // Funcion para obtener el rol/título
  const getUserRole = () => {
    if (!user?.email) return 'Empleado';
  
    if (user.email === 'thehillsami@gmail.com') {
      return 'Administrador';
    }
    // En progreso
  }
  return (
    <div className="bg-[#E0DCC6] px-6 py-4 flex items-center justify-between font-[Alexandria] border-b border-[#7A6E6E]/10 shadow-sm">
      {/* Lado izquierdo - Saludo y estadisticas */}
      <div className="flex-1">
        <h1 className="text-xl font-bold text-[#7A6E6E] mb-1">Bienvenido de vuelta, {getDisplayName()}</h1>
        <p className="text-sm text-[#7A6E6E]/70">¡Aquí están las estadísticas del inventario de la tienda en línea!</p>
      </div>
      {/* Lado derecho - Notificaciones y perfil */}
      <div className="flex items-center space-x-4">
        {/* Notificaciones */}
        <div className="relative">
          <button className="p-3 rounded-full hover:bg-[#7A6E6E]/10 transition-colors duration-200 relative group">
            <Bell className="w-6 h-6 text-[#7A6E6E] group-hover:text-[#7A6E6E]/80" />
            {/* Badge de notificación */}
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium animate-pulse">2</span>
          </button>
        </div>
        {/* Separador vertical */}
        <div className="w-px h-8 bg-[#7A6E6E]/20"></div>
        {/* Perfil de usuario */}
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <div className="text-sm font-semibold text-[#7A6E6E]">{getDisplayName()}</div>
            <div className="text-xs text-[#7A6E6E]/70">{getUserRole()}</div>
          </div>
          {/* Avatar */}
          <div className="relative group cursor-pointer">
            <button className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:shadow-lg transition-all duration-200 transform hover:scale-105 group-hover:from-blue-600 group-hover:to-blue-700">
              <User className="w-5 h-5 text-white" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header