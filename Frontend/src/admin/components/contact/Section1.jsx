import React, { useState, useEffect } from "react";
import axios from "axios";

const Section1 = () => {
  const [sectionName] = useState("contactSection1");
  const [imageUrls, setImageUrls] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hero/${sectionName}`
        );
        setImageUrls(res.data.image_urls || []);
      } catch (err) {
        console.error("Error fetching image:", err);
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
    if (imageUrls.length === 0) {
      alert("Please upload an image.");
      return;
    }

    const payload = {
      image_urls: imageUrls,
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
      alert("Image updated!");
    } catch (err) {
      console.error("Error saving image:", err);
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
          {/* Upload Image */}
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

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={imageUrls.length === 0}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Save Image
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section1;
