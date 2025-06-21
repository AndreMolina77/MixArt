const adminProfileController = {}
import fs from 'fs'
import path from 'path'
import { config } from "../utils/config.js"
import { v2 as cloudinary } from 'cloudinary'
import adminModel from "../models/Admin.js"

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})
// Actualizar perfil de admin
adminProfileController.updateProfile = async (req, res) => {
    try {
        console.log('🔧 Admin profile update - req.body:', req.body)
        console.log('🔧 Admin profile update - req.file:', req.file)
        const { name, lastName, email } = req.body
        let updateData = { name, lastName }
        // Si hay imagen, procesarla
        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "admin",
                allowed_formats: ["jpg", "jpeg", "png", "gif"],
            })
            updateData.profilePic = result.secure_url
        }
        // Actualizar en BD
        const updatedAdmin = await adminModel.findOneAndUpdate( { email: config.CREDENTIALS.email }, updateData, { new: true } )
        res.json({ 
            message: "Perfil de administrador actualizado correctamente",
            user: updatedAdmin
        })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ message: "Error del servidor" })
    }
}
// Cambiar contraseña de admin
adminProfileController.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body
        // Verificar contraseña actual
        if (currentPassword !== config.CREDENTIALS.password) {
            return res.status(400).json({ message: "Contraseña actual incorrecta" })
        }
        // Leer el archivo .env
        const envPath = path.resolve('.env')
        let envContent = fs.readFileSync(envPath, 'utf8')
        // Reemplazar la línea de ADMIN_PASSWORD
        const lines = envContent.split('\n')
        const updatedLines = lines.map(line => {
            if (line.startsWith('ADMIN_PASSWORD=')) {
                return `ADMIN_PASSWORD="${newPassword}"`
            }
            return line
        })
        // Escribir el archivo actualizado
        fs.writeFileSync(envPath, updatedLines.join('\n'))
        // Actualizar la configuración en memoria
        process.env.ADMIN_PASSWORD = newPassword
        config.CREDENTIALS.password = newPassword
        console.log("✅ Admin password updated successfully")
        res.json({ message: "Contraseña actualizada correctamente" })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ message: "Error del servidor al cambiar contraseña" })
    }
}
export default adminProfileController