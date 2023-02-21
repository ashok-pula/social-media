import React, { useEffect, useState } from "react";
import "./chatonline.css";
import img3 from "../../assets/person/noAvatar.png";
import axios from "axios";

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(
        "http://127.0.0.1:8800/api/users/friends/" + currentId
      );
      setFriends(res.data);
    };
    getFriends();
  }, [currentId]);
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);
  const handleClick = async (user) => {
    console.log("clicked");
    try {
      const res = await axios.get(
        `http://127.0.0.1:8800/api/conversation/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (error) {
      console.log(error);
    }
    console.log(user);
  };
  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
        <div
          className="chatOnlineFriend  "
          key={o?._id}
          onClick={() => handleClick(o)}
        >
          <div className="chatOnlineImgContainer">
            <img
              src={o.profilePicture || img3}
              alt=""
              className="chatOnlineImg"
            />
            <div className="chatOnlineBadge"></div>
          </div>
          <span className="chatOnlineName">{o?.username}</span>
        </div>
      ))}
    </div>
  );
};

export default ChatOnline;
