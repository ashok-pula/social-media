import React from "react";
import "./closeFriends.css";

const CloseFriends = ({ user }) => {
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} className="sidebarFriendImg" alt="2" />
      <span className="sidbarFriendName">{user.username}</span>
    </li>
  );
};

export default CloseFriends;
