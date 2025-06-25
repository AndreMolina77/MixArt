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
// ACTUALIZACION DE PERFIL
customersController.updateProfile = async (req, res) => {
    // Solo permite actualizar campos no sensibles
  const { name, lastName, email, address } = req.body;
  try {
    const updatedCustomer = await customersModel.findByIdAndUpdate(
      req.user.id, // ID del cliente autenticado
      { $set: { name, lastName, email, address } },
      { new: true, select: '-password' }
    );
    res.json(updatedCustomer);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
// ACTUALIZACION DE CONTRASEÑA POR MEDIO DE PATCH
customersController.changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
  try {
    const customer = await customersModel.findById(req.user.id);
    // Verificar contraseña actual
    const isMatch = await bcrypt.compare(currentPassword, customer.password);
    if (!isMatch) throw new Error('Contraseña actual incorrecta');
    
    // Actualizar contraseña
    customer.password = newPassword;
    await customer.save();
    res.json({ message: 'Contraseña actualizada' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
}
export default customersController;