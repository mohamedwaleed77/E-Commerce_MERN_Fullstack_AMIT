import { Router } from "express";
import { isAdmin } from "../middlewares/isAdmin.js";
import { isTokenExpired } from "../middlewares/isTokenExpired.js";
import { validateCredintials } from "../middlewares/validate.js";
import { image_validation, product_validation } from "./product.validation.js";
import { addProduct, attachImage, deleteProduct, getAll, showImage, updateProduct } from "./product.controller.js";
import multer from "multer";
import path from "path"
 

export const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
      const ext = path.extname(file.originalname)
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null,req.params.productId+".png")
    }
  })
export const upload = multer({ storage: storage })
 
const producRouter=Router();
producRouter.get("/",isTokenExpired,isAdmin,getAll)
producRouter.post("/",isTokenExpired,isAdmin,validateCredintials(product_validation),addProduct)
producRouter.post('/uploadImage/:productId',isTokenExpired,isAdmin,validateCredintials(image_validation),upload.single("image"),attachImage)
producRouter.get("/uploads/:filename",showImage)
producRouter.delete("/:id",deleteProduct)
producRouter.put("/:id",updateProduct)
export default producRouter;
