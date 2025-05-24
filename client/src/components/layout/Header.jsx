import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X, User } from "lucide-react";
import { useAuth } from "../../context/authContext";
const Navbar = () => {
  const { currentUser } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [openDropDown, setOpenDropdown] = useState(false);
  const toggleMenu = () => setIsOpen(!isOpen);

  const linkClass =
    "block py-2 px-3 text-gray-700 hover:text-indigo-600 transition duration-150";
  const activeLinkClass = "text-indigo-600 font-semibold";

  return (
    <nav className="bg-white shadow-md fixed w-full z-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="text-indigo-600 font-bold text-xl">
            Aman.dev
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Contact
            </NavLink>

            {currentUser && (
              <NavLink
                to="/users"
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeLinkClass : ""}`
                }
              >
                Users
              </NavLink>
            )}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {currentUser ? (
              <div className="relative">
                {/* Trigger */}
                <div
                  className="flex items-center gap-2 cursor-pointer px-3 py-1 rounded-md hover:bg-gray-100 transition"
                  onClick={() => setOpenDropdown(!openDropDown)}
                >
                  <User className="text-indigo-600 w-5 h-5" />
                  <span className="text-sm font-medium text-gray-800">
                    {currentUser?.name || "User"}
                  </span>
                </div>

                {/* Dropdown */}
                {openDropDown && (
                  <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-20">
                    <Link
                      to="/dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                      onClick={() => setOpenDropdown(false)}
                    >
                      Dashboard
                    </Link>
                    <button
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-50 transition"
                      onClick={() => {
                        setOpenDropdown(false);
                        // logout logic here
                      }}
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  Register
                </NavLink>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `${linkClass} ${isActive ? activeLinkClass : ""}`
                  }
                >
                  Login
                </NavLink>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden">
            <button onClick={toggleMenu} className="text-gray-700">
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      {isOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white shadow-md space-y-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `${linkClass} ${isActive ? activeLinkClass : ""}`
            }
          >
            Contact
          </NavLink>

          {currentUser ? (
            <NavLink
              to="/users"
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `${linkClass} ${isActive ? activeLinkClass : ""}`
              }
            >
              Users
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/register"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeLinkClass : ""}`
                }
              >
                Register
              </NavLink>
              <NavLink
                to="/login"
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `${linkClass} ${isActive ? activeLinkClass : ""}`
                }
              >
                Login
              </NavLink>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
