/* 
"ArtPiece": [
  {
    "artPieceName": "Fall",
    "price": 1999.99,
    "description": "Pintura óleo con estilo del siglo XVII",
    "image": "https://imagen.com",
    "categoryId": "3w892dgo7ovd2s02jm01",
    "artistId": "3b01n2s2sb12w98h18129b",
    "discount": 0,
  }
] */
import { Schema, model } from "mongoose";
const artPiecesSchema = new Schema(
    {
      artPieceName: { type: String, require: true, match: [/^[^\s].+[^\s]$/, "El nombre del producto no puede ser solo espacios",], },
      price: { type: Number, require: true, min: 0,},
      description: { type: String, require: true, minlength: [5, "La descripción debe tener al menos 10 caracteres"],},
      image: {type: String, require: true,},
      categoryId: { type: Schema.Types.ObjectId, ref: "Category", require: true, },
      artistId: { type: Schema.Types.ObjectId, ref: "Artist", require: true, },
      discount: { type: Number, require: true, validate: { validator: function (value) { return value !== 0; }, message: "El descuento no puede ser 0"}, min: [0, "El descuento no puede ser menor que 0"], max: [100, "El descuento no puede exceder el 100%"], },
    },
    {
        timestamps: true,
        strict: false,
    }
    ); 
export default model("ArtPiece", artPiecesSchema, "ArtPiece");