import express from "express";

import authRoute from "./authRoute.js";
import uploadRoute from "./uploadRoute.js";

const router = express.Router();

router.use("/auth", authRoute);
router.use("/upload", uploadRoute);

export default router;
