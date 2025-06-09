import React, { useState, useEffect } from "react";
import bgImage from "../assets/landing-bg.png";
import AuthModal from "./AuthModal";
import Dashboard from "./Dashboard";

function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);

  // Close dashboard modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (showDashboard) {
        const dashboard = document.getElementById("dashboard-popup");
        if (dashboard && !dashboard.contains(e.target)) {
          setShowDashboard(false);
        }
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showDashboard]);

  return (
    <div className="relative min-h-screen">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bgImage})` }}
      />

      {/* Navbar */}
      <div className="relative z-20 flex justify-between items-center px-10 py-6 text-white">
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-white">musi</span>
          <span className="text-blue-400">fy.</span>
        </div>

        <div className="space-x-8 font-semibold flex items-center">
          <a href="#" className="hover:text-blue-300 transition-colors">Collaborate</a>
          <a href="#" className="hover:text-blue-300 transition-colors">About us</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Store</a>

          {!isLoggedIn ? (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-white text-cyan-700 px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-gray-100 ml-4 transition-colors"
              aria-label="Login or Sign Up"
            >
              Login / Sign Up
            </button>
          ) : (
            <button
              className="w-10 h-10 bg-white text-cyan-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors ml-4"
              aria-label="Account menu"
              onClick={() => setShowDashboard(true)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5.121 17.804A9.978 9.978 0 0112 15c2.185 0 4.188.698 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        show={showAuth}
        onClose={() => setShowAuth(false)}
        onLoginSuccess={() => {
          setIsLoggedIn(true);
          setShowAuth(false);
        }}
      />

      {/* Dashboard Modal */}
      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div id="dashboard-popup" className="bg-white p-8 rounded-xl w-[90%] max-w-3xl">
            <Dashboard />
            <button
              onClick={() => setShowDashboard(false)}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
