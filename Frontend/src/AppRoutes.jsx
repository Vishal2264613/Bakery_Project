import React from "react";
import { Routes, Route, useLocation, matchPath } from "react-router-dom";
import Home from "./pages/Hero";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Menu from "./pages/Menu";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import ProductDetail from "./pages/ProductDetail";

const AppRoutes = () => {
  const location = useLocation();

  const alwaysBlackBgRoutes = [
    "/cart",
    "/checkout",
    "/about",
    "/contact",
    "/product/:id",
  ];
  const showNavbarRoutes = [
    "/",
    "/about",
    "/shop",
    "/contact",
    "/cart",
    "/checkout",
    "/product/:id",
  ];

  const matchRoutes = (routes) =>
    routes.some((route) =>
      matchPath({ path: route, end: true }, location.pathname)
    );

  const showNavbar = matchRoutes(showNavbarRoutes);
  const alwaysBlackBg = matchRoutes(alwaysBlackBgRoutes);

  return (
    <>
      {showNavbar && <Navbar alwaysBlackBg={alwaysBlackBg} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/shop" element={<Menu />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
