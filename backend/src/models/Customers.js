import { Schema,model } from "mongoose";

const customersSchema = new Schema ({
    name: {
        type: String,
        require: true
    },
    lastName:{
        type: String,
        require: true
    },
    username:{
        type: String, 
        require: true,
        unique: true
    },
    email:{
        type: String,
        require:true
    },
    password:{
        type: String,
        require: true
    },
    phoneNumber:{
        type: String,
        require: true,
        unique: true
    },
    profilePic:{
        type: String,
        require: false
    },
    issNumber:{
        type: String,
        require: false
    },
    isVerified:{
        type: Boolean,
        require: false
    },
    appwriteUserId: {
        type: String,
        unique: true,
        sparse: true 
    },
    emailNotifications: { 
        type: Boolean, 
        default: false 
    }
}, {
    timestamps: true, 
    strict: false
})
export default model ("Customer", customersSchema, "Customer");