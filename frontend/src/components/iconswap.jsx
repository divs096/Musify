import React, { useState } from "react";
import { FaUser, FaSignInAlt } from "react-icons/fa";

const IconSwap = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleToggle = () => {
    setIsLoggedIn((prev) => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <button
        onClick={handleToggle}
        className="w-16 h-16 rounded-full bg-blue-500 text-white flex items-center justify-center text-2xl shadow-lg hover:bg-blue-600 transition"
      >
        {isLoggedIn ? <FaUser /> : <FaSignInAlt />}
      </button>
      <p className="mt-4 text-lg font-semibold">
        {isLoggedIn ? "Logged In" : "Logged Out"}
      </p>
    </div>
  );
};

export default IconSwap;
