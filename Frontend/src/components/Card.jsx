import React from "react";
import { cake1Img } from "../utils";

const Card = ({ title, description, price, img }) => {
  return (
    <>
      <div className="h-[400px] w-[270px] p-2 bg-white/20 rounded-xl shadow-lg text-black overflow-hidden">
        <img src={img} className="w-full h-[70%] rounded-lg object-cover  cursor-pointer hover:scale-105 transition-all duration-500" />
        <h1 className="text-xl mt-2 truncate w-full ">{title}</h1>
        <h2 className="text-[12px] truncate w-48 font-extralight">{description}</h2>
        <div className="w-full  mt-2  flex  justify-between items-center">
          <p>$ {price}</p>
          <button className="rounded-md bg-black text-white py-2 px-4">
            Order now
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
