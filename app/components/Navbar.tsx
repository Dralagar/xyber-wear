import React from "react";
import Link from "next/link";

const Navbar: React.FC = () => {
  return (
    <nav className="border-b border-gray-800 bg-black/60 backdrop-blur">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold tracking-tight">
          Xyberwear
        </Link>
        <div className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:text-indigo-300 transition-colors">
            Home
          </Link>
          <Link
            href="/products"
            className="hover:text-indigo-300 transition-colors"
          >
            Products
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
