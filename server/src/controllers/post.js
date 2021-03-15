import Post from "../models/post.js";
import User from "../models/user.js";

const createPost = async (req, res) => {
  let { caption, imageSrc } = req.body;

  try {
    const newPost = new Post({
      caption: caption,
      imageSrc: imageSrc,
      userId: req.user,
    });

    const savedPost = await newPost.save();
    res.json(savedPost);
  } catch (err) {
    res.status(400).json(err);
  }
};

const findUserById = async (id) => {
  const user = await User.findById(id);
  return user;
};

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ userId: { $ne: req.user } }).populate([
      "userId",
      {
        path: "comments",
        populate: { path: "userId" },
      },
    ]);

    // const posts = await Post.find({ userId: { $ne: req.user } }).populate();

    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};
const getPost = async (req, res) => {
  try {
    const posts = await Post.findById(req.params.postId);

    // const posts = await Post.find({ userId: { $ne: req.user } }).populate();

    res.json(posts);
  } catch (err) {
    res.status(400).json(err);
  }
};

const getPostsByUser = async (id) => {
  try {
    const posts = await Post.find({ userId: id });

    return posts;
  } catch (err) {
    return err;
  }
};

const likePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  // post.likes.includes(req.params.userId)
  //   ? post.likes.forEach((item, id) => {
  //       if (item.toString() === req.params.userId) {
  //         post.likes.splice(id, 1);
  //         post.save();
  //       }
  //       return;
  //     })
  //   : post.likes.push(req.params.userId);
  post.likes.push(req.params.userId);
  post.save();
  res.json(post);
};
const unlikePost = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  post.likes.forEach((item, id) => {
    if (item.toString() === req.params.userId) {
      post.likes.splice(id, 1);
      post.save();
    }
  });
  res.json(post);
};

// const getLikes = async (req, res) => {
//   const post = Post.findOne({ _id: req.params.postId });
//   console.log(post);
//   // res.send(post);
// };

export { createPost, getPosts, getPostsByUser, likePost, unlikePost, getPost };
