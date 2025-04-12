import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { FaClipboardList, FaHamburger, FaUsers } from 'react-icons/fa'; // Icons
import OrdersSection from './OrderSection';
import MenuSection from './MenuSection';
import UsersSection from './UsersSection';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar Section */}
      <div className="pt-20 w-24 bg-gray-800 text-white shadow-md flex flex-col items-center p-4 space-y-8 h-120">
        <div className="flex justify-center mb-6">
          <img
            src="/path/to/your/logo.png" // Add your logo here
            alt="Logo"
            className="h-12 w-12 object-contain"
          />
        </div>
        <nav className="space-y-8">
          <Link to="/admin/orders" className="flex items-center gap-2 text-gray-300 hover:text-white text-lg">
            <FaClipboardList />
            <span>Orders</span>
          </Link>
          <Link to="/admin/menu" className="flex items-center gap-2 text-gray-300 hover:text-white text-lg">
            <FaHamburger />
            <span>Food</span>
          </Link>
          <Link to="/admin/users" className="flex items-center gap-2 text-gray-300 hover:text-white text-lg">
            <FaUsers />
            <span>Users</span>
          </Link>
        </nav>
      </div>

      {/* Main Content Section */}
      <div className="flex-1 bg-gray-100 p-8 overflow-y-auto">
        <div className="border-b pb-4 mb-6">
          <h1 className="text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-500">Manage your restaurant's operations</p>
        </div>

        <div className="space-y-6">
          <Routes>
            <Route path="orders" element={<OrdersSection />} />
            <Route path="menu" element={<MenuSection />} />
            <Route path="users" element={<UsersSection />} />
            <Route path="/" element={<div>Select a section to manage</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
