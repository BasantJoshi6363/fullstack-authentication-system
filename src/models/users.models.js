import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullname : {
        type : String,
        trim : true,
        required : true
    },
    email : {
        type : String,
        trim : true,
        required : true
    },
    password : {
        type : String,
        trim : true,
        required : true
    },
    avatar:{
        type : String,
        default : "https://cdn-icons-png.flaticon.com/512/149/149071.png"
    }
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("User", userSchema);
export default User;
