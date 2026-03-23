import jwt from "jsonwebtoken"
import User from "../models/user.model.js"
export const ProtectRoute=async(req,res,next)=>{
    try{
        const token=req.cookies.jwt
        if(!token){
            return res.status(401).json({message:"unauthorized-no token"})
        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET)
        if(!decoded){
            return res.status(401).json({message:"unauthorized-invalid token"})
        }
        const user= await User.findById(decoded.userID).select("-password")
        if(!user){
            return res.status(401).json({message:"unauthorized-user not found"})
        }
        req.user=user;
        next();

        
    }catch(error){

        console.log("error in protect route",error.message)
        res.status(500).json({message:"internal server error"})

    }
}