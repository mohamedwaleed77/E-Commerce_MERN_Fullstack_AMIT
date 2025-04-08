import { Router } from "express";
import { isTokenExpired } from "../middlewares/isTokenExpired.js";
import { addItem, deleteItem, getCart } from "./cart.controller.js";
import { isEmailConfirmed } from "../middlewares/isEmailConfirmed.js";
 
 
 
const cartRouter=Router();
cartRouter.get('/',isTokenExpired,isEmailConfirmed,getCart)
cartRouter.post("/:item",isTokenExpired,isEmailConfirmed,addItem)
cartRouter.delete("/:item",isTokenExpired,isEmailConfirmed,deleteItem)
export default cartRouter;
