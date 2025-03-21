/*
Se verá algo así, ya que incluye ambas tablas de Artículos y Piezas de Arte
"Orders": [
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

const orderItemSchema = new Schema({
    itemType: { type: String, required: true, enum: ['Article', 'ArtPiece'] },
    itemId: { type: Schema.Types.ObjectId, required: true, refPath: 'itemType'},
    quantity: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true, min: 0 }
});
const ordersSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, required: true,ref: "Customer" },
    items: [orderItemSchema],
    total: { type: Number, required: true, min: 0 },
    status: { type: String, required: true, enum: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'], default: 'Pending'}
    },
    {  
      timestamps: true,
      strict: false
    }
  );
export default model("Order", ordersSchema, "Order");