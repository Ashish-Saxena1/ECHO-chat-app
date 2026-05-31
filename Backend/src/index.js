import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {connectDB} from "./lib/db.js"

import cookieparser from "cookie-parser"
import path from "path"

dotenv.config()

import authRoutes from "./routes/auth.route.js"
import messageRoutes from "./routes/message.route.js"
import { app, server } from "./lib/socket.js"
import { Server } from "socket.io"
// import { app, server } from "./lib/socket.js"


const PORT=process.env.PORT

const __dirname=path.resolve()



app.use(
    cors({
    origin:"http://localhost:5173",
    credentials:true,

}))
app.use(express.json({limit:"5mb"}))
app.use(cookieparser())


app.use("/api/auth",authRoutes)
app.use("/api/messages",messageRoutes)

if (process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"../Frontend/dist")));

    app.get(/.*/,(req,res)=>{
        res.sendFile(path.resolve(__dirname,"../Frontend","dist","index.html"));
    });

}

server.listen(PORT,()=>{
    console.log(`server is running on port :${PORT}`)
    connectDB()
})