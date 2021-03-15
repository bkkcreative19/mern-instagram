import express from "express";
import { auth } from "..//middleware/authMiddleWare.js";
import {
  createPost,
  getPosts,
  likePost,
  unlikePost,
  getPost,
} from "../controllers/post.js";

const router = express.Router();

router.post("/new-post", auth, createPost);
router.get("/posts", auth, getPosts);
router.get("/post/:postId", auth, getPost);
router.post("/post-like/:postId/:userId", likePost);
router.post("/post-unlike/:postId/:userId", unlikePost);

// router.post("/signin", signin);
// router.get("/", (req, res) => {
//   res.send("hi");
// });

export default router;
