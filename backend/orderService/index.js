import express, { json } from "express"
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import cors from 'cors'
import orderRouter from "./src/module/order.router.js";

 
export const host=(process.env.DATA_BASE_HOST)
export const hostIP=(process.env.IP_ADDRESS)
export const port=(process.env.PORT_ORDER)
export const secret_key=(process.env.SECRET_KEY)
export const expiration=(process.env.SESSION_TIME_MINUTES)
export const stripe_key=(process.env.STRIPE_KEY)
 
 
dbConnection(host)
const app=express()
app.use(cors())
app.use(express.json())

app.use(orderRouter)

app.use((err,req,res,next)=>{
 
    res.status(500).json({error:err.message})
})
app.listen(port,()=>{
    console.log("Order services are ON",host,"port:",port)
})
 