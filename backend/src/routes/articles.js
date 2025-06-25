import express from "express";
import multer from "multer";

const router = express.Router();

import articlesController from "../controllers/articlesController.js";
const upload = multer({dest: "public/"})
router
  .route("/")
  .get(articlesController.getArticles)
  .post(upload.single("image"), articlesController.postArticles);
router.get("/public", articlesController.getPublicArticles)
router
  .route("/:id")
  .get(articlesController.getArticle)
  .put(upload.single("image"), articlesController.putArticles)
  .delete(articlesController.deleteArticles);
export default router;
