import nodemailer from 'nodemailer'
import { config } from './config.js'
//Configurar el transportador para enviar correos
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.APPUSER.USER,
        pass: config.APPUSER.PASS
    }
})
//Definir a quien se le va a enviar el correo
const sendEmail = async (to, subject, text, html) => {
    try {
        const info = await transporter.sendMail({
            from: `"soporte EPA" <${config.APPUSER.USER}>`,
            to: to,
            subject: subject,
            text: text,
            html: html
        })
        return info
    } catch (err) {
        console.log("error: ", err)
    }
}
//Generar el código HTML para el correo
const HTMLRecoveryEmail = (code) => {
    return `
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de Contraseña</title>
        <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
        <style>
          @media (max-width: 640px) {
            .responsive-padding { padding: 1rem !important; }
            .responsive-text { font-size: 0.875rem !important; }
          }
        </style>
      </head>
      <body class="bg-gray-100 font-sans">
        <div class="min-h-screen flex items-center justify-center p-4">
          <div class="bg-white rounded-2xl shadow-2xl max-w-2xl w-full overflow-hidden">
            <div class="bg-gradient-to-r from-red-500 to-pink-600 p-8 text-center">
              <div class="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4">
                <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h1 class="text-3xl font-bold text-white mb-2">Recuperación de Contraseña</h1>
              <p class="text-red-100 text-lg">Restablece tu acceso de forma segura</p>
            </div>
            <div class="p-8 responsive-padding">
              <div class="text-center">
                <p class="text-gray-700 text-lg leading-relaxed mb-8 responsive-text">
                  Hola, recibimos una solicitud para restablecer tu contraseña. Usa el código de verificación a continuación para continuar:
                </p>
                <div class="relative mb-8">
                  <div class="inline-block bg-gradient-to-r from-red-500 to-pink-600 p-1 rounded-xl shadow-lg">
                    <div class="bg-white rounded-lg px-8 py-6">
                      <div class="text-4xl font-mono font-bold text-gray-800 tracking-widest">
                        ${code}
                      </div>
                      <div class="text-sm text-gray-500 mt-2">Código de verificación</div>
                    </div>
                  </div>
                  <div class="absolute -top-2 -left-2 w-4 h-4 bg-red-200 rounded-full opacity-60"></div>
                  <div class="absolute -bottom-2 -right-2 w-6 h-6 bg-pink-200 rounded-full opacity-40"></div>
                </div>
                <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-lg mb-8">
                  <div class="flex items-center">
                    <svg class="w-5 h-5 text-amber-400 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clip-rule="evenodd"></path>
                    </svg>
                    <p class="text-amber-800 font-medium">
                      Este código estará disponible durante los próximos <span class="font-bold">20 minutos</span>
                    </p>
                  </div>
                </div>
                <div class="bg-blue-50 rounded-lg p-4 mb-8">
                  <div class="flex items-start">
                    <svg class="w-5 h-5 text-blue-400 mr-3 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
                    </svg>
                    <p class="text-blue-800 text-sm leading-relaxed">
                      Si no solicitaste este correo electrónico, puedes ignorarlo de forma segura. Tu cuenta permanecerá protegida.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div class="bg-gray-50 px-8 py-6 border-t border-gray-200">
              <div class="text-center">
                <p class="text-gray-600 text-sm mb-3">
                  ¿Necesitas ayuda adicional?
                </p>
                <a href="mailto:support@example.com" 
                   class="inline-flex items-center px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors duration-200">
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                  Contactar Soporte
                </a>
                <p class="text-gray-400 text-xs mt-4">
                  © 2025 Tu Empresa. Todos los derechos reservados.
                </p>
              </div>
            </div>
          </div>
        </div>
      </body>
      </html>
    `
}
export { sendEmail, HTMLRecoveryEmail }