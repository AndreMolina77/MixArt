/*
Se verá algo así, ya que incluye ambas tablas de Artículos y Piezas de Arte
"Orders": [
    {
        "customerId": "5f5b7b3b4f3b1b2b3c4f5d6e",
        "items": [
        {
            "articlesId": "5f5b7b3b4f3b1b2b3c4f5d6e",
            "quantity": 2,
            "subtotal": 100
        },
        {
            "articlesId": "5fbf7b3b4f3b1b2bsbd4f5d6e",
            "quantity": 1,
            "subtotal": 50
        },
        {
            "articlesId": "5f5b7b3b4f3b1b2b3c4f5d6e",
            "quantity": 3,
            "subtotal": 150
        },
        {
            "artPiecesId": "67afad03e0548fb3da69ecb3",
            "quantity": 1,
            "subtotal": 400
        },
        {
            "artPiecesId": "67afad03e0548fb3da69ecb4",
            "quantity": 1,
            "subtotal": 600
        },
        {
            "artPiecesId": "67afad03e0548fb3da69ecb5",
            "quantity": 3,
            "subtotal": 1800
        },
        ]
        "total": 3100,
        "status": "Pending"
    }
] */
// Importamos Schema y model de mongoose
import { Schema, model } from "mongoose";
// Creamos un nuevo Schema con la estructura de los productos
const ordersSchema = new Schema(
  {
    customerId: { type: Schema.Types.ObjectId, require: true,},
    items: [
    {
        articlesId: { type: Schema.Types.ObjectId, ref: "Article", require: false, },
        artPiecesId: { type:  Schema.Types.ObjectId, ref: "ArtPiece", require: false, },
        quantity: { type: Number, require: true, require: true, min: 1, },
        subtotal: { type: Number, require: true, require: true, min: 0, },
    },
    ],
    total: { type: Number, required: true, min: 0, },
  },
  {  
    timestamps: true,
    strict: false,
  }
);
// NUNCA OLVIDAR: colocar el tercer argumento para que se cree la colección con el nombre que queremos,
// ya que por defecto mongoose pluraliza el nombre de la colección
export default model("Order", ordersSchema, "Order");