import express from "express";

import * as uploadController from "../controllers/uploadController.js";
import { upload } from "../middleware/imageUpload.middleware.js";
import authUser from "../middleware/userAuth.middleware.js";

const router = express.Router();

router
  .route("/")
  .post(authUser, upload.single("picture"), uploadController.uploadImage);

export default router;
