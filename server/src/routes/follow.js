import express from "express";
import { auth } from "..//middleware/authMiddleWare.js";
import { handleFollow, handleUnFollow } from "../controllers/follow.js";

const router = express.Router();

router.post("/follow/:profileId/:userId", handleFollow);
router.post("/un-follow/:profileId/:userId", handleUnFollow);
// router.get("/", (req, res) => {
//   res.send("hi");
// });

export default router;
