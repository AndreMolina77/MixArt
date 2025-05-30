import express from "express";
import multer from "multer";

const router = express.Router();

import artPiecesController from "../controllers/artPiecesController.js";
const upload = multer({dest: "public/"})
router
  .route("/")
  .get(artPiecesController.getArtPieces)
  .post(upload.single("image"), artPiecesController.postArtPieces);
router
  .route("/:id")
  .get(artPiecesController.getArtPiece)
  .put(upload.single("image"), artPiecesController.putArtPieces)
  .delete(artPiecesController.deleteArtPieces);
export default router;