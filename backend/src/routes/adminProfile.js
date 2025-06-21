import express from "express"
import multer from "multer"
import adminProfileController from "../controllers/adminProfileController.js"

const router = express.Router()
const upload = multer({dest: "public/"})

router.put("/", upload.single("profilePic"), adminProfileController.updateProfile)
router.put("/password", adminProfileController.changePassword)

export default router