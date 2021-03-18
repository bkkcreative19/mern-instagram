import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Header from "../../components/Header/Header";
import { Context } from "../../context/context";
import "./Profile.scss";
import ProfilePost from "../../components/ProfilePost/ProfilePost";

const Profile = () => {
  const { getProfile, user, followUser } = useContext(Context);
  const [profile, setProfile] = useState(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followers, setFollowers] = useState(0);
  const params = useParams();
  // console.log(params);
  console.log(profile);
  const handleFollow = async () => {
    if (!isFollowing) {
      setIsFollowing(!isFollowing);
      setFollowers(followers + 1);
      await followUser(params.username, "follow");
    } else {
      setIsFollowing(!isFollowing);
      setFollowers(followers - 1);
      await followUser(params.username, "unfollow");
    }
    // await followUser(profile._id);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      const data = await getProfile(params.username);
      setIsFollowing(data.user.followers.includes(user._id));
      setFollowers(data.user.followers.length);
      setProfile(data);
    };

    fetchProfile();
  }, [user.following]);

  return (
    <>
      <Header />
      <div className="profile container">
        {profile === null ? (
          <Skeleton count={1} width={"100%"} height={200} />
        ) : (
          <>
            <div className="profile__header">
              <div className="profile__header-logo">
                <img src={profile.user.logoImg} alt="hi" />
              </div>

              <div className="profile__header-info">
                <div className="head">
                  <h1>{profile.user.name}</h1>
                  {profile.user.name === user.name ? (
                    <button>edit</button>
                  ) : (
                    <button onClick={handleFollow}>
                      {isFollowing ? "unfollow" : "follow"}
                    </button>
                  )}
                </div>
                <div className="data">
                  <span>
                    {profile.posts.length}
                    <p>photos</p>
                  </span>
                  <span>
                    {followers}
                    <p>followers</p>
                  </span>
                  <span>
                    {profile.user.following.length}
                    <p>following</p>
                  </span>
                </div>
                <h2 className="full-name">{profile.user.fullName}</h2>
              </div>
            </div>
            <div className="profile__posts">
              {profile.posts.map((post) => {
                return <ProfilePost key={post._id} post={post} />;
              })}
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Profile;
