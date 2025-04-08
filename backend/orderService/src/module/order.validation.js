import joi from "joi"

export const orderValidation= joi.object({
        address: joi.string()
       .min(10)      
       .max(150)    
       .required()  ,

       phoneNo:joi.string()
       .regex(/^[0-9]{10}$/)
       .required()
})