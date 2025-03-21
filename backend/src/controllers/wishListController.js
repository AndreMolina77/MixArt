const wishListController = {};

import WishListModel from "../models/WishList.js";
//Create (Post)
wishListController.postWishList = async (req, res) => {
    const {customerId, items} = req.body;
    //Validacion para que los items (productos) contengan los campos necesarios
    try {
        if (!items || !Array.isArray(items) || items.length === 0) {
            return res.status(400).json({ message: "El arreglo de los productos es necesario y no puede ser vacio." });
        }
    
    const newWishlist = new WishListModel({customerId, items});

    await newWishlist.save();
    res.status(201).json({ message: "Lista de deseos creada exitosamente." });
    } catch (error) {
        res.status(400).json({ message: "Error al crear la lista de deseos", error: error.message });
    };
};
//Read (Get)
wishListController.getWishList = async (req, res) => {
    try {
        const wishlists = await WishListModel.find()
        .populate("customersId", "username email") 
        .populate({path: "items.itemId", select: "name price", }); 
        res.status(200).json(wishlists);
    } catch (error) {
        res.status(500).json({ message: "Error al obtener la lista de deseos", error: error.message });
    };
};
//Update (Put)
wishListController.putWishList = async (req, res) => {
    const {customerId, items} = req.body;
    try {
        const updates = {customerId, items};

        const updatedWishlist = await WishListModel.findByIdAndUpdate(req.params.id, updates, { new: true })
            .populate("cuestomersId", "username email")
            .populate({path: "items.itemId", select: "name price",}); 
        if (!updatedWishlist) {
            return res.status(404).json({ message: "Lista de deseos no encontrada" });
        }
        res.status(200).json({ message: "Lista de deseos actualizada correctamente"});
    } catch (error) {
        res.status(400).json({ message: "Error al actualizar la lista de deseos", error: error.message });
    }
};
// Delete (Delete) por su ID
wishListController.deleteWishList = async (req, res) => {
    try {
      const deletedWishlist = await WishListModel.findByIdAndDelete(req.params.id);
  
      if (!deletedWishlist) {
        return res.status(404).json({ message: "Lista de deseos no encontrada" });
      }
  
      res.status(200).json({ message: "Lista de deseos eliminada correctamente" });
    } catch (error) {
      res.status(400).json({ message: "Error al eliminar la lista de deseos", error: error.message });
    }
  };
//Read (Get) pero por su ID
wishListController.getWishListById = async (req, res) => {
    try {
        const wishlist = await WishListModel.find(req.params.id)
        .populate("customersId", "username email") 
        .populate({path: "items.itemId", select: "name price", }); 
        if (!wishlist) {
            return res.status(404).json({ message: "Lista de deseos no encontrada" });
        }
        res.status(200).json(wishlist);
    } catch (error) {
        res.status(500).json({ message: "Error al eliminar la lista de deseos", error: error.message });
    };
};
export default wishListController;