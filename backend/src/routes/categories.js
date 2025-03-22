import expres from "express";

const router = express.Router();

import categoriesController from "../controllers/categoriesController";
router
router
  .route("/")
  .get(categoriesController.getcategories)
  .post(categoriesController.postcategories);
router
  .route("/:id")
  .get(categoriesController.getcategories)
  .put(categoriesController.putacategories)
  .delete(categoriesController.deletecategories);
export default router;