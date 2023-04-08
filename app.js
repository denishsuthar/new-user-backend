import express from "express";
import {config} from "dotenv";
import ErrorMiddelware from "./middelware/Error.js";
import cookieParser from "cookie-parser";

const app = express()
app.use(express.json());
app.use(cookieParser());

// Config files 
config({
    path:"./config/config.env"
})

app.get('/', (req, res)=>{
    res.send("Welcome to Backend")
})

// routes import & use
import userRoute from "./routes/userRoute.js"

app.use("/api/v1", userRoute);

export default app;

// Using ErrorMiddelware
app.use(ErrorMiddelware);