import React from "react";
import { Search } from "lucide-react";

export default function Dashboard() {
  return (
    <div className="min-h-screen/2 bg-gradient-to-br from-white to-blue-200 p-2">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-3xl font-light">
            Welcome in, <span className="text-blue-500 font-medium">DIV</span>
          </h1>
          <p className="text-gray-600 mt-1">here’s what’s happening this week</p>
          <div className="mt-2 inline-block bg-yellow-100 text-yellow-800 text-sm px-3 py-1 rounded-full">14 May</div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="pl-10 pr-4 py-2 rounded-full shadow bg-white"
            />
          </div>
          <button className="bg-yellow-300 text-gray-900 font-semibold px-6 py-2 rounded-full">
            + New Upload
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-300" />
        </div>
      </div>

      {/* Grid Layout */}
      <div className="grid grid-cols-12 gap-4">
        {/* Sidebar */}
        <div className="col-span-1 flex flex-col items-center space-y-6 pt-4">
          <SidebarIcon icon="home" />
          <SidebarIcon icon="radio" />
          <SidebarIcon icon="share" />
          <SidebarIcon icon="users" />
          <SidebarIcon icon="shopping-cart" />
          <SidebarIcon icon="user" />
        </div>

        {/* Main Content */}
        <div className="col-span-7">
          <div className="grid grid-cols-3 gap-4 mb-6">
            <StatCard label="Total Streams" value="8.5k" sub="+120" />
            <StatCard label="Followers" value="500" />
            <StatCard label="Collab Request" value="15" />
          </div>

          <h2 className="text-xl font-semibold mb-4">Analytics</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-yellow-200 p-4 h-64">
              <img
                src="https://i.imgur.com/ehQZ7q4.png"
                alt="Chart"
                className="w-full h-full object-contain"
              />
            </div>
            <div className="grid grid-rows-2 gap-4">
              <div className="p-4 border rounded">Age Group</div>
              <div className="p-4 border rounded">Devices</div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="col-span-4 grid grid-rows-3 gap-4">
          <div className="p-6 text-center text-white bg-gray-400 rounded">Notification</div>
          <div className="p-6 text-center text-white bg-gray-500 rounded">Revenue</div>
          <div className="p-6 text-center text-white bg-gray-600 rounded">Other</div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, sub }) {
  return (
    <div className="p-4 text-center border rounded shadow bg-white">
      <p className="text-2xl font-bold">{value}</p>
      <p className="text-sm text-gray-500">{label}</p>
      {sub && <p className="text-xs text-green-500 mt-1">{sub}</p>}
    </div>
  );
}

function SidebarIcon({ icon }) {
  // SVG icon set
  const icons = {
    home: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M3 12l9-9 9 9" />
        <path d="M9 21V12h6v9" />
      </svg>
    ),
    radio: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
        <circle cx="12" cy="14" r="3" />
        <line x1="22" y1="7" x2="2" y2="21" />
      </svg>
    ),
    share: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="18" cy="5" r="3" />
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="19" r="3" />
        <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
        <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
      </svg>
    ),
    users: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <path d="M17 21v-2a4 4 0 00-3-3.87" />
        <path d="M7 21v-2a4 4 0 013-3.87" />
        <circle cx="12" cy="7" r="4" />
      </svg>
    ),
    "shopping-cart": (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
      </svg>
    ),
    user: (
      <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
        <circle cx="12" cy="7" r="4" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
  };

  return (
    <button className="w-10 h-10 p-2 rounded-full bg-white shadow-md flex items-center justify-center">
      {icons[icon] || null}
    </button>
  );
}
