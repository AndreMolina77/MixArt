import { useAuth } from '../hooks/useAuth'
import Button from '../components/Button'

const Dashboard = () => {
  const { user, logout } = useAuth()

  const handleLogout = async () => {
    await logout()
  }
  return (
    <div className="min-h-screen bg-[#F4F1DE] flex items-center justify-center font-[Alexandria]">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-[#7A6E6E] mb-4">¡Bienvenido a MixArt!</h1>
        <p className="text-[#7A6E6E] mb-6">Has iniciado sesión exitosamente como:</p>
        <div className="bg-[#EBFEF5] rounded-md p-4 mb-6">
          <p className="font-semibold text-[#7A6E6E]">{user?.email || 'Usuario'}</p>
        </div>
        <Button Text="Cerrar Sesión" onClick={handleLogout} />
      </div>
    </div>
  )
}
export default Dashboard