import React, { useState, useEffect } from "react";
import axios from "axios";

const timeOptions = [
  "08:00 - 15:00",
  "09:00 - 16:00",
  "10:00 - 19:00",
  "11:00 - 20:00",
  "Closed",
];

const Section2 = () => {
  const [sectionName] = useState("aboutSection2");
  const [heading, setHeading] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [openingHours, setOpeningHours] = useState({
    "Monday - Friday": "",
    "Saturday - Sunday": "",
  });
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hero/${sectionName}`
        );
        const data = res.data;
        setHeading(data.heading || "");
        setDescription(data.description || "");
        setImageUrls(data.image_urls || []);
        setOpeningHours(
          data.opening_hours || {
            "Monday - Friday": "",
            "Saturday - Sunday": "",
          }
        );
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [sectionName]);

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleImageUpload = async () => {
    if (!imageFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append("file", imageFile);
    formData.append("upload_preset", "bakery_cloudinary");
    formData.append("cloud_name", "dzbimrnem");

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzbimrnem/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrls([data.secure_url]);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!heading || imageUrls.length === 0) {
      alert("Please provide heading and upload image.");
      return;
    }

    const payload = {
      heading,
      description,
      image_urls: imageUrls,
      opening_hours: openingHours,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/hero/${sectionName}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Section updated!");
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  return (
    <section className="h-[70vh] overflow-y-auto w-full border mt-6 py-6 px-6 rounded-lg border-gray-200 bg-transparent">
      <div className="w-full flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold capitalize">{sectionName} Editor</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
        </div>
      ) : (
        <div className="space-y-6">
          <div>
            <label className="block text-sm mb-2 font-semibold">Heading</label>
            <input
              type="text"
              value={heading}
              onChange={(e) => setHeading(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
              placeholder="Enter heading"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-semibold">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
              placeholder="Enter description"
            />
          </div>

          <div>
            <label className="block text-sm mb-2 font-semibold">
              Opening Hours
            </label>
            <div className="space-y-4">
              {Object.entries(openingHours).map(([day, time]) => (
                <div key={day}>
                  <label className="block text-sm mb-1 font-medium">
                    {day}
                  </label>
                  <select
                    value={time}
                    onChange={(e) =>
                      setOpeningHours((prev) => ({
                        ...prev,
                        [day]: e.target.value,
                      }))
                    }
                    className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
                  >
                    <option value="">Select hours</option>
                    {timeOptions.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm mb-2 font-semibold">
              Upload Image
            </label>
            <input
              type="file"
              onChange={handleImageChange}
              className="text-sm"
            />
            {imageFile && (
              <button
                onClick={handleImageUpload}
                disabled={uploading}
                className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            )}
            {imageUrls.length > 0 && (
              <div className="mt-4">
                <p className="text-xs mb-1 text-gray-600">Preview:</p>
                <img
                  src={imageUrls[0]}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={!heading || imageUrls.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Save Changes
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section2;
