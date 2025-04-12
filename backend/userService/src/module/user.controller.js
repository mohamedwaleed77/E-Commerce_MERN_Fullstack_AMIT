import { userModel } from "../../database/user.model.js"
import bcrypt from "bcrypt"
import jwt from 'jsonwebtoken';
import { hostIP, mail_mail, mail_pass, secret_key } from "../../index.js"
import { sendConfirmEmail } from "../../mailer/send_mail.js";
import { erroHandler } from "../middlewares/errorHandler.js";



export const getAllUsers=erroHandler(async(req,res)=>{
    let {id,name}=req.query
    let filter={"_id":id,name}
    if (!name)filter={"_id":id}
    if(!id)filter={name}
    if (!name && !id)filter={}
 
    let page_no=req.query.page *1 || 1;
    
    if (page_no<1)page_no=1;
    let limit=10;
    let skip = (parseInt(page_no-1))*limit
 
    let users= await userModel.find(filter).skip(skip).limit(limit)
    return res.json({users})
})

export const addUser=erroHandler(async(req,res)=>{
    let user=req.body
    user.password=bcrypt.hashSync(user.password,8);
    await userModel.insertOne(user)
    sendConfirmEmail(mail_mail,mail_pass,user.email)
    return res.json({msg:"done",user})
})

export const login=erroHandler(async(req,res)=>{
    let {email,password}=req.body
    let user=await userModel.findOne({email})
    if (!user || !bcrypt.compareSync(password,user.password)){
        return res.status(500).json({msg:"wrong credintials"})
    }
    
    let token=jwt.sign({user},secret_key)
    return res.json({msg:"login success!",name:user.name,token,role:user.role})
})

export const verifyEmail=erroHandler(async(req,res)=>{
     let {token}=req.params
     jwt.verify(token,secret_key,async(err,decoded)=>{
 
        if(err)return res.status(500).json({msg:"invalid token",token })
        let user= await userModel.findOneAndUpdate({email:decoded.reciever},{emailConfirmed:true},{new:true})
        
        res.redirect(`http://${hostIP}:3005/`);
        return res.json({msg:"email confirmed"})
     })
})

export const deleteUser= erroHandler(async(req,res)=>{
    let {id}=req.params
    let user=await userModel.findByIdAndDelete({_id:id}).catch(()=>{
        return res.json({msg:err})
    })
    return res.json({msg:"user deleted successfully"})
 
    
})

export const updateUser= erroHandler(async(req,res)=>{
    let {id}=req.params
    let user=await userModel.findByIdAndUpdate({_id:id},req.body).catch(()=>{
        return res.json({msg:err})
    })
    return res.json({msg:"user updated successfully"})
 
    
})