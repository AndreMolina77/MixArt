const salesController = {};

import salesModel from "../models/Sales.js";

//POST
salesController.postSales = async (req, res) => {
    const {orderId, paymentMethod, address, status} = req.body;
    //Validacion para que los items (productos) contengan los campos necesarios
    try {
        const newSale = new salesModel({orderId, paymentMethod, address, status});

        await newSale.save();
        res.status(201).json({ message: "Venta creada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la venta", error: error.message });
    };
}
//GET
salesController.getSales = async (req, res) => {
    try {
        const sales = await salesModel.find().populate({ path: "orderId",  select: "customerId total status",
            populate: {
                path: "customerId",
                select: "username email" // Aqui si se mostrarian campos especificos del cliente
            }})
        res.status(200).json(sales);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener las ventas", error: error.message });
    };
}
//PUT
salesController.putSales = async (req, res) => {
    const {orderId, paymentMethod, address, status} = req.body;
    try {
        const updatedSale = await salesModel.findByIdAndUpdate(req.params.id, {orderId, paymentMethod, address, status}, { new: true }).populate({ path: "orderId",  select: "customerId total status",
            populate: {
                path: "customerId",
                select: "username email" // Aqui si se mostrarian campos especificos del cliente
            }})
        if (!updatedSale) {
            return res.status(404).json({ message: "Venta no encontrada" });
        }
        res.status(200).json({ message: "Venta actualizada correctamente"});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la venta", error: error.message });
    }
}
//DELETE
salesController.deleteSales = async (req, res) => {
    try {
      const deletedSale = await salesModel.findByIdAndDelete(req.params.id);
  
      if (!deletedSale) {
        return res.status(404).json({ message: "Venta no encontrada" });
      }
      res.status(200).json({ message: "Venta eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar la venta", error: error.message });
    }
}
//GET POR ID
salesController.getSale = async (req, res) => {
    try {
        const venta = await salesModel.findById(req.params.id).populate({ path: "orderId",  select: "customerId total status",
            populate: {
                path: "customerId",
                select: "username email" // Aqui si se mostrarian campos especificos del cliente
            }})
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la venta", error: error.message });
    };
}
export default salesController