import express from "express";
import { auth } from "..//middleware/authMiddleWare.js";
import { handleFollow } from "../controllers/follow.js";

const router = express.Router();

router.post("/follow", handleFollow);
// router.post("/un-follow/:profileId/:userId", handleUnFollow);
// router.get("/", (req, res) => {
//   res.send("hi");
// });

export default router;
