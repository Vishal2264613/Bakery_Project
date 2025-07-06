import React, { useState, useEffect } from "react";
import axios from "axios";

const Section3 = () => {
  const [sectionName] = useState("homeSection3");
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [uploading, setUploading] = useState([false, false, false]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/api/hero/${sectionName}`
        );
        const hero = res.data;
        setImageUrls(hero.image_urls || ["", "", ""]);
      } catch (err) {
        console.error("Error fetching section data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionName]);

  const handleImageChange = (index, file) => {
    const newFiles = [...imageFiles];
    newFiles[index] = file;
    setImageFiles(newFiles);
  };

  const handleImageUpload = async (index) => {
    if (!imageFiles[index]) return;

    const newUploading = [...uploading];
    newUploading[index] = true;
    setUploading(newUploading);

    const formData = new FormData();
    formData.append("file", imageFiles[index]);
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
      const newUrls = [...imageUrls];
      newUrls[index] = data.secure_url;
      setImageUrls(newUrls);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      newUploading[index] = false;
      setUploading([...newUploading]);
    }
  };

  const handleSave = async () => {
    if (imageUrls.some((url) => !url)) {
      alert("Please upload all 3 images.");
      return;
    }

    const sectionData = {
      image_urls: imageUrls,
    };

    try {
      await axios.put(
        `http://localhost:3000/api/hero/${sectionName}`,
        sectionData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      alert("Section 3 images updated!");
    } catch (err) {
      console.error("Error updating section:", err);
    }
  };

  return (
    <section className="h-auto overflow-y-auto w-full border mt-6 py-6 px-6 rounded-lg border-gray-200 bg-transparent">
      <div className="w-full flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold capitalize">{sectionName} Editor</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {/* Image Uploads */}
          <div className="flex gap-8 flex-wrap">
            {[0, 1, 2].map((index) => (
              <div key={index} className="w-64">
                <label className="block text-sm mb-2 font-semibold">
                  Upload Image {index + 1}
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(index, e.target.files[0])}
                  className="text-sm"
                />
                {imageFiles[index] && (
                  <button
                    onClick={() => handleImageUpload(index)}
                    disabled={uploading[index]}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {uploading[index] ? "Uploading..." : "Upload Image"}
                  </button>
                )}
                {imageUrls[index] && (
                  <div className="mt-4">
                    <p className="text-xs mb-1 text-gray-600">Preview:</p>
                    <img
                      src={imageUrls[index]}
                      alt={`Section Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSave}
              disabled={imageUrls.some((url) => !url)}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
              Save Images
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default Section3;
