import React, { useContext, useEffect, useState } from "react";
import "./rightbar.css";
import gift from "../../assets/gift.png";
import ad from "../../assets/ad.png";
import profileimage from "../../assets/person/2.jpeg";
import { Users } from "./../../dummyData";
import Online from "../online/Online";
import p1 from "../../assets/person/1.jpeg";
import p2 from "../../assets/person/2.jpeg";
import p3 from "../../assets/person/3.jpeg";
import p4 from "../../assets/person/4.jpeg";
import p5 from "../../assets/person/5.jpeg";
import p6 from "../../assets/person/6.jpeg";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import noavatar from "../../assets/person/noAvatar.png";
import { Link } from "react-router-dom";
import { Add, Remove } from "@mui/icons-material";

const Rigthbar = ({ user }) => {
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(null);

  // console.log(currentUser.followings.includes(user?._id));
  const getFreinds = async () => {
    const res =
      user &&
      (await axios.get(`http://127.0.0.1:8800/api/users/friends/${user._id}`));
    // const { data } = res;
    setFriends(res && res.data);
  };
  useEffect(() => {
    // console.log(user && user);
    // console.log(currentUser);
    setFollowed(currentUser.followings?.includes(user?._id));
    // console.log(followed);
  }, [currentUser, user]);
  // useEffect(() => {
  //   setFollowed(currentUser.followings?.includes(user?._id));
  //   console.log(followed);
  // }, [currentUser, user]);

  useEffect(() => {
    getFreinds();
  }, [user]);

  const followHanlder = async () => {
    try {
      if (followed) {
        await axios.put(
          `http://127.0.0.1:8800/api/users/${user._id}/unfollow`,
          {
            userId: currentUser._id,
          }
        );
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`http://127.0.0.1:8800/api/users/${user._id}/follow`, {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
      }
      setFollowed(!followed);
    } catch (error) {
      console.log(error);
    }
  };

  const HomeRightbar = () => {
    return (
      <>
        <div className="birthdayContainer">
          <img src={gift} alt="gift" className="birthdayImg" />
          <span className="birthdayText">
            <b>Pula Ashok</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img src={ad} alt="ad" className="rightbarAd" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };
  const ProfileRightbar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={followHanlder}>
            {followed ? "UnFollow" : "Follow"} {followed ? <Remove /> : <Add />}
          </button>
        )}
        <h4 className="profilerightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">
              {user.relationship === 1
                ? "single"
                : user.relationship === 1
                ? "married"
                : "-"}
            </span>
          </div>
        </div>
        <h4>User friends</h4>
        <div className="rightbarFollowings">
          {/* <div className="rightbarFollowing">
            <img src={p1} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Ashok</span>
          </div> */}
          {friends &&
            friends.map((f) => (
              <Link
                to={`/profile/${f.username}`}
                style={{ textDecoration: "none" }}
                key={f._id}
              >
                <div className="rightbarFollowing">
                  <img
                    src={f.profilePicture || noavatar}
                    alt="person"
                    className="rightbarFollowingImg"
                  />
                  <span className="rightbarFollowingName">{f.username}</span>
                </div>
              </Link>
            ))}
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rigthbar;
