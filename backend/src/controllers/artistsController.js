const artistController = {};
import artistModel from "../models/Artists.js";

//Create (Post)
artistController.postartist = async (req, res) => {
    const{ username, email, password, phoneNumber, profilePic } = req.body;
    const newArtist = new artistModel({username, email, password, phoneNumber, profilePic })
    
    await newArtist.save();
    res.status(201).json({ message: "Artista creado con éxito"});
};
//Read (Get)
artistController.getartists = async (req, res) => {
    const artist = await artistModel.find();
    res.json(artist);
};
//Update (Put)
artistController.putartist = async (req, res) => {
    const{username, email, password, phoneNumber, profilePic } = req.body;
    const updateartist = new artistModel({username, email, password, phoneNumber, profilePic }, {new: true})

    if(!updateartist){
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json({ message: "Artista actualizado con éxito" });
};
//Delete (Delete) por su ID
artistController.deleteartist = async (req, res) =>{
    const deleteArtist = await artistModel.find(req.params.id);
    if (!deleteArtist) {
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json({ message: "Artista eliminado con éxito" });
};
//Read (Get) pero por su ID
artistController.getartist = async (req, res) =>{
    const artist = await artistModel.find(req.params.id);
    if (!artist) {
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json(artPiece);
};
export default artistController;