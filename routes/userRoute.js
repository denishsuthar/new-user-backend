import express from "express";
import {allUsers, 
    deleteUser, 
    getSingleUser, 
    getUserDetails, 
    loginUser, 
    logoutUser, 
    registerUser, 
    updateAvatar, 
    updateUserPassword, 
    updateUserProfile, 
    updateUserRole,} from "../contollers/userController.js";
import { isAdmin, isAuthenticatedUser } from "../middelware/auth.js";
import singleUpload from "../middelware/multer.js"

const router = express.Router();

router.route("/register").post(singleUpload,registerUser);

router.route("/login").post(loginUser);

router.route("/logout").get(logoutUser);

router.route("/me").get(isAuthenticatedUser, getUserDetails);

router.route("/me/update").put(isAuthenticatedUser, updateUserProfile);

router.route("/me/update/avatar").put(isAuthenticatedUser,singleUpload,updateAvatar);

router.route("/password/update").put(isAuthenticatedUser, updateUserPassword);



// Admin Routes
router.route("/admin/users").get(isAuthenticatedUser,isAdmin, allUsers);

router.route("/admin/user/:id").put(isAuthenticatedUser, isAdmin, updateUserRole).delete(isAuthenticatedUser, isAdmin, deleteUser).get(isAuthenticatedUser, isAdmin, getSingleUser)



export default router;