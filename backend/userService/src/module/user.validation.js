import   joi from "joi";

export const signupValidation=joi.object({
    name: joi.string()
    .min(3)      
    .max(30)     
    .required()  ,

  email: joi.string()
    .email({ minDomainSegments: 2 })  
    .required() ,

  password: joi.string()
    .min(8)         
    .max(128)       
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)  
    .required()    
    .messages({
      'string.base': 'Password is weak', // for non-string input
      'string.empty': 'Password is weak', // for empty strings
      'string.min': 'Password is weak', // for too short password
      'string.max': 'Password is weak', // for too long password
      'string.pattern.base': 'Password is weak', // for invalid pattern
      'any.required': 'Password is weak', // for missing password
    })
})

export const loginValidation=joi.object({
    email: joi.string()
    .email({ minDomainSegments: 2 })  
    .required(),  

  password: joi.string()    
    .required(),    
})