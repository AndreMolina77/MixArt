const artistController = {};
import artistModel from "../models/Articles.js";
import artist from "../models/artist";

//Create (Post)
artistController.postartist = async (req, res) => {
    const{username, email, password, phoneNumber, ProfilePic, _id } = req.body;
    const newArtist = new artistModel({username, email, password, phoneNumber, ProfilePic, _id })
    
    await newArtist.save();
    res.status(201).json({ message: "Artista creado con éxito"});
};
//Read (Get)
artistController.getartist = async (req, res) => {
    const artist = await artistModel.find().populate('_id');
    res.json(artist);
};
//Update (Put)
artistController.putartist = async (req, res) => {
    const{username, email, password, phoneNumber, ProfilePic, _id } = req.body;
    const updateartist = new artist({username, email, password, phoneNumber, ProfilePic, _id }, {new: true})

    if(!updateartist){
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json({ message: "Artista actualizado con éxito" });
};
//Delete (Delete) por su ID
artistController.deleteartist = async (req, res) =>{
    const deleteArtist = await artistModel.find(req.params.id).populate('_id');
    if (!deleteartist) {
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json({ message: "Artista eliminado con éxito" });
};
//Read (Get) pero por su ID
artistController.getartist = async (req, res) =>{
    const artist = await artistModel.find(req.params.id).populate(_id);
    if (!artist) {
        return res.status(404).json({ message: "Artista no encontrado" });
    }
    res.json(artPiece);
};
export default artistController;