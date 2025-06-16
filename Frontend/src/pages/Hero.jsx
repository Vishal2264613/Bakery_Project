import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaWhatsapp } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import {
  heroImg,
  recipe1,
  recipe2,
  s3_1,
  s3_2,
  s3_3,
  s5Img,
  s6_Img1,
  s6_Img2,
  s6_Img3,
  s6_Img4,
  s6_Img5,
  s6_Img6,
  cookieImg,
  donutImg,
  croissantImg,
  s4Img,
} from "../utils";

const Hero = () => {
  useGSAP(() => {
    gsap.fromTo(
      "#mainTextLeft",
      { x: -400, opacity: 0, scale: 2 },
      { x: 0, opacity: 1, scale: 1, duration: 3, ease: "power3.out" }
    );
    gsap.fromTo(
      "#mainTextRight",
      { x: 500, opacity: 0, scale: 2 },
      { x: 0, opacity: 1, scale: 1, duration: 3, ease: "power3.out" }
    );
  });
  return (
    <>
      <section className="relative w-full h-screen bg-black overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-screen">
          <img src={heroImg} className="max-w-full h-auto" />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

        {/* Optional Content Over the Overlay */}
        <div className="relative z-20 flex w-full h-full">
          <div className=" w-1/3 h-full bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg flex justify-center items-center">
            <p
              id="mainTextLeft"
              class="text-[150px] pl-60 w-full h-full font-extrabold text-transparent bg-clip-text bg-[url('/assets/images/mainSection.jpg')]  bg-cover absolute z-10 flex items-center justify-end"
            >
              MA
            </p>
          </div>

          <div className="h-full flex flex-col items-start justify-center text-center ">
            <p id="mainTextRight" className="text-[150px] ml-1 font-extrabold">
              BAKER
            </p>
          </div>
        </div>
      </section>
      <section className="relative w-full h-auto bg-white overflow-hidden">
        <div className="flex justify-center items-center">
          <div className="flex flex-col text-black p-20">
            <h3 className="text-xl md:text-3xl font-bold mb-6">
              The recipe to happiness
            </h3>

            <p className="text-lg md:text-lg text-gray-500 max-w-2xl mb-4">
              Freshly baked with love, every treat tells a story.
              <br />
              Simple ingredients, unforgettable taste.
            </p>

            <p className="text-base md:text-lg text-gray-500  max-w-2xl">
              From gooey cookies to fluffy cakes,
              <br />
              we craft each recipe with care.
              <br />
              Because joy is best served warm,
              <br />
              and sweet moments start here.
            </p>
            <div className="w-full max-w-2xl text-left">
              <button className="bg-black text-white mt-5 px-6 py-3 text-sm font-semibold rounded hover:bg-gray-800 transition">
                Check Out
              </button>
            </div>
          </div>
          <div className="flex">
            <img
              src={recipe1}
              className="h-[320px] w-[240px] mr-2 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
            <img
              src={recipe2}
              className="h-[320px] w-[240px] mr-2 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full h-[100vh] pt-4 pb-4 bg-white overflow-hidden">
        <div className="flex justify-evenly">
          <img
            src={s3_1}
            className="h-[90vh] w-[32%]  rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <img
            src={s3_2}
            className="h-[90vh] w-[32%]  rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <img
            src={s3_3}
            className="h-[90vh] w-[32%]  rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
        </div>
      </section>
      <section className="relative w-full h-auto pt-4 pb-4 bg-white overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <div className="flex justify-between items-center w-[60%] pb-[50px] relative">
            <img src={cookieImg} className="h-[210px] w-[450px] pe-[50px] " />
            <div className="text-black w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl ps-2 absolute z-0">
                Freshly
              </h3>
              <h2 className="text-4xl ps-2 relative z-10 mt-10">
                Special Cookies
              </h2>
              <p className="font-thin text-sm p-2 relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.{" "}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
          </div>
          <div className="flex justify-center items-center w-[60%] pb-[50px] relative">
            <div className="text-black flex flex-col  items-end  w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl ps-2 absolute z-0">
                Delicious
              </h3>
              <h2 className="text-4xl ps-2 relative z-10 mt-10">
                A Family Tradition
              </h2>
              <p className="font-thin text-sm p-2 relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.{" "}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
            <img src={donutImg} className="h-[300px] w-[450px] ps-[50px] " />
          </div>
          <div className="flex justify-between items-center w-[60%] relative">
            <img
              src={croissantImg}
              className="h-[250px] w-[450px] pe-[50px] "
            />
            <div className="text-black w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl ps-2 absolute z-0">
                Special
              </h3>
              <h2 className="text-4xl ps-2 relative z-10 mt-10">
                Baked With Love
              </h2>
              <p className="font-thin text-sm p-2 relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.{" "}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full h-[50vh] pt-4 pb-4 bg-black overflow-hidden ">
        <div className="absolute flex items-center justify-center w-full h-2/6 ">
          <img src={s4Img} className="max-w-full h-auto " />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />
        <div className="absolute flex flex-col items-center justify-center w-full h-[50vh] z-20">
          <h2 className="text-6xl tracking-widest font-greatvibes">
            Delicious Alternatives
          </h2>
          <p className="font-thin text-sm p-2 w-[30%] text-center">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam.{" "}
          </p>
          <button className="border border-white bg-transparent text-white mt-2 px-2 py-1 rounded">
            READ MORE
          </button>
        </div>
      </section>
      <section className="relative w-full h-[60vh] bg-white overflow-hidden">
        <div className="flex justify-center items-center h-full">
          <div className="flex justify-between items-center w-[60%] relative">
            <img src={s5Img} className="h-[320px] w-[400px] pe-[50px] " />
            <div className="text-black w-[60%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl ps-2 absolute z-0">
                For You
              </h3>
              <h2 className="text-4xl ps-2 relative z-10 mt-10">
                The Recipe To Happiness
              </h2>
              <p className="font-thin text-sm p-2 text-gray-600 relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
                enim ad minim veniam.{" "}
              </p>
              <p className="font-thin text-sm p-2 text-gray-600 relative z-10">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
                eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
              </p>
              <div class="flex">
                <input
                  type="text"
                  placeholder="Enter your email"
                  class="border border-black bg-white text-black w-full mt-4 px-2 py-2 rounded-l-md focus:outline-none"
                />
                <button class="bg-black text-white px-6 py-2 mt-4 rounded-r-md hover:bg-gray-800">
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
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

export default Hero;
