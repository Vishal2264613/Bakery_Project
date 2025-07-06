import React, { useState } from "react";
import Section1 from "../components/contact/Section1";
import Section2 from "../components/contact/Section2";

const ContactElement = () => {
  const [activeSection, setActiveSection] = useState("section1");

  const renderSection = () => {
    switch (activeSection) {
      case "section1":
        return <Section1 />;
      case "section2":
        return <Section2 />;
      default:
        return null;
    }
  };

  const buttonBaseStyle =
    "w-[150px] p-2 text-[14px] rounded-md border transition-all duration-200";

  return (
    <section className="">
      {/* Section Buttons */}
      <div className="w-full flex flex-wrap justify-around items-center gap-4">
        {[
          { key: "section1", label: "Contact Section 1" },
          { key: "section2", label: "Contact Section 2" },
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

export default ContactElement;
