const articlesController = {};

import articlesModel from "../models/Articles.js";
//Create (Post)
articlesController.postArticles = async (req, res) => {
    const { articleName, price, description, image, stock, categoryId, supplierId, discount } = req.body;
    const newArticle = new articlesModel({ articleName, price, description, image, stock,  categoryId, supplierId, discount})

    await newArticle.save();
    res.status(201).json({ message: "Artículo creado con éxito"});
};
//Read (Get)
articlesController.getArticles = async (req, res) => {
    const articles = await articlesModel.find().populate('categoryId').populate('supplierId');
    res.json(articles);
};
//Update (Put)
articlesController.putArticles = async (req, res) => {
    const { articleName, price, description, image, stock, categoryId, supplierId, discount } = req.body;
    const updatedArticle = new articlesModel({ articleName, price, description, image, stock: stock || 0,  categoryId, supplierId, discount: discount || 0 }, {new: true})

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
    const article = await articlesModel.find(req.params.id).populate('categoryId').populate('supplierId');
    if (!article) {
        return res.status(404).json({ message: "Articulo no encontrado" });
    }
    res.json(article);
};
export default articlesController;