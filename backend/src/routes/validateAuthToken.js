import express from "express"
import { validateAuthToken } from "../middlewares/validateAuthToken.js"

const router = express.Router()
// Endpoint para validar el token de autenticación
router.post("/", validateAuthToken(["admin", "vendedor", "artista", "customer"]), (req, res) => {
  // Si llegamos aqui, significa que el token es válido
  res.status(200).json({ 
    message: "Token válido", 
    valid: true,
    userType: req.userType || 'unknown'
  })
})
export default router