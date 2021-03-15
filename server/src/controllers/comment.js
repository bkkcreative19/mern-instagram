import Post from "../models/post.js";
import Comment from "../models/comment.js";

const addComment = async (req, res) => {
  const post = await Post.findById(req.params.postId);

  let { comment } = req.body;

  try {
    const newComment = new Comment({
      comment: comment,
      userId: req.params.userId,
    });
    const savedComment = await newComment.save();
    post.comments.push(savedComment._id);
    post.save();
    const test = await Comment.findById(savedComment._id).populate("userId");
    res.json(test);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

export { addComment };
