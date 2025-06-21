import express from "express";
import multer from "multer";

const router = express.Router();
const upload = multer({dest: "public/"})

import employeesController from "../controllers/employeesController.js";

router
  .route("/")
  .get(employeesController.getEmployees)
  .post(employeesController.postEmployee);
router
  .route("/:id")
  .get(employeesController.getEmployee)
  .put(upload.single("profilePic"), employeesController.putEmployee)
  .delete(employeesController.deleteEmployee);
export default router;