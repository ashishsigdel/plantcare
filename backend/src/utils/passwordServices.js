import bcrypt from "bcrypt";
import crypto from "crypto";
import EnvType from "../enums/envType.js";

const saltRound = 10;

export const hashPassword = async (password) => {
  if (!password) return null;
  try {
    return await bcrypt.hash(password, saltRound);
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

export const comparePassword = async (password, hashedPassword) => {
  if (!password || !hashedPassword) return false;
  return await bcrypt.compare(password, hashedPassword);
};

export const generateOtp = (length) => {
  if (process.env.NODE_ENV === EnvType.DEV) {
    return "123456";
  }
  const OTP = crypto.randomInt(100000, 999999).toString();
  return OTP;
};
