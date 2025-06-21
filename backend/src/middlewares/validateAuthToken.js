import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"

export const validateAuthToken = (allowedUserTypes = []) => {
    return (req, res, next) => {
        try {
            console.log("🔐 === VALIDATE AUTH TOKEN MIDDLEWARE ===")
            console.log("🎯 Allowed user types:", allowedUserTypes)
            
            const { authToken } = req.cookies
            console.log("🍪 Auth token present:", !!authToken)
            
            if (!authToken) {
                console.log("❌ No token provided")
                return res.status(401).json({ 
                    message: "Token no proporcionado, debes iniciar sesión primero",
                    code: "NO_TOKEN"
                })
            }
            const decodedToken = jsonwebtoken.verify(authToken, config.JWT.secret)
            console.log("🔓 Token decoded successfully")
            console.log("👤 User ID:", decodedToken.id)
            console.log("👔 User type:", decodedToken.userType)
            console.log("🎯 Allowed user types:", allowedUserTypes)  // AGREGAR ESTO
            console.log("✅ Is user type allowed?", allowedUserTypes.includes(decodedToken.userType))  // AGREGAR ESTO
            // SOLO verificar permisos si se especificaron tipos permitidos
            if (allowedUserTypes.length > 0 && !allowedUserTypes.includes(decodedToken.userType)) {
                console.log("❌ User type not allowed")
                return res.status(403).json({ 
                    message: "Acceso denegado - Tipo de usuario no autorizado",
                    code: "INSUFFICIENT_PERMISSIONS",
                    userType: decodedToken.userType,
                    allowedTypes: allowedUserTypes
                })
            }

            console.log("✅ Token valid and user authorized")
            
            req.userId = decodedToken.id
            req.userType = decodedToken.userType
            req.userEmail = decodedToken.email
            req.userName = decodedToken.name      // AGREGAR ESTO
            req.userLastName = decodedToken.lastName  // AGREGAR ESTO
            // Para la respuesta, incluir userId
            res.locals.tokenData = {
                userId: decodedToken.id,
                userType: decodedToken.userType,
                email: decodedToken.email
            }               
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