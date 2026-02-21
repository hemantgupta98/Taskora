"use client";

export default function Navbar() {
  return (
    <nav className="w-full px-8 py-4 flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-500 rounded-md" />
        <span className="text-xl font-semibold">Taskora</span>
      </div>

      {/* Links */}
      <ul className="hidden md:flex gap-8 text-gray-600">
        <li className="hover:text-black cursor-pointer">Features</li>
        <li className="hover:text-black cursor-pointer">Solutions</li>
        <li className="hover:text-black cursor-pointer">Pricing</li>
        <li className="hover:text-black cursor-pointer">Resources</li>
      </ul>

      {/* Actions */}
      <div className="flex items-center gap-4">
        <button className="text-gray-600 hover:text-black">Log In</button>
        <button className="bg-blue-500 text-white px-5 py-2 rounded-md hover:bg-blue-600">
          Get Started Free
        </button>
      </div>
    </nav>
  );
}
