import React from "react";
import { useState } from "react";
import { createContext } from "react";
import { useNavigate } from "react-router";

const authorisationContext = createContext({
  isAuthenticated: "",
  authenticate: function () {},
  token: null,
  user: null,
  logout: function () {}, // These are mentioned here so that when i use this context
  // mere pass autoComplete mei options visible rahein
});

const AuthContext = ({ children }) => {
  const navigate = useNavigate();
  /*
    isAuthenticated: boolean
    authenticate: function to login user and store user and token in localStorage
    token: get token
    user: get user details
    logout: Logout user and clear localStorage token and user data
    */

  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  function authenticate(token, user = null) {
    localStorage.setItem("token", token); // backend se aaega yeh
    localStorage.setItem("user", user); // backend se aaega user
    setToken(token);

    setUser(user);

    if (!token) {
      return navigate("/login", {
        replace: true,
      });
    }

    navigate("/dashboard", {
      replace: true,
    });
  }

  function logout() {
    localStorage.setItem("token", "");
    localStorage.setItem("user", "");

    setToken(null);
    setUser(null);

    navigate("/login", {
      replace: true,
    });
  }

  return (
    <authorisationContext.Provider
      value={{
        authenticate,
        isAuthenticated: Boolean(localStorage.getItem("user", user)),
        user,
        token,
        logout,
      }}
    >
      {children}
    </authorisationContext.Provider>
  );
};

export default AuthContext;
export { authorisationContext };