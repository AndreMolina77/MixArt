const artPiecesController = {};

import artPiecesModel from "../models/Articles.js";
//Create (Post)
artPiecesController.postArtPieces = async (req, res) => {
    const { artPieceName, price, description, image, stock, categoryId, supplierId, discount } = req.body;
    const newArtPiece = new artPiecesModel({ artPieceName, price, description, image, stock: stock || 0,  categoryId, supplierId, discount: discount || 0 })

    await newArtPiece.save();
    res.status(201).json({ message: "Artículo creado con éxito"});
};
//Read (Get)
artPiecesController.getArtPieces = async (req, res) => {
    const artPieces = await artPiecesModel.find().populate('categoryId').populate('supplierId');
    res.json(artPieces);
};
//Update (Put)
artPiecesController.putArtPieces = async (req, res) => {
    const { artPieceName, price, description, image, stock, categoryId, supplierId, discount } = req.body;
    const updatedArtPiece = new artPiecesModel({ artPieceName, price, description, image, stock: stock || 0,  categoryId, supplierId, discount: discount || 0 }, {new: true})

    if (!updatedArtPiece) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }
    res.json({ message: "Artículo actualizado con éxito" });
};
//Delete (Delete) por su ID
artPiecesController.deleteArtPieces = async (req, res) => {
    const deletedArticle = await artPiecesModel.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }
    res.json({ message: "Artículo eliminado con éxito" });
};
//Read (Get) pero por su ID
artPiecesController.getArtPiece = async (req, res) => {
    const artPiece = await artPiecesModel.find(req.params.id).populate('categoryId').populate('supplierId');
    if (!artPiece) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(artPiece);
};
export default artPiecesController;