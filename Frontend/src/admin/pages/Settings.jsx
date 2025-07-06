import React, { useState } from "react";

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotif, setEmailNotif] = useState(true);

  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-6">Settings</h1>

      {/* Profile Settings */}
      <div className="mb-6 bg-transparent rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Profile Settings</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Admin Name"
            className="border p-2 rounded"
          />
          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded"
          />
          <input
            type="password"
            placeholder="Change Password"
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Site Preferences */}
      <div className="mb-6 bg-transparent rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Site Preferences</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Site Name"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Support Email"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Contact Phone"
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Business Address"
            className="border p-2 rounded"
          />
        </div>
      </div>

      {/* Theme Settings */}
      <div className="mb-6 bg-transparent rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Theme Settings</h2>
        <label className="flex items-center space-x-4">
          <span>Dark Mode</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-5 h-5"
          />
        </label>
      </div>

      {/* Notification Settings */}
      <div className="mb-6 bg-transparent rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold mb-4">Notification Settings</h2>
        <label className="flex items-center space-x-4">
          <span>Email Notifications</span>
          <input
            type="checkbox"
            checked={emailNotif}
            onChange={() => setEmailNotif(!emailNotif)}
            className="w-5 h-5"
          />
        </label>
      </div>

      {/* Save Button */}
      <div className="text-right">
        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">
          Save Changes
        </button>
      </div>
    </section>
  );
};

export default Settings;
