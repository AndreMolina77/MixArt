const suppliersController = {};

import suppliersModel from '../models/Suppliers.js';

//POST
suppliersController.postSuppliers = async (req, res) => {
    const {supplierName, email, phoneNumber, address} = req.body;

    const newSuppliers = new suppliersModel({supplierName, email, phoneNumber, address})

    await newSuppliers.save()
    res.json({message: "Proveedor guardado"})
}

//GET
suppliersController.getSuppliers = async (req, res) => {
    const suppliers = await suppliersModel.find()
    res.json(suppliers)
}

//PUT
suppliersController.putSuppliers = async (req, res) => {
    const {supplierName, email, phoneNumber, address} = req.body;
    const updateSupplier = await suppliersModel.findByIdAndUpdate(req.params.id, {supplierName, email, phoneNumber, address}, {new:true})
    if(!updateSupplier){
        return res.status(404).json({message: "Proveedor no encontrado"})
    }
    res.json({message: "Proveedor actualizado"})
}

//DELETE
suppliersController.deleteSuppliers = async (req,res) => {
    const deleteSuppliers = await suppliersModel.findByIdAndDelete(req.params.id)
    if(!deleteSuppliers){
        return res.status(404).json({message: "Proveedor no encontrado"})
    }
    res.json({message: "Proveedor eliminado"})
}
//GET POR ID
suppliersController.getSupplier = async (req, res) => {
    const supplier = await suppliersModel.findById(req.params.id)
    res.json(supplier)
}
export default suppliersController