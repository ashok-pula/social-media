import React, { useEffect, useState } from "react";
import "./profile.css";
import Topbar from "./../../components/Topbar/Topbar";
import Sidebar from "./../../components/sidebar/Sidebar";
import Feed from "./../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rigthbar";
import coverImg from "../../assets/post/3.jpeg";
import noAvatar from "../../assets/person/noAvatar.png";
import noCover from "../../assets/person/noCover.png";
import axios from "axios";
import { useParams } from "react-router";
const Profile = () => {
  const [user, setUser] = useState("");
  const params = useParams();
  // console.log(params);
  const fetchUser = async () => {
    const response = await axios.get(
      `http://127.0.0.1:8800/api/users?username=${params.username}`
    );
    const { data } = response;
    // console.log(data);
    setUser(data);
  };
  useEffect(() => {
    fetchUser();
  }, [params.username]);
  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                src={user.coverProfile || noCover}
                alt="cover photo"
                className="profileCoverImg"
              />
              <img
                src={user.profilePicture || noAvatar}
                alt="profile picture"
                className="profileUserImg"
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <span className="profileInfoDesc">{user.desc}</span>
            </div>
          </div>
          <div className="profileRightBottom">
            <Feed username={params.username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
