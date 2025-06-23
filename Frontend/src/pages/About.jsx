import React from "react";
import { aboutUsImg, aboutUsImg2, aboutUsImg3 } from "../utils";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import Footer from "../components/Footer";

const About = () => {
  return (
    <>
      <section className="relative w-full h-[70vh]  overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img
            src={aboutUsImg}
            className="max-w-full h-full w-full object-cover object-center"
          />
          <h1 className="absolute z-20 font-greatvibes mb-20 tracking-wider leading-20 text-black font-bold text-center text-7xl">
            About Us
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 bg-opacity-10 z-10" />
        </div>
      </section>
      <section className="relative w-full h-[100vh] flex justify-center items-center  overflow-hidden">
        <div className="relative w-[80%] h-[80%] bg-yellow-50  flex">
          <div class="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-yellow-400 blur-sm shadow-[0_0_40px_20px_rgba(250,204,21,0.1)]"></div>
          <div className=" w-[50%] h-[100%] z-0 overflow-hidden">
            <img
              src={aboutUsImg2}
              className="max-w-full h-full w-full object-cover object-bottom"
            />
          </div>

          <div className="relative flex flex-col justify-evenly h-[100%] w-[50%] items-start text-black pl-8">
            <h1 className="text-6xl max-lg:text-4xl max-md:text-2xl font-bold ">
              Home Sweet
              <br /> Bakery
            </h1>
            <p className="max-md:text-[14px]">
              Crusty loaf ipsum dolor sit amet, oven-baked to golden perfection.
              Consectetur buttercream elit, sprinkled with love and sugar.
              Eclair do eiusmod tempor fill the shelves with sweet delight.
            </p>
            <p className="text-xl font-bold ">Opening Hours:</p>
            <div className="w-[60%] max-xl:w-[80%]">
              <div className="flex justify-between mb-2 max-lg:text-[12px]">
                <p>Monday - Friday</p>
                <p>09:00 - 16:00</p>
              </div>
              <div className="flex justify-between max-lg:text-[12px]">
                <p>Saturday - Sunday</p>
                <p>10:00 - 19:00</p>
              </div>
            </div>
            <div className="flex justify-start items-center ">
              <FaFacebookF className="w-[30px] h-[30px]  mr-2 max-md:mr-1 bg-black text-white p-1 rounded-full" />
              <FaTwitter className="w-[30px] h-[30px] mr-2 max-md:mr-1 bg-black text-white p-1 rounded-full" />
              <FaInstagram className="w-[30px] h-[30px] mr-2 max-md:mr-1 bg-black text-white p-1 rounded-full" />
              <FaWhatsapp className="w-[30px] h-[30px] mr-2 max-md:mr-1 bg-black text-white p-1 rounded-full" />
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full h-[60vh] mb-16 bg-yellow-50 flex justify-center items-center  ">
        <div class="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-yellow-400 blur-sm shadow-[0_0_40px_20px_rgba(250,204,21,0.1)]"></div>
        <div className="relative flex flex-col p-8 justify-evenly h-[100%] w-[50%] items-start text-black pl-8">
          <h1 className="text-5xl max-lg:text-4xl max-md:text-2xl font-bold ">
            Freshly Baked Bread
            <br /> Every Morning
          </h1>
          <p className="max-lg:text-[14px] max-md:text-[8px]">
            There’s nothing quite like the aroma of freshly baked bread filling
            the air. At our bakery, every loaf is hand-kneaded and made with
            care each morning to bring you warmth and flavor in every bite. From
            hearty multigrain to rustic sourdough, our selection offers
            something for every taste. Each crust is perfectly crisp, and every
            center is soft and satisfying. Experience the comfort and craft of
            real, artisanal bread—fresh from our oven to your table.
          </p>
          <button className="px-6 py-2 bg-orange-400 rounded-full">
            Visit Us
          </button>
        </div>
        <div className=" w-[50%] h-[100%] flex justify-end p-1 z-0 overflow-hidden">
          <img
            src={aboutUsImg3}
            className="max-w-full h-full w-full object-cover object-bottom"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default About;
