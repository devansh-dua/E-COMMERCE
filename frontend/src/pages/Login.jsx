import React from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { useContext } from "react";
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { authenticate } = useAuth();

  const [user, setUser] = useState({
    password: "",
    username: "",
  });

  function onChangeHandler(key, ev) {
    setUser((prevUser) => {
      let newUser = { ...prevUser };
      newUser[key] = ev.target.value;
      return newUser;
    });
  }

  async function loginHandler() {
    try {
      let { data } = await api.post("/users/login", user);
      console.log(data);
      authenticate(data.token, data.user);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Login</h2>

        <input
          className="login-input"
          onChange={(ev) => onChangeHandler("username", ev)}
          type="text"
          placeholder="Enter username"
        />

        <input
          className="login-input"
          onChange={(ev) => onChangeHandler("password", ev)}
          type="password"
          placeholder="Enter password"
        />

        <button className="login-btn" onClick={loginHandler}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;