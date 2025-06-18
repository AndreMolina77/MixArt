import {Schema, model} from "mongoose";
 const salesSchema = new Schema({
    orderId:{
        type: Schema.Types.ObjectId,
        require: true,
        ref: "Order",
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
        require: true,
        enum: ['Vendido', 'Venta Pendiente'], default: 'Venta Pendiente'
    }
}, {
    timestamps: true,
    strict: false
})
export default model ("Sale", salesSchema, "Sale")