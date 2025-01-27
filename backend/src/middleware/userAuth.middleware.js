import { verifyToken } from "../utils/jwtUtils";

const authUsr = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    return res.status(401).send("Access Denied. No token provided.");
  }
  try {
    const decodedUser = verifyToken({ token });
    req.user = decodedUser;
    if (req.user) {
      next();
    } else {
      res.status(401).send("Unauthorized");
    }
  } catch (err) {
    res.status(400).send("Invalid Token");
  }
};

export default authUsr;
