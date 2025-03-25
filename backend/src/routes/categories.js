import express from "express";

const router = express.Router();

import categoriesController from "../controllers/categoriesController.js";
router
router
  .route("/")
  .get(categoriesController.getcategories)
  .post(categoriesController.postcategories);
router
  .route("/:id")
  .get(categoriesController.getcategory)
  .put(categoriesController.putcategories)
  .delete(categoriesController.deletecategories);
export default router;