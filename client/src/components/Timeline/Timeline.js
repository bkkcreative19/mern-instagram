import React, { useContext, useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import "./Timeline.scss";
import Post from "../Post/Post";
import { Context } from "../../context/context";

const Timeline = () => {
  const { getPosts } = useContext(Context);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const handleGetPosts = async () => {
      const data = await getPosts();
      setPosts(data);
    };

    if (localStorage.getItem("auth-token")) {
      handleGetPosts();
    }
  }, [localStorage.getItem("auth-token")]);

  return (
    <div className="timeline">
      {!posts ? (
        <Skeleton count={1} width={"100%"} height={500} />
      ) : posts?.length > 0 ? (
        posts.map((post) => <Post key={post._id} post={post} />)
      ) : (
        <p className="text-center text-2xl">Follow to get posts</p>
      )}
    </div>
  );
};

export default Timeline;
