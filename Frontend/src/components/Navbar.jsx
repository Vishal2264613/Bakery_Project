import { logoImg, bagImg, searchImg, accountImg } from "../utils";
import { navLists } from "../constants";
import { useState, useEffect } from "react";
import { RiAccountCircleLine } from "react-icons/ri";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight);
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
        <img src={logoImg} alt="logo" width={30} height={30} />
        <div className="flex flex-1 justify-center max-sm:hidden">
          {navLists.map((nav) => (
            <div
              key={nav}
              className="px-5 text-sm cursor-pointer text-gray hover:text-white transition-all"
            >
              <a href={`/${nav.toLowerCase()}`}>{nav}</a>
            </div>
          ))}
        </div>

        <div className="flex items-baseline gap-7 max-sm:justify-end max-sm:flex-1">
          <img
            src={bagImg}
            alt="bag"
            width={18}
            height={18}
            className="cursor-pointer"
          />
          <img
            src={accountImg}
            alt="account"
            width={18}
            height={18}
            className="cursor-pointer"
          />
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
