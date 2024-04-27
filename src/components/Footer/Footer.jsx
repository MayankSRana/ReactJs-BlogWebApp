import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Footer = () => {
  const authStatus = useSelector((state) => state.status);

  return (
    <footer className="bg-gray-800 py-6 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-wrap justify-center md:justify-start mb-4 md:mb-0">
            <div>
              <Link
                to="/"
                className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                Home
              </Link>
            </div>

            {!authStatus && (
              <div>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {authStatus && (
              <div>
                <Link
                  to="/allpost"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  All Post
                </Link>
                <Link
                  to="/addpost"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Add Post
                </Link>
                <Link
                  to="/logout"
                  className="text-gray-300 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                >
                  Logout
                </Link>
              </div>
            )}
          </div>
          <p className="text-gray-300 mt-4 md:mt-0 text-center md:text-left">
            © 2024 Your Website. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
