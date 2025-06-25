import express from "express";

const router = express.Router();

import reviewsController from "../controllers/reviewsController.js";
router
  .route("/")
  .get(reviewsController.getreview)
  .post(reviewsController.postreview);
router.get("/public", reviewsController.getPublicReview)
router
  .route("/:id")
  .get(reviewsController.getreviews)
  .put(reviewsController.putreview)
  .delete(reviewsController.deletereview);
export default router;