const artPiecesController = {};

import artPiecesModel from "../models/ArtPieces.js";
import { v2 as cloudinary } from 'cloudinary'
import { config } from "../utils/config.js"

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})
//Create (Post)
artPiecesController.postArtPieces = async (req, res) => {
    const { artPieceName, price, description, categoryId, artistId, discount } = req.body;
    let imageURL = ""
    
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        })
        imageURL = result.secure_url
    }
    const newArtPiece = new artPiecesModel({ artPieceName, price, description, image: imageURL, categoryId, artistId, discount: discount || 0 })

    await newArtPiece.save();
    res.status(201).json({ message: "Artículo creado con éxito"});
};
//Read (Get)
artPiecesController.getArtPieces = async (req, res) => {
    const artPieces = await artPiecesModel.find().populate('categoryId').populate('artistId');
    res.json(artPieces);
};
//Update (Put)
artPiecesController.putArtPieces = async (req, res) => {
    const { artPieceName, price, description, categoryId, artistId, discount } = req.body
    let imageURL = ""
    
    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        })
        imageURL = result.secure_url
    }
    const updatedArtPiece = new artPiecesModel({ artPieceName, price, description, image, categoryId, artistId, discount: discount || 0 }, {new: true})

    if (!updatedArtPiece) {
        return res.status(404).json({ message: "Artículo no encontrado" })
    }
    res.json({ message: "Artículo actualizado con éxito" })
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
    const artPiece = await artPiecesModel.find(req.params.id).populate('categoryId').populate('articlesId');
    if (!artPiece) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(artPiece);
};
export default artPiecesController;