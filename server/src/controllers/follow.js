import User from "../models/user.js";

const handleFollow = async (req, res) => {
  //   console.log(req.params);
  const profileLookUp = await User.findById(req.params.profileId);
  const user = await User.findById(req.user);

  user.following.push(profileLookUp._id);
  profileLookUp.followers.push(req.user);
  user.save();
  profileLookUp.save();
  res.send("hi");
};

export { handleFollow };
