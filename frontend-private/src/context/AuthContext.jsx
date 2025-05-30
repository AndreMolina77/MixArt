// src/context/AuthContext.jsx
import { createContext, useState, useEffect } from "react"

const API = "http://localhost:4000/api"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authCookie, setAuthCookie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Para incluir cookies en la peticion
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error en la autenticación")
      }
      const data = await response.json()
      // Guardar informacion del usuario
      const userInfo = { email }
      localStorage.setItem("user", JSON.stringify(userInfo))
      
      setUser(userInfo)
      // No guardamos el token en localStorage, solo dependemos de la cookie httpOnly
      return { success: true, message: data.message }
    } catch (error) {
      return { success: false, message: error.message }
    }
  }
  const logout = async () => {
    try {
      // Llamar al endpoint de logout en el backend para limpiar la cookie
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include", // Para incluir cookies en la peticion
      })
    } catch (error) {
      console.error("Error durante el logout:", error)
    } finally {
      // Limpiar datos locales independientemente de si la peticion al servidor tuvo exito
      localStorage.removeItem("user")
      setAuthCookie(null)
      setUser(null)
    }
  }
  // Verificar autenticacion al cargar la aplicacion
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Intentar restaurar usuario desde localStorage
        const savedUser = localStorage.getItem("user")
        
        if (savedUser) {
          // Verificar si la sesion sigue siendo valida con el servidor
          const response = await fetch(`${API}/validateAuthToken`, {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            }
          })
          if (response.ok) {
            // Sesión valida, restaurar usuario
            setUser(JSON.parse(savedUser))
            setAuthCookie(true) // Indicador de que hay cookie valida
          } else {
            // Sesión invalida, limpiar datos locales
            localStorage.removeItem("user")
            setUser(null)
            setAuthCookie(null)
          }
        }
      } catch (error) {
        console.error("Error checking auth:", error)
        // En caso de error, limpiar datos locales
        localStorage.removeItem("user")
        setUser(null)
        setAuthCookie(null)
      } finally {
        setIsLoading(false)
      }
    }
    checkAuth()
  }, [])
  return (
    <AuthContext.Provider value={{ user, Login, logout, authCookie, setAuthCookie, API, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
// Export el contexto para poder usarlo en el hook
export { AuthContext }