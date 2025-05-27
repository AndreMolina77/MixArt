import express from "express"

const router = express.Router()

import signupCustomerController from "../controllers/signupCustomerController.js"
router.route("/").post(signupCustomerController.registerCustomer)
router.route("/verifyCodeEmail").post(signupCustomerController.verifyCodeEmail)

export default router