import express from "express";

const router = express.Router();

import articlesController from "../controllers/articlesController.js";
router
  .route("/")
  .get(articlesController.getArticles)
  .post(articlesController.postArticles);
router
  .route("/:id")
  .get(articlesController.getArticle)
  .put(articlesController.putArticles)
  .delete(articlesController.deleteArticles);
export default router;