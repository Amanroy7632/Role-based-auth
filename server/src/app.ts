import express from "express";
import morgan from "morgan";
import { VERSION } from "./config";
import { userRouter } from "./routes";
import { errorHandler } from "./utils";
const app = express();
app.use(express.json({limit:"128kb"}));
app.use(express.urlencoded({limit:"128kb",extended:true}));
app.use(morgan("dev"));
app.get("/",(req,res,next)=>{
    res.status(200).json({message:"Service is Healthy."})
})
app.use(`/api/${VERSION}/users`,userRouter);
app.use(errorHandler);
export default app;