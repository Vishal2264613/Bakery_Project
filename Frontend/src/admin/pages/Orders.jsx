import React, { useState, useEffect } from "react";
import axios from "axios";
import { editImg, deleteImg } from "../../utils";

const Orders = () => {
  const [value, setValue] = useState(5);
  const [query, setQuery] = useState("");
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/orders");
        setOrders(response.data);
        setFilteredOrders(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch orders");
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = orders.filter(
      (order) =>
        order.customerName?.toLowerCase().includes(query.toLowerCase()) ||
        order.email?.toLowerCase().includes(query.toLowerCase()) ||
        order.phone?.includes(query)
    );
    setFilteredOrders(filtered);
  }, [query, orders]);

  const startIndex = 0;
  const endIndex = value;

  return (
    <>
      <section>
        <div className="w-full h-full flex justify-between items-center px-1 p-0">
          <h1 className="text-xl font-poppins font-bold">Order Details</h1>
        </div>
        <div className="w-full h-[70vh] bg-black/10 rounded-xl text-white overflow-auto px-5 py-6 mt-4">
          <div className="flex justify-between">
            <div>
              <select
                id="number-select"
                value={value}
                onChange={handleChange}
                className="w-[45px] bg-transparent border border-white h-[25px]"
              >
                {[5, 10, 15, 20, 25].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <label htmlFor="number-select" style={{ marginLeft: "10px" }}>
                entries per page
              </label>
            </div>
            <div>
              <input
                type="text"
                value={query}
                onChange={handleSearchChange}
                placeholder="Search..."
                className="bg-transparent border border-white text-white px-4 py-1 rounded-md"
              />
            </div>
          </div>
          <div>
            <table className="w-full border-separate border-spacing-y-6">
              <thead>
                <tr>
                  <th align="left">Order ID</th>
                  <th>Customer</th>
                  <th>Email / Phone</th>
                  <th>Items</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th align="right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="9" align="center">
                      <div className="flex items-center justify-center h-auto">
                        <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-white border-solid"></div>
                      </div>
                    </td>
                  </tr>
                ) : error ? (
                  <tr>
                    <td colSpan="9" align="center">
                      {error}
                    </td>
                  </tr>
                ) : filteredOrders.length === 0 ? (
                  <tr>
                    <td colSpan="9" align="center" className="text-white py-10">
                      No orders yet
                    </td>
                  </tr>
                ) : (
                  filteredOrders.slice(startIndex, endIndex).map((order) => (
                    <tr key={order._id}>
                      <td>{order._id}</td>
                      <td align="center">{order.customerName}</td>
                      <td align="center">
                        {order.email}
                        <br />
                        {order.phone}
                      </td>
                      <td align="center">
                        {Array.isArray(order.items)
                          ? `${order.items.length} items`
                          : order.items}
                      </td>
                      <td align="center">${order.totalAmount?.toFixed(2)}</td>
                      <td align="center">{order.paymentStatus}</td>
                      <td
                        align="center"
                        className="border-[1px] border-blue-300 font-bold text-blue-300"
                      >
                        {order.orderStatus}
                      </td>
                      <td align="center">
                        {new Date(order.createdAt).toLocaleDateString("en-GB")}
                      </td>
                      <td align="right">
                        <div className="flex justify-end">
                          <img
                            src={editImg}
                            alt="edit"
                            className="w-[20px] h-[20px] cursor-pointer"
                          />
                          <img
                            src={deleteImg}
                            alt="delete"
                            className="w-[20px] h-[20px] ml-2 cursor-pointer"
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  );
};

export default Orders;
