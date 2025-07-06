import React, { useState, useEffect } from "react";
import axios from "axios";

const Section4 = () => {
  const baseSection = "homeSection4";

  const [headings, setHeadings] = useState(["", "", ""]);
  const [descriptions, setDescriptions] = useState(["", "", ""]);
  const [imageUrls, setImageUrls] = useState(["", "", ""]);
  const [imageFiles, setImageFiles] = useState([null, null, null]);
  const [uploadingIndex, setUploadingIndex] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllSections = async () => {
      try {
        const requests = [1, 2, 3].map((i) =>
          axios.get(`http://localhost:3000/api/hero/${baseSection}_${i}`)
        );
        const responses = await Promise.all(requests);

        const fetchedHeadings = responses.map((res) => res.data.heading || "");
        const fetchedDescriptions = responses.map(
          (res) => res.data.description || ""
        );
        const fetchedImages = responses.map(
          (res) => res.data.image_urls?.[0] || ""
        );

        setHeadings(fetchedHeadings);
        setDescriptions(fetchedDescriptions);
        setImageUrls(fetchedImages);
      } catch (err) {
        console.error("Error fetching section4 data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchAllSections();
  }, []);

  const handleImageChange = (e, index) => {
    const newFiles = [...imageFiles];
    newFiles[index] = e.target.files[0];
    setImageFiles(newFiles);
  };

  const handleImageUpload = async (index) => {
    const file = imageFiles[index];
    if (!file) return;

    setUploadingIndex(index);

    const formData = new FormData();
    formData.append("file", file);
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

      const updatedUrls = [...imageUrls];
      updatedUrls[index] = data.secure_url;
      setImageUrls(updatedUrls);
    } catch (err) {
      console.error("Image upload failed:", err);
    } finally {
      setUploadingIndex(null);
    }
  };

  const handleSaveSection = async () => {
    if (imageUrls.some((url) => !url)) {
      alert("Please upload all images.");
      return;
    }

    try {
      await Promise.all(
        [0, 1, 2].map((index) => {
          const payload = {
            sectionName: `${baseSection}_${index + 1}`,
            heading: headings[index],
            description: descriptions[index],
            image_urls: [imageUrls[index]],
          };

          return axios.put(
            `http://localhost:3000/api/hero/${payload.sectionName}`,
            payload,
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        })
      );
      alert("All section cards updated successfully!");
    } catch (err) {
      console.error("Error saving section cards:", err);
    }
  };

  return (
    <section className="h-[70vh] overflow-y-auto w-full border mt-6 py-6 px-6 rounded-lg border-gray-200 bg-transparent">
      <div className="w-full flex justify-between items-start mb-6">
        <h1 className="text-xl font-bold capitalize">{baseSection} Editor</h1>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-auto">
          <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded-md space-y-4"
            >
              {/* Heading */}
              <div>
                <label className="block text-sm mb-2 font-semibold">
                  Heading {index + 1}
                </label>
                <input
                  type="text"
                  value={headings[index]}
                  onChange={(e) => {
                    const updated = [...headings];
                    updated[index] = e.target.value;
                    setHeadings(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
                  placeholder={`Enter heading ${index + 1}`}
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm mb-2 font-semibold">
                  Description {index + 1}
                </label>
                <textarea
                  value={descriptions[index]}
                  onChange={(e) => {
                    const updated = [...descriptions];
                    updated[index] = e.target.value;
                    setDescriptions(updated);
                  }}
                  className="w-full p-2 border border-gray-300 rounded-md text-sm bg-transparent"
                  rows={2}
                  placeholder={`Enter description ${index + 1}`}
                />
              </div>

              {/* Upload Image */}
              <div>
                <label className="block text-sm mb-2 font-semibold">
                  Upload Image {index + 1}
                </label>
                <input
                  type="file"
                  onChange={(e) => handleImageChange(e, index)}
                  className="text-sm"
                />
                {imageFiles[index] && (
                  <button
                    onClick={() => handleImageUpload(index)}
                    disabled={uploadingIndex === index}
                    className="mt-2 px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 disabled:opacity-50"
                  >
                    {uploadingIndex === index ? "Uploading..." : "Upload Image"}
                  </button>
                )}
                {imageUrls[index] && (
                  <div className="mt-4">
                    <p className="text-xs mb-1 text-gray-600">Preview:</p>
                    <img
                      src={imageUrls[index]}
                      alt={`Image ${index + 1}`}
                      className="w-32 h-32 object-cover rounded border"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Save Button */}
          <div className="pt-4">
            <button
              onClick={handleSaveSection}
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

export default Section4;
