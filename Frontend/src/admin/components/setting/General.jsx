import React, { useState } from "react";
import { accountImg } from "../../../utils";

const General = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);

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
      setProfileImage(data.secure_url);
      setImageFile(null); // clear the file input
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteImage = () => {
    setProfileImage(null);
    setImageFile(null);
  };

  return (
    <section className="h-[70vh] w-full mt-2 py-1 px-6 text-white overflow-y-auto">
      {/* Profile Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <img
            src={profileImage || accountImg}
            alt="user"
            className="w-[80px] h-[80px] cursor-pointer rounded-full object-cover"
          />
        </div>
        <div className="flex gap-2">
          {profileImage && (
            <button
              onClick={handleDeleteImage}
              className="text-sm text-red-400 border border-red-400 px-4 py-1 rounded hover:bg-red-400 hover:text-white transition"
            >
              🗑 Delete
            </button>
          )}

          {!profileImage && (
            <>
              <label className="text-sm border px-4 py-1 rounded hover:bg-white hover:text-black transition cursor-pointer">
                ⬆️ Upload
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>

              {imageFile && (
                <button
                  onClick={handleImageUpload}
                  disabled={uploading}
                  className="text-sm border px-4 py-1 rounded hover:bg-white hover:text-black transition"
                >
                  {uploading ? "Uploading..." : "Upload Image"}
                </button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Info Rows */}
      <div className="space-y-6">
        <InfoRow title="Name" items={["Alex Jackson"]} showEdit />
        <InfoRow
          title="Contacts"
          items={["Phone: +123123217923", "Email: finalui@yandex.com"]}
          showEdit
        />
        <InfoRow
          title="Social media"
          items={["linkedin.com/company/finalui", "dribbble.com/final-ui"]}
          showEdit
        />
        <InfoRow
          title="Language & currency"
          items={["English, USD"]}
          showEdit
        />
        <InfoRow
          title="Theme"
          items={[
            <span key="theme" className="text-white">
              <select className="bg-transparent border rounded px-2 py-1 text-white">
                <option className="text-black">Light mode</option>
                <option className="text-black">Dark mode</option>
              </select>
            </span>,
          ]}
        />
        <InfoRow
          title="Integration"
          items={[
            <>
              Google • examplemail@gmail.com{" "}
              <span className="ml-2 text-green-400 border border-green-400 rounded-full px-2 py-0.5 text-sm">
                ✓ Connected
              </span>
            </>,
          ]}
        />
      </div>
    </section>
  );
};

const InfoRow = ({ title, items, showEdit }) => (
  <div className="flex justify-between items-start border-b border-white/20 pb-4">
    <div>
      <h3 className="font-semibold mb-1">{title}</h3>
      <div className="text-sm space-y-1">
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </div>
    </div>
    {showEdit && (
      <button className="text-sm border px-3 py-1 rounded hover:bg-white hover:text-black transition">
        Edit
      </button>
    )}
  </div>
);

export default General;
