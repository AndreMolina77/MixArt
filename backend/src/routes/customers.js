import express from "express"

const router = express.Router();
import customersController from "../controllers/customersController.js"

router.route("/")
.get(customersController.getCustomers)
.post(customersController.postCustomers)
router.put("/profile", customersController.updateProfile)
router.patch("/profile/password", customersController.changePassword)
router.route("/:id")
.get(customersController.getCustomer)
.put(customersController.putCustomers)
.delete(customersController.deleteCustomers)

export default router;