import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <header className="px-4 lg:px-16 bg-white shadow-md">
      <div className="container mx-auto">
        <div className="flex justify-between items-center py-3">
          <Link to="/" className="text-2xl font-semibold">
            Whiteboard
          </Link>

          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>

          <nav className="hidden md:flex md:gap-3 md:items-center">
            <Link
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white ${
                isActive("/") ? "bg-slate-600 text-white" : ""
              }`}
              to="/"
            >
              Home
            </Link>
            <Link
              className={`px-3 py-2 rounded-md text-sm font-medium hover:bg-slate-700 hover:text-white ${
                isActive("/whiteboard") ? "bg-slate-600 text-white" : ""
              }`}
              to="/whiteboard"
            >
              Whiteboard
            </Link>
          </nav>
        </div>
      </div>

      {/* Mobile menu */}
      <nav
        className={`md:hidden ${
          isMenuOpen ? "block" : "hidden"
        } transition-all duration-300 ease-in-out`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <Link
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            to="/"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-100"
            to="/whiteboard"
            onClick={() => setIsMenuOpen(false)}
          >
            Whiteboard
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;
