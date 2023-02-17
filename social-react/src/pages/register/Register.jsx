import React, { useRef } from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const username = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  const submitHanlder = async (e) => {
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("passwords don't match!");
    } else {
      const user = {
        username: username.current.value,
        email: email.current.value,
        password: password.current.value,
      };
      try {
        await axios.post("http://127.0.0.1:8800/api/auth/register", user);
        navigate("/login");
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div className="register">
      <div className="registerWrapper">
        <div className="registerLeft">
          <h3 className="registerLogo">Ashok Web</h3>
          <span className="registerDesc">
            Connect with friends and the world around you on Lamasocial
          </span>
        </div>
        <div className="registerRight">
          <form onSubmit={submitHanlder} className="registerBox">
            <input
              type="text"
              placeholder="User name"
              className="registerInput"
              required
              ref={username}
            />
            <input
              type="email"
              placeholder="Email"
              className="registerInput"
              required
              ref={email}
            />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
              required
              ref={password}
            />
            <input
              type="password"
              placeholder="Password Again"
              className="registerInput"
              required
              ref={passwordAgain}
            />
            <button className="registerButton">Sign Up</button>

            <button className="registerRegisterButton">Log into Account</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
