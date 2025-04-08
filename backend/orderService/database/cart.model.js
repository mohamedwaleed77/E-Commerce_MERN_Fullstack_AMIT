import mongoose, {Schema,model } from "mongoose";

const cartchema=new Schema({
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required:true
    },
    items:[
        {
            product:{
                type:mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required:true
            },
            price:Number,
            quantity:{
                type:Number,
                default:1,
                min:1
            }
        }
    ],

},{
 timestamps:{
    createdAt:true,
    updatedAt:false
 },
 versionKey:false
}
)


export const cartModel=model("Cart",cartchema);