import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";

//  generate access and refresh tokens
const generateAccessAndRefereshTokens = async (userId) => {
  try {
    // Finding the user in the database by userId.
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    // Saving refreshToken to the database.
    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    // Return the tokens from where the method is called.
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

// User Regestration Funtionality
const registerUser = asyncHandler(async (req, res) => {
  // get user details from frontend
  // validation - not empty
  // check if user already exists: username, email
  // check for images, check for avatar
  // upload them to cloudinary, avatar
  // create user object - create entry in db
  // remove password and refresh token field from response
  // check for user creation
  // return res

  // get user details from frontend
  const { fullName, email, username, password } = req.body;
  console.log("Request Object Body:", req.body);
  console.log("email: ", email);
  console.log("fullName: ", fullName);
  console.log("username: ", username);

  //Check whether the field is empty or not.
  if (
    [fullName, email, username, password].some((field) => field?.trim() === "")
  ) {
    throw new ApiError(400, "All Fields are required");
  }

  //Check whether the user exists in the database or not.
  const existedUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existedUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  //Check whether the images exist on our server or not.
  const avatarLocalPath = req.files?.avatar[0]?.path;
  // const coverImageLocalPath = req.files?.coverImage[0]?.path;

  let coverImageLocalPath;
  if (
    req.files &&
    Array.isArray(req.files.coverImage) &&
    req.files.coverImage.length > 0
  ) {
    coverImageLocalPath = req.files.coverImage[0].path;
  }

  console.log("Request Files:", req.files);

  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Upload files to Cloudinary.
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  console.log(coverImage);
  if (!avatar) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Performing entry in the database.
  const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.toLowerCase(),
  });

  // remove password and refresh token field from response
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering the user");
  }

  // return res

  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered Successfully"));
});

// User Login Funtionality
const loginUser = asyncHandler(async (req, res) => {
  /*
1. **Data Retrieval:**
   - Get data from the request body.

2. **Data Existence Check:**
   - Check if data like username, email, and password exist in the retrieved data.

3. **User Retrieval:**
   - Find the user in the database based on the provided username or email.

4. **User Existence Check:**
   - If the user is present in the database, proceed to the next step. Otherwise, handle the case where the user does not exist.

5. **Password Check:**
   - Check if the password from the request matches the stored password in the database for the identified user.

6. **Token Generation:**
   - If the password matches, generate access and refresh tokens. 

7. **Sending Response:**
   - Sending response to the client in cookies.   
*/

  //Get data from the request body.
  const { email, username, password } = req.body;

  //Check if data like username "AND" email exist in the retrieved data.
  if (!username && !email) {
    throw new ApiError(400, "username or email is required");
  }

  //Check if data like username "OR" email  exist in the retrieved data.
  // if (!(username || email)) {
  //   throw new ApiError(400, "username or email is required");
  // }

  // Find the user in the database based on the provided username or email.
  const user = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (!user) {
    throw new ApiError(404, "User does not exist");
  }

  //Check if the password from the request object, matches the stored password in the database for the identified user.
  const isPasswordValid = user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  //If the password matches, generate access and refresh tokens in cookies.
  const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(
    user._id
  );

  //Sending response to the client in cookies.

  // New database call for the latest user instance.
  // Remove unwanted fields that we don't want to send to the client.
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken "
  );

  // Securing the cookies prevents modification at the client side.
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Sending Response to the Client.
  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken,
        },
        "User logged In Successfully"
      )
    );
});

// Logout Funtionality

const logoutUser = asyncHandler(async (req, res) => {
  // Extracting user data from the database using req.user middleware
  await User.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        // Removing the refresh token to log out the user
        refreshToken: undefined,
      },
    },
    // Get the new updated value for the return response
    {
      new: true,
    }
  );

  // Securing the cookies to prevent modification at the client side.
  const options = {
    httpOnly: true,
    secure: true,
  };

  // Clearing the cookies
  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "User logged Out"));
});

