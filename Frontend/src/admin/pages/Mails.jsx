import React, { useState, useEffect } from "react";
import axios from "axios";
import { deleteImg } from "../../utils";

const Mails = () => {
  const [value, setValue] = useState(5);
  const [query, setQuery] = useState("");
  const [mails, setMails] = useState([]);
  const [filteredMails, setFilteredMails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all mails
  useEffect(() => {
    const fetchMails = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/mails");
        setMails(response.data);
        setFilteredMails(response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch mails");
        setLoading(false);
      }
    };

    fetchMails();
  }, []);

  // Handle delete
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this mail?"
    );
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/mails/${id}`);
      const updatedMails = mails.filter((mail) => mail._id !== id);
      setMails(updatedMails);
      setFilteredMails(updatedMails);
    } catch (err) {
      console.error("Failed to delete mail", err);
      alert("Failed to delete mail. Please try again.");
    }
  };

  const handleChange = (event) => {
    setValue(parseInt(event.target.value, 10));
  };

  const handleSearchChange = (event) => {
    setQuery(event.target.value);
  };

  // Filter mails on search
  useEffect(() => {
    const filtered = mails.filter(
      (mail) =>
        mail.name?.toLowerCase().includes(query.toLowerCase()) ||
        mail.email?.toLowerCase().includes(query.toLowerCase()) ||
        mail.subject?.toLowerCase().includes(query.toLowerCase()) ||
        mail.message?.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMails(filtered);
  }, [query, mails]);

  const startIndex = 0;
  const endIndex = value;

  return (
    <section>
      <div className="w-full h-full flex justify-between items-center px-1 p-0">
        <h1 className="text-xl font-poppins font-bold">Mail Inbox</h1>
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
                <th align="left">Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
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
              ) : filteredMails.length === 0 ? (
                <tr>
                  <td colSpan="6" align="center" className="text-white">
                    No mails yet.
                  </td>
                </tr>
              ) : (
                filteredMails.slice(startIndex, endIndex).map((mail) => (
                  <tr key={mail._id}>
                    <td>{mail.name}</td>
                    <td align="center">{mail.email}</td>
                    <td align="center">{mail.subject}</td>
                    <td align="center" className="truncate max-w-[200px]">
                      {mail.message}
                    </td>
                    <td align="center">
                      {new Date(mail.createdAt).toLocaleDateString("en-GB")}
                    </td>
                    <td align="right">
                      <div className="flex justify-end">
                        <img
                          src={deleteImg}
                          alt="delete"
                          onClick={() => handleDelete(mail._id)}
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
  );
};

export default Mails;
