import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

const App = () => {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/logout" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;