import User from "../models/users.models.js";
import bcrypt from "bcrypt";
import generateToken from "../../generateToken.js";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    //data validation
    if (!fullname)
      return res
        .status(400)
        .json({ success: false, message: "user field empty" });
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "email field empty" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "password field empty" });

    //check us
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(500).json({
        success: false,
        message: "user is already registered.",
      });
    }
    //hash password with bcrypt
    const hashPassword = await bcrypt.hash(password, 10);

    //now save user to database
    const user = await User.create({
      fullname,
      email,
      password: hashPassword,
    });

    return res.status(201).json({
      success: true,
      message: "Fields are empty",
      result: user,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    //data validation
    if (!email)
      return res
        .status(400)
        .json({ success: false, message: "email field empty" });
    if (!password)
      return res
        .status(400)
        .json({ success: false, message: "password field empty" });

    //check user is registered or not
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(500).json({
        success: false,
        message: "invalid user credentials",
      });
    } else {
      //check password is correct or not
      const checkPassword = await bcrypt.compare(password, user.password);
      if (!checkPassword) {
        return res.status(500).json({
          success: false,
          message: "invalid user credentials.",
        });
      }
      const payload = {
        fullname : user.fullname,
        email : user.email,
        id : user._id

      }
      //creating token
      const token = generateToken(payload);

      //sending response
      return res.status(200).json({
        success: true,
        message: "user logged in",
        token,
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
