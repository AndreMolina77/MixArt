import express from "express"
import validatePasswordController from "../controllers/validatePasswordController.js"
import { validateAuthToken } from "../middlewares/validateAuthToken.js"

const router = express.Router()

router.post("/", validateAuthToken([]), validatePasswordController.validatePassword)

export default router