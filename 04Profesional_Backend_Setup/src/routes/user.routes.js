import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
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

router.route("/current-user").get(verifyJWT, getCurrentUser);

router.route("/change-password").patch(verifyJWT, changeCurrentPassword);

router.route("/update-account").patch(verifyJWT, updateAccountDetails);

router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar);

router.route("/update-coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage);

export default router;
