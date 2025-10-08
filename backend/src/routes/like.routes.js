import { Router } from "express";
import {
  toggleVideoLike,
  toggleCommentLike,
  togglePostLike,
  getLikedVideos,
} from "../controllers/like.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();
router.use(verifyJWT);

router.route("/comment/:commentId").post(toggleCommentLike);
router.route("/video/:videoId").post(toggleVideoLike);
router.route("/post/:postId").post(togglePostLike);
router.route("/videos").get(getLikedVideos);

export default router;
