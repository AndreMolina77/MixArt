const recoveryPasswordController = {}
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
// Importo el modelo de empleados
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { sendEmail, HTMLRecoveryEmail } from "../utils/mailRecoveryPassword.js"
import { config } from "../utils/config.js"
//Post (Create)
recoveryPasswordController.requestCode = async (req, res) => {
    //Obtener el email del cuerpo de la solicitud
    const email = req.body.email
    try {
        let userFound
        let userType
        // Primero buscar en clientes
        userFound = await customersModel.findOne({email: req.body.email})
        if (userFound) {
            userType = "customer"
            console.log("Usuario encontrado en clientes - Tipo: " + userType)
        } else {
            // Si no se encuentra en clientes, buscar en empleados
            userFound = await employeesModel.findOne({email: req.body.email})
            if (userFound) {
                // Usar el userType del documento de empleado
                userType = userFound.userType
                console.log("Usuario encontrado en empleados - Tipo: " + userType)
            } else {
                return res.json({message: "El usuario no existe"})
            }
        }
        const code = Math.floor(10000 + Math.random() * 90000).toString()
        //TOKEN
        const token = jsonwebtoken.sign({email, code, userType, verified: false}, config.JWT.secret, { expiresIn: "20m"})
        res.cookie("tokenRecoveryCode", token, {maxAge: 2*60*1000})

        await sendEmail(email, "Código de recuperación de contraseña", `Tu código de recuperación es: ${code}`, HTMLRecoveryEmail(code))
        res.json({message: "Código de recuperación enviado"})
    } catch (err) {
        console.log("error: ", err)
    }
}
//Verificación de código: POST (CREATE)
recoveryPasswordController.verifyCode = async (req, res) => {
    const { code } = req.body
    try {
        const token = req.cookies.tokenRecoveryCode
        //Extraer el código del token
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        //Comparar los códigos
        if (decoded.code !== code) {
            res.json({message: "Código incorrecto"})
        }
        //TOKEN
        const newToken = jsonwebtoken.sign({email: decoded.email, code: decoded.code, userType: decoded.userType, verified: true}, config.JWT.secret, { expiresIn: "20m"})
        //El token se almacenará en una cookie
        res.cookie("tokenRecoveryCode", newToken, {maxAge: 24*60*1000})
        res.json({message: "Código de recuperación verificado"})
    } catch (err) {
        console.log("error: ", err)
    }
}
//Cambiar contraseña: POST (CREATE)
recoveryPasswordController.changePassword = async (req, res) => {
    const { newPassword } = req.body
    try {
        const token = req.cookies.tokenRecoveryCode
        const decoded = jsonwebtoken.verify(token, config.JWT.secret)
        //Comprobar si el código fue verificado
        if (!decoded.verified) {
            return res.json({message: "Código no verificado"})
        }
        //Obteniendo el email y el tipo de usuario
        const { email, userType } = decoded
        //Encriptar la contraseña
        const hashedPassword = await bcryptjs.hash(newPassword, 8)
        //Nuevo usuario
        let updatedUser
        //Actualizar la contraseña del usuario
        if (userType === "customer") {
            updatedUser = await customersModel.findOneAndUpdate({email}, {password: hashedPassword}, {new: true})
        } else if (userType === "employee") {
            updatedUser = await employeesModel.findOneAndUpdate({email}, {password: hashedPassword}, {new: true})
        } else {
            return res.json({message: "Tipo de usuario no válido"})
        }
        //Eliminar la cookie
        res.clearCookie("tokenRecoveryCode")
        res.json({message: "Contraseña cambiada"})
    } catch (err) {
        console.log("error: ", err)
    }
}
export default recoveryPasswordController