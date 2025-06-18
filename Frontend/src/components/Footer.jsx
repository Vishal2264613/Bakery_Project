import React from "react";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { s6_Img1, s6_Img2, s6_Img3, s6_Img4, s6_Img5, s6_Img6 } from "../utils";

const Footer = () => {
  return (
    <>
      <section className="relative w-full h-[60vh] bg-gray-950 flex justify-around items-center overflow-hidden">
        <div className=" flex flex-col justify-evenly items-start h-[80%] w-[23%] ">
          <h2 className="text-6xl font-greatvibes ">MABaker</h2>
          <p className="font-thin text-sm  text-gray-600 leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.{" "}
          </p>
          <div className="flex items-center ">
            <h2 className="mr-6">Follow Us </h2>
            <FaFacebookF className="w-[20px] h-[20px] mr-2" />
            <FaTwitter className="w-[20px] h-[20px] mr-2" />
            <FaInstagram className="w-[20px] h-[20px] mr-2" />
            <FaWhatsapp className="w-[20px] h-[20px] mr-2" />
          </div>
        </div>
        <div className=" flex flex-col justify-evenly items-start h-[80%] w-[23%] ">
          <h2 className="text-3xl mb-6 tracking-wide">Latest Tweets</h2>
          <div className="flex">
            <FaTwitter className="w-[50px] mr-2 mt-2" />
            <p className="font-thin text-sm mb-2 text-gray-600 leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
          <div className="flex">
            <FaTwitter className="w-[50px] mr-2 mt-2" />
            <p className="font-thin text-sm  text-gray-600 leading-loose">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          </div>
        </div>
        <div className=" flex flex-col justify-evenly items-start h-[80%] w-[23%] ">
          <h2 className="text-3xl mb-6 tracking-wide">Instagram Feed</h2>
          <div class="grid grid-cols-3 gap-4">
            <img src={s6_Img1} alt="Picture 1" class="w-full" />
            <img src={s6_Img2} alt="Picture 2" class="w-full" />
            <img src={s6_Img3} alt="Picture 3" class="w-full" />
            <img src={s6_Img4} alt="Picture 4" class="w-full" />
            <img src={s6_Img5} alt="Picture 5" class="w-full" />
            <img src={s6_Img6} alt="Picture 6" class="w-full" />
          </div>
        </div>
        <div className=" flex flex-col justify-evenly items-start h-[80%] w-[23%] ">
          <h2 className="text-3xl mb-6 tracking-wide">Join The Club</h2>
          <div class="flex">
            <input
              type="text"
              placeholder="Enter your email"
              class="border border-black bg-white text-black w-full mt-4 px-2 py-2 rounded-l-md focus:outline-none"
            />
            <button class="bg-yellow-500 text-white px-6 py-2 mt-4 rounded-r-md hover:bg-gray-800">
              Join
            </button>
          </div>
          <p className="font-thin text-sm mb-2 text-gray-600 leading-loose">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut.{" "}
          </p>
          <div class="h-[0.1px] bg-gray-600 w-full"></div>
          <p>Contact Us : +91 999 888 0000</p>
        </div>
      </section>
    </>
  );
};

export default Footer;
