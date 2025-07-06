import React, { useState } from "react";
import Section1 from "../components/home/section1";
import Section2 from "../components/home/section2";
import Section3 from "../components/home/section3";
import Section4 from "../components/home/section4";
import Section5 from "../components/home/section5";
import Section6 from "../components/home/section6";

const HomeElement = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const renderSection = () => {
    switch (activeSection) {
      case "section1":
        return <Section1 />;
      case "section2":
        return <Section2 />;
      case "section3":
        return <Section3 />;
      case "section4":
        return <Section4 />;
      case "section5":
        return <Section5 />;
      case "section6":
        return <Section6 />;
      default:
        return null;
    }
  };

  const buttonBaseStyle =
    "w-[150px] p-2 text-[14px] rounded-md border transition-all duration-200";

  return (
    <section className="">
      {/* Section Buttons */}
      <div className="w-full flex flex-wrap justify-between items-center gap-4">
        {[
          { key: "section1", label: "Section 1" },
          { key: "section2", label: "Section 2" },
          { key: "section3", label: "Section 3" },
          { key: "section4", label: "Section 4" },
          { key: "section5", label: "Section 5" },
          { key: "section6", label: "Section 6" },
        ].map(({ key, label }) => (
          <button
            key={key}
            onClick={() => setActiveSection(key)}
            className={`${buttonBaseStyle} ${
              activeSection === key
                ? "bg-black/30 text-white border-white"
                : "bg-transparent text-white border-white"
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Render Selected Section */}
      {renderSection()}
    </section>
  );
};
export default HomeElement;
