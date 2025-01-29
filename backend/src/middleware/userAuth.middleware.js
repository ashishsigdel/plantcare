import ApiError from "../utils/apiError.js";
import {
  generateAccessToken,
  verifyAccessToken,
  verifyRefreshToken,
} from "../utils/jwtUtils.js";

const authUser = async function (req, res, next) {
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return next(
      new ApiError({
        status: 401,
        message: "Access Token not found",
      })
    );
  }

  try {
    const decodedToken = await verifyAccessToken(accessToken);
    // console.log(decodedToken);
    res.locals.user = decodedToken;
    next();
  } catch (err) {
    // console.log(err.message);
    if (err.message === "jwt expired") {
      const refreshToken = req.cookies.refreshToken;
      if (!refreshToken) {
        return next(
          new ApiError({
            status: 401,
            message: "Refresh Token not found",
          })
        );
      }
      try {
        const decodedToken = await verifyRefreshToken(refreshToken);
        // console.log(decodedToken);
        const newAccessToken = generateAccessToken({
          userId: decodedToken.id,
        });
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 1000,
          sameSite: "none",
          secure: true,
        });
        // console.log("Access Token Refreshed");
        res.locals.user = decodedToken;
        return next();
      } catch (err) {
        // console.log(err.message);
        return next(
          new ApiError({
            status: 403,
            message: "Access Denied",
          })
        );
      }
    } else {
      return next(
        new ApiError({
          status: 403,
          message: "Access Denied",
        })
      );
    }
  }
};

export default authUser;
