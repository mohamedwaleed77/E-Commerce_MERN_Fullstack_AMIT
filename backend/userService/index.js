import express, { json } from "express"
import dotenv from 'dotenv';
import { dbConnection } from "./database/dbConnection.js";
import userRouter from "./src/module/user.router.js";
import cors from 'cors'


 
export const host=(process.env.DATA_BASE_HOST)
export const port=(process.env.PORT_USER)
export const secret_key=(process.env.SECRET_KEY)
export const mail_mail=(process.env.NODE_MAILER_MAIL)
export const mail_pass=(process.env.NODE_MAILER_KEY)
export const expiration=(process.env.SESSION_TIME_MINUTES)
dbConnection(host)
const app=express()
app.use(cors())
app.use(express.json())
app.use(userRouter)

app.use((err,req,res,next)=>{
 
    res.status(500).json({error:err.message})
})
app.listen(port,()=>{
    console.log("user services are ON",host,"port:",port)
})
 