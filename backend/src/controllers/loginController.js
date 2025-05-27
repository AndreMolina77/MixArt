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
        //Tipos de usuario: admin, empleados, clientes
        if (email === config.CREDENTIALS.email && password === config.CREDENTIALS.password) {
            userType = "admin"
            userFound = {_id: "admin"}
            console.log("Este es el tipo de usuario que esta guardando: " + userType)
        } else {
            // Buscar en empleados primero
            userFound = await loginModel.findOne({email})
            if (userFound) {
                // Si se encuentra en empleados, usar el userType del documento
                userType = userFound.userType
                console.log("Usuario encontrado en empleados - Tipo: " + userType)
            } else {
                // Si no se encuentra en empleados, buscar en clientes
                userFound = await customersModel.findOne({email})
                if (userFound) {
                    userType = "customer"
                    console.log("Usuario encontrado en clientes - Tipo: " + userType)
                }
            }
        }
        if (!userFound) {
            return res.json({message: "El usuario no existe"})
        } 
        if (userType !== "admin") {
            //Variable para almacenar el hash de la contraseña
            const isMatch = bcryptjs.compare(password, userFound.password)
            if (!isMatch) {
                return res.json({message: "Contraseña incorrecta"})
            }
        }
        //TOKEN
        jsonwebtoken.sign({id: userFound._id, userType}, config.JWT.secret, { expiresIn: config.JWT.expiresIn}, (err, token) => {
            if(err) console.log("error")
            res.cookie("authToken", token)
            res.json({message: "Inicio de sesión exitoso"})
        })
    } catch (error) {
        console.log("error", error)
        res.json({message: "Error al iniciar sesión", error: error.message})
    }
}
export default loginController