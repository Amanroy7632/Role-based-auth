import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white mt-10">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {/* Company Info */}
        <div>
          <h3 className="text-lg font-semibold mb-3">MyApp</h3>
          <p className="text-sm text-gray-300">
            Your go-to app for managing everything. We provide efficient tools
            to keep your workflow smooth.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-md font-semibold mb-3">Quick Links</h4>
          <ul className="space-y-2">
            <li>
              <Link to="/" className="hover:text-indigo-400 text-sm">
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-indigo-400 text-sm">
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-indigo-400 text-sm">
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className="hover:text-indigo-400 text-sm">
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h4 className="text-md font-semibold mb-3">Resources</h4>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-indigo-400 text-sm">
                Blog
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 text-sm">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 text-sm">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-indigo-400 text-sm">
                Terms & Conditions
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-md font-semibold mb-3">Contact</h4>
          <p className="text-sm text-gray-300">Email: support@myapp.com</p>
          <p className="text-sm text-gray-300">Phone: +1 (123) 456-7890</p>
          <div className="mt-3 flex space-x-4">
            <a href="#" className="hover:text-indigo-400">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="hover:text-indigo-400">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="hover:text-indigo-400">
              <i className="fab fa-instagram"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center py-4 border-t border-gray-700 text-sm text-gray-400">
        © {new Date().getFullYear()} MyApp. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
