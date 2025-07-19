import React, { useEffect, useState } from "react";
import { editImg, deleteImg } from "../../../utils";
import axios from "axios";

const ProductSectionEditor = () => {
  const [showModal, setShowModal] = useState(false);
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [available, setAvailable] = useState(true);
  const [categories, setCategories] = useState([]);
  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingProduct, setEditingProduct] = useState(null);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
      setError("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/categories");
      const data = await res.json();
      setCategories(data.categories || data);
    } catch (err) {
      console.error("Error fetching categories:", err);
      setError(err.message || "Error fetching categories");
    }
  };

  useEffect(() => {
    fetchMenuItems();
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

  const handleSaveProduct = async () => {
    const newProduct = {
      name: productName,
      description,
      price: parseFloat(price),
      category,
      image_url: imageUrl,
      available,
    };

    const url = editingProduct
      ? `http://localhost:3000/api/menu/${editingProduct._id}`
      : "http://localhost:3000/api/menu/add";

    const method = editingProduct ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      console.log("Product saved:", data);

      setProductName("");
      setDescription("");
      setPrice("");
      setCategory("");
      setAvailable(true);
      setImageFile(null);
      setImageUrl("");
      setShowModal(false);
      setEditingProduct(null);
      fetchMenuItems();
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  const handleEdit = (item) => {
    setProductName(item.name);
    setDescription(item.description);
    setPrice(item.price);
    setCategory(item.category);
    setImageUrl(item.image_url);
    setAvailable(item.available); // Set status
    setEditingProduct(item);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await axios.delete(`http://localhost:3000/api/menu/${id}`);
        fetchMenuItems();
      } catch (err) {
        console.error("Error deleting product:", err);
      }
    }
  };

  return (
    <>
      <section className="h-[70vh] overflow-y-auto whitespace-nowrap w-full border mt-6 py-2 px-6 rounded-lg border-gray-200">
        {/* Header */}
        <div className="w-full flex justify-between items-start py-2">
          <h1 className="text-xl font-poppins font-bold">Products</h1>
          <button
            onClick={() => {
              setShowModal(true);
              setEditingProduct(null);
              setProductName("");
              setDescription("");
              setPrice("");
              setCategory("");
              setAvailable(true);
              setImageFile(null);
              setImageUrl("");
            }}
            className="bg-transparent border border-white p-2 text-sm rounded-md"
          >
            Add Product
          </button>
        </div>

        {/* Table */}
        <div>
          <table className="w-full table-fixed border-separate border-spacing-y-6">
            <thead>
              <tr>
                <th align="left">Name</th>
                <th>Image</th>
                <th>Description</th>
                <th>Price</th>
                <th>Status</th>
                <th align="right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" align="center">
                    <div className="flex items-center justify-center h-auto">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
                    </div>
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan="6" align="center">
                    {error}
                  </td>
                </tr>
              ) : menuItems.length === 0 ? (
                <tr>
                  <td colSpan="6" align="center" className="text-gray-500 py-6">
                    No menu items found.
                  </td>
                </tr>
              ) : (
                menuItems.map((item) => (
                  <tr key={item._id}>
                    <td className="truncate max-w-[140px]">{item.name}</td>
                    <td align="center">
                      <img
                        src={item.image_url}
                        alt={item.name}
                        className="w-12 h-12 object-contain mx-auto rounded"
                      />
                    </td>
                    <td align="center">
                      <div className="max-w-[200px] truncate text-ellipsis overflow-hidden whitespace-nowrap mx-auto">
                        {item.description}
                      </div>
                    </td>
                    <td align="center">${item.price}</td>
                    <td align="center">
                      {item.available ? (
                        <div className="border-[.1px] border-green-300 py-1 px-2 font-bold text-green-500 rounded">
                          Available
                        </div>
                      ) : (
                        <div className="border-[.1px] border-red-300 py-1 px-2 font-bold text-red-500 rounded">
                          Sold Out
                        </div>
                      )}
                    </td>
                    <td align="right">
                      <div className="flex justify-end">
                        <img
                          src={editImg}
                          alt="edit"
                          className="w-[20px] h-[20px] cursor-pointer"
                          onClick={() => handleEdit(item)}
                        />
                        <img
                          src={deleteImg}
                          alt="delete"
                          className="w-[20px] h-[20px] ml-2 cursor-pointer"
                          onClick={() => handleDelete(item._id)}
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[80vh] overflow-y-auto p-6 text-black">
            <h2 className="text-xl font-semibold mb-4">
              {editingProduct ? "Edit Product" : "Add New Product"}
            </h2>

            <label className="block mb-2 font-medium">Product Name:</label>
            <input
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2 font-medium">Description:</label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2 font-medium">Price ($):</label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            />

            <label className="block mb-2 font-medium">Category:</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="" disabled>
                Select a category
              </option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>

            <label className="block mb-2 font-medium">Status:</label>
            <select
              value={available ? "Available" : "Sold Out"}
              onChange={(e) => setAvailable(e.target.value === "Available")}
              className="w-full p-2 border border-gray-300 rounded mb-4"
            >
              <option value="Available">Available</option>
              <option value="Sold Out">Sold Out</option>
            </select>

            <label className="block mb-2 font-medium">Upload Image:</label>
            <input
              type="file"
              accept="image/*"
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
                onClick={() => {
                  setShowModal(false);
                  setEditingProduct(null);
                }}
                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveProduct}
                disabled={
                  !productName ||
                  !description ||
                  !price ||
                  !category ||
                  !imageUrl
                }
                className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              >
                {editingProduct ? "Update Product" : "Save Product"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductSectionEditor;
