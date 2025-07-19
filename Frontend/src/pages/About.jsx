import React, { useEffect, useState } from "react";
import {
  FaTwitter,
  FaInstagram,
  FaWhatsapp,
  FaFacebookF,
} from "react-icons/fa";
import axios from "axios";
import Footer from "../components/Footer";

const About = () => {
  const [sections, setSections] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAboutData = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/hero");
      const data = res.data;

      const aboutSections = {
        aboutSection1: data.find(
          (item) => item.sectionName === "aboutSection1"
        ),
        aboutSection2: data.find(
          (item) => item.sectionName === "aboutSection2"
        ),
        aboutSection3: data.find(
          (item) => item.sectionName === "aboutSection3"
        ),
      };

      setSections(aboutSections);
    } catch (err) {
      console.error("Error fetching about sections:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAboutData();
  }, []);

  if (loading)
    return <p className="text-center mt-10">Loading About Page...</p>;

  return (
    <>
      {/* Section 1 - Hero */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full">
          <img
            src={sections.aboutSection1?.image_urls?.[0]}
            className="max-w-full h-full w-full object-cover object-center"
            alt="About Hero"
          />
          <h1 className="absolute z-20 font-greatvibes mb-20 tracking-wider leading-20 text-black font-bold text-center text-7xl">
            About Us
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 bg-opacity-10 z-10" />
        </div>
      </section>

      {/* Section 2 - Intro + Opening Hours */}
      <section className="relative w-full h-[100vh] flex justify-center items-center overflow-hidden">
        <div className="relative w-[80%] h-[80%] bg-yellow-50 flex">
          <div className="absolute -top-8 -right-8 w-24 h-24 rounded-full bg-yellow-400 blur-sm shadow-[0_0_40px_20px_rgba(250,204,21,0.1)]" />
          <div className="w-[50%] h-full z-0 overflow-hidden">
            <img
              src={sections.aboutSection2?.image_urls?.[0]}
              className="max-w-full h-full w-full object-cover object-bottom"
              alt="About Section 2"
            />
          </div>
          <div className="relative flex flex-col justify-evenly h-full w-[50%] items-start text-black pl-8">
            <h1 className="text-6xl max-lg:text-4xl max-md:text-2xl font-bold ">
              {sections.aboutSection2?.heading}
            </h1>
            <p className="max-md:text-[14px]">
              {sections.aboutSection2?.description}
            </p>
            <p className="text-xl font-bold ">Opening Hours:</p>
            <div className="w-[60%] max-xl:w-[80%]">
              <div className="flex justify-between mb-2 max-lg:text-[12px]">
                <p>Monday - Friday</p>
                <p>
                  {sections.aboutSection2?.opening_hours?.["Monday - Friday"]}
                </p>
              </div>
              <div className="flex justify-between max-lg:text-[12px]">
                <p>Saturday - Sunday</p>
                <p>
                  {sections.aboutSection2?.opening_hours?.["Saturday - Sunday"]}
                </p>
              </div>
            </div>
            <div className="flex justify-start items-center">
              <FaFacebookF className="w-[30px] h-[30px] mr-2 bg-black text-white p-1 rounded-full" />
              <FaTwitter className="w-[30px] h-[30px] mr-2 bg-black text-white p-1 rounded-full" />
              <FaInstagram className="w-[30px] h-[30px] mr-2 bg-black text-white p-1 rounded-full" />
              <FaWhatsapp className="w-[30px] h-[30px] mr-2 bg-black text-white p-1 rounded-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 3 - Bread Story */}
      <section className="relative w-full h-[60vh] mb-16 bg-yellow-50 flex justify-center items-center">
        <div className="absolute -top-8 -left-8 w-24 h-24 rounded-full bg-yellow-400 blur-sm shadow-[0_0_40px_20px_rgba(250,204,21,0.1)]" />
        <div className="relative flex flex-col p-8 justify-evenly h-full w-[50%] items-start text-black pl-8">
          <h1 className="text-5xl max-lg:text-4xl max-md:text-2xl font-bold">
            {sections.aboutSection3?.heading}
          </h1>
          <p className="max-lg:text-[14px] max-md:text-[8px]">
            {sections.aboutSection3?.description}
          </p>
          <button className="px-6 py-2 bg-orange-400 rounded-full">
            Visit Us
          </button>
        </div>
        <div className="w-[50%] h-full flex justify-end p-1 z-0 overflow-hidden">
          <img
            src={sections.aboutSection3?.image_urls?.[0]}
            className="max-w-full h-full w-full object-cover object-bottom"
            alt="About Section 3"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default About;
