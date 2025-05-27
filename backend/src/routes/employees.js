import express from "express";

const router = express.Router();

import artistController from "../controllers/employeesController.js";
router
router
  .route("/")
  .get(artistController.getEmployees)
  .post(artistController.postEmployee);
router
  .route("/:id")
  .get(artistController.getEmployee)
  .put(artistController.putEmployee)
  .delete(artistController.deleteEmployee);
export default router;