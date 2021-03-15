import React from "react";
import "./Profile.scss";

const ProfilePost = ({ post }) => {
  return (
    <div className="profilePost">
      <img src={post.imageSrc} alt={post.caption} />
    </div>
  );
};

export default ProfilePost;
