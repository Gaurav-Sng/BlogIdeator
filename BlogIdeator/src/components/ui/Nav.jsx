import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { logout } from '../../firebase/auth';

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/About', label: 'About Us' },
  { to: '/Pricing', label: 'Pricing' },
  {to:'/blogGenerator',label:'BlogGenerator'}
];

const Nav = () => {
  const { currentUser, isAuthenticated } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  const handleLogout = async () => {
    try {
      await logout();
      setMenuOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  // Close menu on route change
  React.useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Helper for active link
  const isActive = (to) => {
    if (to === '/') return location.pathname === '/';
    return location.pathname.startsWith(to);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center px-4 sm:px-6 py-4 max-w-7xl mx-auto">
        <div className="font-bold text-2xl text-blue-700">TrendBuddy</div>
        {/* Hamburger for mobile */}
        <button
          className="md:hidden flex items-center text-2xl text-blue-700 focus:outline-none"
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`hover:text-blue-600 transition-colors ${isActive(link.to) ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" className={`hover:text-blue-600 transition-colors ${isActive('/dashboard') ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`}>Dashboard</Link>
              <div className="flex items-center">
                {/* <span className="mr-4 text-xs text-gray-600">{currentUser.email}</span> */}
                <button
                  onClick={handleLogout}
                  className="border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-100 text-sm"
                >
                  Log out
                </button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login" className={`border border-gray-300 rounded-md px-4 py-1.5 hover:bg-gray-100 text-sm ${isActive('/login') ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`}>
                Log in
              </Link>
              <Link to="/register" className={`bg-blue-500 text-white rounded-md px-4 py-1.5 hover:bg-blue-600 text-sm ${isActive('/register') ? 'underline underline-offset-4' : ''}`}>
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg transition-all duration-200 px-4 pb-4">
          <div className="flex flex-col space-y-3 mt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className={`hover:text-blue-600 transition-colors ${isActive(link.to) ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`}
                onClick={() => setMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className={`hover:text-blue-600 transition-colors ${isActive('/dashboard') ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`} onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <div className="flex items-center mt-2">
                  {/* <span className="mr-2 text-xs text-gray-600">{currentUser.email}</span> */}
                  <button
                    onClick={handleLogout}
                    className="border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 text-sm"
                  >
                    Log out
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className={`border border-gray-300 rounded-md px-3 py-1 hover:bg-gray-100 text-sm ${isActive('/login') ? 'text-blue-700 font-semibold underline underline-offset-4' : ''}`} onClick={() => setMenuOpen(false)}>
                  Log in
                </Link>
                <Link to="/register" className={`bg-blue-500 text-white rounded-md px-3 py-1 hover:bg-blue-600 text-sm ${isActive('/register') ? 'underline underline-offset-4' : ''}`} onClick={() => setMenuOpen(false)}>
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;