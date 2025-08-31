import express from 'express'
import type { Request,Response } from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import { verifyToken } from './middleware/auth'

const app=express()

const PORT=process.env.PORT || 3001


//middlewares

app.use(express.json());
app.use(express.urlencoded({extended:true}))



app.get("/health",(req:Request,res:Response)=>{
  return res.status(200).json({
    status:"Ok",
    message:"Api Gateway is running."
  })
})

app.use('/api/v1/users',createProxyMiddleware({
  target:'http://localhost:4000',
  changeOrigin:true,
  pathRewrite:{
    '^':'/api/users'
  },
  on:{
    proxyReq:(proxyReq,req:Request,res)=>{
      console.log("[Proxing ]",req.method,req.originalUrl);
      if(req.body && Object.keys(req.body).length>0 && req.headers['content-type']?.includes("application/json")){
        const bodyData=JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length",Buffer.byteLength(bodyData))
        proxyReq.setHeader("Content-Type","application/json");

        proxyReq.write(bodyData)
      }
      
    }
  }
}))
app.use('/api/v2/users',createProxyMiddleware({
  target:'http://localhost:3002',
  changeOrigin:true,
  pathRewrite:{
    '^':'/api/users'
  },
  on:{
    proxyReq:(proxyReq,req:Request,res)=>{
      console.log("[Proxing ]",req.method,req.originalUrl);
      if(req.body && Object.keys(req.body).length>0 && req.headers['content-type']?.includes("application/json")){
        const bodyData=JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length",Buffer.byteLength(bodyData))
        proxyReq.setHeader("Content-Type","application/json");

        proxyReq.write(bodyData)
      }
      
    }
  }
}))
app.use('/api/v1/books',verifyToken,createProxyMiddleware({
  target:'http://localhost:4000',
  changeOrigin:true,
  pathRewrite:{
    '^':'/api/books'
  },
  on:{
    proxyReq:(proxyReq,req:Request,res)=>{
      console.log("[Proxing ]",req.method,req.originalUrl);
      if(req.body && Object.keys(req.body).length>0 && req.headers['content-type']?.includes("application/json")){
        const bodyData=JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length",Buffer.byteLength(bodyData))
        proxyReq.setHeader("Content-Type","application/json");

        proxyReq.write(bodyData)
      }
      
    }
  }
}))
app.use('/api/v1/orders',verifyToken,createProxyMiddleware({
  target:'http://localhost:4000',
  changeOrigin:true,
  pathRewrite:{
    '^':'/api/orders'
  },
  on:{
    proxyReq:(proxyReq,req:Request,res)=>{
      console.log("[Proxing ]",req.method,req.originalUrl);
      if(req.body && Object.keys(req.body).length>0 && req.headers['content-type']?.includes("application/json")){
        const bodyData=JSON.stringify(req.body);
        proxyReq.setHeader("Content-Length",Buffer.byteLength(bodyData))
        proxyReq.setHeader("Content-Type","application/json");

        proxyReq.write(bodyData)
      }
      
    }
  }
}))


app.listen(PORT,()=>{
  console.log(`Server Started At http://localhost:${PORT}`);
  
})