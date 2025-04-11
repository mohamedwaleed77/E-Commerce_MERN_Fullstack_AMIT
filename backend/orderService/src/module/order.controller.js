import { cartModel } from "../../database/cart.model.js";
import { host, port, secret_key, stripe_key } from "../../index.js";
import { erroHandler } from "../middlewares/errorHandler.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken"
import { orderModel } from "../../database/order.model.js";

const calculate_total_price=(arr)=>{
    let total=0;
    for (const element of arr) {
        total+=element.price
    }
 
    return total
}

export const pastOrders=erroHandler(async(req,res)=>{
  let {token}=req.headers
  let user=jwt.verify(token,secret_key)
  const orders=await orderModel.find({owner:user.user._id})
  return res.json({orders})
})

export const createOrder=erroHandler(async(req,res)=>{
    let {token}=req.headers
    let user=jwt.verify(token,secret_key)
    let cart=await cartModel.find({owner:user.user._id})

    cart=cart[0]//I don't know what is happening why [0] works ???
    const totalPrice=calculate_total_price(cart.items)

    const stripe=new Stripe(stripe_key)
    const session = await stripe.checkout.sessions.create({
        line_items: [
          {
            price_data:{
                currency:"egp",
                unit_amount: totalPrice*100,
                product_data:{name:user.user.name}
            },
            quantity:1
          },
          
        ],
        mode: 'payment',
        success_url:`http://localhost:${port}/success`,
        cancel_url:`http://localhost:${port}/cancel`,
        customer_email:user.user.email,
        client_reference_id:cart._id.toString(),
        metadata:{address:req.body.address}

      }).catch((err)=>{console.log(err)});
      await orderModel.create({totalPrice:totalPrice,phoneNo:req.body.phoneNo,address:req.body.address,owner:user.user._id,products:cart.items})


    return res.json({msg:"done",totalPrice,session})
})

export const success= erroHandler(async (req,res)=>{
  let {token}=req.headers
  let user=jwt.verify(token,secret_key)
  let cart=await cartModel.find({owner:user.user._id})
  cart=cart[0]
  cart.items=[]
  await cart.save()
  res.redirect('http://localhost:3005/');
  return res.json({msg:"payment is done| تمت العملية"})
    
})
export const cancel= erroHandler(async (req,res)=>{
  res.redirect('http://localhost:3005/');
  return res.status(400).json({msg:"payment failed| فشلت العملية"})
})