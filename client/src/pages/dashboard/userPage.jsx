import { useState } from "react";
import { useSearch } from "../../context/searchContext";
import { FiUsers } from "react-icons/fi";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { BASE_URL } from "../../constant";
import TableSkeletonLoader from "../../components/common/TableSkeltonLoader";
import { useAuth } from "../../context/authContext";
function UserPage() {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState("all");
  const {  debouncedQuery } = useSearch();
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users", currentPage,debouncedQuery],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/users?page=${currentPage}&limit=10&search=${debouncedQuery}`
      );
      if (response.status === 200) {
        const { data } = response.data;
        console.log(data);

        return data;
      }
      return null;
    },
  });

  // Mock user data
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "active",
      lastActive: "2 hours ago",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "User",
      status: "active",
      lastActive: "1 day ago",
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob@example.com",
      role: "Editor",
      status: "inactive",
      lastActive: "1 week ago",
    },
    {
      id: 4,
      name: "Alice Williams",
      email: "alice@example.com",
      role: "User",
      status: "active",
      lastActive: "5 minutes ago",
    },
    {
      id: 5,
      name: "Charlie Brown",
      email: "charlie@example.com",
      role: "User",
      status: "suspended",
      lastActive: "1 month ago",
    },
  ];

  const filteredUsers =
    data?.users?.filter((user) => {
      const matchesSearch =
        user.name.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(debouncedQuery.toLowerCase());
      const matchesTab = activeTab === "all" || user.status === activeTab;
      return matchesSearch && matchesTab;
    }) || [];
  return (
    <div className="flex flex-col space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Users</p>
              <p className="text-2xl font-bold">1,248</p>
            </div>
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">+12.5% from last month</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">984</p>
            </div>
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-green-600">+8.3% from last month</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Inactive Users
              </p>
              <p className="text-2xl font-bold">214</p>
            </div>
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-red-600">-3.2% from last month</p>
        </div>

        <div className="p-6 bg-white rounded-lg shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Suspended</p>
              <p className="text-2xl font-bold">50</p>
            </div>
            <div className="p-3 rounded-full bg-red-100 text-red-600">
              <FiUsers className="w-6 h-6" />
            </div>
          </div>
          <p className="mt-2 text-sm text-red-600">+2.1% from last month</p>
        </div>
      </div>

      {/* Users table */}
      <div className="p-6 bg-white rounded-lg shadow">
        <div className="flex flex-col justify-between mb-6 space-y-4 sm:flex-row sm:items-center sm:space-y-0">
          <h2 className="text-xl font-semibold">User Management</h2>
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "all"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Users
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "active"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("active")}
            >
              Active
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "inactive"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("inactive")}
            >
              Inactive
            </button>
            <button
              className={`px-4 py-2 text-sm font-medium rounded-lg ${
                activeTab === "suspended"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
              onClick={() => setActiveTab("suspended")}
            >
              Suspended
            </button>
          </div>
        </div>

        {!isLoading && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Role
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Last Active
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 w-10 h-10">
                          <img
                            className="w-10 h-10 rounded-full"
                            src={`https://randomuser.me/api/portraits/men/${user.id}.jpg`}
                            alt=""
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {user.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              user.role === "Admin"
                                ? "bg-purple-100 text-purple-800"
                                : user.role === "Editor"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                            ${
                              user.status === "active"
                                ? "bg-green-100 text-green-800"
                                : user.status === "inactive"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-100 text-red-800"
                            }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500 whitespace-nowrap">
                      {user.lastActive}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium whitespace-nowrap">
                      {currentUser?.id === user.id && (
                        <button className="text-blue-600 hover:text-blue-900 mr-3">
                          Edit
                        </button>
                      )}
                      {currentUser.role!=="USER"&&<button className="text-red-600 hover:text-red-900">
                        Delete
                      </button>}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        {isLoading && <TableSkeletonLoader rows={5} />}

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">1</span> to{" "}
            <span className="font-medium">5</span> of{" "}
            <span className="font-medium">20</span> results
          </div>
          <div className="flex space-x-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
              Previous
            </button>
            <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700">
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
