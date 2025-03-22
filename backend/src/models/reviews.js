import { Schema } from "mongoose";

const customersSchema = new Schema(
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

        _Id: {
          type:  Schema.Types.ObjectId,
          ref: "reviews",
          require: true,
        },

        articlesid: {
            type: Schema.Types.ObjectId,
            ref: "articles",
            require: true,
        },

        customerid: {
            type: Schema.Types.ObjectId,
            ref: "customers",
            require: true,
        }

    },
    {
        timestamps: true,
        strict: false,
    }
)

export default model ("reviews", customersSchema)