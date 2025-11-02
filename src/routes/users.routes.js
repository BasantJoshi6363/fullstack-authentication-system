import express from "express";
import {registerUser,loginUser} from "../controllers/auth.controllers.js"
import { changeAvatar, deleteUser, forgotPassword, getAllUser, updateUser } from "../controllers/users.controllers.js";
import upload from "../utils/multer.js";
import isAuth from "../middlewares/isAuth.js";
const userRouter = express.Router();

//get all users
userRouter.get("/users",isAuth,getAllUser);

//register login
userRouter.post("/register",registerUser);
userRouter.post("/login",loginUser);
userRouter.put("/avatar",isAuth,upload.single("file"),changeAvatar);

//update delete

userRouter.put("/update/:id",isAuth,updateUser);
userRouter.put("/forgot",isAuth,forgotPassword);
userRouter.delete("/delete/:id",isAuth,deleteUser);

export default userRouter;