import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
  try {
    // Check access token in cookie or req header
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization").replace("Bearer ", "");
    // Verify and extract info from the token through JWT
    const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    // Extract user information from the database using decodedToken
    const user = await User.findById(decodedToken?._id).select(
      "-password -refreshToken"
    );
    if (!user) {
      throw new ApiError(401, "Invalid Access Token");
    }
    // Add user object to the request
    req.user = user;
    // Move to the next middleware or route handler
    next();
  } catch (error) {
    // Handle errors during token verification or user retrieval
    throw new ApiError(401, error?.message || "Invalid access token");
  }
});
