export const erroHandler=(fu)=>{
    return (req,res,next)=>{
        fu(req,res,next).catch((err)=>next(new Error(err)))
    }
          
}