import db from "../models/index.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

export const register = asyncHandler(async (req, res) => {
  return new ApiResponse({
    status: 200,
    message: "User Registered!",
  }).send(res);
});
