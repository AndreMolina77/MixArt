const reviewsController = {};

import reviewsModel from "../models/Reviews.js";

//Create (Post)
reviewsController.postreview = async (req, res) => {
    const{rating, comment, itemType, itemId, customerId} = req.body;

    if (itemType !== 'Article' && itemType !== 'ArtPiece') {
        return res.status(400).json({ message: "contentType debe ser 'Article' o 'ArtPiece'" });
    }
    const newreview = new reviewsModel({rating, comment, itemType, itemId, customerId})

    await newreview.save();
    res.status(201).json({ message: "Review creada con éxito"});
};
//Read (Get)
reviewsController.getreview = async (req, res) => {
    const review = await reviewsModel.find().populate('itemId').populate('customerid');
    res.json(review);
};
//Update (Put)
reviewsController.putreview = async (req,res) => {
    const{rating, comment, itemType, itemId, customerId} = req.body;

    if (itemType !== 'Article' && itemType !== 'ArtPiece') {
        return res.status(400).json({ message: "contentType debe ser 'Article' o 'ArtPiece'" });
    }
    const updatereviews = await reviewsModel.findByIdAndUpdate({rating, comment, itemType, itemId, customerId}, {new: true})

    if(!updatereviews){
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review actualizada con éxito" });
};
//Delete (Delete) por su ID
reviewsController.deletereview = async (req,res) => {
    const deletereview = await reviewsModel.find(req.params.id);
    if (!deletereview) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review eliminada con éxito" });
};
//Read (Get) pero por su ID
reviewsController.getreviews = async (req, res) =>{
    const review = await reviewsModel.find(req.params.id).populate(itemId).populate(customerid);
    if (!review) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json(review);
};
export default reviewsController;