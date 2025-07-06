import React, { useState, useEffect } from "react";
import axios from "axios";

const ContactSection2 = () => {
  const [sectionName] = useState("contactSection2");
  const [contactInfo, setContactInfo] = useState([
    { label: "Phone", value: "" },
    { label: "Whatsapp", value: "" },
    { label: "Email", value: "" },
    { label: "Our Shop", value: "" },
  ]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hero/${sectionName}`
        );
        const data = res.data;

        if (Array.isArray(data.content)) {
          setContactInfo(data.content);
        }
      } catch (err) {
        console.error("Error fetching contact section:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sectionName]);

  const handleChange = (index, newValue) => {
    const updated = [...contactInfo];
    updated[index].value = newValue;
    setContactInfo(updated);
  };

  const handleSave = async () => {
    try {
      const payload = {
        sectionName,
        content: contactInfo,
      };

      await axios.put(
        `http://localhost:3000/api/hero/${sectionName}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Contact section updated!");
    } catch (err) {
      console.error("Error saving contact info:", err);
    }
  };

  return (
    <section className="h-[70vh] overflow-y-auto w-full border mt-6 py-6 px-6 rounded-lg border-gray-200 bg-transparent">
      <div className="w-full flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold capitalize">Contact Info Editor</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {contactInfo.map((item, index) => (
            <div key={index}>
              <label className="block text-sm mb-2 font-semibold">
                {item.label}
              </label>
              <input
                type="text"
                value={item.value}
                onChange={(e) => handleChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
                placeholder={`Enter ${item.label}`}
              />
            </div>
          ))}

          <div className="pt-4">
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContactSection2;
