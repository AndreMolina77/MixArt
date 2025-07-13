const signupCustomerController = {}
// Importo el modelo de clientes
import customersModel from "../models/Customers.js"
import bcryptjs from "bcryptjs"
import jsonwebtoken from "jsonwebtoken"
import nodemailer from 'nodemailer'
import crypto from 'crypto'
import { config } from "../utils/config.js"
//Post (CREATE)
signupCustomerController.registerCustomer = async (req, res) => {
  console.log("Datos recibidos:", req.body);
  
  try {
    // Validar campos obligatorios
    const requiredFields = ['name', 'lastName', 'username', 'email', 'password', 'phoneNumber'];
    const missingFields = [];
    
    requiredFields.forEach(field => {
      if (!req.body[field] || req.body[field].trim() === "") {
        missingFields.push(field);
      }
    });
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missingFields.join(', ')}`
      });
    }

    // Verificar duplicados
    const existingCustomer = await customersModel.findOne({ 
      $or: [{ email: req.body.email }, { username: req.body.username }] 
    });
    
    if (existingCustomer) {
      return res.status(409).json({ 
        message: "El email o nombre de usuario ya está registrado" 
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcryptjs.hash(req.body.password, 10);
    
    // Crear cliente
    const newCustomer = new customersModel({
      name: req.body.name,
      lastName: req.body.lastName,
      username: req.body.username,
      email: req.body.email,
      password: hashedPassword,
      phoneNumber: req.body.phoneNumber,
      issNumber: req.body.issNumber || null,
      isVerified: false
    });

    await newCustomer.save();
    
    // Generar y enviar código de verificación
    const verCode = crypto.randomBytes(3).toString('hex');
    const token = jsonwebtoken.sign({ email: req.body.email, verCode }, config.JWT.secret, { 
      expiresIn: "2h" 
    });
    
    res.cookie("verificationToken", token, { 
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Configurar y enviar email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: { user: config.APPUSER.USER, pass: config.APPUSER.PASS }
    });
    
    const mailOptions = {
      from: config.APPUSER.USER,
      to: req.body.email,
      subject: 'Verificación de cuenta',
      html: `<p>Tu código de verificación es: <strong>${verCode}</strong></p>`
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error enviando email:", error);
        return res.status(500).json({ 
          message: "Error al enviar el código de verificación" 
        });
      }
      res.json({ 
        success: true,
        message: "Registro exitoso. Por favor verifica tu email." 
      });
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ 
      message: "Error interno del servidor" 
    });
  }
};
//Verificar el código de verificación
signupCustomerController.verifyCodeEmail = async (req, res) => {
    const {verCodeRequest} = req.body
    //TOKEN
    const token = req.cookies.verificationToken
    //Verificar y decodificar el token
    const decoded = jsonwebtoken.verify(token, config.JWT.secret)
    const {email, verCode: storedCode} = decoded
    //Comparar los códigos
    if (verCodeRequest !== storedCode) {
        return res.json({message: "Código de verificación incorrecto"})
    } 
    //Si el código es correcto, actualizar el estado del cliente a "verified" 
    const customer = await customersModel.findOne({email})
    customer.isVerified = true
    await customer.save()

    res.clearCookie("verificationToken")
    res.json({message: "Cuenta verificada exitosamente"})
}
export default signupCustomerController