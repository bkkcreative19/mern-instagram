import User from "../models/user.js";

const handleFollow = async (req, res) => {
  const profileLookUp = await User.findOne({ name: req.params.profileId });
  const user = await User.findById(req.params.userId);

  user.following.push(profileLookUp._id);
  profileLookUp.followers.push(req.params.userId);
  user.save();
  profileLookUp.save();
  res.send("hi");
};
const handleUnFollow = async (req, res) => {
  //   console.log(req.params);
  const profileLookUp = await User.findOne({ name: req.params.profileId });
  const user = await User.findById(req.params.userId);

  profileLookUp.followers.forEach((item, id) => {
    if (item.toString() === req.params.userId) {
      profileLookUp.followers.splice(id, 1);
      profileLookUp.save();
    }
  });
  user.following.forEach((item, id) => {
    if (item.toString() === req.params.userId) {
      user.following.splice(id, 1);
      user.save();
    }
  });
};

export { handleFollow, handleUnFollow };
