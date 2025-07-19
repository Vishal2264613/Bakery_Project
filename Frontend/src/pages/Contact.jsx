import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as MdIcons from "react-icons/md";
import * as Fa6Icons from "react-icons/fa6";
import Footer from "../components/Footer";
import Map from "../components/Map";
import axios from "axios";

const Contact = () => {
  const [contactImage, setContactImage] = useState("");
  const [contactContent, setContactContent] = useState([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/hero");
        const data = res.data;

        const section1 = data.find(
          (section) => section.sectionName === "contactSection1"
        );
        const section2 = data.find(
          (section) => section.sectionName === "contactSection2"
        );

        if (section1?.image_urls?.[0]) {
          setContactImage(section1.image_urls[0]);
        }

        if (section2?.content) {
          setContactContent(section2.content);
        }
      } catch (err) {
        console.error("Error fetching contact data:", err);
      }
    };

    fetchData();
  }, []);

  const getIconComponent = (iconName) => {
    const allIcons = {
      ...FaIcons,
      ...MdIcons,
      ...Fa6Icons,
    };

    const capitalized = iconName.charAt(0).toUpperCase() + iconName.slice(1);
    const possiblePrefixes = ["Fa", "Md", "Fa6"];

    for (const prefix of possiblePrefixes) {
      const iconKey = `${prefix}${capitalized}`;
      if (allIcons[iconKey]) {
        const Icon = allIcons[iconKey];
        return <Icon className="w-[40px] h-[40px] m-2" />;
      }
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:3000/api/mails", {
        name,
        email,
        subject,
        message,
      });

      if (response.status === 201) {
        alert("Message sent successfully!");
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <>
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full">
          <img
            src={contactImage}
            alt="contact hero"
            className="max-w-full h-full w-full object-cover object-center"
          />
          <h1 className="absolute z-20 font-greatvibes mb-20 tracking-wider leading-20 text-black font-bold text-center text-7xl">
            Contact Us
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-yellow-400 bg-opacity-10 z-10" />
        </div>
      </section>

      <section className="relative flex max-md:flex-col w-full h-auto overflow-hidden">
        <div className="flex w-[50%] max-md:w-full flex-col justify-center items-center p-10">
          <div className="grid grid-cols-2 gap-10 mb-10">
            {contactContent.map((item) => (
              <div
                key={item._id}
                className="flex flex-col justify-center items-center text-black w-[200px] h-[200px] max-lg:w-[150px] max-lg:h-[150px] rounded-lg bg-yellow-50"
              >
                {getIconComponent(item.icon)}
                <h1 className="font-bold m-2">{item.label}</h1>
                <p>{item.value}</p>
              </div>
            ))}
          </div>
          <Map />
        </div>

        <div className="flex w-[50%] max-md:w-full flex-col text-black justify-evenly items-start p-10">
          <h1 className="text-5xl font-bold">Get in touch</h1>
          <p>
            Get in touch with us for sweet solutions and custom creations.
            <br />
            Our team is here to make every bite unforgettable.
          </p>

          <form onSubmit={handleSubmit} className="w-full flex flex-col">
            <div className="w-[80%]">
              <label htmlFor="name" className="block text-gray-700 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="w-[80%]">
              <label htmlFor="email" className="block text-gray-700 mb-1">
                Email
              </label>
              <input
                type="text"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="w-[80%]">
              <label htmlFor="subject" className="block text-gray-700 mb-1">
                Subject
              </label>
              <input
                type="text"
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="Your subject"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              />
            </div>
            <div className="w-[80%]">
              <label htmlFor="message" className="block text-gray-700 mb-1">
                Message
              </label>
              <textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your message"
                rows="6"
                className="w-full bg-white border border-gray-300 text-gray-900 rounded px-4 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-yellow-400"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-[80%] py-3 text-white bg-orange-400 rounded-full mt-4"
            >
              Send Now
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Contact;
