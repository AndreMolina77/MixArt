const customersController = {};

import customersModel from '../models/Customers.js';

//POST
customersController.postCustomers = async (req, res) => {
    const {name, lastName, username, email, password, phoneNumber, issNumber, isVerified} = req.body;

    const newCustomers = new customersModel({name, lastName, username, email, password, phoneNumber, issNumber, isVerified})

    await newCustomers.save()
    res.json({message: "Cliente guardaado"})
}
//GET
customersController.getCustomers = async (req, res) => {
    const customers = await customersModel.find()
    res.json(customers)
}
//PUT
customersController.putCustomers = async (req, res) => {
    const {name, lastName, username, email, password, phoneNumber, issNumber, isVerified} = req.body;
    const updatedCustomer = await customersModel.findByIdAndUpdate(req.params.id, {name, lastName, username, email, password, phoneNumber, issNumber, isVerified}, {new:true})
    if(!updatedCustomer){
        return res.status(404).json({message: "Cliente no encontrado"})
    }
    res.json({message: "Cliente actualizado"})

}
//DELETE
customersController.deleteCustomers = async (req,res) => {
    const deleteCustomers = await customersModel.findByIdAndDelete(req.params.id)
    if(!deleteCustomers){
        return res.status(404).json({message: "Cliente no encontrado"})
    }
    res.json({message: "Cliente eliminado"})
}

//GET POR ID
customersController.getCustomer = async (req, res) => {
    const customer = await customersModel.findById(req.params.id)
    res.json(customer)
}

export default customersController;