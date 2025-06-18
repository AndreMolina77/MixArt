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
        require: true
    },
    isVerified:{
        type: Boolean,
        require: true
    },
    appwriteUserId: {
        type: String,
        unique: true,
        sparse: true 
    }
}, {
    timestamps: true, 
    strict: false
})
export default model ("Customer", customersSchema, "Customer");