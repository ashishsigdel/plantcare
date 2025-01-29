import express from "express";

import * as userController from "../controllers/userController.js";

import authUser from "../middleware/userAuth.middleware.js";

const router = express.Router();

router.route("/history").get(authUser, userController.fetchHistory);

router
  .route("/history/:uploadId")
  .get(authUser, userController.fetchHistoryDetail);

export default router;
