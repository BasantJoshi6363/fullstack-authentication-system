import jwt from "jsonwebtoken";
const isAuth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    //decrypt the token
    const validToken = await jwt.decode(token, process.env.JWT_SECRET);

    if (validToken) {
      req.user = validToken;
      next();
    } else {
      return res.status(500).json({
        success: false,
        message: "invalid user",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export default isAuth;
