import express from "express"
import multer from "multer"
import adminProfileController from "../controllers/adminProfileController.js"

const router = express.Router()
const upload = multer({dest: "public/"})

router.get("/data-public", adminProfileController.getProfilePublic)
router.get("/data", adminProfileController.getProfile)
router.put("/", upload.single("profilePic"), adminProfileController.updateProfile)
router.put("/password", adminProfileController.changePassword)
router.put("/notifications", adminProfileController.updateNotifications)

export default router