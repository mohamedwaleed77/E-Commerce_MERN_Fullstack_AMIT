import   joi from "joi";

export const signupValidation=joi.object({
    name: joi.string()
    .alphanum()  
    .min(3)      
    .max(30)     
    .required()  ,

  email: joi.string()
    .email({ minDomainSegments: 2 })  
    .required() ,

  password: joi.string()
    .min(8)         
    .max(128)       
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,128}$/)  
    .required()    
})

export const loginValidation=joi.object({
    email: joi.string()
    .email({ minDomainSegments: 2 })  
    .required(),  

  password: joi.string()    
    .required(),    
})