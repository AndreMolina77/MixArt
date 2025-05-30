import { Schema, model } from "mongoose";

const suppliersSchema = new Schema(
  {
    supplierName: { 
      type: String, 
      required: [true, "El nombre del proveedor es requerido"], 
      trim: true,
      minlength: [2, "El nombre debe tener al menos 2 caracteres"],
      maxlength: [100, "El nombre no puede exceder 100 caracteres"]
    },
    email: { 
      type: String, 
      required: [true, "El email es requerido"], 
      trim: true,
      lowercase: true,
      unique: true,
      validate: {
        validator: function(email) {
          return /^\S+@\S+\.\S+$/.test(email);
        },
        message: "Por favor, ingrese un correo electrónico válido"
      }
    },
    phoneNumber: { 
      type: String, 
      required: [true, "El teléfono es requerido"], 
      validate: {
        validator: function(phone) {
          // Limpiar el teléfono de caracteres no numéricos
          const cleanPhone = phone.replace(/\D/g, '');
          return cleanPhone.length >= 8;
        },
        message: "El teléfono debe tener al menos 8 dígitos"
      }
    },
    address: { 
      type: String, 
      required: [true, "La dirección es requerida"], 
      trim: true,
      minlength: [5, "La dirección debe tener al menos 5 caracteres"],
      maxlength: [200, "La dirección no puede exceder 200 caracteres"]
    },
  },
  {
    timestamps: true,
    strict: false,
  }
);

// Índices para optimizar búsquedas
suppliersSchema.index({ email: 1 });
suppliersSchema.index({ supplierName: 1 });

// Middleware para limpiar el teléfono antes de guardar
suppliersSchema.pre('save', function(next) {
  if (this.phoneNumber) {
    // Limpiar teléfono dejando solo números
    this.phoneNumber = this.phoneNumber.replace(/\D/g, '');
  }
  next();
});

suppliersSchema.pre('findOneAndUpdate', function(next) {
  const update = this.getUpdate();
  if (update.phoneNumber) {
    update.phoneNumber = update.phoneNumber.replace(/\D/g, '');
  }
  next();
});

export default model("Supplier", suppliersSchema, "Supplier");