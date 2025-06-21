const employeesController = {};
import employeesModel from "../models/Employees.js";
import { v2 as cloudinary } from 'cloudinary'
import { config } from "../utils/config.js"

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})
//Create (Post)
employeesController.postEmployee = async (req, res) => {
    const{name, lastName, username, email, password, phoneNumber, userType, issNumber, isVerified} = req.body;
    const newEmployee = new employeesModel({name, lastName, username, email, password, phoneNumber, userType, issNumber, isVerified })
    
    await newEmployee.save();
    res.status(201).json({ message: "Empleado creado con éxito"});
};
//Read (Get)
employeesController.getEmployees = async (req, res) => {
    const employee = await employeesModel.find();
    res.json(employee);
};
//Update (Put)
employeesController.putEmployee = async (req, res) => {
    try {
        let updateData = {}
        let profilePicURL = ""
        
        if (req.file) {
            // Subir imagen a cloudinary
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "profiles",
                allowed_formats: ["jpg", "jpeg", "png", "gif"],
            })
            profilePicURL = result.secure_url
        }
        // Preparar datos de actualización
        const { name, lastName, username, email, phoneNumber, userType, issNumber, isVerified, password } = req.body
        updateData = { 
            name, 
            lastName, 
            username, 
            email, 
            phoneNumber, 
            userType, 
            issNumber, 
            isVerified: isVerified === 'true' || isVerified === true 
        }
        // Solo incluir password si se proporciona
        if (password && password.trim() !== "") {
            updateData.password = password
        }
        // Solo incluir profilePic si hay nueva imagen
        if (profilePicURL) {
            updateData.profilePic = profilePicURL
        }
        const updateEmployee = await employeesModel.findByIdAndUpdate(
            req.params.id, 
            updateData, 
            { new: true }
        )
        if (!updateEmployee) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        res.json({ message: "Empleado actualizado con éxito" });
    } catch (error) {
        console.error('Error en putEmployee:', error)
        res.status(500).json({ message: "Error al actualizar empleado", error: error.message });
    }
};
//Delete (Delete) por su ID
employeesController.deleteEmployee = async (req, res) =>{
    const deleteEmployee = await employeesModel.findByIdAndDelete(req.params.id);
    if (!deleteEmployee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado eliminado con éxito" });
};
//Read (Get) pero por su ID
employeesController.getEmployee = async (req, res) =>{
    const employee = await employeesModel.findById(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(employee);
};
export default employeesController;