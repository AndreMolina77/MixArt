const categoriesController = {};
import categoriesModel from "../models/categories";
import categories from "../models/categories";
 

//Create (Post)
categoriesController.postcategories  = async (req, res) =>{
    const{names, description, id_} = req.body;
    const newcategories = new categoriesModel({names, description, id_})

    await newcategories.save();
    res.status(201).json({ message: "Categoria creada con éxito"});
};
//Read (Get)
categoriesController.getcategories = async (req, res) => {
    const categories = await categoriesModel.find().populate('id_');
    res.json(categories);
};
//Update (Put)
categoriesController.putcategories = async (req, res) => {
    const{names, description, id_} = req.body;
    const updatecategories = new categories({names, description, id_}, {new: true})

    if(!updatecategories){
        return res.status(404).json({ message: "Categoria no encontrado" });
    }
    res.json({ message: "Categoria actualizado con éxito" });
};
//Delete (Delete) por su ID
categoriesController.deletecategories = async (req, res) =>{
    const categories = await categoriesModel.find(req.params.id).populate('id_');
    if (!deletecategories) {
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json({ message: "Categoria eliminada con éxito" });

};
//Read (Get) pero por su ID
categoriesController.getcategories  = async (req, res) =>{
    const categories = await categoriesModel.find(req.params.id).populate(id_);
    if (!categories) {
        return res.status(404).json({ message: "Categoria no encontrada" });
    }
    res.json(categories);
};

export default categoriesController;