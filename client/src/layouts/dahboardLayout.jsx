import { useState } from "react";

import Sidebar from "../components/dashboard/Sidebar";
import Header from "../components/dashboard/Header";
import { Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import NavbarProgressLoader from "../components/common/NavbarLoader";

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
      <Sidebar  setSidebarOpen={setSidebarOpen} sidebarOpen={sidebarOpen}/>
      {/* Main content */}
      <div className="flex-1 overflow-auto">
        {/* Header */}
        <Header setSearchQuery={setSearchQuery}  searchQuery={searchQuery} setSidebarOpen={setSidebarOpen}/>
        {/* Page content */}
        <main className="p-3">
          <Outlet/>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
