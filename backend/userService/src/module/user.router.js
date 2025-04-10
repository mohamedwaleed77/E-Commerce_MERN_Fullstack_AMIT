import { Router } from "express";
import { addUser, deleteUser, getAllUsers, login, updateUser, verifyEmail } from "./user.controller.js";
import { doesEmailExist } from "../middlewares/doesEmailExist.js";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isTokenExpired } from "../middlewares/isTokenExpired.js";
import { loginValidation, signupValidation } from "./user.validation.js";
import { validateCredintials } from "../middlewares/validate.js";
 
 
const userRouter=Router();

userRouter.get("/",isTokenExpired,isAdmin,getAllUsers)
userRouter.post("/signup",validateCredintials(signupValidation),doesEmailExist ,addUser)
userRouter.post("/signin",validateCredintials(loginValidation),login)
userRouter.get("/verify/:token",verifyEmail)
userRouter.delete("/:id",isTokenExpired,isAdmin,deleteUser)
userRouter.put("/:id",isTokenExpired,updateUser)

export default userRouter;