// Functionality for Updating Tokens
const refreshAccessToken = asyncHandler(async (req, res) => {
  // Extract Refresh token from the request object, which may be in cookies or the request body
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;
  // If the server did not receive the Refresh token from the client, throw an "Unauthorized request" error
  if (!incomingRefreshToken) {
    throw new ApiError(401, "unauthorized request");
  }
  try {
    // Decode the Refresh Token using the secret key
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );
    // Find the user in the database using the decoded user ID from the Refresh Token
    const user = await User.findById(decodedToken?._id);
    //If user is not present
    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }
    // Verify that the incoming Refresh Token matches the one stored in the database
    if (incomingRefreshToken !== user?.refreshToken) {
      throw new ApiError(401, "Refresh token is expired or used");
    }
    // Configure options for securing cookies
    const options = {
      httpOnly: true, // Prevents access from client-side scripts
      secure: true, // Ensures cookies are sent only over HTTPS
    };

    // Generate a new Access Token and Refresh Token for the user
    const { accessToken, newRefreshToken } =
      await generateAccessAndRefereshTokens(user._id);

    // Update the client's cookies with the new Access Token and Refresh Token
    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          {
            accessToken,
            refreshToken: newRefreshToken,
          },
          "Access token refreshed"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid refresh token");
  }
});

//  Functionality to change the user's password
const changeCurrentPassword = asyncHandler(async (req, res) => {
  // Destructure oldPassword and newPassword from the request body
  const { oldPassword, newPassword } = req.body;
  // Fetch the user by ID from the database
  const user = await User.findById(req.user?._id);
  // Check if the provided oldPassword matches the stored password
  const isPasswordCorrect = user.isPasswordCorrect(oldPassword);
  // If the old password is incorrect, throw an error
  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid old password");
  }
  // Set the user's password to the new password
  user.password = newPassword;
  // Save the user to the database, bypassing validation checks
  await user.save({ validateBeforeSave: false });
  // Send a response indicating that the password has been changed successfully
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"));
});

//  Functionality to get Current User
const getCurrentUser = asyncHandler(async (req, res) => {
  // Send a response with a status code of 200
  return res.status(200).json(
    new ApiResponse(
      200,
      // Send the user information from the request object
      req.user,
      "User fetched successfully"
    )
  );
});

//  Functionality to update account details.
const updateAccountDetails = asyncHandler(async (req, res) => {
  // Extract fullName and email from the request body
  const { fullName, email } = req.body;
  // Check if fullName and email are provided, otherwise throw an error
  if (!fullName || !email) {
    throw new ApiError(400, "All fields are required");
  }
  // Update the user's account details in the database
  User.findById(
    req.user?._id, // Find the user by their ID in the database
    {
      $set: {
        fullName, //ECMAScript Shorthand for fullName: fullName
        email: email, // Set the email field to the provided value
      },
    },
    { new: true } // Return the updated user information
  ).select("-password"); // Exclude the password field from the returned user information

  // Send a response with a status code of 200 and a JSON object
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated successfully"));
});

//  updateUserAvatar function handles the process of updating a user's avatar
const updateUserAvatar = asyncHandler(async (req, res) => {
  // Get the local path of the uploaded avatar file from the request
  const avatarLocalPath = req.file?.path;

  // Check if the avatar file is missing; if so, throw an error
  if (!avatarLocalPath) {
    throw new ApiError(400, "Avatar file is missing");
  }
  // TODO: Delete old image - assignment (a reminder or placeholder for future development)
  // Upload the avatar to Cloudinary and get the URL
  const avatar = await uploadOnCloudinary(avatarLocalPath);
  // If there's an issue with uploading the avatar, throw an error
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading avatar");
  }
  // Update the user's avatar URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
      },
    },
    { new: true }
  ).select("-password");
  // Send a response with a status code of 200 and a JSON object
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Avatar image updated successfully"));
});

//  updateUserCoverImage function handles the process of updating a user's coverImage
const updateUserCoverImage = asyncHandler(async (req, res) => {
  // Get the local path of the uploaded coverImage file from the request
  const coverImageLocalPath = req.file?.path;

  // Check if the coverImage file is missing; if so, throw an error
  if (!coverImageLocalPath) {
    throw new ApiError(400, "Cover image file is missing");
  }
  // TODO: Delete old image - assignment (a reminder or placeholder for future development)
  // Upload the coverImage to Cloudinary and get the URL
  const coverImage = await uploadOnCloudinary(coverImageLocalPath);
  // If there's an issue with uploading the avatar, throw an error
  if (!coverImage.url) {
    throw new ApiError(400, "Error while uploading coverImage");
  }
  // Update the user's avatar URL in the database
  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        coverImage: coverImage.url,
      },
    },
    { new: true }
  ).select("-password");
  // Send a response with a status code of 200 and a JSON object
  return res
    .status(200)
    .json(new ApiResponse(200, user, "Cover image updated successfully"));
});

export {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  changeCurrentPassword,
  getCurrentUser,
  updateAccountDetails,
  updateUserAvatar,
  updateUserCoverImage,
};
