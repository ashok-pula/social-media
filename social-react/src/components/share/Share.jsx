import React, { useContext, useRef, useState } from "react";
import "./share.css";
import {
  Cancel,
  EmojiEmotions,
  Label,
  PermMedia,
  Room,
} from "@mui/icons-material";
import profileImg from "../../assets/person/1.jpeg";
import noavater from "../../assets/person/noAvatar.png";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [file, setFile] = useState(null);
  // const pf = process.env.REACT_API_IMAGE;

  const submitHanlder = async (e) => {
    e.preventDefault();
    console.log("Ashok");

    const newPost = { userId: user._id, desc: desc.current.value };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("http://localhost:8800/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      await axios.post("http://localhost:8800/api/posts", newPost);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={user.profilePicture || noavater}
            alt="person 1"
            className="shareProfileImg"
          />
          <input
            placeholder={`What's in your mind ${user.username}?`}
            className="shareInput"
            type="text"
            ref={desc}
          />
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="sharefileConatiner">
            <img
              src={URL.createObjectURL(file)}
              alt="image"
              className="shareImg"
            />
            <Cancel
              className="shareCancelButton"
              onClick={() => setFile(null)}
            />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHanlder}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png,.jpeg,.jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>
            <div className="shareOption">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit">
            Share
          </button>
        </form>
      </div>
    </div>
  );
};

export default Share;
