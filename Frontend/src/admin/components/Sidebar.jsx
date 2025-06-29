import React from "react";
import { Link, useLocation } from "react-router-dom";
import { logoImg, dashboardUserImg } from "../../utils";
import { dashboardList } from "../../constants";

const Sidebar = () => {
  const location = useLocation();

  return (
    <section className="flex justify-center items-center w-[10vw] h-screen">
      <div className="flex flex-col items-center p-4 w-full h-[95%] m-4 bg-black/70 border border-white/20 rounded-2xl">
        {/* Logo and User Image */}
        <div className="w-full flex flex-col justify-center items-center">
          <img
            src={logoImg}
            alt="logo"
            className="w-[30px] h-[30px] cursor-pointer mt-0 mb-6"
          />

          <img
            src={dashboardUserImg}
            alt="user"
            className="w-[50px] h-[50px] cursor-pointer rounded-full object-cover p-[1px] mb-5 bg-white"
          />
        </div>

        {/* Sidebar Navigation */}
        <div className="flex flex-col justify-center items-center w-full max-sm:hidden mb-4">
          {dashboardList.map((item) => {
            const path = `/admin/dashboard/${item.title}`;
            const isActive = location.pathname === path;

            return (
              <Link
                to={path}
                key={item.id || item.title}
                className={`mt-4 p-2 rounded cursor-pointer transition-all duration-500 ease-in-out  ${
                  isActive ? "bg-white/10" : "bg-transparent"
                }`}
              >
                <img
                  src={item.img}
                  alt={item.title}
                  className="w-[25px] h-[25px]"
                />
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Sidebar;
