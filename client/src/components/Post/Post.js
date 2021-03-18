import React, { useContext, useRef, useState } from "react";
import { formatDistance } from "date-fns";

import { Link } from "react-router-dom";

import { Context } from "../../context/context";
import "./Post.scss";

const Post = ({ post }) => {
  const { user, likePhoto, unlikePhoto, createComment, getPost } = useContext(
    Context
  );
  const commentInput = useRef(null);

  const handleFocus = () => commentInput.current.focus();
  const [comments, setComments] = useState(post.comments.slice(0, 3));
  const [comment, setComment] = useState("");
  const [likedPhoto, setLikedPhoto] = useState(post.likes.includes(user._id));
  const [likes, setLikes] = useState(post.likes.length);

  const likePhotoCall = async () => {
    const data = await likePhoto(post._id, user._id);
    console.log(data);
  };
  const unlikePhotoCall = async () => {
    const data = await unlikePhoto(post._id, user._id);
    console.log(data);
  };

  const handleLikePhoto = async () => {
    setLikedPhoto(!likedPhoto);

    likedPhoto ? unlikePhotoCall() : likePhotoCall();

    setLikes((likes) => (likedPhoto ? likes - 1 : likes + 1));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await createComment(post._id, user._id, comment);
    e.target.reset();
    setComments([...comments, data]);
  };

  return (
    <div className="post">
      <>
        <div className="post__header">
          <Link to={`/p/${post.userId.name}`}>
            <img src={post.userId.logoImg} alt={post.userId.name} />
            <h3>{post.userId.name}</h3>
          </Link>
        </div>
        <div className="post__img">
          <img src={post.imageSrc} alt={post.caption} />
        </div>
        <div className="post__footer">
          <div className="post__footer-actions">
            {likedPhoto ? (
              <i onClick={handleLikePhoto} className="fas fa-heart"></i>
            ) : (
              <i onClick={handleLikePhoto} className="far fa-heart"></i>
            )}

            <i onClick={handleFocus} className="far fa-comment-dots"></i>
          </div>
          <span className="post__footer-likes">
            {likes} {""}
            {likes === 1 ? "like" : "likes"}
          </span>

          <div className="post__footer-caption">
            <Link to={`/p/${post.userId.name}`}>{post.userId.name}</Link>
            <span>{post.caption}</span>
          </div>

          <div
            className={
              comments.length >= 3
                ? "post__footer-comments"
                : "post__footer-comments top"
            }
          >
            {comments.length >= 3 && (
              <span className="view-all">
                View all {comments.length} comments
              </span>
            )}
            {comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <Link to={`/p/${comment.userId.name}`}>
                    {comment.userId.name}
                  </Link>
                  <span>{comment.comment}</span>
                </div>
              );
            })}
          </div>
          <span className="date-created">
            {formatDistance(new Date(post.createdAt), new Date())} ago
          </span>
        </div>
        <form onSubmit={handleSubmit} className="post__commentInput">
          <input
            ref={commentInput}
            onChange={(e) => setComment(e.target.value)}
            type="text"
          />
          <button>Post</button>
        </form>
      </>
    </div>
  );
};

export default Post;
