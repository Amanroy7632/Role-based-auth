import { FiSearch, FiBell, FiMenu } from "react-icons/fi";
import { useAuth } from "../../context/authContext";
import { useSearch } from "../../context/searchContext";

function Header({ setSidebarOpen}) {
  const {currentUser} =useAuth();
  const {searchQuery,setSearchQuery} =useSearch();
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="flex items-center justify-between p-4">
        <button
          className="p-2 rounded-md lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <FiMenu className="w-6 h-6 text-gray-500" />
        </button>

        <div className="relative flex-1 max-w-md mx-4">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <FiSearch className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            className="w-full py-2 pl-10 pr-4 text-gray-700 bg-gray-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500 focus:bg-white"
            placeholder="Search users..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-500 rounded-full hover:bg-gray-100 relative">
            <FiBell className="w-6 h-6" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>
          <div className="flex items-center">
            <img
              src="https://avatars.githubusercontent.com/u/123537410?v=4"
              alt="User"
              className="w-10 h-10 rounded-full"
            />
            <span className="ml-2 font-medium">{currentUser?.name} <span className=" text-sm font-semibold font-mono">({currentUser?.role})</span></span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
