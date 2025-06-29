import { menuItemsTitles, cakesData } from "../constants";
import { menuMainImg } from "../utils";
import Card from "../components/Card";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Footer from "../components/Footer";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMenuItem, setSelectedMenuItem] = useState("Cakes");
  const [categories, setCategories] = useState([]);

  const handleClick = (item) => {
    setSelectedMenuItem(item);
  };
  const fetchCategories = async () => {
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/api/categories");
      if (!res.ok) {
        throw new Error(`Error ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();
      setCategories(data.categories || data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    } finally {
      setLoading(false);
    }
  };
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

  useEffect(() => {
    fetchCategories();
    fetchMenuItems();
  }, []);

  const filteredItems = menuItems.filter(
    (item) => item.category === selectedMenuItem
  );

  if (loading) return <p>Loading menu...</p>;

  return (
    <>
      <section className="relative w-full h-[80vh]  overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img
            src={menuMainImg}
            className="max-w-full h-full w-full object-cover object-bottom"
          />
          <h1 className="absolute z-20 font-greatvibes tracking-wider leading-20 text-gray-300 text-center text-7xl max-md:text-5xl">
            Welcome to a world of
            <br /> irresistible flavors!
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-60 z-10" />
        </div>
      </section>
      <section className="relative w-full h-[20vh] bg-yellow-50  overflow-hidden flex flex-col justify-evenly items-center">
        <div className="flex justify-evenly items-center w-[80%] max-md:w-full h-full ">
          {categories.map((item) => (
            <div
              className={`relative flex flex-col items-center justify-center text-black cursor-pointer transition-all duration-300 p-2 hover:scale-110
              after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-black after:transition-all after:duration-500
              ${selectedMenuItem === item.name ? "after:w-full" : "after:w-0"}
            `}
              onClick={() => handleClick(item.name)}
            >
              <img
                src={item.imageUrl}
                alt={item.name}
                className="w-12 h-12 object-contain mx-auto rounded"
              />
              <h2 className="text-sm font-normal">{item.name}</h2>
            </div>
          ))}
        </div>
        {/* <div class="h-[.4px] bg-gray-600 w-[70%]"></div> */}
      </section>
      <section className="relative w-full h-auto p-8 bg-white overflow-hidden ">
        <h2 className="w-full text-6xl mt-2 tracking-wider text-yellow-500 font-bold mb-4 font-greatvibes  flex justify-evenly items-center">
          {selectedMenuItem}
        </h2>
        <div className=" w-full flex justify-evenly ">
          <div className="grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 max-md:grid-cols-1 gap-20">
            {filteredItems.length === 0 ? (
              <p className="text-gray-500 text-lg col-span-full">
                There are no items yet in this category!
              </p>
            ) : (
              filteredItems.map((item) => (
                <Card
                  key={item._id}
                  id={item._id}
                  title={item.name}
                  description={item.description}
                  price={item.price}
                  img={item.image_url}
                />
              ))
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Menu;
