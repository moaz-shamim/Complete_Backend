import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

// Creating an instance of Express Router
const router = Router();

// Route for user registration ("/register")
// Handles the registration functionality provided by the user.controller module
router.route("/register").post(
  // Middleware for handling file uploads (avatar and coverImage)
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "coverImage",
      maxCount: 1,
    },
  ]),
  // Controller function responsible for user registration
  registerUser
);

export default router;

// Route for user login ("/login")
// Handles the login functionality provided by the user.controller module
router.route("/login").post(loginUser);

// Route for user logout ("/logout")
// Requires JWT verification (middleware) to ensure a valid user session
// Handles the logout functionality provided by the user.controller module
router.route("/logout").post(verifyJWT, logoutUser);

// Route for refreshing access tokens ("/refresh-token")
// Handles the token refreshing functionality provided by the user.controller module
router.route("/refresh-token").post(refreshAccessToken);
