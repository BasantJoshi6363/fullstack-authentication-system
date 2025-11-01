import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import generateToken from "../../generateToken.js";

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
      result : users
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
