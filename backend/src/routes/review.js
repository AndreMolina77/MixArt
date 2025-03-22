import express from "express";

const router = express.Router();

import reviewsController from "../controllers/reviewControllers";
router
router
  .route("/")
  .get(reviewsController.getreview)
  .post(reviewsController.postreview);
router
  .route("/:id")
  .get(reviewsController.getreview)
  .put(reviewsController.putreview)
  .delete(reviewsController.deletereview);
export default router;