import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // 👈 import useNavigate
import { checkoutImg } from "../utils";
import CartTable from "../components/CartTable"; // Assuming correct path

const Cart = () => {
  const token = useSelector((state) => state.auth.token);
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);
  const navigate = useNavigate(); // 👈 initialize navigate

  // Fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get("http://localhost:3000/api/cart", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCartItems(res.data);
      } catch (error) {
        console.error("Failed to fetch cart:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  // 🗑️ Delete item from cart
  const handleDelete = async (productId) => {
    if (!token) return;

    try {
      setDeletingId(productId);
      await axios.delete(`http://localhost:3000/api/cart/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      // Remove item from UI after successful delete
      setCartItems((prev) =>
        prev.filter((item) => item.productId !== productId)
      );
    } catch (error) {
      console.error("Error deleting cart item:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Calculate total cart amount
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <section className="relative w-full h-[25vh] flex pl-8 justify-start items-end overflow-hidden">
        <h1 className="absolute z-20 font-bold text-black tracking-wider leading-20 p-1 text-7xl">
          My Cart
        </h1>
      </section>

      <section className="p-8">
        {loading ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            Loading cart...
          </p>
        ) : !token ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            Please log in to view your cart.
          </p>
        ) : cartItems.length === 0 ? (
          <p className="text-center text-gray-600 text-lg mt-10">
            Your cart is empty.
          </p>
        ) : (
          <>
            <CartTable
              cartItems={cartItems}
              onDelete={handleDelete}
              deletingId={deletingId}
            />

            {/* Order Summary & Checkout Button */}
            <div className="mt-6 flex justify-between items-center">
              <div className="text-xl font-semibold text-gray-800">
                Total: ₹{totalAmount.toFixed(2)}
              </div>
              <button
                onClick={() => navigate("/checkout")}
                className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
