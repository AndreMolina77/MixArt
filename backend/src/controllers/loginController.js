const loginController = {}
// Importo el modelo de empleados
import loginModel from "../models/Employees.js"
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"
//POST (CREATE)
loginController.login = async (req, res) => {
    const {email, password} = req.body

    try {
        let userFound //Se guarda el usuario encontrado
        let userType //Se guarda el tipo de usuario (admin, vendedor o artista)
        
        console.log("🔐 === INICIO LOGIN ===")
        console.log("📧 Email recibido:", email)
        console.log("🔑 Password recibido:", password ? "[PRESENTE]" : "[AUSENTE]")
        
        //Tipos de usuario: admin, empleados, clientes
        if (email === config.CREDENTIALS.email && password === config.CREDENTIALS.password) {
            console.log("✅ LOGIN ADMIN EXITOSO")
            userType = "admin"
            userFound = {_id: "admin", email: config.CREDENTIALS.email}
            
            //TOKEN para admin
            jsonwebtoken.sign(
                {id: userFound._id, userType}, 
                config.JWT.secret, 
                { expiresIn: config.JWT.expiresIn}, 
                (err, token) => {
                    if(err) {
                        console.log("❌ Error generando token:", err)
                        return res.status(500).json({message: "Error interno del servidor"})
                    }
                    
                    res.cookie("authToken", token, {
                        httpOnly: true,
                        secure: process.env.NODE_ENV === 'production',
                        sameSite: 'lax',
                        maxAge: 24 * 60 * 60 * 1000 // 24 horas
                    })
                    
                    console.log("🍪 Token generado y cookie establecida para admin")
                    res.json({message: "Inicio de sesión exitoso"})
                }
            )
            return
        } 
        
        // Si no es admin, verificar credenciales incorrectas inmediatamente
        console.log("🔍 No es admin, verificando otros usuarios...")
        
        // Buscar en empleados primero
        userFound = await loginModel.findOne({email})
        if (userFound) {
            console.log("👤 Usuario encontrado en empleados")
            userType = userFound.userType
            console.log("👔 Tipo de usuario:", userType)
        } else {
            // Si no se encuentra en empleados, buscar en clientes
            userFound = await customersModel.findOne({email})
            if (userFound) {
                console.log("👤 Usuario encontrado en clientes")
                userType = "customer"
            }
        }

        // Si no se encuentra el usuario
        if (!userFound) {
            console.log("❌ Usuario no encontrado")
            return res.status(401).json({message: "El usuario no existe"})
        }

        // Verificar contraseña para usuarios no-admin
        console.log("🔐 Verificando contraseña...")
        const isMatch = await bcryptjs.compare(password, userFound.password)
        if (!isMatch) {
            console.log("❌ Contraseña incorrecta")
            return res.status(401).json({message: "Contraseña incorrecta"})
        }

        console.log("✅ Contraseña correcta")

        // IMPORTANTE: Por ahora, solo permitir admin hasta que haya registro de empleados
        console.log("⚠️ VALIDACIÓN TEMPORAL: Solo admin permitido")
        return res.status(403).json({
            message: "Acceso restringido. Solo administradores pueden acceder en esta versión."
        })

        // TODO: Descomentar cuando se implemente registro de empleados
        /*
        //TOKEN para empleados/clientes
        jsonwebtoken.sign(
            {id: userFound._id, userType}, 
            config.JWT.secret, 
            { expiresIn: config.JWT.expiresIn}, 
            (err, token) => {
                if(err) {
                    console.log("❌ Error generando token:", err)
                    return res.status(500).json({message: "Error interno del servidor"})
                }
                
                res.cookie("authToken", token, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'lax',
                    maxAge: 24 * 60 * 60 * 1000 // 24 horas
                })
                
                console.log("🍪 Token generado y cookie establecida")
                res.json({message: "Inicio de sesión exitoso"})
            }
        )
        */
    } catch (error) {
        console.log("❌ Error en login:", error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}
export default loginController