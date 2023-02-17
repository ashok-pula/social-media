import React, { useContext, useState } from "react";
import { CleaningServices, MoreVert } from "@mui/icons-material";
import profileImg from "../../assets/person/1.jpeg";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import "./post.css";

import "./post.css";
// import { Users } from "./../../dummyData";
import axios from "axios";
import { useEffect } from "react";
// console.log(Users);
import noavatar from "../../assets/person/noAvatar.png";
import nocover from "../../assets/person/noCover.png";
import postimage from "../../assets/post/1.jpeg";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const Post = ({ p }) => {
  const [likeCounter, setLikeCounter] = useState(p.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState("");
  const { user: currentUser } = useContext(AuthContext);

  const fetchUser = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8800/api/users?userId=${p.userId}`
    );
    const { data } = response;
    // console.log(data);
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, [p.userId]);

  useEffect(() => {
    setIsLiked(p.likes.includes(currentUser._id));
  }, [currentUser._id, p.likes]);
  const likeHandler = () => {
    // console.log(likeCounter);
    try {
      axios.put("http://127.0.0.1:8800/api/posts/" + p._id + "/like", {
        userId: currentUser._id,
      });
    } catch (error) {
      console.log(error);
    }
    setLikeCounter(isLiked ? likeCounter - 1 : likeCounter + 1);
    setIsLiked(!isLiked);
  };
  // const pf = process.env.REACT_API_IMAGE;

  // console.log(p);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
              <img
                // src={Users.filter((u) => u.id === p?.userId)[0].profilePicture}
                src={user.profilePicture || noavatar}
                alt="profile pic"
                className="postProfileImg"
              />
            </Link>

            <span className="postUsername">
              {/* {Users.filter((u) => u.id === p?.userId)[0].username} */}
              {user.username}
            </span>
            <span className="postDate">{format(p.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{p?.desc}</span>
          <img
            src={`http://localhost:8800/images/${p.img}` || postimage}
            alt="post image"
            className="postImg"
          />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              src={like}
              alt="like"
              className="likeIcon"
              onClick={likeHandler}
            />
            <img
              src={heart}
              alt="heart"
              className="likeIcon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">
              {likeCounter} people like it
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{p.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
