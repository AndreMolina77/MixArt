const reviewsController = {};

import reviewsModel from "../models/reviews";
import reviews from "../models/reviews";

//Create (Post)
reviewsController.postreview = async (req, res) => {
    const{rating, comment, _Id, articlesid,  customerid} = req.body;
    const newreview = new reviewsModel({rating, comment, _Id, articlesid,  customerid})

    await newreview.save();
    res.status(201).json({ message: "Review creada con éxito"});
};
//Read (Get)
reviewsController.getreview = async (req, res) => {
    const review = await reviewsModel.find().populate('_Id').populate('articlesid').populate('customerid');
    res.json(review);
};
//Update (Put)
reviewsController.putreview = async (req,res) => {
    const{rating, comment, _Id, articlesid,customerid} = req.body;
    const updatereviews = new review({rating, comment, _Id, articlesid,  customerid}, {new: true})

    if(!updatereviews){
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review actualizada con éxito" });
};
//Delete (Delete) por su ID
reviewsController.deletereview = async (req,res) => {
    const deletereview = await reviewsModel.find(req.params.id).populate('_Id').populate('articlesid').populate('customerid');
    if (!deletereview) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json({ message: "Review eliminada con éxito" });
};
//Read (Get) pero por su ID
reviewsController.getreview = async (req, res) =>{
    const review = await reviewsModel.find(req.params.id).populate(_Id).populate(articlesid).populate(customerid);
    if (!review) {
        return res.status(404).json({ message: "Review no encontrada" });
    }
    res.json(review);
};

export default reviewsController;
