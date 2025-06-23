import React, { useState } from "react";

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState("card");

  return (
    <div className="p-6 pt-20 bg-gray-50 min-h-screen flex flex-col items-center">
      <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Shipping Address */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold text-black mb-4">
            Shipping Address
          </h2>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="First & Last Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="421, Dubai Main St"
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="Apartment, suite, etc."
              className="border p-2 rounded"
            />
            <div className="grid grid-cols-3 gap-2">
              <input
                type="text"
                placeholder="City"
                className="border p-2 rounded"
              />
              <select className="border p-2 rounded">
                <option>Select state</option>
              </select>
              <input
                type="text"
                placeholder="Zip code"
                className="border p-2 rounded"
              />
            </div>
          </form>
        </div>

        {/* Payment Method - Card Only */}
        <div className="md:col-span-3 bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-semibold mb-4 text-black">
            Payment Method
          </h2>
          <form className="grid grid-cols-1 gap-4">
            <input
              type="text"
              placeholder="First & Last Name"
              className="border p-2 rounded"
            />
            <input
              type="text"
              placeholder="0000 0000 0000 0000"
              className="border p-2 rounded"
            />
            <div className="grid grid-cols-3 gap-2">
              <select className="border p-2 rounded">
                <option>MM</option>
              </select>
              <select className="border p-2 rounded">
                <option>YYYY</option>
              </select>
              <input
                type="text"
                placeholder="CVV"
                className="border p-2 rounded"
              />
            </div>
          </form>
        </div>

        {/* Place Order Button */}
        <div className="md:col-span-3 w-full">
          <button className="w-full mt-6 bg-blue-600 text-white py-3 rounded-xl text-lg hover:bg-blue-700 transition">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
