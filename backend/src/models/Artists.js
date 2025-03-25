import { Schema, model } from "mongoose";

const artistsSchema = new Schema(
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
            require: true,
        },
        profilePic: {
            type: String,
            require: true,
        },
    },
    {
        timestamps: true,
        strict: false,
      }
)
export default model ("Artist", artistsSchema, "Artist");
