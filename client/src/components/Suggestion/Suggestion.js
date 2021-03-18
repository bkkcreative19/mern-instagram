import React, { useContext, useState, useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./Suggestion.scss";

const Suggestion = ({ profile }) => {
  const { followUser } = useContext(Context);
  const [isFollowing, setIsFollowing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleFollow = async () => {
    setLoading(true);
    const data = await followUser(profile.name, "follow");
    setLoading(false);
    setIsFollowing(true);
  };

  return (
    <div className="suggestion">
      <Link to={`/p/${profile.name}`}>
        <img src={profile.logoImg} alt={profile.name} />
        <h4>{profile.name}</h4>
      </Link>

      {loading && !isFollowing ? (
        <LoadingIcons.SpinningCircles
          style={{ height: "1.7rem" }}
          stroke="#333"
        />
      ) : (
        <button onClick={handleFollow}>
          {isFollowing ? "Following" : "Follow"}
        </button>
      )}
    </div>
  );
};

export default Suggestion;
