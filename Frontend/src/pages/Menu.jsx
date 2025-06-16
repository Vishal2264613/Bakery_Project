import React from "react";
import { menuItems, cakesData } from "../constants";
import { menuMainImg } from "../utils";
import Card from "../components/Card";

const Menu = () => {
  return (
    <>
      <section className="relative w-full h-[70vh]  overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img src={menuMainImg} className="max-w-full h-auto " />
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />
        </div>
      </section>
      <section className="relative w-full h-[20vh] bg-yellow-50  overflow-hidden flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-[40vw] h-full ">
          {menuItems.map((item) => (
            <div className="flex flex-col items-center justify-center text-black cursor-pointer hover:scale-150 transition-all duration-500">
              <img key={item} src={item.img} height={50} width={50} />
              <h2 className="text-sm font-normal">{item.title}</h2>
            </div>
          ))}
        </div>
        {/* <div class="h-[.4px] bg-gray-600 w-[70%]"></div> */}
      </section>
      <section className="relative w-full h-auto p-8 bg-white overflow-hidden ">
        <h2 className="w-full text-6xl mt-2 tracking-wider text-yellow-500 font-bold mb-4 font-greatvibes  flex justify-center items-center">
          Cake
        </h2>
        <div className=" w-full  flex justify-center ">
          <div class="grid grid-cols-4 gap-20">
            {cakesData.map((cake) => (
              <Card
                key={cake.id}
                title={cake.title}
                description={cake.description}
                price={cake.price}
                img={cake.img}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Menu;
