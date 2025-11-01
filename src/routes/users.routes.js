import express from "express";
import {registerUser,loginUser} from "../controllers/auth.controllers.js"
import { deleteUser, getAllUser, updateUser } from "../controllers/users.controllers.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

//get all users
userRouter.get("/users",isAuth,getAllUser);

//register login
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);

//update delete

userRouter.put("/update/:id",isAuth,updateUser);
userRouter.delete("/delete/:id",isAuth,deleteUser);

export default userRouter;