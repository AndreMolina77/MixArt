const supppliersController = require('./suppliersController');

import { Suppliers } from '../models/Suppliers';
const suppliersController = {};

//POST
suppliersController.postSuppliers = async (req, res) => {
    const {supplierName, email, phoneNumber, address} = req.body;

    const newSuppliers = new Suppliers({supplierName, email, phoneNumber, address})

    await newSuppliers.save()
    res.json({message: "Proveedor guardado"})
}

//GET
suppliersController.getSuppliers = async (req, res) => {
    const suppliers = await Suppliers.find()
    res.json(suppliers)
}

//PUT
suppliersController.putSuppliers = async (req, res) => {
    const {supplierName, email, phoneNumber, address} = req.body;
    const updateSupplier = await Suppliers.findByIdAndUpdate(req.params.id,
    {supplierName, email, phoneNumber, address},
    {new:true}
    )

    res.json({message: "Proveedor actualizado"})

}

//DELETE
suppliersController.deleteSuppliers = async (req,res) => {
    const deleteSuppliers = await Suppliers.findByIdAndDelete(req.params.id)
    res.json({message: "Proveedor eliminado"})
}

//GET POR ID
suppliersController.getSupplier = async (req, res) => {
    const supplier = await Suppliers.findById(req.params.id)
    res.json(supplier)
}

export default suppliersController;