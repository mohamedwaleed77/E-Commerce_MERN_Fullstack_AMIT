import { Router } from "express";
import { isTokenExpired } from "../middlewares/isTokenExpired.js";
 
import { isEmailConfirmed } from "../middlewares/isEmailConfirmed.js";
import { createOrder } from "./order.controller.js";
import { validateCredintials } from "../middlewares/validate.js";
import { orderValidation } from "./order.validation.js";
 
 
 
const orderRouter=Router();

orderRouter.post("/",isTokenExpired,isEmailConfirmed,validateCredintials(orderValidation),createOrder)
export default orderRouter;
