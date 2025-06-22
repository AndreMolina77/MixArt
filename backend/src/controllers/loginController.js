const loginController = {}
// Importo el modelo de empleados
import loginModel from "../models/Employees.js"
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
// Importo el modelo de admin
import adminModel from "../models/Admin.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"
import { API } from "../utils/api.js"
//POST (CREATE)
loginController.login = async (req, res) => {
    const {email, password} = req.body

    try {
        let userFound //Se guarda el usuario encontrado
        let userType //Se guarda el tipo de usuario (admin, vendedor o artista)
        
        console.log("🔐 === INICIO LOGIN ===")
        console.log("📧 Email recibido:", email)
        console.log("🔑 Password recibido:", password ? "[PRESENTE]" : "[AUSENTE]")

        console.log("🔍 No es admin, verificando otros usuarios...")
        //Tipos de usuario: admin, empleados, clientes
        if (email === config.CREDENTIALS.email && password === config.CREDENTIALS.password) {
            console.log("✅ LOGIN ADMIN EXITOSO")
            try {
                // AGREGAR: Crear/obtener admin de BD
                const adminDataResponse = await fetch(`${API}/admin/profile/data`, {
                    method: 'GET',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' }
                })
                let adminData = { name: "Admin", lastName: "MixArt", profilePic: "" }
                
                if (adminDataResponse.ok) {
                    const adminInfo = await adminDataResponse.json()
                    adminData = {
                        name: adminInfo.name || "Admin",
                        lastName: adminInfo.lastName || "MixArt", 
                        profilePic: adminInfo.profilePic || ""
                    }
                    console.log("👑 Admin data from BD:", adminData)
                }
                userType = "admin"
                userFound = {
                    _id: "admin", 
                    email: config.CREDENTIALS.email,
                    ...adminData
                }
                //TOKEN para admin
                jsonwebtoken.sign( { id: "admin", email: config.CREDENTIALS.email, userType: "admin", ...adminData }, 
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
            } catch (error) {
                console.log("Error obteniendo datos de admin:", error)
                // Continuar con datos por defecto si hay error     

            }
        } 
        // Si no es admin, verificar credenciales incorrectas inmediatamente
        console.log("🔍 No es admin, verificando otros usuarios...")
        // Buscar en empleados primero
        userFound = await loginModel.findOne({email})
        if (userFound) {
            console.log("👤 Usuario encontrado en empleados")
            userType = userFound.userType // Esto debe ser "vendedor" o "artista"
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
        /* // IMPORTANTE: Por ahora, solo permitir admin hasta que haya registro de empleados
        console.log("⚠️ VALIDACIÓN TEMPORAL: Solo admin permitido")
        return res.status(403).json({
            message: "Acceso restringido. Solo administradores pueden acceder en esta versión."
        }) */
        //TOKEN para empleados/clientes
        jsonwebtoken.sign(
            {id: userFound._id, userType, email: userFound.email, name: userFound.name, lastName: userFound.lastName}, 
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
    } catch (error) {
        console.log("❌ Error en login:", error)
        res.status(500).json({message: "Error interno del servidor"})
    }
}
// NUEVO: Inicio de sesion con Google
loginController.googleLogin = async (req, res) => {
    try {
        const { email, name, appwriteUserId, isVerified } = req.body;

        if (!email || !appwriteUserId) {
            return res.status(400).json({ message: 'Email y AppWrite User ID son requeridos' })
        }
        let user
        let userType
        console.log(`🔍 Verificando usuario Google: ${email}`)
        // Verificar si es el admin
        if (email === config.CREDENTIALS.email) {
            console.log("✅ LOGIN GOOGLE ADMIN EXITOSO")
            userType = "admin"
            user = {
                _id: "admin", 
                email: email, 
                name: name.split(' ')[0] || 'Admin',
                lastName: name.split(' ')[1] || '',
                userType: "admin"
            }
        } else {
            // Buscar en empleados primero
            user = await loginModel.findOne({ email });
            if (user) {
                console.log("👤 Usuario encontrado en empleados")
                userType = user.userType
            } else {
                // Si no se encuentra en empleados, buscar en clientes
                user = await customersModel.findOne({ email });
                if (user) {
                    console.log("👤 Usuario encontrado en clientes")
                    userType = "customer"
                } else {
                    // Usuario no registrado - rechazar acceso
                    console.log("❌ Usuario no autorizado:", email)
                    return res.status(403).json({ 
                        message: 'Usuario no autorizado. Contacta al administrador para obtener acceso.' 
                    })
                    /* MISTAKEN: Los clientes NO van a poder iniciar sesion con Google por temas de tiempo // Si no existe, crear como customer por defecto
                    console.log("👤 Creando nuevo cliente con Google")
                    user = new customersModel({
                        name: name.split(' ')[0] || 'Usuario',
                        lastName: name.split(' ')[1] || 'Google',
                        username: email.split('@')[0],
                        email,
                        password: 'google-auth-' + appwriteUserId, // Password temporal
                        phoneNumber: '0000-0000', // Temporal
                        issNumber: '00000000000', // Temporal
                        isVerified: isVerified || true,
                        appwriteUserId
                    });
                    await user.save();
                    userType = "customer" */
                }
            }
        }
        // Si llegamos aqui, el usuario está autorizado
        console.log(`✅ Usuario autorizado: ${email} como ${userType}`)
        // Crear token JWT
        const token = jsonwebtoken.sign({ id: user._id, email: user.email, userType: userType, appwriteUserId }, config.JWT.secret,{ expiresIn: config.JWT.expiresIn })
        // Configurar cookie
        res.cookie('authToken', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production', sameSite: 'lax', maxAge: 24 * 60 * 60 * 1000 })
        res.status(200).json({
            message: 'Autenticación exitosa',
            user: { id: user._id, name: user.name, lastName: user.lastName, email: user.email, userType: userType, isVerified: user.isVerified || isVerified, appwriteUserId: user.appwriteUserId || appwriteUserId }
        })
    } catch (error) {
        console.error('Error en Google Auth:', error)
        res.status(500).json({ message: 'Error interno del servidor', error: error.message })
    }
}
export default loginController