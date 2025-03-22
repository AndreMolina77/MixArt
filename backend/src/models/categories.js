import { Schema, SchemaType, SchemaTypes } from "mongoose";
const customersSchema = new Schema(
    {
        names: {
            type: String,
            require: true,
        },

        description: {
            type: String,
            require: true,
        },

        id_: {
            type: Schema.Types.ObjectId,
            ref: "categories",
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false,
      }
)

export default model ("categories", customersSchema)