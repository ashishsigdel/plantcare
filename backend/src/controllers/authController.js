import EnvType from "../enums/envType.js";
import db from "../models/index.js";
import ApiError from "../utils/apiError.js";
import ApiResponse from "../utils/apiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";
import { generateAccessToken } from "../utils/jwtUtils.js";
import {
  comparePassword,
  generateOtp,
  hashPassword,
} from "../utils/passwordServices.js";
import sendOtp from "../utils/sendOtp.js";

const { User } = db;

export const register = asyncHandler(async (req, res) => {
  const { fullName, email, phone } = req.body;

  if (!email && !phone) {
    throw new ApiError({
      status: 400,
      message: "Email or Phone is required",
    });
  }

  const existingUser = await User.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        email ? { email } : null,
        phone ? { phone } : null,
      ],
    },
  });

  if (existingUser) {
    throw new ApiError({
      status: 400,
      message: "User already exists",
    });
  }

  if (!fullName) {
    throw new ApiError({
      status: 400,
      message: "Full name is required for new users.",
    });
  }

  const newUser = await User.create({ fullName, email, phone });

  const otp = generateOtp(6);
  const hashedOtp = await hashPassword(otp);

  // Send OTP here (e.g., Email or SMS API) --> done
  try {
    await sendOtp(email, otp);
  } catch (err) {
    throw new ApiError({
      status: 500,
      message: "Error while sending OTP",
    });
  }
  await newUser.update({
    otp: hashedOtp,
    otpExpireTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });

  return new ApiResponse({
    status: 200,
    message: "OTP sent for verification.",
  }).send(res);
});

export const login = asyncHandler(async (req, res) => {
  const { email, phone } = req.body;

  if (!email && !phone) {
    throw new ApiError({
      status: 400,
      message: "Email or Phone is required",
    });
  }

  const existUser = await User.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        email ? { email } : null,
        phone ? { phone } : null,
      ],
    },
  });

  if (!existUser) {
    throw new ApiError({
      status: 400,
      message: "User doesn't exists",
    });
  }

  const otp = generateOtp(6);
  const hashedOtp = await hashPassword(otp);

  // Send OTP here (e.g., Email or SMS API)
  try {
    await sendOtp(email, otp);
  } catch (err) {
    throw new ApiError({
      status: 500,
      message: "Error while sending OTP",
    });
  }

  await existUser.update({
    otp: hashedOtp,
    otpExpireTime: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes expiry
  });

  return new ApiResponse({
    status: 200,
    message: "OTP sent for verification.",
  }).send(res);
});

export const verifyOtp = asyncHandler(async (req, res) => {
  const { email, phone, otp } = req.body;

  if (!email && !phone) {
    throw new ApiError({
      status: 400,
      message: "Email or Phone is required",
    });
  }

  if (!otp) {
    throw new ApiError({
      status: 400,
      message: "Otp is required.",
    });
  }

  const existUser = await User.findOne({
    where: {
      [db.Sequelize.Op.or]: [
        email ? { email } : null,
        phone ? { phone } : null,
      ],
    },
  });

  if (!existUser) {
    throw new ApiError({
      status: 400,
      message: "User doesn't exists",
    });
  }

  const currentTime = new Date();
  const otpExpireTime = new Date(existUser.otpExpireTime);

  if (currentTime > otpExpireTime) {
    throw new ApiError({
      status: 400,
      message: "OTP has expired.",
    });
  }

  const checkOtp = await comparePassword(otp, existUser.otp);

  if (!checkOtp) {
    throw new ApiError({
      status: 400,
      message: "Invalid OTP.",
    });
  }

  await existUser.update({
    otp: null,
    otpExpireTime: null,
  });

  const accessToken = generateAccessToken({
    userId: existUser.id,
  });

  let responseData = {
    accessToken,
    user: await User.findOne({
      where: {
        id: existUser.id,
      },
      attributes: [
        "id",
        "fullName",
        "phone",
        "email",
        "profilePic",
        "language",
        "role",
      ],
    }),
  };

  res.cookie("accessToken", `Bearer ${accessToken}`, {
    httpOnly: true,
    secure: process.env.NODE_ENV === EnvType.PROD,
    maxAge: 60 * 60 * 1000,
  });

  return new ApiResponse({
    status: 200,
    message: "user login succcessfully!",
    data: responseData,
  }).send(res);
});
