import React from "react";
import { cake1Img } from "../utils";
import { useSelector } from 'react-redux';
import axios from "axios";

const Card = ({ id, title, description, price, img }) => {
  const token = useSelector((state) => state.auth.token);
  const handleOrderNow = async () => {
    if (!token) {
      alert("Please log in first.");
      return;
    }

    const product = {
      productId: id,
      productName: title,
      quantity: 1,
      price,
      image: img
    };

    try {
      console.log(product);
      const response = await axios.post(
        'http://localhost:3000/api/cart',
        { product },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      alert("Item added to cart!");
      console.log(response.data);
    } catch (error) {
      console.error("Add to cart error:", error.response || error.message);
      alert(error.response?.data?.message || "Failed to add to cart");
    }
  };

  return (
    <>
      <div className="h-[400px] w-[270px] p-2 bg-white/20 rounded-xl shadow-lg text-black overflow-hidden">
        <img src={img} className="w-full h-[70%] rounded-lg object-cover  cursor-pointer hover:scale-105 transition-all duration-500" />
        <h1 className="text-xl mt-2 truncate w-full ">{title}</h1>
        <h2 className="text-[12px] truncate w-48 font-extralight">{description}</h2>
        <div className="w-full  mt-2  flex  justify-between items-center">
          <p>$ {price}</p>
          <button onClick={handleOrderNow} className="rounded-md bg-black text-white py-2 px-4">
            Order now
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
