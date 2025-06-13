/* Se verá algo así, ya que incluye ambas tablas de Artículos y Piezas de Arte
"Order": [
    {
  "customerId": "5f5b7b3b4f3b1b2b3c4f5d6e",
  "items": [
        {
            "itemType": "Article",
            "itemId": "5f5b7b3b4f3b1b2b3c4f5d6e",
            "quantity": 2,
            "subtotal": 100
        },
        {
            "itemType": "Article",
            "itemId": "5fbf7b3b4f3b1b2bsbd4f5d6e",
            "quantity": 1,
            "subtotal": 50
        },
        {
            "itemType": "ArtPiece",
            "itemId": "67afad03e0548fb3da69ecb3",
            "quantity": 1,
            "subtotal": 400
        }
    ],
    "total": 550,
    "status": "Pending"
    },
] */
import { Schema, model } from "mongoose";

const ordersSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, require: true, ref: "Customer" },
    items: [{
        itemType: { type: String, require: true, enum: ['Article', 'ArtPiece'] },
        itemId: { type: Schema.Types.ObjectId, require: true, refPath: 'itemType'},
        quantity: { type: Number, require: true, min: 1 },
        subtotal: { type: Number, require: true, min: 0 } 
    }],
    total: { type: Number, require: true, min: 0 },
    status: { type: String, require: true, enum: ['Pendiente', 'En proceso', 'Entregado', 'Enviado', 'Cancelado'], default: 'Pendiente'}
    }, {  
        timestamps: true,
        strict: false
    }
)
export default model("Order", ordersSchema, "Order")