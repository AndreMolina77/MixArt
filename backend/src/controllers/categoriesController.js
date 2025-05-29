const categoriesController = {};

import categoriesModel from "../models/categories.js";
 

//Create (Post)
categoriesController.postcategories  = async (req, res) =>{
    const{name, description} = req.body;
    const newcategories = new categoriesModel({name, description})

    await newcategories.save();
    res.status(201).json({ message: "Categoria creada con éxito"});
};
//Read (Get)
categoriesController.getcategories = async (req, res) => {
    const categories = await categoriesModel.find()
    res.json(categories);
};
//Update (Put)
categoriesController.putcategories = async (req, res) => {
    const{names, description} = req.body;
    const updatecategories = new categoriesModel({names, description}, {new: true})

    if(!updatecategories){
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json({ message: "Categoria actualizada con éxito" });
};
//Delete (Delete) por su ID
categoriesController.deletecategories = async (req, res) =>{
    const deletecategories = await categoriesModel.find(req.params.id);
    if (!deletecategories) {
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