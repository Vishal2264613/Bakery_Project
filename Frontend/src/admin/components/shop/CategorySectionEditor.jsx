import React, { useEffect, useState } from "react";
import { editImg, deleteImg } from "../../../utils";

const CategorySectionEditor = () => {
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState("active");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data.categories || data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Error fetching categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleUpload = async () => {
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
      setImageUrl(data.secure_url);
    } catch (err) {
      console.error("Upload failed:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleSaveCategory = async () => {
    const category = {
      name: categoryName,
      slug: categoryName.toLowerCase().replace(/\s+/g, "-"),
      imageUrl,
      status,
    };

    try {
      const url = editMode
        ? `http://localhost:3000/api/categories/${selectedCategoryId}`
        : "http://localhost:3000/api/categories/add";
      const method = editMode ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(category),
      });

      const data = await res.json();
      console.log("Saved:", data);

      setCategoryName("");
      setImageFile(null);
      setImageUrl("");
      setStatus("active");
      setSelectedCategoryId(null);
      setEditMode(false);
      setShowModal(false);
      fetchCategories();
    } catch (err) {
      console.error("Error saving category:", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await fetch(`http://localhost:3000/api/categories/${id}`, {
        method: "DELETE",
      });
      fetchCategories();
    } catch (err) {
      console.error("Error deleting category:", err);
    }
  };

  const handleEdit = (cat) => {
    setEditMode(true);
    setSelectedCategoryId(cat._id);
    setCategoryName(cat.name);
    setImageUrl(cat.imageUrl);
    setStatus(cat.status || "active");
    setShowModal(true);
  };

  return (
    <>
      <section className="min-h-[70vh] w-full border mt-6 py-2 px-6 rounded-lg border-gray-200">
        <div className="w-full flex justify-between items-start py-2">
          <h1 className="text-xl font-poppins font-bold">Categories</h1>
          <button
            onClick={() => {
              setShowModal(true);
              setEditMode(false);
              setCategoryName("");
              setImageFile(null);
              setImageUrl("");
              setStatus("active");
            }}
            className="bg-transparent border border-white p-2 text-sm rounded-md"
          >
            Add Category
          </button>
        </div>

        <div>
          <table className="w-full border-separate border-spacing-y-6">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th>Image</th>
                <th>Created At</th>
                <th>Status</th>
                <th align="right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" align="center">
                    Loading...
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" align="center">
                    {error}
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan="6" align="center">
                    No categories found.
                  </td>
                </tr>
              ) : (
                categories.map((cat) => (
                  <tr key={cat._id}>
                    <td>{cat.name}</td>
                    <td align="center">
                      <img
                        src={cat.imageUrl}
                        alt={cat.name}
                        className="w-12 h-12 object-contain mx-auto rounded"
                      />
                    </td>
                    <td align="center">
                      {new Date(cat.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td align="center">
                      <div
                        className={`border-[.1px] py-1 px-2 font-bold rounded 
                          ${
                            cat.status === "active"
                              ? "text-green-400 border-green-400"
                              : "text-red-400 border-red-400"
                          }`}
                      >
                        {cat.status}
                      </div>
                    </td>
                    <td align="right">
                      <div className="flex justify-end">
                        <img
                          src={editImg}
                          alt="edit"
                          className="w-[20px] h-[20px] cursor-pointer"
                          onClick={() => handleEdit(cat)}
                        />
                        <img
                          src={deleteImg}
                          alt="delete"
                          className="w-[20px] h-[20px] ml-2 cursor-pointer"
                          onClick={() => handleDelete(cat._id)}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex justify-center items-center">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 text-black relative">
            <h2 className="text-xl font-semibold mb-4">
              {editMode ? "Edit Category" : "Add New Category"}
            </h2>

            <label className="block mb-2 font-medium">Category Name:</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2 font-medium">Status:</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>

            <label className="block mb-2 font-medium">Upload SVG/Image:</label>
            <input
              type="file"
              accept="image/*,.svg"
              onChange={handleFileChange}
              className="w-full mb-4"
            />

            {imageFile && (
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
              >
                {uploading ? "Uploading..." : "Upload Image"}
              </button>
            )}

            {imageUrl && (
              <div className="mt-4">
                <p className="text-sm">Preview:</p>
                <img
                  src={imageUrl}
                  alt="Uploaded"
                  className="mt-2 w-24 h-24 object-contain border"
                />
              </div>
            )}

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveCategory}
                disabled={!categoryName || !imageUrl}
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {editMode ? "Update" : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CategorySectionEditor;
