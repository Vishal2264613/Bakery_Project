import React, { useState } from "react";

// Import section editors
import MainSectionEditor from "../components/shop/MainSectionEditor";
import CategorySectionEditor from "../components/shop/CategorySectionEditor";
import ProductSectionEditor from "../components/shop/ProductSectionEditor";

const ShopElement = () => {
  const [activeSection, setActiveSection] = useState("main");

  const renderSection = () => {
    switch (activeSection) {
      case "main":
        return <MainSectionEditor />;
      case "category":
        return <CategorySectionEditor />;
      case "product":
        return <ProductSectionEditor />;
      default:
        return null;
    }
  };

  const buttonBaseStyle =
    "w-[200px] p-2 text-[14px] rounded-md border transition-all duration-200";

  return (
    <section className="">
      {/* Section Buttons */}
      <div className="w-full flex flex-wrap justify-between items-center gap-4">
        {[
          { key: "main", label: "Main Section" },
          { key: "category", label: "Category Section" },
          { key: "product", label: "Product Section" },
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

export default ShopElement;
