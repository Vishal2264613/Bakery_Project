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
import Dashboard from "./admin/pages/Dashboard";
import Users from "./admin/pages/Users"; // Admin Users page
import Orders from "./admin/pages/Orders"; // Admin Orders page
import Settings from "./admin/pages/Settings"; // Admin Settings page
import PrivateRoute from "./components/PrivateRoute";

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

        {/* Admin Dashboard Route */}
        <Route
          path="/admin/dashboard/*"
          element={
            <PrivateRoute requiredRole="admin">
              <Dashboard />
            </PrivateRoute>
          }
        >
          {/* Nested Routes for Admin Dashboard */}
          <Route path="users" element={<Users />} />
          <Route path="orders" element={<Orders />} />
          <Route path="settings" element={<Settings />} />
        </Route>

        {/* Other Routes */}
        {/* <Route path="*" element={<NotFound />} /> */}
      </Routes>
    </>
  );
};

export default AppRoutes;
