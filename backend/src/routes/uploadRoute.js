import express from "express";

import * as uploadController from "../controllers/uploadController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router
  .route("/")
  .post(authMiddleware, upload.single("picture"), uploadController.uploadImage);

export default router;
