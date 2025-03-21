const customersController = {};

import customersModel from '../models/Customers.js';

////POST
customersController.postCustomers = async (req, res) => {
    const {username, email, password, phoneNumber, profilePic} = req.body;

    const newCustomers = new customersModel({username, email, password, phoneNumber, profilePic})

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
    const {username, email, password, phoneNumber, profilePic} = req.body;
    const updateCustomer = await customersModel.findByIdAndUpdate(req.params.id,
    {username, email, password, phoneNumber, profilePic},
    {new:true}
    )

    res.json({message: "Cliente actualizado"})

}

//DELETE
customersController.deleteCustomers = async (req,res) => {
    const deleteCustomers = await customersModel.findByIdAndDelete(req.params.id)
    res.json({message: "Cliente eliminado"})
}

//GET POR ID
customersController.getCustomer = async (req, res) => {
    const customer = await customersModel.findById(req.params.id)
    res.json(customer)
}

export default customersController;