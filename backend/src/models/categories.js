import { Schema, model } from "mongoose"

const categoriesSchema = new Schema(
    {
        categoryName: {
            type: String,
            require: true,
        },
        description: {
            type: String,
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false,
    }
)
export default model ("Category", categoriesSchema, "Category")