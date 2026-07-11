import React from "react";
import { useState } from "react";
import api from "../api";
import { Navigate, useNavigate } from "react-router";

const Signup = () => {
  // const [email,setEmail] = useState("");
  // const [password,setPassword] = useState("");
  // const [username,setUsername] = useState("");
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
    <div>
      <input
        onChange={(ev) => onChangeHandler("username", ev)}
        type="text"
        placeholder="Enter username"
      />
      <input
        onChange={(ev) => onChangeHandler("email", ev)}
        type="text"
        placeholder="Enter email"
      />
      <input
        onChange={(ev) => onChangeHandler("password", ev)}
        type="text"
        placeholder="Enter password"
      />

      <button onClick={signupHandler}>Signup</button>
    </div>
  );
};

export default Signup;