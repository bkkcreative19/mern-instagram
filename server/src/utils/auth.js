import jwt from "jsonwebtoken";

const createJWT = (email, userId, duration) => {
  const payload = {
    email,
    userId,
    duration,
  };
  return jwt.sign(payload, "adnbfoesrte24fds", {
    expiresIn: duration,
  });
};

export default createJWT;
