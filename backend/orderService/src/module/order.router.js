import { Router } from "express";
import { isTokenExpired } from "../middlewares/isTokenExpired.js";
 
import { isEmailConfirmed } from "../middlewares/isEmailConfirmed.js";
import { cancel, createOrder, success } from "./order.controller.js";
import { validateCredintials } from "../middlewares/validate.js";
import { orderValidation } from "./order.validation.js";
 
 
 
const orderRouter=Router();

orderRouter.post("/",isTokenExpired,isEmailConfirmed,validateCredintials(orderValidation),createOrder)
orderRouter.post("/success",success)
orderRouter.get("/cancel",cancel)
export default orderRouter;
