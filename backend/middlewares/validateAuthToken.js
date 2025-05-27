import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"
export const validateAuthToken = (allowedUserTypes = []) => {
    // Retorno una función flecha
    return (req, res, next) => {
        try {
            const { authToken } = req.cookies
            //Verifico si el token está presente en las cookies
            if (!authToken) {
                return res.status(401).json({ message: "Token no proporcionado, debes iniciar sesión primero" })
            }
            //Información del token
            const decodedToken = jsonwebtoken.verify(authToken, config.JWT.secret)
            console.log("Este es el usuario que esta guardado en el token: " + decodedToken.userType)
            //Verifico si el tipo de usuario es permitido
            if (!allowedUserTypes.includes(decodedToken.userType)) {
                return res.status(403).json({ message: "Acceso denegado" })
            }
            next()
        } catch (error) {
            res.status(500).json({ message: "Error al validar el token" })
        }
    }
}