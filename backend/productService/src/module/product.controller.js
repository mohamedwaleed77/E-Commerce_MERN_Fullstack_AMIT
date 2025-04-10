 
import { erroHandler } from "../middlewares/errorHandler.js";
import { productModel } from '../../database/product.model.js';
import path from 'path';
import fs from 'fs'; 
import exp from "constants";
 
 

export const getAll=erroHandler(async(req,res)=>{
    let page=req.query.page *1 || 1
    let filter;
    if (!req.query.category) filter={}
    else{filter={category:req.query.category} }
    let limit=20
    const skip = (parseInt(page-1))*limit

    let mogoQuery= await productModel.find(filter).skip(skip).limit(limit)
    return res.status(200).json({message:"all products","products":mogoQuery,page,skip,limit})
})
export const getProduct=erroHandler(async(req,res)=>{
    const {id}=req.params
    const item=await productModel.findById({_id:id})
    if (item)return res.json({item})
    return res.status(404).json({error:"not found"})
})
export const addProduct=erroHandler(async(req,res)=>{
    let product=req.body
    let isExist=await productModel.findOne({name:product.name})
    if (isExist){
        return res.json({msg:"product with same name exists"})
    }
    const insertedProduct = await productModel.create(product);
    return res.status(200).json({msg:"added product successfully",_id:insertedProduct._id})
})

export const manuallyChangeQuantity=erroHandler( async(req,res)=>{
        let {id}=req.params
        let quantity=req.query.q
        if (!quantity || quantity<0){
            return res.json({msg:"wrong input"})
        }
        await productModel.findByIdAndUpdate({_id:id},{quantity:quantity})
        return res.json({msg:"addedd successfully"})

                
}
)


export const attachImage=erroHandler(async(req,res)=>{
    let id=req.params.productId
    let product=await productModel.findByIdAndUpdate({_id:id},{image:req.file.path})
    return res.json({msg:"image addedd successfully",product})
})

export const showImage=erroHandler(async(req,res)=>{
    try {
        const filename = req.params.filename;
        const imagePath = path.resolve('uploads', `${filename}.png`);
    
        // Check if the file exists before sending
        if (!fs.existsSync(imagePath)) {
          throw new Error('File not found');
        }
    
        return res.sendFile(imagePath);
      } catch (error) {
        // Fallback to empty.png if any error occurs
        const fallbackImagePath = path.resolve('empty.png');
        return res.sendFile(fallbackImagePath);
      }
})

export const updateProduct= erroHandler(async(req,res)=>{
    await productModel.findByIdAndUpdate({_id:req.params.id},req.body,{new:true})
    return res.json({msg:"updated product successfully"})
})
export const deleteProduct= erroHandler(async(req,res)=>{
    await productModel.findByIdAndDelete({_id:req.params.id})
    return res.json({msg:"deleted product successfully"})
})

