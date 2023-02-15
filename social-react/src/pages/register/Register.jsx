import React from "react";
import "./register.css";

const Register = () => {
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
          <div className="registerBox">
            <input
              type="text"
              placeholder="User name"
              className="registerInput"
            />
            <input type="email" placeholder="Email" className="registerInput" />
            <input
              type="password"
              placeholder="Password"
              className="registerInput"
            />
            <input
              type="password"
              placeholder="Password Again"
              className="registerInput"
            />
            <button className="registerButton">Sign Up</button>

            <button className="registerRegisterButton">Log into Account</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
