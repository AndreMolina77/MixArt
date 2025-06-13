import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"

export const validateAuthToken = (allowedUserTypes = []) => {
    // Retorno una función flecha
    return (req, res, next) => {
        try {
            console.log("🔐 === VALIDATE AUTH TOKEN MIDDLEWARE ===")
            console.log("🎯 Allowed user types:", allowedUserTypes)
            
            const { authToken } = req.cookies
            console.log("🍪 Auth token present:", !!authToken)
            
            //Verifico si el token está presente en las cookies
            if (!authToken) {
                console.log("❌ No token provided")
                return res.status(401).json({ 
                    message: "Token no proporcionado, debes iniciar sesión primero",
                    code: "NO_TOKEN"
                })
            }

            //Información del token
            const decodedToken = jsonwebtoken.verify(authToken, config.JWT.secret)
            console.log("🔓 Token decoded successfully")
            console.log("👤 User ID:", decodedToken.id)
            console.log("👔 User type:", decodedToken.userType)
            
            //Verifico si el tipo de usuario es permitido
            if (!allowedUserTypes.includes(decodedToken.userType)) {
                console.log("❌ User type not allowed")
                return res.status(403).json({ 
                    message: "Acceso denegado - Tipo de usuario no autorizado",
                    code: "INSUFFICIENT_PERMISSIONS",
                    userType: decodedToken.userType,
                    allowedTypes: allowedUserTypes
                })
            }

            console.log("✅ Token valid and user authorized")
            // Agregar información del usuario al request
            req.userId = decodedToken.id
            req.userType = decodedToken.userType
            
            next()
        } catch (error) {
            console.log("❌ Token validation error:", error.message)
            
            if (error.name === 'TokenExpiredError') {
                return res.status(401).json({ 
                    message: "Token expirado, inicia sesión nuevamente",
                    code: "TOKEN_EXPIRED"
                })
            } else if (error.name === 'JsonWebTokenError') {
                return res.status(401).json({ 
                    message: "Token inválido",
                    code: "INVALID_TOKEN"
                })
            } else {
                return res.status(500).json({ 
                    message: "Error al validar el token",
                    code: "VALIDATION_ERROR"
                })
            }
        }
    }
}