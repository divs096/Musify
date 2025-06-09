import React, { useState, useRef, useEffect } from "react";
import { FaGoogle, FaFacebook, FaGithub, FaTimes } from "react-icons/fa";

const AuthModal = ({ show, onClose, onLoginSuccess }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const modalRef = useRef();

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setUsername("");
    setPassword("");
  };

  const validateUsername = (name) => /^[a-zA-Z0-9_@]{3,}$/.test(name);
  const validatePassword = (pass) => pass.length >= 8;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) return alert("Fields cannot be empty.");
    if (!validateUsername(username)) return alert("Invalid username.");
    if (!validatePassword(password)) return alert("Password too short.");
    setShowSuccess(true);
  };

  // After showing success overlay, close modal and notify parent
  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClose();           // close modal
    if (onLoginSuccess) {
      onLoginSuccess();  // notify parent to swap buttons
    }
  };

  const handleClickOutside = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    if (show) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-60 flex justify-center items-center z-40">
        {/* Modal Box */}
        <div
          ref={modalRef}
          className="relative bg-white rounded-xl p-8 w-full max-w-md shadow-2xl"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-black"
          >
            <FaTimes />
          </button>
          <h2 className="text-2xl font-bold text-center mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border rounded-lg px-4 py-2"
            />
            <button
              type="submit"
              className="bg-cyan-600 text-white py-2 rounded-lg hover:bg-cyan-700 transition"
            >
              {isLogin ? "Login" : "Register"}
            </button>
          </form>

          <div className="text-sm text-center my-4">
            {isLogin ? "Don't have an account?" : "Already registered?"}{" "}
            <button
              onClick={toggleMode}
              className="text-cyan-600 hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </button>
          </div>

          <div className="flex justify-center gap-4 text-xl mt-4 text-gray-600">
            <FaGoogle className="cursor-pointer hover:text-red-500" />
            <FaFacebook className="cursor-pointer hover:text-blue-600" />
            <FaGithub className="cursor-pointer hover:text-black" />
          </div>
        </div>
      </div>

      {/* Success Overlay */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-80 flex justify-center items-center">
          <div className="bg-white p-10 rounded-xl text-center relative w-full max-w-sm shadow-xl">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
              onClick={handleSuccessClose}  // call the new handler
            >
              <FaTimes />
            </button>
            <h2 className="text-2xl font-bold mb-4">Success!</h2>
            <p className="text-gray-700">
              You have {isLogin ? "logged in" : "registered"} successfully.
            </p>
            <button
              onClick={handleSuccessClose}
              className="mt-6 bg-cyan-600 text-white py-2 px-6 rounded-lg hover:bg-cyan-700 transition"
            >
              Continue
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthModal;
