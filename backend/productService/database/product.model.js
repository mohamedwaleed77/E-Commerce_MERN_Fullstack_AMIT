import {Schema,model } from "mongoose";

const productSchema=new Schema({
    name:String,
    category:String,
    price:Number,
    quantity:{
        type:Number,
        default:0
    },
    image:{
        type:String,
        default:`empty.png`
    }
     
},{
 timestamps:{
    createdAt:true,
    updatedAt:false
 },
 versionKey:false
}
)


export const productModel=model("Product",productSchema);