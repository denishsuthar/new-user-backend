import mongoose, { Schema } from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter name"],
  },
  email: {
    type: String,
    required: [true, "Please enter email"],
    unique: true,
    validate: validator.isEmail,
  },
  password: {
    type: String,
    required: [true, "Please enter password"],
    select: false,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  role:{
    type: String,
    enum: ["admin", "user"],
    default: "user"
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

//Hashing Password
userSchema.pre("save", async function(next){
  if(!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password,10);
  next();
})

//Token Generating
userSchema.methods.getJWTToken = function(){
    return jwt.sign({_id : this._id},process.env.JWT_SECRET,{
        expiresIn:"15d",
    })
}

//Compare Password
userSchema.methods.comparePassword = async function(password){
  return await bcrypt.compare(password, this.password)
}

export const User = mongoose.model('User', userSchema);


