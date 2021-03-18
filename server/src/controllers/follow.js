import User from "../models/user.js";

const handleFollow = async (req, res) => {
  const profileLookUp = await User.findOne({ name: req.body.profileId });
  const userLookUp = await User.findById(req.body.userId);
  // console.log(profileLookUp);
  const profile = { name: req.body.profileId };

  try {
    switch (req.body.type) {
      case "follow":
        await Promise.all([
          User.findOneAndUpdate(profile, {
            $push: { followers: userLookUp._id },
          }),
          User.findByIdAndUpdate(req.body.userId, {
            $push: { following: profileLookUp._id },
          }),
        ]);

        break;

      case "unfollow":
        await Promise.all([
          User.findOneAndUpdate(profile, {
            $pull: { followers: userLookUp._id },
          }),
          User.findByIdAndUpdate(req.body.userId, {
            $pull: { following: profileLookUp._id },
          }),
        ]);

      default:
        break;
    }
  } catch (err) {}
};

export { handleFollow };
