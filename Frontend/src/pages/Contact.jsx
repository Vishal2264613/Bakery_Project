import React from "react";
import { aboutUsImg } from "../utils";
import { FaPhoneAlt, FaWhatsapp } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";
import { MdOutlineMail } from "react-icons/md";
import Footer from "../components/Footer";
import Map from "../components/Map";

const Contact = () => {
  return (
    <>
      <section className="relative w-full h-[70vh]  overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img src={aboutUsImg} className="max-w-full h-auto " />
          <h1 className="absolute z-20 font-greatvibes mb-20 tracking-wider leading-20 text-black font-bold text-center text-7xl">
            Contact Us
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 bg-opacity-10 z-10" />
        </div>
      </section>
      <section className="relative flex  w-full h-[100vh]  overflow-hidden">
        <div className="flex w-[50%] flex-col justify-center items-center  p-10">
          <div className="grid grid-cols-2 gap-10 mb-10">
            <div className="flex flex-col justify-center items-center text-black w-[200px] h-[200px] rounded-lg bg-yellow-50">
              <FaPhoneAlt className="w-[40px] h-[40px] m-2" />
              <h1 className="font-bold m-2">Phone</h1>
              <p>999-888-0000</p>
            </div>
            <div className="flex flex-col justify-center items-center text-black w-[200px] h-[200px] rounded-lg bg-yellow-50">
              <FaWhatsapp className="w-[40px] h-[40px] m-2" />
              <h1 className="font-bold m-2">Whatsapp</h1>
              <p>999-888-0000</p>
            </div>
            <div className="flex flex-col justify-center items-center text-black w-[200px] h-[200px] rounded-lg bg-yellow-50">
              <MdOutlineMail className="w-[40px] h-[40px] m-2" />
              <h1 className="font-bold m-2">Email</h1>
              <p>maBaker@gmail.com</p>
            </div>
            <div className="flex flex-col justify-center items-center text-black w-[200px] h-[200px] rounded-lg bg-yellow-50">
              <FaShop className="w-[40px] h-[40px] m-2" />
              <h1 className="font-bold m-2">Our Shop</h1>
              <p>2443 Oak Ridge </p>
            </div>
          </div>
          <Map />
        </div>
        <div className="flex w-[50%] flex-col text-black justify-evenly items-start  p-10 ">
          <h1 className="text-5xl font-bold">Get in touch</h1>
          <p>
            Get in touch with us for sweet solutions and custom creations.
            <br />
            Our team is here to make every bite unforgettable.
          </p>
          <div class="w-[80%] ">
            <label for="name" class="block text-gray-700 mb-1">
              Name
            </label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              class="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div class="w-[80%]  ">
            <label for="name" class="block text-gray-700 mb-1">
              Email
            </label>
            <input
              type="text"
              id="email"
              placeholder="Your email"
              class="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div class="w-[80%] ">
            <label for="name" class="block text-gray-700 mb-1">
              Subject
            </label>
            <input
              type="text"
              id="subject"
              placeholder="Your subject"
              class="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div class="w-[80%] ">
            <label for="name" class="block text-gray-700 mb-1">
              Message
            </label>
            <textarea
              id="message"
              placeholder="Your message"
              rows="6"
              class="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
            ></textarea>
          </div>
          <button className="w-[80%] py-3 text-white bg-orange-400 rounded-full">
            Send Now
          </button>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Contact;
