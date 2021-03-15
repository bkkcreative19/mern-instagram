import React, { useState, useEffect } from "react";
import * as ROUTES from "../constants/routes";
import axios from "axios";

const Context = React.createContext("light");

const MyContext = ({ children }) => {
  const [profile, setProfile] = useState({});
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState({});

  const login = async (obj, history) => {
    const { data } = await axios.post("/api/signin", obj, {
      headers: { "Content-Type": "application/json" },
    });
    localStorage.setItem("auth-token", JSON.stringify(data.token));
    history.push(ROUTES.DASHBOARD);
  };

  const logout = () => {
    localStorage.clear("auth-token");
  };

  const getProfile = async (name) => {
    const { data } = await axios.get(`/api/profile/${name}`, {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };

  const getPosts = async () => {
    const { data } = await axios.get("/api/posts", {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };

  // const getPostsForUser = async () => {

  // }

  const getUser = async () => {
    const { data } = await axios.get("/api/user", {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    setUser(data);
  };

  const getSuggestedProfiles = async () => {
    const { data } = await axios.get("/api/suggested", {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };

  // const likePhoto = async (postId) => {
  //   const { data } = await axios.post(`/api/post-like/${postId}`, {
  //     headers: {
  //       "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
  //     },
  //   });
  //   return data;
  // };

  const likePhoto = async (postId, userId) => {
    const { data } = await axios.post(`/api/post-like/${postId}/${userId}`, {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };
  const unlikePhoto = async (postId, userId) => {
    const { data } = await axios.post(`/api/post-unlike/${postId}/${userId}`, {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };
  const createComment = async (postId, userId, comment) => {
    const { data } = await axios.post(
      `/api/add-comment/${postId}/${userId}`,
      {
        comment,
      },
      {
        headers: {
          "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
        },
      }
    );
    return data;
  };

  const getPost = async (postId) => {
    const { data } = await axios.get(`/api/post/${postId}`, {
      headers: {
        "x-auth-token": JSON.parse(localStorage.getItem("auth-token")),
      },
    });
    return data;
  };

  return (
    <Context.Provider
      value={{
        login,
        getProfile,
        profile,
        posts,
        getPosts,
        logout,
        getUser,
        user,
        getSuggestedProfiles,
        likePhoto,
        unlikePhoto,
        createComment,
        getPost,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export { MyContext, Context };
