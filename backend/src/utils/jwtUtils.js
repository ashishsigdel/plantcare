import jwt from "jsonwebtoken";

export const generateToken = ({ payload, expiresIn, SECRET_KEY }) => {
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn });

  return token;
};

export const generateRefreshToken = ({ userId }) => {
  return generateToken({
    payload: {
      id: userId,
    },
    SECRET_KEY: process.env.REFRESH_SECRET_KEY,
    expiresIn: "30d",
  });
};
export const generateAccessToken = ({ userId }) => {
  return generateToken({
    payload: {
      id: userId,
    },
    SECRET_KEY: process.env.SECRET_KEY,
    expiresIn: "2h",
  });
};

export const verifyToken = ({ token, ignoreExpiration = false }) => {
  return jwt.verify(token, process.env.SECRET_KEY, {
    ignoreExpiration: ignoreExpiration,
  });
};
