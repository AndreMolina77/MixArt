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
// Obtener datos de admin SIN autenticacion (para login)
adminProfileController.getProfilePublic = async (req, res) => {
    try {
        console.log("🔍 Getting admin profile public data...")
        console.log("📧 Looking for email:", config.CREDENTIALS.email)
        
        const adminUser = await adminModel.findOne({ email: config.CREDENTIALS.email })
        console.log("👑 Admin user found:", adminUser)
        
        if (!adminUser) {
            // Si no existe el admin, crearlo
            console.log("👑 Creating new admin user...")
            const newAdmin = new adminModel({
                name: "Admin",
                lastName: "MixArt", 
                email: config.CREDENTIALS.email,
                profilePic: ""
            })
            await newAdmin.save()
            console.log("👑 New admin created:", newAdmin)
            return res.json(newAdmin)
        }
        res.json(adminUser)
    } catch (error) {
        console.error("❌ Error in getProfilePublic:", error)
        res.status(500).json({ message: "Error del servidor" })
    }
}
// Obtener datos de admin
adminProfileController.getProfile = async (req, res) => {
    try {
        const adminUser = await adminModel.findOne({ email: config.CREDENTIALS.email })
        
        if (!adminUser) {
            // Si no existe, crearlo
            const newAdmin = new adminModel({ name: "Admin", lastName: "MixArt", email: config.CREDENTIALS.email, profilePic: "" })
            await newAdmin.save()
            return res.json(newAdmin)
        }
        res.json(adminUser)
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ message: "Error del servidor" })
    }
}
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
// Actualizar notificaciones de email para admin
adminProfileController.updateNotifications = async (req, res) => {
    try {
        const { emailNotifications } = req.body
        
        const updatedAdmin = await adminModel.findOneAndUpdate(
            { email: config.CREDENTIALS.email },
            { emailNotifications: emailNotifications },
            { new: true }
        )
        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin no encontrado" })
        }
        res.json({ 
            message: "Preferencias de notificación actualizadas",
            emailNotifications: updatedAdmin.emailNotifications
        })
    } catch (error) {
        console.error("Error:", error)
        res.status(500).json({ message: "Error del servidor" })
    }
}
export default adminProfileController