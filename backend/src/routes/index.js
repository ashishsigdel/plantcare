import express from "express";

import authRoute from "./authRoute.js";
import authUsr from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", authUsr, (req, res) => {
  res.json({ message: "User route" });
});

export default router;
