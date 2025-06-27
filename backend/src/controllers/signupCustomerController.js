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
  const { name, lastName, username, email, password, phoneNumber, issNumber } = req.body;
  
  try {
    // Validar campos obligatorios
    const requiredFields = ['name', 'lastName', 'username', 'email', 'password', 'phoneNumber'];
    const missingFields = requiredFields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Faltan campos requeridos: ${missingFields.join(', ')}`
      });
    }

    // Verificar si el usuario ya existe
    const customerExist = await customersModel.findOne({ $or: [{ email }, { username }] });
    
    if (customerExist) {
      return res.status(409).json({ 
        message: "El email o nombre de usuario ya está registrado" 
      });
    }

    // Encriptar contraseña
    const hashedPassword = await bcryptjs.hash(password, 10);
    
    // Crear nuevo cliente
    const newCustomer = new customersModel({
      name,
      lastName,
      username,
      email,
      password: hashedPassword,
      phoneNumber,
      issNumber: issNumber || null,
      isVerified: false
    });

    await newCustomer.save();
    
    // Generar código de verificación
    const verCode = crypto.randomBytes(3).toString('hex');
    const token = jsonwebtoken.sign({ email, verCode }, config.JWT.secret, { expiresIn: "2h" });
    
    // Configurar cookie
    res.cookie("verificationToken", token, { 
      maxAge: 2 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });

    // Enviar email de verificación
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: config.APPUSER.USER,
        pass: config.APPUSER.PASS
      }
    });
    
    const mailOptions = {
      from: config.APPUSER.USER,
      to: email,
      subject: 'Verificación de cuenta',
      html: `
        <h1>Verificación de cuenta</h1>
        <p>Por favor, ingrese el siguiente código para verificar su cuenta:</p>
        <h2>${verCode}</h2>
        <p>El código expira en 2 horas.</p>
      `
    };

    // Enviar email
    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error al enviar correo:", error);
        return res.status(500).json({ 
          message: "Error al enviar el correo electrónico",
          error: error.message 
        });
      }
      console.log("Correo electrónico enviado:", info.response);
      res.json({ 
        message: "Cliente registrado. Por favor verifica tu correo",
        emailSent: true
      });
    });
  } catch (error) {
    console.error("Error en registro:", error);
    res.status(500).json({ 
      message: "Error al registrar el cliente",
      error: error.message 
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