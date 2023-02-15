import React from "react";
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

const Rigthbar = ({ profile }) => {
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
        <h4 className="profilerightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValue">New York</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValue">Madrid</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValue">Marriage</span>
          </div>
        </div>
        <h4>User friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={p1} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Ashok</span>
          </div>
          <div className="rightbarFollowing">
            <img src={p2} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Shiva</span>
          </div>
          <div className="rightbarFollowing">
            <img src={p3} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Prathyusha</span>
          </div>
          <div className="rightbarFollowing">
            <img src={p4} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Sai</span>
          </div>
          <div className="rightbarFollowing">
            <img src={p5} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">Alakananda</span>
          </div>
          <div className="rightbarFollowing">
            <img src={p6} alt="person" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">sweety</span>
          </div>
        </div>
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {profile ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
};

export default Rigthbar;
