

const reviewsController = {};

import reviewsModel from "../models/Reviews.js";

//Create (Post)
reviewsController.postreview = async (req, res) => {
    const{rating, comment, itemType, itemId, customerId} = req.body;

    if (itemType !== 'Article' && itemType !== 'ArtPiece') {
        return res.status(400).json({ message: "El contentType debe ser 'Article' o 'ArtPiece'" });
    }
    const newReview = new reviewsModel({rating, comment, itemType, itemId, customerId})

    await newReview.save();
    res.status(201).json({ message: "Review creada con éxito"});
};
//Read (Get)
reviewsController.getreview = async (req, res) => {
    const reviews = await reviewsModel.find().populate('itemId').populate('customerId');
    res.json(reviews);
};
//Read (Get)
reviewsController.getPublicReview = async (req, res) => {
    const reviews = await reviewsModel.find().populate('itemId').populate('customerId');
    res.json(reviews);
};
//Update (Put)
reviewsController.putreview = async (req,res) => {
    const{rating, comment, itemType, itemId, customerId} = req.body;

    if (itemType !== 'Article' && itemType !== 'ArtPiece') {
        return res.status(400).json({ message: "contentType debe ser 'Article' o 'ArtPiece'" });
    }
    const updatedReviews = await reviewsModel.findByIdAndUpdate(req.params.id, {rating, comment, itemType, itemId, customerId}, {new: true})

    if(!updatedReviews){
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review actualizada con éxito" });
};
//Delete (Delete) por su ID
reviewsController.deletereview = async (req,res) => {
    const deletedReview = await reviewsModel.findByIdAndDelete(req.params.id);
    if (!deletedReview) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review eliminada con éxito" });
};
//Read (Get) pero por su ID
reviewsController.getreviews = async (req, res) =>{
    const review = await reviewsModel.findById(req.params.id).populate(itemId).populate(customerId);
    if (!review) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json(review);
};
export default reviewsController;