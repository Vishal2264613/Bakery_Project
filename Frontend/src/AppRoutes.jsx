import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./pages/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

const AppRoutes = () => {
  const location = useLocation();

  // Show Navbar only on /home and /about
  const showNavbarRoutes = ["/home", "/about", "/shop", "/contact"];
  const showNavbar = showNavbarRoutes.includes(location.pathname);

  return (
    <>
      {showNavbar && <Navbar />}

      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Signup />} />
        <Route path="/shop" element={<Menu />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
