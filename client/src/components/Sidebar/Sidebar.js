import React, { useContext, useEffect, useState } from "react";

import "./Sidebar.scss";
import { Context } from "../../context/context";
import Suggestion from "../Suggestion/Suggestion";
import Skeleton from "react-loading-skeleton";
import { Link } from "react-router-dom";

const Sidebar = () => {
  const { user } = useContext(Context);

  const { getSuggestedProfiles } = useContext(Context);
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    const getProfiles = async () => {
      const data = await getSuggestedProfiles();
      setProfiles(data);
    };

    getProfiles();
  }, []);

  return (
    <div className="sidebar">
      {!user.name ? (
        <Skeleton count={1} height={61} />
      ) : (
        <>
          <Link to={`/p/${user.name}`}>
            <div className="sidebar__user">
              <img src={user.logoImg} alt={user.name} />
              <div className="info">
                <p>{user.name}</p>
                <p>{user.fullName}</p>
              </div>
            </div>
          </Link>
          <div className="sidebar__suggestions">
            {profiles.length === 0 ? (
              <Skeleton count={1} height={61} />
            ) : (
              <>
                <h3>Suggestions for you</h3>
                {profiles.length > 0 ? (
                  profiles.map((profile) => {
                    return <Suggestion key={profile._id} profile={profile} />;
                  })
                ) : (
                  <p>no profiles</p>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
