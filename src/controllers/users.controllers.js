import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import generateToken from "../../generateToken.js";
import cloudinary from "../utils/cloudinary.js";
import fs from "fs";

export const updateUser = async (req, res) => {
  try {
    //data validation
    const { id } = req.user;
    if (!req.body) {
      return res.status(500).json({
        success: false,
        message: "Fields are empty",
      });
    } else {
      const updatedUser = await User.findByIdAndUpdate(id, req.body, {
        new: true,
      });

      return res.status(201).json({
        success: true,
        message: "Fields are empty",
        result: updatedUser,
      });
    }

    //now update user
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.user;
    await User.findByIdAndDelete(id);

    //sending response
    return res.status(200).json({
      success: true,
      message: "user deleted successfully.!",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.status(500).json({
      success: true,
      message: "fetched all user",
      result: users,
    });
  } catch (error) {}
};

export const forgotPassword = async (req,res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { id } = req.user;

    //get user
    const user = await User.findById(id);

    //check the old password is correct or not

    const checkOldPassword = await bcrypt.compare(oldPassword, user.password);
    if (checkOldPassword) {
      await User.findByIdAndUpdate(
        id,
        { password: newPassword },
        { new: true }
      );
      return res.status(201).json({
        success: true,
        message: "password updated successfully",
      });
    } else {
      return res.status(500).json({
        success: false,
        message: "incorrect old password."
      });
    }
  } catch (error) {
   
  }
};

export const changeAvatar = async (req,res)=>{
  try {
    const {id} = req.user;

    //getting image url
    const file = req.file.path;
    const result = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file);
   
    if(!file){
      return res.status(500).json({
        success : false,
        message : "no image file."
      })
    }

    //getting user
     const final = await User.findByIdAndUpdate(id,{avatar : result.secure_url},{new: true});
     return res.status(201).json({
      success: true,
      message:"image updated successfully", 
      final
    });
  } catch (error) {
     return res.status(500).json({
      success: false,
      message: error.message,
      
    });
  }
}