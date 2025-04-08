import {Schema,model } from "mongoose";

const userSchema=new Schema({
    name:String,
    email:String,
    password:String,
    emailConfirmed:{
        type:Boolean,
        default:false
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"]
    }
},{
 timestamps:{
    createdAt:true,
    updatedAt:false
 },
 versionKey:false
}
)


export const userModel=model("User",userSchema);