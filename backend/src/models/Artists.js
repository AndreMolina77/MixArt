import { Schema, model } from "mongoose";

const artistsSchema = new Schema(
    {
        username: {
            type: String,
            require: true,
        },
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
            min: 8,
        },
        phoneNumber: {
            type: String,
            unique: true,
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
