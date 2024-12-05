import React from 'react';
import Sidebar from './Sidebar';

import { useLocation } from "react-router-dom";


const AdminDashboard = () => {




  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

    </div>
  );
};

export default AdminDashboard;