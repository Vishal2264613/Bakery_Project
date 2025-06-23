import React from "react";

const CartTable = ({ cartItems, onDelete, deletingId }) => {
  return (
    <div className="overflow-x-auto w-full mt-6">
      <table className="min-w-full bg-white border border-gray-200 shadow-sm rounded-lg">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-6 py-3 text-left text-sm font-medium">Image</th>
            <th className="px-6 py-3 text-left text-sm font-medium">Product</th>
            <th className="px-6 py-3 text-center text-sm font-medium">
              Quantity
            </th>
            <th className="px-6 py-3 text-right text-sm font-medium">Price</th>
            <th className="px-6 py-3 text-right text-sm font-medium">Total</th>
            <th className="px-6 py-3 text-center text-sm font-medium">
              Delete
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr
              key={item.productId}
              className="border-t text-black border-gray-200"
            >
              <td className="px-6 py-4">
                <img
                  src={item.image}
                  alt={item.productName}
                  className="w-16 h-16 object-cover rounded-md"
                />
              </td>
              <td className="px-6 py-4">{item.productName}</td>
              <td className="px-6 py-4 text-center">{item.quantity}</td>
              <td className="px-6 py-4 text-right">₹{item.price}</td>
              <td className="px-6 py-4 text-right">
                ₹{(item.price * item.quantity).toFixed(2)}
              </td>
              <td className="px-6 py-4 text-center">
                <button
                  onClick={() => onDelete(item.productId)}
                  disabled={deletingId === item.productId}
                  className="text-red-600 hover:text-red-800 font-semibold"
                  aria-label={`Delete ${item.productName}`}
                  title="Remove item"
                >
                  {deletingId === item.productId ? "Deleting..." : "✕"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CartTable;
