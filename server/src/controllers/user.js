import User from "../models/user.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import createJWT from "../utils/auth.js";
import { getPostsByUser } from "../controllers/post.js";
const emailRegexp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
const signup = async (req, res, next) => {
  let {
    name,
    fullName,
    email,
    password,
    password_confirmation,
    logoImg,
  } = req.body;
  let errors = [];
  if (!name) {
    errors.push({ name: "required" });
  }
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (!password_confirmation) {
    errors.push({
      password_confirmation: "required",
    });
  }
  if (password != password_confirmation) {
    errors.push({ password: "mismatch" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  try {
    const user = await User.findOne({ email: email });
    let newUser;
    if (user) {
      return res
        .status(422)
        .json({ errors: [{ user: "email already exists" }] });
    } else {
      newUser = new User({
        name: name,
        fullName: fullName,
        email: email,
        password: password,
        logoImg: logoImg,
      });
    }
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(password, salt, async function (err, hash) {
        if (err) throw err;
        newUser.password = hash;
        try {
          const savedUser = await newUser.save();
          res.status(200).json({ success: true, result: savedUser });
        } catch (err) {
          res.status(500).json({
            errors: [{ error: err }],
          });
        }
      });
    });
  } catch (error) {
    res.status(500).json({
      errors: [{ error: "Something went wrong" }],
    });
  }

  //   User.findOne({ email: email })
  //     .then((user) => {
  //       if (user) {
  //         return res
  //           .status(422)
  //           .json({ errors: [{ user: "email already exists" }] });
  //       } else {
  //         const user = new User({
  //           name: name,
  //           email: email,
  //           password: password,
  //         });
  //         bcrypt.genSalt(10, function (err, salt) {
  //           bcrypt.hash(password, salt, function (err, hash) {
  //             if (err) throw err;
  //             user.password = hash;
  //             user
  //               .save()
  //               .then((response) => {
  //                 res.status(200).json({
  //                   success: true,
  //                   result: response,
  //                 });
  //               })
  //               .catch((err) => {
  //                 res.status(500).json({
  //                   errors: [{ error: err }],
  //                 });
  //               });
  //           });
  //         });
  //       }
  //     })
  //     .catch((err) => {

  //     });
};

// const getUser = async (req, res, next) => {
//   const user = await User.findById(req.user);
//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       fullName: user.fullName,
//       logoImg: user.logoImg,
//       followers: user.followers,
//       following: user.following,
//     });
//   } else {
//     res.status(404);
//     throw new Error("User not found");
//   }
// }

const getProfile = async (req, res, next) => {
  // console.log(req.user);

  const user = await User.findOne({ name: req.params.name });
  const posts = await getPostsByUser(user._id);

  // console.log(user);

  const response = {
    user,
    posts,
  };

  if (user) {
    res.json(response);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // // res.send("hi");
};
const getUser = async (req, res, next) => {
  // console.log(req.user);

  const user = await User.findById(req.user);

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
  // // res.send("hi");
};
const signin = async (req, res) => {
  let { email, password } = req.body;
  let errors = [];
  if (!email) {
    errors.push({ email: "required" });
  }
  if (!emailRegexp.test(email)) {
    errors.push({ email: "invalid email" });
  }
  if (!password) {
    errors.push({ password: "required" });
  }
  if (errors.length > 0) {
    return res.status(422).json({ errors: errors });
  }

  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      res.status(404).json({
        errors: [{ user: "not found" }],
      });
    } else {
      try {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(400).json({ errors: [{ password: "incorrect" }] });
        }

        let access_token = createJWT(user.email, user._id, 3600);

        jwt.verify(access_token, "adnbfoesrte24fds", (err, decoded) => {
          console.log(err);
          if (err) {
            res.status(500).json({ errors: err });
          }
          if (decoded) {
            return res.status(200).json({
              success: true,
              token: access_token,
              message: user,
            });
          }
        });
      } catch (err) {
        res.status(500).json({ errors: err });
      }
    }
  } catch (err) {
    res.status(500).json({ errors: err });
  }

  // .then((user) => {
  //   if (!user) {
  //     return res.status(404).json({
  //       errors: [{ user: "not found" }],
  //     });
};

// const isValid = async (req, res) => {
//   try {
//     const token = req.header("x-auth-token");
//     if (!token) return res.json(false);

//     const verified = jwt.verify(token, "adnbfoesrte24fds");
//     if (!verified) return res.json(false);

//     const user = await User.findById(verified.userId);
//     if (!user) return res.json(false);

//     return res.json(true);
//   } catch (err) {}
// };

const getSuggestedProfiles = async (req, res, next) => {
  // const suggested = await User.find(
  //   { _id: { $ne: req.user } },
  //   { followers: req.user }
  // );
  const suggested = await User.find({
    $and: [{ _id: { $ne: req.user } }, { followers: { $ne: req.user } }],
  });
  // const test = await User.find({
  //   followers: req.user,
  // });
  res.json(suggested);
};

export { signup, signin, getProfile, getSuggestedProfiles, getUser };
