import { useLocation, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { hamburgerImg, bellImg, accountImg } from "../../utils";
import DropdownMenu from "../components/DropdownUser";
import React from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);
  const toggleDropdown = () => setIsOpen((prev) => !prev);

  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  return (
    <header className="relative z-10 w-full h-[50px] flex justify-center items-center px-2 mb-2 ">
      <nav className="flex justify-between items-center p-4 w-full h-[50px] mt-0 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
        <h1 className="text-3xl font-greatvibes font-bold">Hello</h1>
        <div className="flex">
          <img
            src={bellImg}
            alt="logo"
            className="w-[25px] h-[25px] cursor-pointer"
          />
          <div
            className="relative flex justify-end  items-center "
            ref={menuRef}
          >
            <div
              className="flex justify-end items-center w-auto ml-5"
              onClick={toggleDropdown}
            >
              <img
                src={accountImg}
                alt="account"
                width={18}
                height={18}
                className="cursor-pointer mr-2"
              />
              {isAuthenticated && (
                <h2 className="text-white text-sm">
                  {user.name.split(" ")[0].slice(0, 6)}
                </h2>
              )}
            </div>
            {isOpen && <DropdownMenu closeMenu={() => setIsOpen(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
