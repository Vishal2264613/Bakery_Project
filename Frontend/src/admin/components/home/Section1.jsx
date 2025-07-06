import React, { useState, useEffect } from "react";
import axios from "axios";

const Section1 = () => {
  const [sectionName] = useState("homeSection1");
  const [imageUrl, setImageUrl] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hero/${sectionName}`
        );
        const hero = res.data;
        setImageUrl(hero.image_urls?.[0] || "");
        console.log(imageUrl);
      } catch (err) {
        console.error("Error fetching hero data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeroData();
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

    try {
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzbimrnem/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await res.json();
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveHero = async () => {
    if (!imageUrl) {
      alert("Upload the image first.");
      return;
    }

    const heroData = {
      image_urls: [imageUrl], // ✅ correct
    };

    try {
      await axios.put(
        `http://localhost:3000/api/hero/${sectionName}`,
        heroData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Image saved successfully!");
    } catch (err) {
      console.error("Error saving hero image:", err);
    }
  };

  return (
    <section className="h-auto overflow-y-auto w-full border mt-6 py-6 px-6 rounded-lg border-gray-200 bg-transparent">
      <h1 className="text-xl font-bold mb-4 capitalize">
        {sectionName} - Editor
      </h1>

      {loading ? (
        <div className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-gray-800 border-solid" />
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Upload */}
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
            {imageUrl && (
              <div className="mt-4">
                <p className="text-xs mb-1 text-gray-600">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded border"
                />
              </div>
            )}
          </div>

          {/* Save Button */}
          <div>
            <button
              onClick={handleSaveHero}
              disabled={!imageUrl}
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
