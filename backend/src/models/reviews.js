import { Schema, model } from "mongoose";

const reviewsSchema = new Schema(
    {
        rating: {
            type: Number,
            require: true,
            min: 8,
        },
        comment: {
            type: String,
            require: true,
        },
        itemType: {
            type: String,
            require: true,
            enum: ['Article', 'ArtPiece']
        },
        itemId: {
            type: Schema.Types.ObjectId,
            require: true,
            refPath: 'itemType'
        },
        customerId: {
            type: Schema.Types.ObjectId,
            ref: "Customer",
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false,
    }
);
export default model ("Review", reviewsSchema, "Review");