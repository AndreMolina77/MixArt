import dotenv from "dotenv";
// Ejecuta la configuración de las variables de entorno
dotenv.config();
// Exporta la constante config
export const config = {
  db: {
    URI: process.env.DB_URI,
  },
  server: {
    PORT: process.env.PORT,
  },
};