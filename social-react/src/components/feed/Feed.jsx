import React, { useContext, useEffect } from "react";
import "./feed.css";
import Share from "../share/Share";
import Post from "../post/Post";
import axios from "axios";
// import { Posts } from "../../dummyData";
import { CleaningServices } from "@mui/icons-material";
import { useState } from "react";
import { AuthContext } from "../../context/AuthContext";

const Feed = ({ username }) => {
  // console.log(username);
  const [posts, setPosts] = useState([]);
  const { user } = useContext(AuthContext);
  const fetchPosts = async () => {
    const res = username
      ? await axios.get(`http://127.0.0.1:8800/api/posts/profile/${username}`)
      : await axios.get("http://127.0.0.1:8800/api/posts/timeline/" + user._id);
    const { data } = res;
    setPosts(
      data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      })
    );
  };
  // console.log(posts);
  // console.log(posts);
  // console.log(username);

  useEffect(() => {
    fetchPosts();
  }, [username]);
  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {posts && posts.map((p) => <Post key={p._id} p={p} />)}
      </div>
    </div>
  );
};

export default Feed;
