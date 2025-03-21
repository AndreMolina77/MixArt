import express from "express";

const router = express.Router();

import artPiecesController from "../controllers/artPiecesController.js";
router
  .route("/")
  .get(artPiecesController.getArtPieces)
  .post(artPiecesController.postArtPieces);
router
  .route("/:id")
  .get(artPiecesController.getArtPiece)
  .put(artPiecesController.putArtPieces)
  .delete(artPiecesController.deleteArtPieces);
export default router;