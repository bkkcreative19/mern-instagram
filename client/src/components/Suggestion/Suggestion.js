import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../context/context";
import "./Suggestion.scss";

const Suggestion = ({ profile }) => {
  const { followUser } = useContext(Context);

  const handleFollow = async () => {
    await followUser(profile.name, "follow");
  };

  return (
    <div className="suggestion">
      <Link to={`/p/${profile.name}`}>
        <img src={profile.logoImg} alt={profile.name} />
        <h4>{profile.name}</h4>
      </Link>

      <button onClick={handleFollow}>Follow</button>
    </div>
  );
};

export default Suggestion;
