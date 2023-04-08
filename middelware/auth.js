import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "./catchAsyncError.js";
import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";


// User Login or Not
export const isAuthenticatedUser = catchAsyncError(async(req, res, next)=>{
    const {token} = req.cookies;

    if(!token){
        return next(new ErrorHandler("Please Login to Access this Resourse", 401))
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decodedData._id);

    next();
})

// Admin
export const isAdmin = (req, res, next)=>{
    if(req.user.role !== "admin")
    return next(new ErrorHandler(`${req.user.role} is not allowed to access this resource`, 401));
    next();
}




