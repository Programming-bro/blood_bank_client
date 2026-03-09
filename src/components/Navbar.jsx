import { useState, useContext, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); 
  const dropdownRef = useRef(null); 

  
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  const username = user?.user?.username || "User";

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <Link to="/" className="text-2xl font-black text-red-600 flex items-center gap-2">
            🩸 RedHeart
          </Link>

          {/* Desktop Links (Left side of user icon) */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">Home</Link>
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">Feature</Link>
            <Link to="/" className="text-gray-700 hover:text-red-600 font-medium transition">Contact</Link>
            {user && (
              <>
                <Link to="/donor-list" className="text-gray-700 hover:text-red-600 font-medium transition">Donors</Link>
                <Link to="/request-blood" className="text-gray-700 hover:text-red-600 font-medium transition">Requests</Link>
              </>
            )}
          </div>

          {/* Right Side: Auth Buttons or User Icon */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                {/* User Icon Button */}
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 bg-red-600 text-white rounded-full flex items-center justify-center font-bold shadow-md hover:bg-red-700 transition-all focus:ring-2 focus:ring-red-300"
                >
                  {username[0].toUpperCase()}
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-2xl py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-gray-50 mb-1">
                      <p className="text-sm font-bold text-gray-800 truncate">{username}</p>
                      <p className="text-[10px] text-gray-400 truncate">{user.user?.email}</p>
                    </div>
                    <Link 
                      to="/profile" 
                      onClick={() => setIsProfileOpen(false)}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 transition"
                    >
                      👤 My Profile
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 font-medium transition"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link to="/login" className="text-gray-700 font-medium hover:text-red-600">Login</Link>
                <Link to="/register" className="bg-red-600 text-white px-5 py-2 rounded-full font-bold hover:bg-red-700 shadow-md">Join Now</Link>
              </div>
            )}

            {/* Mobile Menu Toggle Button */}
            <div className="md:hidden">
              <button onClick={() => setIsMobileOpen(!isMobileOpen)} className="text-gray-700 p-2">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMobileOpen ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Sidebar/Menu */}
        {isMobileOpen && (
          <div className="md:hidden pb-6 space-y-2 border-t border-gray-50 pt-4 animate-fadeIn">
            <Link to="/" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">Home</Link>
            <Link to="/" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">Feature</Link>
            <Link to="/" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700 hover:bg-red-50 rounded-lg">Contact</Link>
            {!user && (
              <>
                <Link to="/login" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700">Login</Link>
                <Link to="/register" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-red-600 font-bold">Join Now</Link>
              </>
            )}
            {user && (
              <>
                <Link to="/donor-list" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700">Donors</Link>
                <Link to="/request-blood" onClick={() => setIsMobileOpen(false)} className="block px-4 py-2 text-gray-700">Requests</Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;