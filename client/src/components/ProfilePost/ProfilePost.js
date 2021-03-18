import React from "react";
import "./Profile.scss";

const ProfilePost = ({ post }) => {
  console.log(post);
  return (
    <div className="profilePost">
      <img src={post.imageSrc} alt={post.caption} />

      <div className="info">
        <div className="likes">
          <i className="far fa-heart"></i>
          <span>{post.likes.length}</span>
        </div>
        <div className="comments">
          <i className="far fa-comment-dots"></i>
          <span>{post.comments.length}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePost;
