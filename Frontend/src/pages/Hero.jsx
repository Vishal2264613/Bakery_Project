import React from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import axios from "axios";

const Hero = () => {
  const user = useSelector((state) => state.auth.user);
  const isAuthenticated = Boolean(user);
  const navigate = useNavigate();
  const [heroSection, setHeroSection] = useState(null);
  const [section2, setSection2] = useState(null);
  const [section3, setSection3] = useState(null);
  const [loading, setLoading] = useState(true);
  const [section4_1, setSection4_1] = useState(null);
  const [section4_2, setSection4_2] = useState(null);
  const [section4_3, setSection4_3] = useState(null);
  const [section5, setSection5] = useState(null);
  const [section6, setSection6] = useState(null);

  const fetchHeroData = async () => {
    try {
      const [res1, res2, res3, res4, res5, res6, res7, res8] =
        await Promise.all([
          axios.get("http://localhost:3000/api/hero/homeSection1"),
          axios.get("http://localhost:3000/api/hero/homeSection2"),
          axios.get("http://localhost:3000/api/hero/homeSection3"),
          axios.get("http://localhost:3000/api/hero/homeSection4_1"),
          axios.get("http://localhost:3000/api/hero/homeSection4_2"),
          axios.get("http://localhost:3000/api/hero/homeSection4_3"),
          axios.get("http://localhost:3000/api/hero/homeSection5"),
          axios.get("http://localhost:3000/api/hero/homeSection6"),
        ]);

      setHeroSection(res1.data);
      setSection2(res2.data);
      setSection3(res3.data);
      setSection4_1(res4.data);
      setSection4_2(res5.data);
      setSection4_3(res6.data);
      setSection5(res7.data);
      setSection6(res8.data);
    } catch (error) {
      console.error("Error fetching home sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin/dashboard", { replace: true });
      } else {
        navigate("/", { replace: true });
      }
    }
    fetchHeroData();
  }, []);
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
          <img
            src={heroSection?.image_urls[0]}
            className="max-w-full h-full w-full object-cover object-center"
          />
        </div>

        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />

        {/* Optional Content Over the Overlay */}
        <div className="relative z-20 flex w-full h-full">
          <div className=" w-1/3 h-full bg-white/5 backdrop-blur-lg border border-white/10 p-6 shadow-lg flex justify-center items-center">
            <p
              id="mainTextLeft"
              class="lg:text-[150px] md:text-[100px] max-sm:text-[50px] md:pl-60 sm:pl-40 w-full h-full font-extrabold text-transparent bg-clip-text bg-[url('/assets/images/mainSection.jpg')]  bg-cover absolute z-10 flex items-center justify-end"
            >
              MA
            </p>
          </div>

          <div className="h-full flex flex-col items-start justify-center text-center ">
            <p
              id="mainTextRight"
              className="lg:text-[150px] md:text-[100px] max-sm:text-[50px]  ml-1 font-extrabold"
            >
              BAKER
            </p>
          </div>
        </div>
      </section>
      <section className="relative w-full h-auto bg-white overflow-hidden">
        <div className="flex max-sm:flex-col justify-evenly p-1 pt-20 pb-20 items-center">
          <div className="flex flex-col max-sm:text-center text-black ">
            <h3 className="text-xl lg:text-3xl font-bold mb-6">
              {section2?.heading}
            </h3>

            <p className="text-sm lg:text-lg w-[60%] text-gray-500 max-w-2xl mb-4">
              {section2?.description}
            </p>

            <div className="w-full flex max-sm:justify-center max-sm:items-center max-w-2xl text-left">
              <button className="bg-black mb-2 text-white mt-5 px-6 py-3 text-sm font-semibold rounded hover:bg-gray-800 transition">
                Check Out
              </button>
            </div>
          </div>
          <div className="flex ">
            <img
              src={section2?.image_urls[0]}
              className="h-[320px] w-[240px] max-sm:w-[180px] max-sm:h-[220px] mr-2 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
            <img
              src={section2?.image_urls[1]}
              className="h-[320px] w-[240px] max-sm:w-[180px] max-sm:h-[220px] mr-2 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300"
            />
          </div>
        </div>
      </section>
      <section className="relative w-full h-auto pt-4 pb-4 bg-white overflow-hidden">
        <div className="flex max-sm:flex-col max-sm:p-2 justify-evenly">
          <img
            src={section3?.image_urls[0]}
            className="h-[90vh]   w-[32%] max-sm:w-[100%] p-1 object-cover   rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <img
            src={section3?.image_urls[1]}
            className="h-[90vh] w-[32%]  max-sm:w-[100%] p-1 object-cover  rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
          <img
            src={section3?.image_urls[2]}
            className="h-[90vh] w-[32%]  max-sm:w-[100%]  p-1  object-cover  rounded-md shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />
        </div>
      </section>
      <section className="relative w-full h-auto pt-4 pb-4 bg-white overflow-hidden">
        <div className="flex flex-col justify-center items-center">
          <div className="flex  justify-evenly items-center w-full p-[50px] relative">
            <div className="">
              <img
                src={section4_1?.image_urls[0]}
                className="h-[210px] w-[450px] max-sm:w-[240px] max-sm:h-[100px] pe-[50px] "
              />
            </div>
            <div className="text-black  w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl max-sm:text-5xl ps-2 absolute z-0">
                Freshly
              </h3>
              <h2 className="text-4xl max-sm:text-2xl ps-2 relative z-10 mt-10">
                {section4_1?.heading}
              </h2>
              <p className="font-thin text-sm max-sm:text-xs p-2 relative z-10">
                {section4_1?.description}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
          </div>
          <div className="flex   justify-evenly items-center w-full p-[50px] relative">
            <div className="text-black flex flex-col  items-end  w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl max-sm:text-5xl ps-2 absolute z-0">
                Delicious
              </h3>
              <h2 className="text-4xl max-sm:text-2xl ps-2 relative z-10 mt-10">
                {section4_2?.heading}
              </h2>
              <p className="font-thin text-right text-sm max-sm:text-xs p-2 relative z-10">
                {section4_1?.description}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
            <div>
              <img
                src={section4_2?.image_urls[0]}
                className="h-[300px] w-[450px] max-sm:w-[240px] max-sm:h-[100px] ps-[50px] "
              />
            </div>
          </div>
          <div className="flex justify-evenly items-center w-full p-[50px] relative">
            <div>
              <img
                src={section4_3?.image_urls[0]}
                className="h-[250px] w-[450px] max-sm:w-[240px] max-sm:h-[100px] pe-[50px] "
              />
            </div>
            <div className="text-black w-[50%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl max-sm:text-5xl ps-2 absolute z-0">
                Special
              </h3>
              <h2 className="text-4xl max-sm:text-2xl ps-2 relative z-10 mt-10">
                {section4_3?.heading}
              </h2>
              <p className="font-thin text-sm max-sm:text-xs p-2 relative z-10">
                {section4_2?.description}
              </p>
              <button className="border border-black bg-white text-black ml-2 px-2 py-1 rounded">
                READ MORE
              </button>
            </div>
          </div>
        </div>
      </section>
      <section className="relative w-full h-[50vh] bg-black overflow-hidden ">
        <div className="absolute flex items-center justify-center w-full h-full ">
          <img
            src={section5?.image_urls[0]}
            className="max-w-full h-full w-full object-cover object-bottom"
          />
        </div>
        <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />
        <div className="absolute flex flex-col items-center justify-center w-full h-[50vh] z-20">
          <h2 className="text-6xl max-sm:text-4xl tracking-widest font-greatvibes">
            {section5?.heading}
          </h2>
          <p className="font-thin text-sm p-2 w-[30%] max-sm:text-xs max-lg:w-[70%] text-center">
            {section5?.description}
          </p>
          <button className="border border-white bg-transparent text-white mt-2 px-2 py-1 rounded">
            READ MORE
          </button>
        </div>
      </section>
      <section className="relative w-full h-[60vh] bg-white overflow-hidden">
        <div className="flex justify-evenly items-center h-full">
          <div className="flex justify-evenly items-center relative">
            <div>
              <img
                src={section6?.image_urls[0]}
                className="h-[320px] w-[400px] pe-[50px] max-lg:w-[280px] max-lg:h-[200px]  max-md:w-[200px] max-md:h-[120px] "
              />
            </div>
            <div className="text-black w-[40%]">
              <h3 className="font-greatvibes text-yellow-500 text-6xl max-lg:text-4xl ps-2 absolute z-0">
                For You
              </h3>
              <h2 className="text-4xl max-lg:text-xl ps-2 relative z-10 mt-10">
                {section6?.heading}
              </h2>
              <p className="font-thin text-sm max-lg:text-xs p-2 text-gray-600 relative z-10">
                {section6?.description}
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
      <Footer />
    </>
  );
};

export default Hero;
