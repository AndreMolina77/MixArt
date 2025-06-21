import { Schema, model } from "mongoose"

const adminSchema = new Schema({
    name: { type: String, required: true },
    lastName: { type: String, required: true }, 
    email: { type: String, required: true, unique: true },
    profilePic: { type: String, default: '' },
    userType: { type: String, default: 'admin' }
}, {
    timestamps: true,
    strict: false
})
export default model("Admin", adminSchema, "Admin")