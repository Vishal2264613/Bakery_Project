// admin/pages/Dashboard.jsx
//https://dribbble.com/shots/17271985-UX-Case-Study-Designing-Prototyping-a-High-Fidelity-Business
import React from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { dashboardImg } from '../../utils';

import AdminHome from './AdminHome';  // This will be the default dashboard page
import Users from './Users';
import Orders from './Orders';
import Settings from './Settings';

const Dashboard = () => {
  return (
    <section className="relative w-full h-screen  overflow-hidden flex">
          <img
                    src={dashboardImg}
                    className="max-w-full h-full w-full object-cover object-center absolute"
                  />
      {/* Sidebar */}
      <Sidebar />
      
      <div className="flex flex-col justify-evenly w-full h-full p-2 ">
        {/* Navbar */}
        <Navbar />
        
        {/* Main content area */}
        <main className="h-[85vh] w-full p-10 overflow-auto backdrop-blur-[10px] bg-white/30 border border-white/20 rounded-2xl">
          {/* This is where the nested routes will render */}
          <Routes>
            <Route path="/" element={<AdminHome />} /> {/* Default Dashboard Page */}
            <Route path="users" element={<Users />} />
            <Route path="orders" element={<Orders />} />
            <Route path="settings" element={<Settings />} />
          </Routes>
        </main>
      </div>
    </section>
  );
};

export default Dashboard;
