import express from "express";

const router = express.Router();

import reviewsController from "../controllers/reviewsControllers.js";
router
router
  .route("/")
  .get(reviewsController.getreview)
  .post(reviewsController.postreview);
router
  .route("/:id")
  .get(reviewsController.getreviews)
  .put(reviewsController.putreview)
  .delete(reviewsController.deletereview);
export default router;