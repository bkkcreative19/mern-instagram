import jwt from "jsonwebtoken";
// import AsyncHandler from "express-async-handler";
// import User from "../models/user.js";

const auth = (req, res, next) => {
  try {
    const token = req.header("x-auth-token");
    if (!token)
      return res
        .status(401)
        .json({ msg: "No authentication token, authorization denied nigga." });

    const verified = jwt.verify(token, "adnbfoesrte24fds");
    if (!verified)
      return res
        .status(401)
        .json({ msg: "Token verification failed, authorization denied." });

    // console.log(verified);
    req.user = verified.userId;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export { auth };
