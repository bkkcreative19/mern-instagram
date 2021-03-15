import express from "express";
import {
  signup,
  signin,
  getProfile,
  getSuggestedProfiles,
  getUser,
} from "../controllers/user.js";
import { auth } from "..//middleware/authMiddleWare.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile/:name", auth, getProfile);
router.get("/user", auth, getUser);
router.get("/suggested", auth, getSuggestedProfiles);
export default router;
