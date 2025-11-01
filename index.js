
import express from "express";
import dotenv from "dotenv"
import cors from "cors";
import connect from "./src/config/db.js";
import userRouter from "./src/routes/users.routes.js";


const app = express();
dotenv.config();
app.use(express.json());
app.use(cors());
app.use("/api/v1/user",userRouter)

const port = process.env.PORT||4000;
connect();
app.listen(port,()=>console.log(`server is listening at port ${port}`));




