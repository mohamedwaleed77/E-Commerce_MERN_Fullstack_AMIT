import express, { json } from "express"
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import cors from 'cors'
import cartRouter from "./src/module/cart.router.js";

export const host=(process.env.DATA_BASE_HOST)
export const port=(process.env.PORT_CART)
export const secret_key=(process.env.SECRET_KEY)
export const expiration=(process.env.SESSION_TIME_MINUTES)

dbConnection(host)
const app=express()
app.use(cors())
app.use(express.json())

app.use(cartRouter)

app.use((err,req,res,next)=>{
 
    res.status(500).json({error:err.message})
})
app.listen(port,()=>{
    console.log("cart services are ON",host,"port:",port)
})
 