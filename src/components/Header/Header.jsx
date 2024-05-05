import React, { useState } from "react";
import { LogOutBtn, Logo } from "../index";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";

function DropdownMenu({ navItems, navigate }) {
  const authStatus = useSelector((state) => state.status);
  return (
    <div className="relative z-10">
      <div className="md:hidden absolute left-0 top-full mt-2 w-full max-w-xs">
        <div className="rounded-md bg-gray-800 shadow-xs w-20">
          <div className="py-1 w-full">
            <ul>
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="text-white ">
                      <button
                        className="text-gray-300  hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-xs font-medium w-full text-left"
                        onClick={() => navigate(item.url)}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogOutBtn className="text-xs" />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function Header() {
  const authStatus = useSelector((state) => state.status);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // State to manage menu visibility
  const navItems = [
    {
      name: "Home",
      url: "/",
      active: true,
    },
    {
      name: "Login",
      url: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      url: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      url: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      url: "/add-post",
      active: authStatus,
    },
  ];

  // Function to toggle menu visibility
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className="bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="md:hidden">
              <button
                className="text-white focus:outline-none"
                onClick={toggleMenu} // Toggle menu visibility on click
              >
                <GiHamburgerMenu />
              </button>
              {menuOpen && (
                <DropdownMenu navItems={navItems} navigate={navigate} />
              )}
            </div>
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <div className="hidden md:flex items-center">
            <ul className="flex ml-auto">
              {navItems.map(
                (item) =>
                  item.active && (
                    <li key={item.name} className="text-white">
                      <button
                        className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
                        onClick={() => navigate(item.url)}
                      >
                        {item.name}
                      </button>
                    </li>
                  )
              )}
              {authStatus && (
                <li>
                  <LogOutBtn />
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Header;
