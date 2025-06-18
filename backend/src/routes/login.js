import express from "express"

const router = express.Router()

import loginController from "../controllers/loginController.js"
router.route("/").post(loginController.login)
router.route("/google-auth").post(loginController.googleLogin)

export default router