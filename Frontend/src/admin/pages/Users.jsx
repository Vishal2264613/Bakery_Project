import React, { useState, useEffect } from "react";
import axios from "axios";
import { editImg, deleteImg } from "../../utils";

const Users = () => {
  const [value, setValue] = useState(5); // Entries per page
  const [query, setQuery] = useState(""); // Search query
  const [users, setUsers] = useState([]); // List of users
  const [filteredUsers, setFilteredUsers] = useState([]); // Filtered list based on search
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch users data from API using Axios
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users"); // Replace with your actual API endpoint
        setUsers(response.data); // Assuming the response contains the users data
        setFilteredUsers(response.data); // Set initial filtered users
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  // Handle change in entries per page
  const handleChange = (event) => {
    setValue(parseInt(event.target.value, 10)); // Set entries per page
  };

  // Handle search input change
  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter users based on the search query
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.email.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, users]);

  // Calculate pagination
  const startIndex = 0;
  const endIndex = value;

  return (
    <>
      <section>
        <div className="w-full h-full flex justify-between items-center px-1 p-0">
          <h1 className="text-xl font-poppins font-bold">Users Details</h1>
          <button className="bg-transparent border-[1px]  border-white p-2 text-[14px] rounded-md">
            + Add User
          </button>
        </div>
        <div className="w-full h-[70vh] bg-black/10 rounded-xl   text-white overflow-auto px-5 py-6 mt-4">
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
                entries per page{" "}
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
            <table className="w-full  border-separate border-spacing-y-6 ">
              <thead>
                <tr>
                  <th align="left">Name</th>
                  <th>Email</th>
                  <th>Mobile no</th>
                  <th>Registered on</th>
                  <th>Status</th>
                  <th align="right">Action</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      align="center"
                      className="text-black text-xl"
                    >
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
                ) : (
                  filteredUsers.slice(startIndex, endIndex).map((user) => (
                    <tr key={user.id} className="">
                      <td>{user.name}</td>
                      <td align="center">{user.email}</td>
                      <td align="center">{user.phoneNumber}</td>
                      <td align="center">
                        {" "}
                        {new Date(user.signupDate).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        align="center"
                        className="border-[1px] border-green-300 font-bold text-green-300"
                      >
                        {user.status}
                      </td>
                      <td align="right">
                        <div className="flex justify-end">
                          <img
                            src={editImg}
                            alt="logo"
                            className="w-[20px] h-[20px] cursor-pointer "
                          />
                          <img
                            src={deleteImg}
                            alt="logo"
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

export default Users;
