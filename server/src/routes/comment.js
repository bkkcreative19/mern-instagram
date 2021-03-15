import express from "express";
import { addComment } from "../controllers/comment.js";
import { auth } from "..//middleware/authMiddleWare.js";

const router = express.Router();

router.post("/add-comment/:postId/:userId", addComment);

export default router;
