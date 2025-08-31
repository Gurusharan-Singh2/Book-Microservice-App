import 'dotenv/config'
import express from 'express'
import cors from 'cors';
import { connectDB } from './config/db';
import userRouter from './routes/userRoutes'

const app=express();
const PORT=process.env.PORT || 3002;


// middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))

// db Connected
connectDB();


// routes
app.get('/health',(req,res)=>{
  res.status(200).json({
    status:"User-service is running and healthy"
  })

  app.use('/api/users',userRouter)
  
})

app.listen(PORT,()=>{
  console.log(`User-Service Started At http://localhost:${PORT}`);
  
})