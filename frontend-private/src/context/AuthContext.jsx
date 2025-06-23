import { createContext, useState, useEffect } from "react"
const API = "http://localhost:4000/api"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [authCookie, setAuthCookie] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const Login = async (email, password, rememberMe = false) => {
    try {
      console.log("🔐 === AUTH CONTEXT LOGIN ===")
      console.log("📧 Email:", email)
      
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: "include" // Para incluir cookies en la peticion
      })
      console.log("📡 Login response status:", response.status)

      const data = await response.json()
      console.log("📦 Login response data:", data)

      if (!response.ok) {
        console.log("❌ Login failed:", data.message)
        throw new Error(data.message || "Error en la autenticación")
      }
      console.log("✅ Login successful")
      // NECESITAMOS OBTENER EL USERTYPE DEL TOKEN O DEL SERVIDOR
      // Hacer una peticion adicional para obtener la info del usuario
      const userInfoResponse = await fetch(`${API}/validateAuthToken`, {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' }
      })
      console.log("📡 userInfoResponse status:", userInfoResponse.status)
      console.log("📡 userInfoResponse ok:", userInfoResponse.ok)
      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json()
        console.log("👤 User info from server:", userInfo)
        
        let userData = { 
          email, 
          userType: userInfo.userType,
          userId: userInfo.userId,
          id: userInfo.userId,  
          name: userInfo.name, 
          lastName: userInfo.lastName,
          profilePic: '' 
        }
       // AGREGAR: Para TODOS los usuarios (incluyendo admin), obtener datos completos
      try {
        let userDataEndpoint = ''
        if (userInfo.userType === 'admin') {
          userDataEndpoint = `${API}/admin/profile/data-public`
        } else if (userInfo.userType === 'customer') {
          userDataEndpoint = `${API}/customers/${userInfo.userId}`
        } else {
          userDataEndpoint = `${API}/employees/${userInfo.userId}`
        }
        console.log("🔍 Fetching complete user data from:", userDataEndpoint)
        
        const userDataResponse = await fetch(userDataEndpoint, {
          ...(userInfo.userType !== 'admin' && { credentials: 'include' })
        })
        if (userDataResponse.ok) {
          const completeUserData = await userDataResponse.json()
          console.log("👤 Complete user data with profilePic:", completeUserData.profilePic)
          // Actualizar userData con datos completos
          userData = {
            ...userData,
            name: completeUserData.name || userData.name,
            lastName: completeUserData.lastName || userData.lastName,
            profilePic: completeUserData.profilePic || '',
            phoneNumber: completeUserData.phoneNumber || '',
            id: userInfo.userType === 'admin' ? 'admin' : userInfo.userId
          }
        }
      } catch (error) {
        console.log("Error obteniendo datos completos en login:", error)
      }
        console.log("👤 userData final con profilePic:", userData)
        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setAuthCookie(true) // Indicador de que hay cookie valida
        
        return { success: true, message: data.message }
      } else {
        throw new Error("No se pudo obtener información del usuario")
      }
    } catch (error) {
      console.log("❌ Login error:", error.message)
      return { success: false, message: error.message }
    }
  }
  const GoogleLogin = async (userData) => {
    try {
      console.log("🔐 === GOOGLE AUTH CONTEXT LOGIN ===")
      console.log("📦 Datos recibidos:", userData)
      
      const userInfo = {
        email: userData.email,
        name: userData.name,
        lastName: userData.lastName,
        userType: userData.userType,
        isVerified: userData.isVerified,
        id: userData.id
      }
      localStorage.setItem("user", JSON.stringify(userInfo))
      setUser(userInfo)
      setAuthCookie(true)
      // Solo un toast aqui
      console.log("✅ Usuario autenticado correctamente con Google")

      return { success: true, message: "Autenticación con Google exitosa" }
    } catch (error) {
      console.log("❌ Google login error:", error.message)
      return { success: false, message: error.message }
    }
  }
  const logout = async () => {
    try {
      console.log("🚪 === LOGOUT ===")
      // Llamar al endpoint de logout en el backend para limpiar la cookie
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include", // Para incluir cookies en la petición
      })
      console.log("✅ Server logout successful")
    } catch (error) {
      console.error("❌ Error durante el logout:", error)
    } finally {
      // Limpiar datos locales independientemente de si la petición al servidor tuvo éxito
      console.log("🧹 Cleaning local data")
      localStorage.removeItem("user")
      setAuthCookie(null)
      setUser(null)
    }
  }
  // Verificar autenticacion al cargar la aplicación (SOLO UNA VEZ)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 === CHECKING INITIAL AUTH ===") 
        // Intentar restaurar usuario desde localStorage
        const savedUser = localStorage.getItem("user")
        console.log("💾 Saved user in localStorage:", savedUser)
        if (savedUser) {
          console.log("🔄 Found saved user, validating with server...")
          // Verificar si la sesión sigue siendo válida con el servidor
          const response = await fetch(`${API}/validateAuthToken`, {
            method: "POST",
            credentials: "include",
            headers: {
              'Content-Type': 'application/json'
            }
          })
          console.log("📡 Validation response status:", response.status)
          if (response.ok) {
            console.log("✅ Session valid - restoring user")
            const validationData = await response.json()
            console.log("📦 Validation data:", validationData)
            const savedUserData = JSON.parse(savedUser)
            // Obtener datos completos incluyendo profilePic
            let completeUserData = savedUserData
            if (validationData.userType === 'admin') {
              try {
                const adminDataResponse = await fetch(`${API}/admin/profile/data`, {
                  credentials: 'include'  // CON credentials aquí
                })
                if (adminDataResponse.ok) {
                  const adminInfo = await adminDataResponse.json()
                  completeUserData = {
                    ...savedUserData,
                    name: adminInfo.name || "Admin",
                    lastName: adminInfo.lastName || "MixArt",
                    profilePic: adminInfo.profilePic || "",
                    id: "admin",
                    userType: "admin"
                  }
                }
              } catch (error) {
                console.log("Error obteniendo datos de admin en checkAuth:", error)
              }
            } else if (validationData.userType !== 'admin') {
              try {
                let userDataEndpoint = ''
                if (validationData.userType === 'customer') {
                  userDataEndpoint = `${API}/customers/${validationData.userId}`
                } else {
                  userDataEndpoint = `${API}/employees/${validationData.userId}`
                }
                console.log("🔍 Fetching complete user data from:", userDataEndpoint)
                
                const userDataResponse = await fetch(userDataEndpoint, {
                  credentials: 'include'
                })
                if (userDataResponse.ok) {
                  const freshUserData = await userDataResponse.json()
                  console.log("👤 Fresh user data with profilePic:", freshUserData.profilePic)
                  
                  completeUserData = {
                    ...savedUserData,
                    name: freshUserData.name,
                    lastName: freshUserData.lastName,
                    profilePic: freshUserData.profilePic || '',
                    phoneNumber: freshUserData.phoneNumber,
                    id: validationData.userId,
                    userType: validationData.userType
                  }
                }
              } catch (error) {
                console.log("Error obteniendo datos completos:", error)
              }
            }
            console.log("👤 Final user data:", completeUserData)
            // Actualizar localStorage con datos frescos
            localStorage.setItem("user", JSON.stringify(completeUserData))
            // Sesión válida, restaurar usuario
            setUser(completeUserData)
            setAuthCookie(true) // Indicador de que hay cookie válida
          } else {
            console.log("❌ Session invalid - cleaning local data")
            // Sesión inválida, limpiar datos locales
            localStorage.removeItem("user")
            setUser(null)
            setAuthCookie(null)
          }
        } else {
          console.log("📭 No saved user found")
        }
      } catch (error) {
        console.error("❌ Error checking auth:", error)
        // En caso de error, limpiar datos locales
        localStorage.removeItem("user")
        setUser(null)
        setAuthCookie(null)
      } finally {
        console.log("✅ Initial auth check complete")
        setIsLoading(false)
      }
    }
    checkAuth()
  }, []) // Array vacio - solo ejecutar una vez al montar
  return (
    <AuthContext.Provider value={{ user, Login, GoogleLogin, logout, authCookie, setAuthCookie, setUser, API, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}
// Export el contexto para poder usarlo en el hook
export { AuthContext }