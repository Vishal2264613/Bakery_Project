import React from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
//https://dribbble.com/shots/23626622-Dashboard-glassmorphism-style

import Admin from "./Admin";
import Users from "./Users";
import Orders from "./Orders";
import Settings from "./Settings";
import Mails from "./Mails";

const Dashboard = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-[#32343a]">
      
      <div className="absolute inset-0 z-0 pointer-events-none">
        
        <div className="absolute top-[-20px] left-[-20px] w-[600px] h-2/3 bg-gradient-radial bg-purple-500/50 via-transparent to-transparent rounded-full blur-[150px] opacity-40" />

        
        <div className="absolute top-0 left-1/4 w-[600px] h-screen bg-gradient-radial bg-orange-400 via-transparent to-transparent rounded-full blur-[150px] opacity-30" />
      </div>

      {/* === Main Layout Layer === */}
      <div className="relative z-10 flex w-full h-full">
        
        {/* Sidebar */}
        <Sidebar />

        {/* Content Area */}
        <div className="flex flex-col justify-start w-full h-full p-4">
          
          {/* Navbar */}
          <Navbar />

          {/* Main Panel */}
          <main className="flex-1 mt-4 p-5 overflow-auto backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl">
            <Routes>
              <Route path="admin" element={<Admin />} />
              <Route path="users" element={<Users />} />
              <Route path="orders" element={<Orders />} />
              <Route path="settings" element={<Settings />} />
              <Route path="mails" element={<Mails />} />
            </Routes>
          </main>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
