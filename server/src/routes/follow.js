import express from "express";
import { auth } from "..//middleware/authMiddleWare.js";
import { handleFollow } from "../controllers/follow.js";

const router = express.Router();

router.post("/follow/:profileId", auth, handleFollow);
// router.get("/", (req, res) => {
//   res.send("hi");
// });

export default router;
