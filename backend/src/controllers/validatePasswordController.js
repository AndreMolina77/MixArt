const validatePasswordController = {}
import bcryptjs from "bcryptjs"
import employeesModel from "../models/Employees.js"
import customersModel from "../models/Customers.js"
import { validateAuthToken } from "../middlewares/validateAuthToken.js"

validatePasswordController.validatePassword = async (req, res) => {
    try {
    const { currentPassword } = req.body
    const userId = req.userId
    const userType = req.userType

    let user
    if (userType === 'customer') {
      user = await customersModel.findById(userId)
    } else {
      user = await employeesModel.findById(userId)
    }

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" })
    }

    const isValid = await bcryptjs.compare(currentPassword, user.password)
    if (!isValid) {
      return res.status(400).json({ message: "Contraseña incorrecta" })
    }

    res.json({ message: "Contraseña válida" })
  } catch (error) {
    res.status(500).json({ message: "Error del servidor" })
  }
}
export default validatePasswordController