const categoriesController = {};

import categoriesModel from "../models/categories.js";
//Create (Post)
categoriesController.postcategories  = async (req, res) =>{
    const{categoryName, description} = req.body;
    const newCategory = new categoriesModel({categoryName, description})

    await newCategory.save();
    res.status(201).json({ message: "Categoria creada con éxito"});
};
//Read (Get)
categoriesController.getcategories = async (req, res) => {
    const categories = await categoriesModel.find()
    res.json(categories);
};
//Update (Put)
categoriesController.putcategories = async (req, res) => {
    const{categoryName, description} = req.body;
    const updatedCategory = await categoriesModel.findByIdAndUpdate(req.params.id, { categoryName, description }, { new: true });

    if(!updatedCategory){
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json({ message: "Categoria actualizada con éxito" });
};
//Delete (Delete) por su ID
categoriesController.deletecategories = async (req, res) =>{
    const deletedCategory = await categoriesModel.findByIdAndDelete(req.params.id);
    if (!deletedCategory) {
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json({ message: "Categoria eliminada con éxito" });

};
//Read (Get) pero por su ID
categoriesController.getcategory  = async (req, res) =>{
    const categories = await categoriesModel.find(req.params.id);
    if (!categories) {
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json(categories);
};
export default categoriesController;