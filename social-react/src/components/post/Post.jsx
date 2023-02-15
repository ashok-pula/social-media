import React, { useState } from "react";
import { CleaningServices, MoreVert } from "@mui/icons-material";
import profileImg from "../../assets/person/1.jpeg";
import like from "../../assets/like.png";
import heart from "../../assets/heart.png";
import "./post.css";

import "./post.css";
import { Users } from "./../../dummyData";
console.log(Users);

const Post = ({ p }) => {
  const [likeCounter, setLikeCounter] = useState(p.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    console.log(likeCounter);
    setLikeCounter(isLiked ? likeCounter - 1 : likeCounter + 1);
    setIsLiked(!isLiked);
  };

  // console.log(p);
  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img
              src={Users.filter((u) => u.id === p?.userId)[0].profilePicture}
              alt="profile pic"
              className="postProfileImg"
            />
            <span className="postUsername">
              {Users.filter((u) => u.id === p?.userId)[0].username}
            </span>
            <span className="postDate">{p.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{p?.desc}</span>
          <img src={p.photo} alt="post image" className="postImg" />
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
