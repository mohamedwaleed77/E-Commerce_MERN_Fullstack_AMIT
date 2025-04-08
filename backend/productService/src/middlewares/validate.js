export const validateCredintials=(schema)=>{
    return (req,res,next)=>{
        const {error}=schema.validate(req.body)
        if(error){
            next(new Error( error ))
        }
        next()
    }
}