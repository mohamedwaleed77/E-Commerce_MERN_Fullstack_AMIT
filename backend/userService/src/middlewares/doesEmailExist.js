import { userModel } from "../../database/user.model.js"
export const doesEmailExist= async(req,res,next)=>{
    let {email}=req.body
    let user=await userModel.findOne({email})
    console.log(user)
    if (user){
        return res.status(400).json({msg:"email already exists"})
    }
    else{
    next();
    }
}