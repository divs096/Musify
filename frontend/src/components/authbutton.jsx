import { useState, useEffect } from "react";

const AuthButton = ({ isLoggedIn, onLoginClick, onLogout }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  // Toggle dropdown for logged-in state
  const toggleDropdown = (e) => {
    e.stopPropagation();
    setShowDropdown((prev) => !prev);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showDropdown) setShowDropdown(false);
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showDropdown]);

  // 👤 Not Logged In? Show the "Login / Sign Up" button
  if (!isLoggedIn) {
    return (
      <button
        onClick={onLoginClick}
        className="bg-white text-cyan-700 px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-gray-100 ml-4 transition-colors"
        aria-label="Login or Sign Up"
      >
        Login / Sign Up
      </button>
    );
  }

  // ✅ Logged In? Show the user icon and dropdown
  return (
    <div className="relative ml-4">
      <button
        className="w-10 h-10 bg-white text-cyan-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
        aria-label="Account menu"
        onClick={toggleDropdown}
      >
        {/* User icon */}
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

      {/* Dropdown menu */}
      <div
        className={`absolute right-0 mt-2 w-32 bg-white text-cyan-700 rounded-lg shadow-lg transition-all duration-200 z-50 ${
          showDropdown
            ? "opacity-100 pointer-events-auto translate-y-0"
            : "opacity-0 pointer-events-none -translate-y-1"
        }`}
      >
        <button
          className="block w-full text-left px-4 py-2 hover:bg-cyan-100 rounded-lg transition-colors"
          onClick={(e) => {
            e.stopPropagation();
            onLogout();
            setShowDropdown(false);
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AuthButton;
