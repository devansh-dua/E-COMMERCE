import React from "react";
import { Route, Routes } from "react-router";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div>
      <Navbar />


      <Routes>
        {/* <Route path='/login' element={} /> */}
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
};

export default App;