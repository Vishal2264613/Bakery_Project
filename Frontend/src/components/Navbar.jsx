import React, { useState, useRef, useEffect } from 'react';
import { logoImg, bagImg, accountImg } from "../utils";
import { navLists } from "../constants";
import DropdownMenu from '../components/DropdownUser';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const toggleDropdown = () => setIsOpen(prev => !prev);

  const goToCart = () => {
    
    navigate('/cart');
  };


  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight/2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`w-full py-5 sm:px-10 px-5 flex justify-between items-center fixed transition-all duration-500 ease-in-out z-50 ${
        scrolled ? "bg-black/80" : "bg-transparent"
      }`}
    >
      <nav className="flex w-full screen-max-width ">
        <img src={logoImg} alt="logo" className="w-[30px] h-[30px]" />

        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray-300 hover:text-white transition-all"
            >
              <a href={`/${nav.toLowerCase()}`}>{nav}</a>
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1 cursor-pointer">
          <img src={bagImg} alt="bag"   onClick={goToCart}  width={18} height={18} />
          <div className="relative" ref={menuRef}>
            <div className="flex items-center w-[100px] " onClick={toggleDropdown}>
              <img
                src={accountImg}
                alt="account"
                width={18}
                height={18}
              
                className="cursor-pointer mr-2"
              />
              {isAuthenticated && <h2 className="text-white text-sm">Hi, {user.name.split(" ")[0].slice(0, 6)}</h2>}
            </div>
            {isOpen && <DropdownMenu closeMenu={() => setIsOpen(false)} />}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
