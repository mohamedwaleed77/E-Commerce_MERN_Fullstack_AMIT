import mongoose, {Schema,model } from "mongoose";

const orderSchema=new Schema({
    totalPrice:Number,
    address:{
        type:String,
        required:true
    },
    phoneNo:{
        type:String,
        required:true
    },
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    completed:{
        type:Boolean,
        default:false,
    },
    products:Array

},{
 timestamps:{
    createdAt:true,
    updatedAt:false
 },
 versionKey:false
}
)


export const orderModel=model("Order",orderSchema);