import express from "express";

const router = express.Router();
import suppliersController from "../controllers/suppliersController.js"

router.route("/")
.get(suppliersController.getSuppliers)
.post(suppliersController.postSuppliers)
router.route("/:id")
.get(suppliersController.getSupplier)
.put(suppliersController.putSuppliers)
.delete(suppliersController.deleteSuppliers)

export default router;