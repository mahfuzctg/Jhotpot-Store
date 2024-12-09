"use client";

import { siteConfig } from "@/src/config/site";
import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiMenu,
  FiX,
  FiShoppingCart,
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiUser,
} from "react-icons/fi";
import CartDrawer from "../../CartDrawer/CartDrawer";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <nav className="bg-transparent fixed top-0 w-full z-50">
      {/* Top Navigation Bar */}
      <div className="bg-gradient-to-r from-[#82C408] to-[#64A400] py-2 bg-opacity-80 hover:bg-gradient-to-r hover:from-[#64A400] hover:to-[#82C408] transition-all duration-500">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-white">
          {/* Social Media Icons */}
          <div className="flex space-x-6">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-[#82C408] transition duration-300 transform hover:scale-125"
            >
              <FiFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-[#82C408] transition duration-300 transform hover:scale-125"
            >
              <FiTwitter />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl hover:text-[#82C408] transition duration-300 transform hover:scale-125"
            >
              <FiInstagram />
            </a>
          </div>

          {/* Login/Account */}
          <div className="flex items-center space-x-6">
            <Link href="/login" className="hover:text-[#FFA900] text-lg transition duration-300">
              <strong>Login</strong>
            </Link>
            <Link
              href="/account"
              className="flex items-center hover:text-[#FFA900] text-lg transition duration-300"
            >
              <FiUser className="mr-1" />
              <strong>My Account</strong>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="px-6 flex items-center justify-between h-16 backdrop-blur-md bg-opacity-70 bg-black">
        {/* Logo */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center hover:animate-bounce">
            <img
              src="https://i.postimg.cc/fyPZHC34/pngtree-online-shopping-logo-with-cart-icon-png-image-8647239.png"
              alt="Logo"
              className="h-10"
            />
            <span className="ml-2 text-lg font-semibold text-[#82C408]">
              JHOTPOT STORE
            </span>
          </Link>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6 text-white">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-[#82C408] hover:to-[#64A400] transition duration-200"
            >
              {item.label}
            </Link>
          ))}
        </div>

        {/* Search Bar & Icons */}
        <div className="hidden md:flex items-center space-x-6">
          {/* Search Bar */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="border rounded-full px-4 py-1 focus:outline-none focus:ring-2 focus:ring-[#82C408] bg-transparent text-white placeholder-gray-400 transition-all duration-200 focus:w-64"
            />
            <FiSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>

          {/* Cart Icon */}
          <button
            className="text-white hover:text-[#82C408] transition duration-200 relative"
            onClick={() => setIsCartOpen(true)}
          >
            <FiShoppingCart size={20} />
            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center -mt-1 -mr-1">
              0
            </span>
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white hover:text-[#82C408] transition duration-200"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          className="md:hidden fixed left-0 top-0 w-[30%] h-full bg-black bg-opacity-80 text-white transform transition-all duration-300 ease-in-out z-40 backdrop-pattern"
        >
          <div className="flex flex-col py-4 px-4">
            {/* Logo, Login, and Cart */}
            <div className="flex items-center justify-between mb-6">
              <Link href="/" className="flex items-center">
                <img
                  src="https://i.postimg.cc/fyPZHC34/pngtree-online-shopping-logo-with-cart-icon-png-image-8647239.png"
                  alt="Logo"
                  className="h-8"
                />
              </Link>
              <Link href="/login" className="hover:text-[#82C408] transition duration-200">
                Login
              </Link>
              <button
                className="text-white hover:text-[#82C408] transition duration-200"
                onClick={() => setIsCartOpen(true)}
              >
                <FiShoppingCart size={20} />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="flex flex-col space-y-4">
              {siteConfig.navItems.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="hover:text-[#82C408] transition duration-200 text-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {isCartOpen && <CartDrawer onClose={() => setIsCartOpen(false)} />}
    </nav>
  );
};

export default Navbar;
