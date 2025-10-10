import React, { useState, useEffect } from "react";
import bgImage from "../assets/landing-bg.png";
import Dashboard from "./Dashboard";
import useAuthStore from "../store/useAuthstore";
import axios from "axios";

function Header() {
  const [showAuth, setShowAuth] = useState(false);
  const [showDashboard, setShowDashboard] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [chatStep, setChatStep] = useState("inbox");
  const [inbox, setInbox] = useState([]);
  const [activeChatUser, setActiveChatUser] = useState(null);

  const { authUser, logout, isCheckingAuth } = useAuthStore();

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

  useEffect(() => {
    if (showChat && authUser) {
      axios
        .get("http://localhost:5000/api/messages/inbox", { withCredentials: true })
        .then((res) => setInbox(res.data))
        .catch((err) => console.error("Inbox fetch error:", err));
    }
  }, [showChat, authUser]);

  if (isCheckingAuth) return <div>Loading...</div>;

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }} />
      <div className="relative z-20 flex justify-between items-center px-10 py-6 text-white">
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-white">musi</span>
          <span className="text-blue-400">fy.</span>
        </div>

        <div className="space-x-8 font-semibold flex items-center">
          <a href="#" className="hover:text-blue-300 transition-colors">Collaborate</a>
          <a href="#" className="hover:text-blue-300 transition-colors">About us</a>
          <a href="#" className="hover:text-blue-300 transition-colors">Store</a>

          {!authUser ? (
            <button
              onClick={() => setShowAuth(true)}
              className="bg-white text-cyan-700 px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-gray-100 ml-4 transition-colors"
            >
              Login / Sign Up
            </button>
          ) : (
            <>
              <button
                className="w-10 h-10 bg-white text-cyan-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors ml-4"
                onClick={() => setShowDashboard(true)}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A9.978 9.978 0 0112 15c2.185 0 4.188.698 5.879 1.804M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
              </button>
              <button
                className="w-10 h-10 bg-white text-cyan-700 rounded-full flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors ml-4"
                onClick={() => {
                  setShowChat(true);
                  setChatStep("inbox");
                  setActiveChatUser(null);
                }}
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h6m-6 4h10M21 12c0 4.418-4.03 8-9 8s-9-3.582-9-8 4.03-8 9-8 9 3.582 9 8z"/>
                </svg>
              </button>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-6 py-2 rounded-xl font-semibold shadow-lg hover:bg-red-600 ml-4 transition-colors"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>

      <AuthModal show={showAuth} onClose={() => setShowAuth(false)} />

      {showDashboard && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div id="dashboard-popup" className="bg-white p-8 rounded-xl w-[90%] max-w-3xl">
            <Dashboard />
            <button onClick={() => setShowDashboard(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}

      {showChat && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-[90%] max-w-3xl h-[80%] flex flex-col">
            {chatStep === "inbox" && (
              <>
                <h2 className="text-xl font-bold mb-4">Inbox</h2>
                <div className="flex-1 overflow-y-auto">
                  {inbox.length === 0 ? (
                    <p className="text-gray-600">No messages yet.</p>
                  ) : (
                    inbox.map((user) => (
                      <div key={user._id} onClick={() => { setActiveChatUser(user); setChatStep("chat"); }} className="p-3 border-b cursor-pointer hover:bg-gray-100">
                        {user.name} ({user.email})
                      </div>
                    ))
                  )}
                </div>
              </>
            )}
            {chatStep === "chat" && activeChatUser && (
              <>
                <div className="flex items-center mb-4">
                  <button onClick={() => setChatStep("inbox")} className="mr-4 text-blue-500">← Back</button>
                  <h2 className="text-lg font-bold">Chat with {activeChatUser.name}</h2>
                </div>
                <div className="flex-1 overflow-y-auto">
                  <Chat receiver={activeChatUser} token={authUser.token} />
                </div>
              </>
            )}
            <button onClick={() => setShowChat(false)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg">
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
