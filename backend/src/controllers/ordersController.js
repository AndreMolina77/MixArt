const ordersController = {};

import ordersModel from "../models/Orders.js";
//Create (Post)
ordersController.postOrders = async (req, res) => {
    const {customerId, items, total, status} = req.body;
    //Validacion para que los items (productos) contengan los campos necesarios
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "El arreglo de los productos es necesario y no puede ser vacio." });
        }
    
    const newOrder = new ordersModel({customerId, items, total, status});

    await newOrder.save();
    res.status(201).json({ message: "Order creada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la orden", error: error.message });
    };
};
//Create (Post)
ordersController.postPublicOrders = async (req, res) => {
    const {customerId, items, total, status} = req.body;
    //Validacion para que los items (productos) contengan los campos necesarios
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "El arreglo de los productos es necesario y no puede ser vacio." });
        }
    
    const newOrder = new ordersModel({customerId, items, total, status});

    await newOrder.save();
    res.status(201).json({ message: "Order creada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la orden", error: error.message });
    };
};
//Read (Get)
ordersController.getOrders = async (req, res) => {
    try {
        const orders = await ordersModel.find()
        .populate("customerId", "username email") 
        .populate({path: "items.itemId", select: "name price", }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenes", error: error.message });
    };
};
//Read (Get)
ordersController.getPublicOrders = async (req, res) => {
    try {
        const orders = await ordersModel.find().populate({path: "items.itemId", select: "articleName artPieceName price image", }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenes", error: error.message });
    };
};
//Update (Put)
ordersController.putOrders = async (req, res) => {
    try {
        
        const {customerId, items, total, status} = req.body;

        console.log('📝 Actualizando pedido:', req.params.id)
        console.log('📦 Datos recibidos:', { customerId, items, total, status })
        // Validaciones
        if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Datos de pedido inválidos' })
        }
        const updatedOrder = await ordersModel.findByIdAndUpdate(req.params.id, { customerId, items, total, status },
            { new: true, runValidators: true }).populate('customerId', 'name lastName email username') 
        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(updatedOrder)
        res.status(200).json({ message: "Pedido actualizado correctamente"});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el pedido", error: error.message });
    }   
};
//Update (Put)
ordersController.putPublicOrders = async (req, res) => {
    try {
        
        const {customerId, items, total, status} = req.body;

        console.log('📝 Actualizando pedido:', req.params.id)
        console.log('📦 Datos recibidos:', { customerId, items, total, status })
        // Validaciones
        if (!customerId || !items || !Array.isArray(items) || items.length === 0) {
        return res.status(400).json({ message: 'Datos de pedido inválidos' })
        }
        const updatedOrder = await ordersModel.findByIdAndUpdate(req.params.id, { customerId, items, total, status },
            { new: true, runValidators: true }).populate('customerId', 'name lastName email username') 
        if (!updatedOrder) {
            return res.status(404).json({ message: "Pedido no encontrado" });
        }
        res.json(updatedOrder)
        res.status(200).json({ message: "Pedido actualizado correctamente"});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar el pedido", error: error.message });
    }   
};
// Delete (Delete) por su ID
ordersController.deleteOrders = async (req, res) => {
    try {
      const deletedOrder = await ordersModel.findByIdAndDelete(req.params.id);
  
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order no encontrada" });
      }
  
      res.status(200).json({ message: "Orden eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar la orden", error: error.message });
    }
  };
//Read (Get) pero por su ID
ordersController.getOrder = async (req, res) => {
    try {
        const order = await ordersModel.findById(req.params.id)
        .populate("customersId", "username email") 
        .populate({path: "items.itemId", select: "name price", }); 
        if (!order) {
            return res.status(404).json({ message: "Orden no encontrada" });
        }
        res.status(200).json(order);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenes", error: error.message });
    };
};
//Read (Get) pero por su ID
ordersController.getPublicOrder = async (req, res) => {
    try {
        const orders = await ordersModel.find(req.params.id).populate({path: "items.itemId", select: "articleName artPieceName price image", }); 
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener ordenes", error: error.message });
    };
};
export default ordersController;