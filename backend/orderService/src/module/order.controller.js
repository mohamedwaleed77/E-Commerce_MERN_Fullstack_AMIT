import { cartModel } from "../../database/cart.model.js";
import { host, port, secret_key, stripe_key } from "../../index.js";
import { erroHandler } from "../middlewares/errorHandler.js";
import Stripe from "stripe";
import jwt from "jsonwebtoken"

const calculate_total_price=(arr)=>{
    let total=0;
    for (const element of arr) {
        total+=element.price
    }
 
    return total
}


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
 
 
 
    cart.items=[]
    await cart.save()

    return res.json({msg:"done",totalPrice,session})
})