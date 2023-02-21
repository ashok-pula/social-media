import React, { useContext, useEffect, useRef, useState } from "react";
import Topbar from "../../components/Topbar/Topbar";
import "./messenger.css";
import Online from "./../../components/online/Online";
import Conversation from "../../components/conversation/Conversation";
import Message from "../../components/message/Message";
import ChatOnline from "../../components/chatonline/ChatOnline";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

import { io } from "socket.io-client";

const Messenger = () => {
  const [conversation, setConversation] = useState([]);

  const { user: currentUser } = useContext(AuthContext);
  const [messages, setMessages] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const scrollRef = useRef();
  const socketRef = useRef();
  // const [socket, setSocket] = useState(null);
  // console.log(currentUser._id);
  const fetchConversion = async () => {
    try {
      const conv = await axios.get(
        "http://127.0.0.1:8800/api/conversation/" + currentUser._id
      );
      setConversation(conv.data);
      // console.log(conv);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchConversion();
  }, [currentUser]);
  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(
          "http://127.0.0.1:8800/api/message/" + currentChat?._id
        );
        setMessages(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getMessages();
  }, [currentChat]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(newMessage);
    const message = {
      sender: currentUser._id,
      text: newMessage,
      conversationId: currentChat._id,
    };
    const receiverId = currentChat.members.find((m) => m !== currentUser._id);
    socketRef.current.emit("sendMessage", {
      senderId: currentUser._id,
      receiverId,
      text: newMessage,
    });
    try {
      const res = await axios.post(
        "http://127.0.0.1:8800/api/message",
        message
      );
      // console.log(res.data);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
    // console.log(message);
  };
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    socketRef.current = io("ws://localhost:8900");
    socketRef.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });

    // setSocket();
  }, []);
  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);
  useEffect(() => {
    socketRef.current.emit("addUser", currentUser._id);
    socketRef.current.on("getUsers", (users) => {
      // console.log(users);
      setOnlineUsers(
        currentUser.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [currentUser]);
  // console.log(currentUser);
  // console.log(onlineUsers);

  return (
    <>
      <Topbar />
      <div className="messenger">
        <div className="chatMenu">
          <div className="chatMenuWrapper">
            <input
              type="text"
              placeholder="Search for friends"
              className="chatMenuInput"
            />

            {conversation.map((c) => (
              <div key={c._id} onClick={() => setCurrentChat(c)}>
                <Conversation conversation={c} currentUser={currentUser} />
              </div>
            ))}
          </div>
        </div>
        <div className="chatBox">
          <div className="chatBoxWrapper">
            {currentChat ? (
              <>
                <div className="chatBoxTop">
                  {messages &&
                    messages.map((m, index) => (
                      <div key={index} ref={scrollRef}>
                        <Message
                          message={m}
                          own={m.sender === currentUser._id}
                        />
                      </div>
                    ))}
                </div>
                <div className="chatBoxBottom">
                  <textarea
                    className="chatMessageText"
                    placeholder="write some thing here !"
                    onChange={(e) => setNewMessage(e.target.value)}
                    value={newMessage}
                  />
                  <button className="chatSubmitButton" onClick={handleSubmit}>
                    Send
                  </button>
                </div>
              </>
            ) : (
              <span className="noConverstaionText">
                To start messeging click on converstation
              </span>
            )}
          </div>
        </div>
        <div className="chatOnline">
          <div className="chatOnlineWrapper">
            <ChatOnline
              onlineUsers={onlineUsers}
              currentId={currentUser._id}
              setCurrentChat={setCurrentChat}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Messenger;
