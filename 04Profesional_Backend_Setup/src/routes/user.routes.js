import { Router } from "express";
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// "/register" route for registerUser functionality of user.controller
router.route("/register").post(
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
  registerUser
);

export default router;

// "/login" route for loginUser functionality of user.controller

router.route("/login").post(loginUser);

// "/logout" route for loginUser functionality of user.controller

router.route("/logout").post(verifyJWT, logoutUser);
