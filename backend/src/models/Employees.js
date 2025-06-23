import { Schema, model } from "mongoose";

const employeesSchema = new Schema(
    {
        name: {
            type: String,
            require: true,
        },
        lastName: {
            type: String,
            require: true
        },
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
        userType: {
            type: String,
            require: true,
            trim: true,
            enum: ['vendedor', 'artista']
        },
        profilePic: {
            type: String,
            require: false,
        },
        issNumber: {
            type: String,
            require: true,
        },
        isVerified: {
            type: Boolean,
            require: true
        },
        appwriteUserId: {
            type: String,
            unique: true,
            sparse: true // Permite que sea opcional
        }, 
        emailNotifications: { 
            type: Boolean, 
            default: false 
        }
    },
    {
        timestamps: true,
        strict: false,
      }
)
export default model ("Employee", employeesSchema, "Employee")