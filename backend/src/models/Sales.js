import {Schema, model} from "mongoose";
 const salesSchema = new Schema({
    idOrden:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Orders",
        unique: true
    },
    paymentMethod:{
        type: String,
        require: true
    },
    address:{
        type: String,
        require: true
    },
    status: {
        type: String,
        require: true
    }
 })