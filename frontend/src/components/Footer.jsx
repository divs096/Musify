import React from "react";

const Footer = () => {
  return (
    <footer className="bg-white py-12 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 text-sm text-gray-700">
        {/* Column 1: Musify */}
        <div>
          <h3 className="font-semibold mb-2">Musify</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">About Us</a></li>
            <li><a href="#" className="hover:underline">Blog</a></li>
            <li><a href="#" className="hover:underline">Posts</a></li>
            <li><a href="#" className="hover:underline">Contact Us</a></li>
          </ul>
        </div>

        {/* Column 2: Community */}
        <div>
          <h3 className="font-semibold mb-2">Community</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Artist Hub</a></li>
            <li><a href="#" className="hover:underline">Producer Studio</a></li>
            <li><a href="#" className="hover:underline">Community Guidelines</a></li>
            <li><a href="#" className="hover:underline">Invite a friend</a></li>
          </ul>
        </div>

        {/* Column 3: Resources */}
        <div>
          <h3 className="font-semibold mb-2">Resources</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Tutorials</a></li>
            <li><a href="#" className="hover:underline">Feedback</a></li>
          </ul>
        </div>
      </div>

      {/* Bottom Centered Text */}
      <div className="text-center text-gray-500 text-sm mt-12">
        Crafted for Creators. Powered by Passion.
      </div>
    </footer>
  );
};

export default Footer;
