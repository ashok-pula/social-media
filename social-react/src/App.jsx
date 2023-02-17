import React, { useContext } from "react";
import Home from "./pages/Home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/register/Register";

import {
  BrowserRouter,
  Route,
  Routes,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import { AuthContext } from "./context/AuthContext";
const App = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // console.log(user);
  useEffect(() => {
    //   if (!user) navigate("/login");
    // }, [user])
  });
  return (
    <>
      <Routes>
        <Route exact path="/" element={user ? <Home /> : <Login />} />
        <Route path="/login" element={user ? <Navigate to="/" /> : <Login />} />
        <Route
          path="/register"
          element={user ? <Navigate to="/" /> : <Register />}
        />
        <Route
          path="/profile/:username"
          element={user ? <Profile /> : <Login />}
        />
      </Routes>
    </>
  );
};

export default App;
