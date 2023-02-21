import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import "./login.css";
import { loginCall } from "./../../apiCall";
import { CircularProgress } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const email = useRef();
  const password = useRef();
  const { user, isFetching, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  // console.log(user);
  const submitHanlder = (e) => {
    e.preventDefault();
    // console.log("clicked");
    // console.log(email.current.value);
    const userLogin = loginCall(
      { email: email.current.value, password: password.current.value },
      dispatch
    );
    if (userLogin) navigate("/");
  };
  // console.log(user);
  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">Ashok Web</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox" onSubmit={submitHanlder}>
            <input
              type="email"
              placeholder="Email"
              className="loginInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="loginInput"
              required
              minLength="3"
              ref={password}
            />
            <button className="loginButton">
              {isFetching ? <CircularProgress color="inherit" /> : "Log In"}
            </button>
            <span className="loginForgot">Forgot Password</span>
            <Link to="/register">
              <button className="loginRegisterButton">
                Create a New Account
              </button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
