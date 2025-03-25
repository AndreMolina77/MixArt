import { Schema,model } from "mongoose";

const customersSchema = new Schema ({
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
});
export default model ("Customer", customersSchema, "Customer");