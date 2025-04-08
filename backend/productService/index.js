import express, { json } from "express"
import cors from 'cors';
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import producRouter from "./src/module/product.router.js";
import multer from "multer";


 
export const host=(process.env.DATA_BASE_HOST)
export const port=(process.env.PORT_PRODUCT)
export const secret_key=(process.env.SECRET_KEY)
export const expiration=(process.env.SESSION_TIME_MINUTES)
dbConnection(host)
const app=express()
app.use(cors());
app.use(express.json())
 
app.use(producRouter)

app.use((err,req,res,next)=>{
 
    res.status(500).json({error:err.message})
})


  


app.listen(port,()=>{
    console.log("product services are ON",host,"port:",port)
})
 