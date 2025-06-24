import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:3000/api/menu/${id}`);
        setProduct(res.data);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    if (!token) {
      alert("Please log in first.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:3000/api/cart",
        {
          product: {
            productId: product._id,
            productName: product.name,
            quantity: quantity,
            price: product.price,
            image: product.image_url,
          },
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      alert("Item added to cart!");
    } catch (error) {
      console.error("Cart error:", error.response || error.message);
      alert("Failed to add to cart");
    }
  };

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  if (!product) return <div className="p-6">Loading product...</div>;

  return (
    <>
    <section className="relative w-full h-[100vh] bg-white overflow-hidden">
      <div className="p-8 md:p-16  text-black min-h-screen flex flex-col justify-center items-center md:flex-row gap-10">
        <div className="md:w-1/3">
          <img
            src={product.image_url}
            alt={product.name}
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        <div className="md:w-1/2 flex flex-col gap-4">
          <h2 className="text-3xl font-semibold">{product.name}</h2>
          <p className="text-gray-500 text-sm uppercase">Contains Egg</p>
          <p className="text-2xl font-semibold">₹ {product.price}</p>

          <p className="text-gray-700 leading-relaxed">{product.description}</p>

          <div className="flex items-center gap-4 mt-4">
            <button
              onClick={decreaseQty}
              className="w-8 h-8 text-lg rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
            >
              −
            </button>
            <span className="text-xl">{quantity}</span>
            <button
              onClick={increaseQty}
              className="w-8 h-8 text-lg rounded-full border border-gray-400 flex items-center justify-center hover:bg-gray-100"
            >
              +
            </button>
          </div>

          <button
            onClick={handleAddToCart}
            className="mt-6 bg-black text-white text-lg px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            ADD TO CART
          </button>

          <div className="mt-6 text-sm text-green-600">
            ✓ Pickup available at Defence Bakery, Rajouri Garden
          </div>
          <div className="text-sm text-gray-600">Usually ready in 24 hours</div>
          <div className="text-sm underline text-gray-600 cursor-pointer">
            Check availability at other stores
          </div>
        </div>
      </div>
    </section>
       <Footer />
       </>
  );
}
