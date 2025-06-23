import React from "react";
import { Link } from "react-router-dom";
import { bagImg, accountImg } from "../utils";
import { navLists } from "../constants";

const MobileDropdown = ({ isAuthenticated, user, goToCart, closeMenu }) => {
  return (
    <div className="sm:hidden bg-black/90 w-full py-4 px-6 mt-2 rounded-md z-40">
      <div className="flex flex-col gap-4">
        {navLists.map((nav) => {
          const path =
            nav.toLowerCase() === "home" ? "/" : `/${nav.toLowerCase()}`;
          return (
            <Link
              key={nav}
              to={path}
              className="text-white text-sm hover:text-gray-300"
              onClick={closeMenu}
            >
              {nav}
            </Link>
          );
        })}
        <div
          onClick={() => {
            goToCart();
            closeMenu();
          }}
          className="flex items-center gap-2 cursor-pointer"
        >
          <img src={bagImg} alt="bag" width={18} height={18} />
          <span className="text-white text-sm">Cart</span>
        </div>
        <div className="flex items-center gap-2">
          <img src={accountImg} alt="account" width={18} height={18} />
          {isAuthenticated ? (
            <span className="text-white text-sm">
              Hi, {user.name.split(" ")[0].slice(0, 6)}
            </span>
          ) : (
            <Link
              to="/login"
              className="text-white text-sm hover:text-gray-300"
              onClick={closeMenu}
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
