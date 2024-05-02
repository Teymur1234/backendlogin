import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser"

import todoRoutes from "./routes/todo.routes.js"
import authRoutes from "./routes/auth.routes.js"

dotenv.config()


const PORT=process.env.PORT
const MONGODB_URL=process.env.MONGODB_URL

const app=express()

app.use(cookieParser())
app.use(express.json())



app.use("/api/todos",todoRoutes)
app.use("/api/auth",authRoutes)

app.listen(PORT,()=>{
    console.log("Port is : 8000");
})

mongoose.connect(MONGODB_URL).then(()=>{
    console.log(`Server is connected and port is : ${PORT}`);
    
}).catch((error)=>{
    console.log(error);
})