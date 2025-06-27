import { logoImg, dashboardUserImg } from "../../utils";
import React from "react";
import { dashboardMainList, dashboardComponentsList } from "../../constants";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <>
      <section className=" flex justify-center items-center w-[20%] h-screen">
        <div className="flex flex-col  items-center p-4 w-full  h-[95%] m-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
          <div className="w-full flex flex-col justify-center items-center">
            <img
              src={logoImg}
              alt="logo"
              className="w-[30px] h-[30px] cursor-pointer mt-0 mb-6"
            />

            <img
              src={dashboardUserImg}
              alt="logo"
              className="w-[100px] h-[100px] cursor-pointer rounded-full object-cover p-1 mb-5 bg-white"
            />
          </div>

          <div className="flex flex-col justify-start items-start w-full  max-sm:hidden mb-4">
            <h1 className="mb-2 text-sm ">MAIN</h1>
            {dashboardMainList.map((item) => {
              const path = `/admin/dashboard/${item.title.toLowerCase()}`;
              return (
                <h2
                  key={item.title}
                  className="mb-6 font-bold text-lg tracking-wide cursor-pointer"
                >
                  {" "}
                  <Link to={path}>{item.title}</Link>
                </h2>
              );
            })}
          </div>

          <div className="flex flex-col justify-start items-start w-full  max-sm:hidden">
            <h1 className="mb-2 text-sm ">COMPONENTS</h1>

            {dashboardComponentsList.map((item) => {
              const path = `/admin/dashboard/${item.title.toLowerCase()}`;
              return (
                <h2
                  key={item.title}
                  className="mb-6 font-bold text-lg tracking-wide cursor-pointer"
                >
                  {" "}
                  <Link to={path}>{item.title}</Link>
                </h2>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

export default Sidebar;
