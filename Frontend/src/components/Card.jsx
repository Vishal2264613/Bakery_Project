import React from "react";
import { cake1Img } from "../utils";

const Card = ({ title, description, price, img }) => {
  return (
    <>
      <div className="h-[350px] w-[250px] p-2 bg-white/20 rounded-xl shadow-lg text-black">
        <img src={img} className="w-full h-[70%] rounded-lg" />
        <h1 className="text-xl mt-2 ">{title}</h1>
        <h2 className="text-[12px]    font-extralight">{description}</h2>
        <div className="w-full  mt-2  flex  justify-between items-center">
          <p>Rs. {price}</p>
          <button className="rounded-md bg-black text-white py-2 px-4">
            Order now
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
