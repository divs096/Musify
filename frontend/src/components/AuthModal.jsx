import React, { useState } from "react";

const AuthModal = ({ show, onClose, onLoginSuccess }) => {
  const [isSignup, setIsSignup] = useState(false);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-8 rounded-xl max-w-md w-full shadow-xl">
        <h2 className="text-2xl font-bold mb-4 text-center">
          {isSignup ? "Create an account" : "Login to your account"}
        </h2>

        <div className="space-y-3 mb-6">
          <button className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600">Continue with Google</button>
          <button className="w-full bg-gray-800 text-white py-2 rounded-lg hover:bg-gray-900">Continue with GitHub</button>
        </div>

        <div className="text-center text-gray-500 mb-4">— or —</div>

        <input type="email" placeholder="Email" className="w-full px-4 py-2 border rounded mb-3" />
        <input type="password" placeholder="Password" className="w-full px-4 py-2 border rounded mb-4" />

        <button
          onClick={() => {
            onLoginSuccess();
            setIsSignup(false);
          }}
          className="w-full bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700"
        >
          {isSignup ? "Sign Up" : "Login"}
        </button>

        <p className="mt-4 text-sm text-center text-gray-600">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button onClick={() => setIsSignup(!isSignup)} className="text-cyan-700 font-medium hover:underline">
            {isSignup ? "Login" : "Sign up"}
          </button>
        </p>

        <button onClick={onClose} className="mt-6 text-sm text-gray-400 hover:text-gray-600 block mx-auto">
          Cancel
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
