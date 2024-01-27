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

export { registerUser, loginUser, logoutUser };
