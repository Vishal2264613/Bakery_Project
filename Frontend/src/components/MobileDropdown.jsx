import React from "react";
import { navLists } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../redux/auth/authSlice";
import { bagImg, accountImg } from "../utils";

const MobileDropdown = ({ isAuthenticated, user, goToCart, closeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    closeMenu();
    navigate("/");
  };

  return (
    <div className="sm:hidden absolute top-[60px] left-0 w-full bg-black/95 px-5 py-6 z-40 rounded-b-2xl shadow-lg">
      <div className="flex flex-col  gap-5 text-white text-sm">
        {navLists.map((nav) => {
          const path =
            nav.toLowerCase() === "home" ? "/" : `/${nav.toLowerCase()}`;
          return (
            <Link
              key={nav}
              to={path}
              onClick={closeMenu}
              className="hover:text-gray-300"
            >
              {nav}
            </Link>
          );
        })}

        {/* Bag icon */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:text-gray-300"
          onClick={() => {
            goToCart();
            closeMenu();
          }}
        >
          <img src={bagImg} alt="Cart" width={18} height={18} />
          <span>Cart</span>
        </div>

        {/* Account section */}
        <div className="border-t border-gray-600 pt-4">
          {isAuthenticated ? (
            <>
              <div className="flex items-center gap-2 mb-3">
                <img src={accountImg} alt="account" width={18} height={18} />
                <span>Hi, {user.name.split(" ")[0].slice(0, 6)}</span>
              </div>
              <Link
                to="/account-settings"
                onClick={closeMenu}
                className="block hover:text-gray-300 mb-2"
              >
                Account Settings
              </Link>
              <button
                onClick={handleLogout}
                className="text-left text-white hover:text-red-400"
              >
                Log Out
              </button>
            </>
          ) : (
            <Link
              to="/login"
              onClick={closeMenu}
              className="hover:text-gray-300"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileDropdown;
