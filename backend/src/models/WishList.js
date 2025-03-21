/* Se verá algo así, ya que incluye ambas tablas de Artículos y Piezas de Arte
"WishList": [
    {
  "customerId": "5f5b7b3b4f3b1b2b3c4f5d6e",
  "items": [
        {
            "itemType": "Article",
            "itemId": "5f5b7b3b4f3b1b2b3c4f5d6e",
        },
        {
            "itemType": "Article",
            "itemId": "5fbf7b3b4f3b1b2bsbd4f5d6e",
        },
        {
            "itemType": "ArtPiece",
            "itemId": "5fbf7b3b4f3b1b2bsbd4f5d6e",
        }
        {
            "itemType": "ArtPiece",
            "itemId": "5fbf7b3b4f3b1b2bsbd4f5d6e",
        }
    ],
    },
] */
import { Schema, model } from "mongoose";

const wishListItemSchema = new Schema({
    itemType: { type: String, required: true, enum: ['Article', 'ArtPiece'] },
    itemId: { type: Schema.Types.ObjectId, required: true, refPath: 'itemType'},
});
const wishListSchema = new Schema({
    customerId: { type: Schema.Types.ObjectId, required: true,ref: "Customer" },
    items: [wishListItemSchema], },
    {  
      timestamps: true,
      strict: false
    }
  );
export default model("WishList", wishListSchema, "WishList");