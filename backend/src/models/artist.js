import { Schema } from "mongoose";

const customersSchema = new Schema(
    {
        username: {
            type: string,
            require: true,
        },

        email: {
            type: string,
            require: true,
        },
        
        password: {
        type: string,
        require: true,
        min: 8,
        },
        phoneNumber: {
            type: string,
            require: Unique,
        },

        ProfilePic: {
         type: String,
         require: true,
        },

        _id: {
            type: Schema.Types.ObjectId,
            ref: "artist",
            require: true,
        }
    },
    {
        timestamps: true,
        strict: false,
      }
)

export default model ("artist", customersSchema)
