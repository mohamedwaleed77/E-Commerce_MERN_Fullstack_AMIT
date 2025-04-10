 import jwt from 'jsonwebtoken'
import { secret_key } from '../../index.js';
 
export const isAdmin= async(req,res,next)=>{
    let {token}=req.headers
 
    let user="";
    jwt.verify(token,secret_key,(err,decoded)=>{
        if (err) return res.status(400).json({msg:"invalid token"})
        user=decoded.user;
 
    })

    if (user.role=="user"){
 
        return res.status(400).json({msg:"unothorized"})
    }
    next()
}