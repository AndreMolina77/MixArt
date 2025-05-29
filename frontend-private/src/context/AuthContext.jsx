import { createContext, useState, useEffect } from "react"
const API = "http://localhost:4000/api"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authCookie, setAuthCookie] = useState(null)

  const Login = async (email, password) => {
    try {
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
        credentials: "include" // Para incluir cookies de la peticion
      })
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || "Error en la autenticación")
      }
      const data = await response.json()
      // Guardar token en localStorage como respaldo
      localStorage.setItem("authToken", data.token)
      // Guardar la informacion del usuario
      const userInfo = { email }
      localStorage.setItem("user", JSON.stringify(userInfo))
      
      setAuthCookie(data.token)
      setUser(userInfo)

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
        credentials: "include", // Para incluir cookies de la peticion
      })
    } catch (error) {
      console.error("Error durante el logout:", error)
    } finally {
      // Limpiar datos locales independientemente de si la peticion al servidor tuvo exito
      localStorage.removeItem("authToken")
      localStorage.removeItem("user")
      setAuthCookie(null)
      setUser(null)
    }
  }
  // En useEffect para restaurar la sesion y solo verificar servidor al inicio inicial
  useEffect(() => {
    // Primero, se restaura la sesion desde localStorage (comportamiento normal)
    const token = localStorage.getItem("authToken")
    const savedUser = localStorage.getItem("user")
    if (token) {
      setAuthCookie(token)
      if (savedUser) {
        setUser(JSON.parse(savedUser))
      }
    }
    // Adicionalmente, verificamos si el servidor está disponible
    // Pero solo usamos esto para limpiar la sesion si NO HAY conexion
    const checkServer = async () => {
      try {
        // Solo hacemos una solicitud ping básica para ver si el servidor está disponible
        await fetch(`${API}`, {
          method: "HEAD",
          credentials: "include"
          // Importante: No esperamos respuesta correcta, solo que el servidor responda
        })
        // Si llegamos aquí, el servidor está respondiendo, no hacemos nada
      } catch (error) {
        // SOLO si el servidor no está disponible, limpiamos la sesión
        console.log("Servidor no disponible, cerrando sesión", error.message)
        localStorage.removeItem("authToken")
        localStorage.removeItem("user")
        setAuthCookie(null)
        setUser(null)
      }
    }
    // Ejecutamos la verificacion del servidor
    checkServer()
  }, [])
  return (
    <AuthContext.Provider value={{ user, Login, logout, authCookie, setAuthCookie, API }}>
      {children}
    </AuthContext.Provider>
  )
}
// Export el contexto para poder usarlo en el hook
export { AuthContext }