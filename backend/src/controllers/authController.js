import db from "../models/index.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

const { User } = db;

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!fullName) {
    throw new ApiError({
      status: 400,
      message: "Name is required",
    });
  }
  if (!email && !phone) {
    throw new ApiError({
      status: 400,
      message: "Email or Phone is required",
    });
  }
  return new ApiResponse({
    status: 200,
    message: "User Registered!",
    data: count,
  }).send(res);
});
