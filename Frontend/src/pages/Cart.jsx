import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // or use your auth token logic
import { checkoutImg } from "../utils";

const Cart = () => {
  const token = useSelector(state => state.auth.token); // assuming redux stores your token
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        
        const res = await axios.get('http://localhost:3000/api/cart', {
          headers: {
            Authorization: `Bearer ${token}`,
           
          },
        });
        setCartItems(res.data);
      } catch (error) {
        console.error('Failed to fetch cart:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [token]);

  return (
    <>
      <section className="relative w-full h-[70vh] overflow-hidden">
        <div className="absolute flex items-center justify-center w-full h-full">
          <img src={checkoutImg} className="max-w-full h-auto" />
          <h1 className="absolute z-20 font-greatvibes mb-30 tracking-wider leading-20 text-white font-bold text-center text-7xl">
            My Cart
          </h1>
          <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-40 z-10" />
        </div>
      </section>

      <section className="p-8">
        {loading ? (
          <p>Loading cart...</p>
        ) : cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cartItems.map(item => (
              <div key={item.productId} className="border p-4 rounded shadow">
                <img src={item.image} alt={item.productName} className="w-full h-48 object-cover mb-4" />
                <h3 className="text-xl font-semibold">{item.productName}</h3>
                <p>Quantity: {item.quantity}</p>
                <p>Price: ₹{item.price}</p>
                <p>Total: ₹{(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default Cart;
