import React from "react";
import "./profile.css";
import Topbar from "./../../components/Topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import Feed from "./../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rigthbar";
import coverImg from "../../assets/post/3.jpeg";
import userImg from "../../assets/person/7.jpeg";
const Profile = () => {
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img src={coverImg} alt="" className="profileCoverImg" />
              <img src={userImg} alt="" className="profileUserImg" />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">Ashok Pula</h4>
              <span className="profileInfoDesc">Hello my friends!</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed />
            <Rightbar profile />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
