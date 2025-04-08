import jwt from "jsonwebtoken"
import { expiration, secret_key } from "../../index.js"
export const isTokenExpired=(req,res,next)=>{
    jwt.verify(req.headers.token,secret_key,(err,decode)=>{
        if(Math.floor(((Date.now()/1000)-decode.iat)/60)>expiration){
            return res.status(400).json({msg:"token expired"})
        }
    })
     next()
} 