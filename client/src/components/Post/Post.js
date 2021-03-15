import React, { useContext, useEffect, useState } from "react";
import { formatDistance } from "date-fns";

import "./Post.scss";
import { Link } from "react-router-dom";

import { Context } from "../../context/context";

const Post = ({ post }) => {
  const { user, likePhoto, unlikePhoto, createComment, getPost } = useContext(
    Context
  );
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

    setComments([...comments, data]);
    setComment("");
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

            <i className="far fa-comment-dots"></i>
          </div>
          <span className="post__footer-likes">{likes} likes</span>

          <span className="post__footer-caption">{post.caption}</span>
          <div className="post__footer-comments">
            {comments.length >= 3 && <p>View all comments</p>}
            {comments.map((comment) => {
              return (
                <div key={comment._id}>
                  <span>{comment.userId.name}</span>
                  <p>{comment.comment}</p>
                </div>
              );
            })}
            {/* <div>
              <span>Kris</span>
              <p>Hi there this is a photo</p>
            </div>
            <div>
              <span>Kris</span>
              <p>Hi there this is a photo</p>
            </div>
            <div>
              <span>Kris</span>
              <p>Hi there this is a photo</p>
            </div> */}
          </div>
          <span className="date-created">
            {formatDistance(new Date(post.createdAt), new Date())} ago
          </span>
        </div>
        <form onSubmit={handleSubmit} className="post__commentInput">
          <input onChange={(e) => setComment(e.target.value)} type="text" />
          <button>Post</button>
        </form>
      </>
    </div>
  );
};

export default Post;
