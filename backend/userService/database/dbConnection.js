import mongoose from "mongoose";
import { host } from "../index.js";
 
export const dbConnection=(host)=>{
    mongoose.connect(`mongodb://${host}:27017/ecommerceamit`).then(()=>{
    console.log("database connected");
}).catch(()=>{
    console.log("database error");
})
}