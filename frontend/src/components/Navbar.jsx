import React from "react";
import { useContext } from "react";
import { Link, useNavigate } from "react-router";
import { authorisationContext } from "../context/AuthContext";

const Navbar = () => {
  const { logout, isAuthenticated } = useContext(authorisationContext);
    const navigate = useNavigate();
  return (
    <nav>
      {isAuthenticated ? (
        <button onClick={logout}>Logout</button>
      ) : (
        <>
          <Link to="/login">Login</Link>
          <Link to="/signup">Signup</Link>
        </>
      )}
    </nav>
  );
};

export default Navbar;