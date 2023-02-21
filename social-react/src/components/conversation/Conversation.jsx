import React, { useEffect, useState } from "react";
import "./conversation.css";
import noavatar from "../../assets/person/noAvatar.png";
import axios from "axios";
const Conversation = ({ conversation, currentUser }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);
    const getUser = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8800/api/users?userId=" + friendId
        );
        // console.log(res);
        setUser(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
  }, [currentUser, conversation]);
  return (
    <div className="conversation">
      <img className="conversationImg" src={user?.profilePicture || noavatar} />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
};

export default Conversation;
