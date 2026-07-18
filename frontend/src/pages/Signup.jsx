import React from "react";
import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router";
import "./Signup.css";

const Signup = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: "",
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

  async function signupHandler() {
    try {
      let { data } = await api.post("/users/signup", user);

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Create Account</h2>

        <input
          className="signup-input"
          onChange={(ev) => onChangeHandler("username", ev)}
          type="text"
          placeholder="Enter username"
        />

        <input
          className="signup-input"
          onChange={(ev) => onChangeHandler("email", ev)}
          type="email"
          placeholder="Enter email"
        />

        <input
          className="signup-input"
          onChange={(ev) => onChangeHandler("password", ev)}
          type="password"
          placeholder="Enter password"
        />

        <button className="signup-btn" onClick={signupHandler}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default Signup;