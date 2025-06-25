import { createContext, useState, useEffect } from "react"

const API = "http://localhost:4000/api"
const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  // Login function
  const login = async (email, password, rememberMe = false) => {
    try {
      console.log("🔐 === PUBLIC LOGIN ===")
      console.log("📧 Email:", email)
      
      const response = await fetch(`${API}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error en la autenticación")
      }

      // Obtener información del usuario después del login
      const userInfoResponse = await fetch(`${API}/validateAuthToken`, {
        method: "POST",
        credentials: "include",
        headers: { 'Content-Type': 'application/json' }
      })

      if (userInfoResponse.ok) {
        const userInfo = await userInfoResponse.json()
        
        // Solo permitir customers en el frontend público
        if (userInfo.userType !== 'customer') {
          await logout()
          throw new Error("Acceso restringido. Solo clientes pueden acceder.")
        }

        const userData = {
          id: userInfo.userId,
          email: userInfo.email,
          name: userInfo.name,
          lastName: userInfo.lastName,
          userType: userInfo.userType
        }

        // Obtener datos completos del customer
        try {
          const customerResponse = await fetch(`${API}/customers/${userInfo.userId}`, {
            credentials: 'include'
          })
          if (customerResponse.ok) {
            const customerData = await customerResponse.json()
            userData.phoneNumber = customerData.phoneNumber
            userData.profilePic = customerData.profilePic || ''
            userData.isVerified = customerData.isVerified
          }
        } catch (error) {
          console.log("Error obteniendo datos del customer:", error)
        }

        localStorage.setItem("user", JSON.stringify(userData))
        setUser(userData)
        setIsAuthenticated(true)
        
        return { success: true, message: data.message, user: userData }
      } else {
        throw new Error("No se pudo obtener información del usuario")
      }
    } catch (error) {
      console.log("❌ Login error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Register function
  const register = async (customerData) => {
    try {
      console.log("📝 === PUBLIC REGISTER ===")
      
      const response = await fetch(`${API}/signupCustomer`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(customerData),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error en el registro")
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.log("❌ Register error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Verify email code
  const verifyEmail = async (verCode) => {
    try {
      const response = await fetch(`${API}/signupCustomer/verifyCodeEmail`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ verCodeRequest: verCode }),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error al verificar el código")
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.log("❌ Verify email error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Request password reset
  const requestPasswordReset = async (email) => {
    try {
      const response = await fetch(`${API}/recoveryPassword/requestCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error al solicitar recuperación")
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.log("❌ Password reset request error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Verify reset code
  const verifyResetCode = async (code) => {
    try {
      const response = await fetch(`${API}/recoveryPassword/verifyCode`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error al verificar el código")
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.log("❌ Verify reset code error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Change password
  const changePassword = async (newPassword) => {
    try {
      const response = await fetch(`${API}/recoveryPassword/changePassword`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ newPassword }),
        credentials: "include"
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || "Error al cambiar la contraseña")
      }

      return { success: true, message: data.message }
    } catch (error) {
      console.log("❌ Change password error:", error.message)
      return { success: false, message: error.message }
    }
  }

  // Logout function
  const logout = async () => {
    try {
      console.log("🚪 === PUBLIC LOGOUT ===")
      await fetch(`${API}/logout`, {
        method: "POST",
        credentials: "include"
      })
    } catch (error) {
      console.error("❌ Error durante el logout:", error)
    } finally {
      localStorage.removeItem("user")
      setUser(null)
      setIsAuthenticated(false)
    }
  }

  // Check authentication on app load
  useEffect(() => {
    const checkAuth = async () => {
      try {
        console.log("🔍 === CHECKING PUBLIC AUTH ===")
        
        const savedUser = localStorage.getItem("user")
        if (savedUser) {
          console.log("💾 Found saved user, validating...")
          
          const response = await fetch(`${API}/validateAuthToken`, {
            method: "POST",
            credentials: "include",
            headers: { 'Content-Type': 'application/json' }
          })

          if (response.ok) {
            const validationData = await response.json()
            
            // Solo permitir customers
            if (validationData.userType === 'customer') {
              const userData = JSON.parse(savedUser)
              console.log("✅ Valid customer session restored")
              setUser(userData)
              setIsAuthenticated(true)
            } else {
              console.log("❌ Non-customer user, cleaning session")
              localStorage.removeItem("user")
              setUser(null)
              setIsAuthenticated(false)
            }
          } else {
            console.log("❌ Invalid session, cleaning local data")
            localStorage.removeItem("user")
            setUser(null)
            setIsAuthenticated(false)
          }
        }
      } catch (error) {
        console.error("❌ Error checking auth:", error)
        localStorage.removeItem("user")
        setUser(null)
        setIsAuthenticated(false)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      isLoading,
      login,
      register,
      verifyEmail,
      requestPasswordReset,
      verifyResetCode,
      changePassword,
      logout,
      API
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthContext }