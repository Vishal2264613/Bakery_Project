import React, { useState } from "react";
import General from "../components/setting/General";
import Notification from "../components/setting/Notification";
import LoginSecurity from "../components/setting/LoginSecurity";
const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");

  const renderSection = () => {
    switch (activeTab) {
      case "general":
        return <General />;
      case "notification":
        return <Notification />;
      case "security":
        return <LoginSecurity />;
      default:
        return null;
    }
  };

  const buttonBaseStyle =
    "w-full p-3 text-[14px] rounded-md border transition-all duration-200";

  return (
    <section className="w-full h-full">
      {/* Header */}
      <div className="w-full h-[5%] flex justify-between items-center px-1 p-0">
        <h1 className="text-xl font-poppins font-bold">Settings</h1>
      </div>

      {/* Horizontal Divider */}
      <div className="border-t border-gray-300 my-3" />

      {/* Layout */}
      <div className="flex justify-between w-full h-[70vh]">
        {/* Sidebar */}
        <div className="w-[25%] h-full  ">
          <div className="flex flex-col items-start gap-3 p-2">
            {[
              { key: "general", label: "General" },
              { key: "notification", label: "Notification" },
              { key: "security", label: "Login & Security" },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`${buttonBaseStyle} ${
                  activeTab === key
                    ? "bg-black/30 text-white border-white"
                    : "bg-transparent text-white border-white"
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Vertical Divider */}
        <div className="w-px h-full bg-gray-300 " />

        {/* Right Section */}
        <div className="w-[70%] h-full ">{renderSection()}</div>
      </div>
    </section>
  );
};

export default Settings;
