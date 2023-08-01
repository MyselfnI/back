import express from 'express'
import { authRoutes,appRoutes } from './router/index.js'
import mongoose from "mongoose";
import { config } from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import { authorize } from './middleware/index.js';

const app = express()


config()

app.use(bodyParser.json());
app.use(cors());


//routes

//routes 
app.use("/auth",authRoutes)

//protected routes
app.use("/app",authorize,appRoutes)
//dbconnection
await mongoose
  .connect(process.env.DB_CONNECTION)
  .then(console.log("connected"))
  .catch(console.error);

const PORT = 3001
app.listen(PORT,(err)=>{
    if(err) throw err
    console.log(`server started at port ${PORT}`)
})