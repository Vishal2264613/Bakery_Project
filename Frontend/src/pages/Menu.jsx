import { menuItemsTitles, cakesData } from "../constants";
import { menuMainImg } from "../utils";
import Card from "../components/Card";
import React, { useState, useRef, useEffect } from 'react';
import axios from "axios";
import Footer from "../components/Footer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Cakes");

  const handleClick = (item) => {
    setSelectedMenuItem(item);
  };

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/menu");
        setMenuItems(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching menu items:", error);
        setLoading(false);
      }
    };

    fetchMenuItems();
  }, []);

  if (loading) return <p>Loading menu...</p>;

  return (
    <>
      <section className="relative w-full h-[80vh]  overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img src={menuMainImg} className="max-w-full h-auto " />
          <h1 className="absolute z-20 font-greatvibes tracking-wider leading-20 text-gray-300 text-center text-7xl">
            Welcome to a world of
            <br /> irresistible flavors!
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />
        </div>
      </section>
      <section className="relative w-full h-[20vh] bg-yellow-50  overflow-hidden flex flex-col justify-center items-center">
        <div className="flex justify-between items-center w-[40vw] h-full ">
          {menuItemsTitles.map((item) => (
            <div
              className={`relative flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-300 p-2 hover:scale-110
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:duration-500
              ${selectedMenuItem === item.title ? "after:w-full" : "after:w-0"}
            `}
              onClick={() => handleClick(item.title)}
            >
              <img key={item} src={item.img} height={50} width={50} />
              <h2 className="text-sm font-normal">{item.title}</h2>
            </div>
          ))}
        </div>
        {/* <div class="h-[.4px] bg-gray-600 w-[70%]"></div> */}
      </section>
      <section className="relative w-full h-auto p-8 bg-white overflow-hidden ">
        <h2 className="w-full text-6xl mt-2 tracking-wider text-yellow-500 font-bold mb-4 font-greatvibes  flex justify-center items-center">
          {selectedMenuItem}
        </h2>
        <div className=" w-full  flex justify-center ">
          <div class="grid grid-cols-4 gap-20">
            {menuItems.map((item) =>
              item.category === selectedMenuItem ? (
                <Card
                  key={item._id}
                  id={item._id} 
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  img={item.image_url}
                />
              ) : null
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Menu;
