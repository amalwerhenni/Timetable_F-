import React from 'react';
import { Home, LayoutDashboard, Bookmark,  LogOut } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {

  return (
    <div className="w-64 min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-6 shadow-lg">
      <div className="flex items-center mb-8">
        <div className="w-8 h-8 bg-pink-500 rounded-lg"></div>
        <span className="ml-2 text-xl font-semibold">sfir</span>
      </div>

      <div className="mb-8">
        <div className="text-gray-200 mb-4">Menu</div>
        <nav className="space-y-4">
          <Link to="/admin" className="flex items-center text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-all duration-300">
            <Home size={20} />
            <span className="ml-3">Home</span>
          </Link>
          <Link to="/admin/dashboard" className="flex items-center text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-all duration-300">
            <LayoutDashboard size={20} />
            <span className="ml-3">Dashboard</span>
          </Link>
          <Link to="/admin/bookmarks" className="flex items-center text-white bg-purple-700 hover:bg-purple-800 px-4 py-2 rounded-lg transition-all duration-300">
            <Bookmark size={20} />
            <span className="ml-3">Bookmarks</span>
          </Link>
        </nav>
      </div>

     
    </div>
  );
};

export default Sidebar;