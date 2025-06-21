import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => {
    const context = useContext(AuthContext)
    console.log("🎯 useAuth context:", context?.user?.userType)
    return context
} 