const employeesController = {};
import employeesModel from "../models/Employees.js";
//Create (Post)
employeesController.postEmployee = async (req, res) => {
    const{name, lastName, username, email, password, phoneNumber, userType, profilePic, issNumber, isVerified} = req.body;
    const newEmployee = new employeesModel({name, lastName, username, email, password, phoneNumber, userType, profilePic, issNumber, isVerified })
    
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
    const{name, lastName, username, email, password, phoneNumber, userType, profilePic, issNumber, isVerified} = req.body;
    const updateEmployee = new employeesModel({name, lastName, username, email, password, phoneNumber, userType, profilePic, issNumber, isVerified}, {new: true})

    if(!updateEmployee){
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado actualizado con éxito" });
};
//Delete (Delete) por su ID
employeesController.deleteEmployee = async (req, res) =>{
    const deleteEmployee = await employeesModel.find(req.params.id);
    if (!deleteEmployee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json({ message: "Empleado eliminado con éxito" });
};
//Read (Get) pero por su ID
employeesController.getEmployee = async (req, res) =>{
    const employee = await employeesModel.find(req.params.id);
    if (!employee) {
        return res.status(404).json({ message: "Empleado no encontrado" });
    }
    res.json(artPiece);
};
export default employeesController;