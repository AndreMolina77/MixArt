import express from "express"

const router = express.Router();
import salesController from "../controllers/salesController.js"

router.route("/")
.get(salesController.getSales)
.post(salesController.postSales)
router.route("/:id")
.get(salesController.getSale)
.put(salesController.putSales)
.delete(salesController.deleteSales)

export default router;