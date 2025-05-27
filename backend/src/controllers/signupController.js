const signupController = {}
// Importo el modelo de empleados
import employeesModel from "../models/Employees.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import { config } from "../utils/config.js"
//POST (CREATE)
signupController.registerEmployee = async (req, res) => {
    const {name, lastName, username, email,  password, phoneNumber, userType, issNumber, isVerified} = req.body

    try {
        //Verificación de si el empleado ya existe
        const employeeExist = await employeesModel.findOne({email})
        //Si existe un empleado, entonces se va a responder con un mensaje de error
        if(employeeExist){
            return res.json({message: "El empleado ya existe"})
        }
        //Encriptacion de contraseña
        const hashedPassword = await bcryptjs.hash(password, 10)
        const newUser = new employeesModel({name, lastName, username, email,  password: hashedPassword, phoneNumber, userType, issNumber, isVerified: isVerified || false})

        await newUser.save()
        //TOKEN
        jsonwebtoken.sign({id: newUser._id, userType}, config.JWT.secret, { expiresIn: config.JWT.expiresIn}, (err, token) => {
            if(err) console.log("error")
            res.cookie("authToken", token)
            res.json({message: "Registro exitoso"})
        })
        res.json({message: "Empleado registrado"})
    } catch (error) {
        console.log("error", error)
        res.json({message: "Error al registrar el empleado", error: error.message})
    }
}
export default signupController