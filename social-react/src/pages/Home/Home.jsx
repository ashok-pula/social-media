import React from "react";
import Topbar from "../../components/Topbar/Topbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rigthbar";
import "./Home.css";
const Home = () => {
  return (
    <>
      <Topbar />
      <div className="homecontainer">
        <Sidebar />
        <Feed />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
