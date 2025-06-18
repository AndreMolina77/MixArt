const loginController = {}
// Importo el modelo de empleados
import loginModel from "../models/Employees.js"
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"
import Employees from "../models/Employees.js"
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
// NUEVO: Inicio de sesion con Google
loginController.googleLogin = async (req, res) => {
    try {
    const { email, name, appwriteUserId, isVerified } = req.body;

    if (!email || !appwriteUserId) {
      return res.status(400).json({ message: 'Email y AppWrite User ID son requeridos' });
    }
    // Buscar si el usuario ya existe en la base de datos
    let user = await customersModel.findOne({ email });

    if (!user) {
      // Verificar si es un empleado
      user = await Employees.findOne({ email });
      if (!user) {
        if (email === 'thehillsami@gmail.com') { // Email con el que fue creado el usuario de prueba
          user = new Employee({
            name: name.split(' ')[0] || 'Admin',
            lastName: name.split(' ')[1] || 'Google',
            username: email.split('@')[0],
            email,
            password: 'google-auth-' + appwriteUserId, // Password temporal
            phoneNumber: '0000-0000', // Temporal
            userType: 'admin', 
            issNumber: '00000000000', // Temporal
            isVerified: true,
            appwriteUserId
          });
        } else {
          // Crear como cliente nuevo
          user = new Customer({
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
        }
        await user.save()
      }
    } else {
      // Actualizar appwriteUserId si no existe
      if (!user.appwriteUserId) {
        user.appwriteUserId = appwriteUserId
        await user.save()
      }
    }
    // Crear token JWT
    const token = jsonwebtoken.sign(
      { 
        id: user._id, 
        email: user.email, 
        userType: user.userType || 'customer',
        appwriteUserId 
      },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )
    // Configurar cookie
    res.cookie('authToken', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 dias
    })
    res.status(200).json({
      message: 'Autenticación exitosa',
      user: {
        id: user._id,
        name: user.name,
        lastName: user.lastName,
        email: user.email,
        userType: user.userType || 'customer',
        isVerified: user.isVerified,
        appwriteUserId: user.appwriteUserId
      }
    })
  } catch (error) {
    console.error('Error en Google Auth:', error)
    res.status(500).json({ message: 'Error interno del servidor', error: error.message })
  }
}
export default loginController