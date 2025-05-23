import { FiUsers, FiUserPlus, FiSettings, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
function Sidebar({ setSidebarOpen, sidebarOpen }) {
  return (
    <div
      className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-lg transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto`}
    >
      <div className="flex items-center justify-between p-4 border-b">
        <h1 className="text-xl font-bold text-blue-600 mb-3">Dashboard</h1>
        <button
          className="p-1 rounded-md lg:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <FiX className="w-6 h-6 text-gray-500" />
        </button>
      </div>
      <nav className="p-4">
        <div className="space-y-1">
          <NavLink to={""} className="flex items-center w-full px-4 py-3 text-sm font-medium text-white bg-blue-600 rounded-lg">
            <FiUsers className="mr-3" />
            User Dashboard
          </NavLink>
          <NavLink to={"users"} className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
            <FiUserPlus className="mr-3" />
            Users
          </NavLink>
          <NavLink to={"setting"} className="flex items-center w-full px-4 py-3 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-lg">
            <FiSettings className="mr-3" />
            Settings
          </NavLink>
        </div>
      </nav>
    </div>
  );
}

export default Sidebar;
