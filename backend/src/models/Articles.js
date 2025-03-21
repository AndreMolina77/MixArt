/* 
"Article": [
  {
    "articleName": "Pintura tipo óleo",
    "price": 19.99,
    "description": "Pintura óleo color verde pálido",
    "image": "https://imagen.com",
    "stock": 50,
    "categoryId": "3w892dgo7ovd2s02jm01",
    "supplierId": "3b01n2s2sb12w98h18129b",
    "discount": 20,
  }
] */
import { Schema, model } from "mongoose";
const articlesSchema = new Schema(
    {
      articleName: { type: String, require: true, match: [/^[^\s].+[^\s]$/, "El nombre del producto no puede ser solo espacios",], },
      price: { type: Number, require: true, min: 0,},
      description: { type: String, require: true, minlength: [5, "La descripción debe tener al menos 10 caracteres"],},
      image: {type: String, required: true,},
      stock: { type: Number, require: true, min: 0, },
      categoryId: { type: Schema.Types.ObjectId, ref: "Category", required: true, },
      supplierId: { type: Schema.Types.ObjectId, ref: "Supplier", required: true, },
      discount: { type: Number, default: 0, min: 0, max: 100, min: [0, "El descuento no puede ser menor que 0"], max: [100, "El descuento no puede exceder el 100%"], },
    },
    {
      timestamps: true,
      strict: false,
    }
    ); 
export default model("Article", articlesSchema, "Article");