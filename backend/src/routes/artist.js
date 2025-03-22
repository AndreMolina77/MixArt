import express from "express";

const router = express.Router();

import artistController from "../controllers/artistsController";
router
router
  .route("/")
  .get(artistController.getartist)
  .post(artistController.postartist);
router
  .route("/:id")
  .get(artistController.getartist)
  .put(artistController.putartist)
  .delete(artistController.deleteartist);
export default router;