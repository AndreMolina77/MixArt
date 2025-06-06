const salesController = {};

import salesModel from "../models/Sales.js";

//POST
salesController.postSales = async (req, res) => {
    const {customerId, items, total, status} = req.body;
    //Validacion para que los items (productos) contengan los campos necesarios
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "El arreglo de los productos es necesario y no puede ser vacio." });
        }
    
    const newOrder = new salesModel({customerId, items, total, status});

    await newOrder.save();
    res.status(201).json({ message: "Orden creada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la orden", error: error.message });
    };
}
//GET
salesController.getSales = async (req, res) => {
    try {
        const orders = await salesModel.find()
        .populate("customerId", "username email") 
        .populate({path: "items.itemId", select: "name price", }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenes", error: error.message });
    };
}

//PUT
salesController.putSales = async (req, res) => {
    const {customerId, items, total, status} = req.body;
    try {
        const updates = {customerId, items, total, status};

        const updatedOrder = await salesModel.findByIdAndUpdate(req.params.id, updates, { new: true })
            .populate("cuestomersId", "username email")
            .populate({path: "items.itemId", select: "name price",}); 
        if (!updatedOrder) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        res.status(200).json({ message: "Orden actualizada correctamente"});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la orden", error: error.message });
    }
}

//DELETE
salesController.deleteSales = async (req, res) => {
    try {
      const deletedOrder = await salesModel.findByIdAndDelete(req.params.id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order no encontrada" });
      }
  
      res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar la orden", error: error.message });
    }
}

//GET POR ID
salesController.getSale = async (req, res) => {
    try {
        const order = await salesModel.findById(req.params.id)
        .populate("customersId", "username email") 
        .populate({path: "items.itemId", select: "name price",}); 
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener orden", error: error.message });
    };
}


export default salesController;