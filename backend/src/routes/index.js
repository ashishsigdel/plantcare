import express from "express";

import authRoute from "./authRoute.js";
import authUsr from "../middleware/userAuth.middleware.js";
import uploadRoute from "./uploadRoute.js";
import userRoute from "./userRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/user", userRoute);
router.use("/upload", uploadRoute);

export default router;
