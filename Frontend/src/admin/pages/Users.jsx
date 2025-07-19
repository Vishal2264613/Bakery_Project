import React, { useState, useEffect } from "react";
import axios from "axios";
import { editImg, deleteImg } from "../../utils";

const Users = () => {
  const [value, setValue] = useState(5);
  const [query, setQuery] = useState("");
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [editingUser, setEditingUser] = useState(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    password: "",
    status: "active",
  });

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/users");
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch users");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user?.name?.toLowerCase().includes(query.toLowerCase()) ||
        user?.email?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [query, users]);
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await axios.delete(`http://localhost:3000/api/users/${id}`);
        setUsers(users.filter((user) => user._id !== id));
      } catch (err) {
        console.error("Failed to delete user:", err);
      }
    }
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setIsEditModalOpen(true);
  };

  const handleEditSave = async () => {
    try {
      const { _id, ...updateData } = editingUser;
      const response = await axios.put(
        `http://localhost:3000/api/users/${_id}`,
        updateData
      );
      setUsers(users.map((user) => (user._id === _id ? response.data : user)));
      setIsEditModalOpen(false);
    } catch (err) {
      console.error("Failed to update user:", err);
    }
  };

  const handleAddUser = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/users",
        newUser
      );
      setUsers([...users, response.data]);
      setIsAddModalOpen(false);
      setNewUser({
        name: "",
        email: "",
        phoneNumber: "",
        password: "",
        status: "active",
      });
    } catch (err) {
      console.error("Failed to add user:", err);
    }
  };

  const startIndex = 0;
  const endIndex = value;

  return (
    <>
      <section>
        <div className="w-full h-full flex justify-between items-center px-1 p-0">
          <h1 className="text-xl font-poppins font-bold">Users Details</h1>
          <button
            className="bg-transparent border-[1px] border-white px-2 py-1 text-[14px] rounded-md"
            onClick={() => setIsAddModalOpen(true)}
          >
            + Add User
          </button>
        </div>

        <div className="w-full h-[70vh] bg-black/10 rounded-xl text-white overflow-auto px-5 py-6 mt-4">
          <div className="flex justify-between">
            <div>
              <select
                id="number-select"
                value={value}
                onChange={handleChange}
                className="w-[55px] bg-transparent border border-white h-[30px]"
              >
                {[5, 10, 15, 20, 25].map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <label htmlFor="number-select" className="ml-2">
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
            <table className="w-full border-separate border-spacing-y-6 mt-4">
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
                ) : filteredUsers.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      align="center"
                      className="text-red-400 text-lg font-semibold"
                    >
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.slice(startIndex, endIndex).map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td align="center">{user.email}</td>
                      <td align="center">{user.phoneNumber}</td>
                      <td align="center">
                        {new Date(user.signupDate).toLocaleDateString("en-GB")}
                      </td>
                      <td
                        align="center"
                        className={`border-[1px] font-bold px-2 py-1 rounded-md ${
                          user.status === "active"
                            ? "border-green-300 text-green-300"
                            : "border-red-400 text-red-400"
                        }`}
                      >
                        {user.status.charAt(0).toUpperCase() +
                          user.status.slice(1)}
                      </td>
                      <td align="right">
                        <div className="flex justify-end">
                          <img
                            src={editImg}
                            alt="edit"
                            className="w-[20px] h-[20px] cursor-pointer"
                            onClick={() => handleEdit(user)}
                          />
                          <img
                            src={deleteImg}
                            alt="delete"
                            className="w-[20px] h-[20px] ml-2 cursor-pointer"
                            onClick={() => handleDelete(user._id)}
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

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white text-black p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Edit User</h2>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={editingUser.name}
              onChange={(e) =>
                setEditingUser({ ...editingUser, name: e.target.value })
              }
            />
            <input
              type="email"
              className="w-full border p-2 mb-2"
              placeholder="Email"
              value={editingUser.email}
              onChange={(e) =>
                setEditingUser({ ...editingUser, email: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Phone Number"
              value={editingUser.phoneNumber}
              onChange={(e) =>
                setEditingUser({ ...editingUser, phoneNumber: e.target.value })
              }
            />
            <select
              className="w-full border p-2 mb-2"
              value={editingUser.status}
              onChange={(e) =>
                setEditingUser({ ...editingUser, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => setIsEditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 text-white px-4 py-1 rounded"
                onClick={handleEditSave}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {isAddModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
          <div className="bg-white text-black p-6 rounded-lg w-[400px]">
            <h2 className="text-xl font-bold mb-4">Add New User</h2>
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Name"
              value={newUser.name}
              onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
            />
            <input
              type="email"
              className="w-full border p-2 mb-2"
              placeholder="Email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="text"
              className="w-full border p-2 mb-2"
              placeholder="Phone Number"
              value={newUser.phoneNumber}
              onChange={(e) =>
                setNewUser({ ...newUser, phoneNumber: e.target.value })
              }
            />
            <input
              type="password"
              className="w-full border p-2 mb-2"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <select
              className="w-full border p-2 mb-2"
              value={newUser.status}
              onChange={(e) =>
                setNewUser({ ...newUser, status: e.target.value })
              }
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex justify-end space-x-2 mt-4">
              <button
                className="bg-gray-400 text-white px-4 py-1 rounded"
                onClick={() => setIsAddModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-500 text-white px-4 py-1 rounded"
                onClick={handleAddUser}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
