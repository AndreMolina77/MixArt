import express from "express"

const router = express.Router()

import recoveryPasswordController from "../controllers/recoveryPasswordController.js"
router.route("/requestCode").post(recoveryPasswordController.requestCode)
router.route("/verifyCode").post(recoveryPasswordController.verifyCode)
router.route("/changePassword").post(recoveryPasswordController.changePassword)

export default router