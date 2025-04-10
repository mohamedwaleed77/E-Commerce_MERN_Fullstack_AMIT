import   joi from "joi";

export const product_validation=joi.object({
    name: joi.string()
    .min(3)      
    .max(30)     
    .required()  ,

    category: joi.string()
    .min(2)      
    .max(30)     
    .required()  ,

    quantity: joi.number()
    .required() ,
    
    price: joi.number()
    .required() ,
})
export const image_validation = joi.object({
    image: joi.string()
      .pattern(/\.(jpg|jpeg|png|gif|bmp|webp)$/i)
      .required()
      .messages({
        'string.pattern.base': 'Only image files are allowed (jpg, jpeg, png, gif, bmp, webp)',
        'string.empty': 'Image is required',
      }),
});