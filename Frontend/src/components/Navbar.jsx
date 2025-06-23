import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate, matchPath, Link } from "react-router-dom";
import { logoImg, bagImg, accountImg } from "../utils";
import { navLists } from "../constants";
import DropdownMenu from "../components/DropdownUser";
import MobileDropdown from "../components/MobileDropdown";
import { useSelector } from "react-redux";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);

  const [scrolled, setScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const alwaysBlackBgRoutes = [
    "/cart",
    "/checkout",
    "/about",
    "/contact",
    "/product/:id",
  ];

  const alwaysBlackBg = alwaysBlackBgRoutes.some((route) =>
    matchPath({ path: route, end: true }, location.pathname)
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const goToCart = () => navigate("/cart");

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (alwaysBlackBg) return;
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight / 2);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [alwaysBlackBg]);

  const bgClass = alwaysBlackBg
    ? "bg-black/90"
    : scrolled
    ? "bg-black/80"
    : "bg-transparent";

  const linkTextClass =
    alwaysBlackBg || scrolled
      ? "text-white hover:text-gray-300"
      : "text-gray-300 hover:text-white";

  return (
    <header
      className={`w-full py-5 sm:px-10 px-5 flex flex-col fixed transition-all duration-500 ease-in-out z-50 ${bgClass}`}
    >
      <nav className="flex justify-between items-center w-full screen-max-width">
        {/* Logo */}
        <div className="w-[100px] flex justify-end max-sm:justify-start">
          <img src={logoImg} alt="logo" className="w-[30px] h-[30px]" />
        </div>

        {/* Nav links (hidden on small screens) */}
        <div className="flex justify-center max-sm:hidden">
          {navLists.map((nav) => {
            const path =
              nav.toLowerCase() === "home" ? "/" : `/${nav.toLowerCase()}`;
            return (
              <div
                key={nav}
                className={`px-5 text-sm cursor-pointer transition-all ${linkTextClass}`}
              >
                <Link to={path}>{nav}</Link>
              </div>
            );
          })}
        </div>

        {/* Bag + Account (hidden on small screens) */}
        <div
          className={`flex justify-center items-center gap-7 max-sm:hidden cursor-pointer ${linkTextClass}`}
        >
          <img
            src={bagImg}
            alt="bag"
            onClick={goToCart}
            width={18}
            height={18}
          />
          <div className="relative" ref={menuRef}>
            <div
              className="flex items-center w-[100px]"
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
                  Hi, {user.name.split(" ")[0].slice(0, 6)}
                </h2>
              )}
            </div>
            {isOpen && <DropdownMenu closeMenu={() => setIsOpen(false)} />}
          </div>
        </div>

        {/* Hamburger menu (visible on small screens) */}
        <div className="sm:hidden flex items-center">
          <button onClick={() => setMobileMenuOpen((prev) => !prev)}>
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile dropdown component */}
      {mobileMenuOpen && (
        <MobileDropdown
          isAuthenticated={isAuthenticated}
          user={user}
          goToCart={goToCart}
          closeMenu={() => setMobileMenuOpen(false)}
        />
      )}
    </header>
  );
};

export default Navbar;
