import React from "react";
import { useNavigate } from "react-router";
import api from "../api";
import { useContext } from "react";
import { authorisationContext } from "../context/AuthContext";
import { useState } from "react";

const Login = () => {
  const navigate = useNavigate();
  const {authenticate} = useContext(authorisationContext);
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
    <div>
      <input
        onChange={(ev) => onChangeHandler("username", ev)}
        type="text"
        placeholder="Enter username"
      />

      <input
        onChange={(ev) => onChangeHandler("password", ev)}
        type="text"
        placeholder="Enter password"
      />

      <button onClick={loginHandler}>Login</button>
    </div>
  );
};

export default Login;