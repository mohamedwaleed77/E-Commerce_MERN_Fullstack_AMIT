 import jwt from 'jsonwebtoken'
import { secret_key } from '../../index.js';

export const isEmailConfirmed= async(req,res,next)=>{
    let {token}=req.headers
 
    let user="";
    jwt.verify(token,secret_key,(err,decoded)=>{
        if (err) return res.json({msg:"invalid token"})
        user=decoded.user;
    })

    if (user.emailConfirmed==false){
        return res.status(400).json({msg:"Confirm Email First"})
    }
    next()
}