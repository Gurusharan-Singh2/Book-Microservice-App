import 'dotenv/config';
import { json } from 'express';
import { NextFunction } from 'http-proxy-middleware/dist/types';
import jwt from "jsonwebtoken"


declare global {
  namespace Express{
    interface Request {
      user?:any
    }
  }
}

export const verifyToken=async(req:any,res:any,next:NextFunction)=>{
  const token=req.headers.authorization?.split(" ")[1];
  console.log("Token",token);
  
  if(!token){
    return res.status(401).json({
      status:"error",
      message:"Unauthorized :No token provided"
    })
  }
    try {
      const decoded=jwt.verify(token,process.env.JWT_SECRET!);
      req.user=decoded;
      next();

      
    } catch (error) {
      return res.status(401).json({
        status:"error",
        message:"Unauthorized :Invalid token"
      })
    }

  

}