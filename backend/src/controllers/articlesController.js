const articlesController = {};

import articlesModel from "../models/Articles.js"
import { v2 as cloudinary } from 'cloudinary'
import { config } from "../utils/config.js"

cloudinary.config({
    cloud_name: config.CLOUDINARY.CLOUD_NAME,
    api_key: config.CLOUDINARY.API_KEY,
    api_secret: config.CLOUDINARY.API_SECRET
})
//Create (Post)
articlesController.postArticles = async (req, res) => {
    const { articleName, price, description, stock, categoryId, supplierId, discount } = req.body;
    let imageURL = ""

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        })
        imageURL = result.secure_url
    }
    const newArticle = new articlesModel({ articleName, price, description, image: imageURL, stock: stock || 0,  categoryId, supplierId, discount: discount || 0 })

    await newArticle.save();
    res.status(201).json({ message: "Artículo creado con éxito"});
};
//Read (Get)
articlesController.getArticles = async (req, res) => {
    const articles = await articlesModel.find().populate('categoryId').populate('supplierId');
    res.json(articles);
};
//Public read (get)
articlesController.getPublicArticles = async (req, res) => {
    const articles = await articlesModel.find().populate('categoryId', 'name').select('-supplierId -__v');
    res.json(articles);
}
//Update (Put)
articlesController.putArticles = async (req, res) => {
    const { articleName, price, description, stock, categoryId, supplierId, discount } = req.body
    let imageURL = ""

    if (req.file) {
        const result = await cloudinary.uploader.upload(req.file.path, {
            folder: "public",
            allowed_formats: ["jpg", "jpeg", "png", "gif"],
        })
        imageURL = result.secure_url
    }
    const updatedArticle = await articlesModel.findByIdAndUpdate(req.params.id, { articleName, price, description, image: imageURL, stock: stock || 0,  categoryId, supplierId, discount: discount || 0 }, { new: true });
    if (!updatedArticle) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }
    res.json({ message: "Artículo actualizado con éxito" });
};
//Delete (Delete) por su ID
articlesController.deleteArticles = async (req, res) => {
    const deletedArticle = await articlesModel.findByIdAndDelete(req.params.id);
    if (!deletedArticle) {
        return res.status(404).json({ message: "Artículo no encontrado" });
    }
    res.json({ message: "Artículo eliminado con éxito" });
};
//Read (Get) pero por su ID
articlesController.getArticle = async (req, res) => {
    const article = await articlesModel.findById(req.params.id).populate('categoryId').populate('supplierId');
    if (!article) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(article);
};
export default articlesController;