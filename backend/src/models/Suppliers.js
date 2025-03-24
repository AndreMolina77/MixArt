import { Schema, model } from "mongoose";

const suppliersSchema = new Schema(
  {
    supplierName: { type: String, require: true, match: [/^[^\s].+[^\s]$/, "El nombre del proveedor no puede ser solo espacios",], },
    email: { type: String, require: true, match: [/^\S+@\S+\.\S+$/, "Por favor, ingrese un correo electrónico válido"], },
    phoneNumber: { type: String, require: true, match: [/^\d{10}$/, "Por favor, ingrese un número de teléfono válido"], },
    address: { type: String, require: true, },
  },
  {
    timestamps: true,
    strict: false,
  }
);